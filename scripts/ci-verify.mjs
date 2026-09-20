import { spawn } from "node:child_process";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { chromium } from "playwright";
import lighthouse from "lighthouse";
import { launch } from "chrome-launcher";

const output = new URL("../qa-results/", import.meta.url).pathname;
await mkdir(output, { recursive: true });
const server = spawn(
  process.execPath,
  ["node_modules/next/dist/bin/next", "start", "-p", "4174"],
  { stdio: "inherit" },
);
const run = (file, args, env) =>
  new Promise((resolve, reject) => {
    const child = spawn(file, args, {
      stdio: "inherit",
      env: { ...process.env, ...env },
    });
    child.on("error", reject);
    child.on("exit", (code) =>
      code === 0 ? resolve() : reject(new Error(`${file} exited with ${code}`)),
    );
  });

try {
  let ready = false;
  for (let attempt = 0; attempt < 30; attempt++) {
    try {
      if ((await fetch("http://127.0.0.1:4174")).ok) {
        ready = true;
        break;
      }
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  if (!ready) throw new Error("Production server did not start");
  await run(process.execPath, ["scripts/verify.mjs"], {
    TEST_URL: "http://127.0.0.1:4174",
    QA_OUTPUT: output,
    CHROME_PATH: chromium.executablePath(),
  });
  const summaries = [];
  for (const mode of ["mobile", "desktop"]) {
    const chrome = await launch({
      chromePath: chromium.executablePath(),
      chromeFlags: ["--headless", "--no-sandbox"],
    });
    try {
      const result = await lighthouse("http://127.0.0.1:4174", {
        port: chrome.port,
        output: "json",
        onlyCategories: [
          "performance",
          "accessibility",
          "best-practices",
          "seo",
        ],
        ...(mode === "desktop" ? { preset: "desktop" } : {}),
      });
      await writeFile(`${output}/lighthouse-${mode}.json`, result.report);
      const scores = Object.fromEntries(
        Object.entries(result.lhr.categories).map(([key, value]) => [
          key,
          Math.round(value.score * 100),
        ]),
      );
      const metrics = Object.fromEntries(
        [
          "largest-contentful-paint",
          "speed-index",
          "total-blocking-time",
          "cumulative-layout-shift",
        ].map((key) => [key, result.lhr.audits[key].numericValue]),
      );
      summaries.push({ mode, scores, metrics });
      console.log(JSON.stringify({ mode, scores, metrics }));
    } finally {
      await chrome.kill();
    }
  }
  await writeFile(`${output}/summary.json`, JSON.stringify(summaries, null, 2));
  const functional = JSON.parse(
    await readFile(`${output}/results.json`, "utf8"),
  );
  if (functional.errors.length) throw new Error("Browser errors");
  for (const result of summaries) {
    for (const [category, score] of Object.entries(result.scores)) {
      const target = category === "performance" ? 90 : 95;
      if (score < target)
        throw new Error(
          `${result.mode} ${category}: ${score}, target ${target}`,
        );
    }
  }
} finally {
  server.kill("SIGTERM");
}
