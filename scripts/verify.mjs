import assert from "node:assert/strict";
import { mkdir, writeFile, readFile } from "node:fs/promises";
const { chromium } = await import(
  process.env.PLAYWRIGHT_MODULE || "playwright"
);
const base = process.env.TEST_URL || "http://127.0.0.1:4174";
const output = process.env.QA_OUTPUT || "/tmp/sarvar-portfolio-qa";
await mkdir(output, { recursive: true });
const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH || "/usr/bin/chromium",
  args: ["--no-sandbox"],
});
const studies = JSON.parse(
  await readFile(
    new URL("../src/content/case-studies.json", import.meta.url),
    "utf8",
  ),
).items;
const routes = [
  "/",
  "/work",
  "/experience",
  "/skills",
  "/about",
  "/certifications",
  "/contact",
  ...studies.map((study) => `/work/${study.slug}`),
  "/work/htb-thm-vulnyx-assessments",
  "/work/threat-intelligence-reporting",
];
const results = [];
const errors = [];
const internal = new Set();
try {
  for (const width of [375, 768, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    for (const route of routes) {
      const response = await page.goto(base + route, {
        waitUntil: "networkidle",
      });
      assert.equal(response.status(), 200, `${route}: HTTP`);
      assert.equal(await page.locator("h1").count(), 1, `${route}: one H1`);
      assert.equal(
        await page.locator("#contact").count(),
        1,
        `${route}: one contact section`,
      );
      assert.equal(
        new URL(
          await page.locator('link[rel="canonical"]').getAttribute("href"),
        ).href,
        new URL(route, "https://sarvar-portfoli.vercel.app").href,
      );
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      );
      assert.equal(overflow, false, `${width} ${route}: overflow`);
      for (const picture of await page.locator("main img").all()) {
        await picture.scrollIntoViewIfNeeded();
        await picture.evaluate((img) => img.decode());
        assert.equal(
          await picture.evaluate((img) => img.naturalWidth > 0),
          true,
          `${route}: image`,
        );
      }
      const links = await page
        .locator('a[href^="/"]')
        .evaluateAll((elements) =>
          elements.map((el) => el.getAttribute("href")),
        );
      links.forEach((link) => internal.add(link));
      await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
      if (
        route === "/" ||
        route === "/work/security-automation-scripts" ||
        route === "/certifications"
      ) {
        await page.screenshot({
          path: `${output}/${width}-${route.replaceAll("/", "_")}-viewport.png`,
        });
        // Render offscreen sections for the full-page artifact, as scrolling does.
        const screenshotStyle = await page.addStyleTag({ content: ".v2-band { content-visibility: visible !important; }" });
        await page.screenshot({
          path: `${output}/${width}-${route.replaceAll("/", "_") || "home"}.png`,
          fullPage: true,
        });
        await screenshotStyle.evaluate(element => element.remove());
      }
      results.push({
        width,
        route,
        title: await page.title(),
        h1: await page.locator("h1").innerText(),
      });
    }
    await page.goto(base, { waitUntil: "networkidle" });
    await page.getByRole("tab", { name: "Automation", exact: true }).click();
    assert.match(await page.getByRole("tabpanel").innerText(), /90/);
    await page
      .getByRole("tab", { name: "Automation", exact: true })
      .press("ArrowRight");
    assert.equal(
      await page
        .getByRole("tab", { name: "Laboratoriya", exact: true })
        .getAttribute("aria-selected"),
      "true",
    );
    await page.getByRole("button", { name: /03.*Tasdiqlash/ }).click();
    assert.match(await page.locator("#workflow-detail").innerText(), /PoC/);
    if (width < 1050) {
      await page.getByRole("button", { name: "Menyuni ochish" }).click();
      await page.keyboard.press("Escape");
      assert.equal(
        await page
          .getByRole("button", { name: "Menyuni ochish" })
          .getAttribute("aria-expanded"),
        "false",
      );
      await page.getByRole("button", { name: "Menyuni ochish" }).click();
      await page
        .locator("#v2-mobile-menu")
        .getByRole("link", { name: "Loyihalar" })
        .click();
      await page.waitForURL("**/work");
      assert.equal(await page.locator("#v2-mobile-menu").count(), 0);
    }
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(base, { waitUntil: "networkidle" });
    assert.equal(
      await page.locator("h1").evaluate((el) => getComputedStyle(el).opacity),
      "1",
    );
    await page.getByRole("tab", { name: "Automation", exact: true }).click();
    assert.match(await page.getByRole("tabpanel").innerText(), /90/);
    await page.close();
  }
  const request = await browser.newContext();
  for (const path of internal) {
    const response = await request.request.get(base + path);
    assert.equal(response.status(), 200, `internal link ${path}`);
  }
  const pdf = await request.request.get(base + "/cv/Sarvar_Tolipov_CV.pdf");
  assert.equal((await pdf.body()).subarray(0, 4).toString(), "%PDF");
  for (const route of ["/admin", "/api/admin/content", "/missing-page"])
    assert.equal(
      (await request.request.get(base + route)).status(),
      404,
      route,
    );
  assert.equal(
    (
      await request.request.put(base + "/api/admin/content", {
        data: { file: "profile", data: {} },
      })
    ).status(),
    404,
  );
  for (const route of ["/robots.txt", "/sitemap.xml", "/opengraph-image"])
    assert.equal(
      (await request.request.get(base + route)).status(),
      200,
      route,
    );
  assert.deepEqual(errors, [], "browser console/page errors");
  await writeFile(
    `${output}/results.json`,
    JSON.stringify(
      { base, results, internalLinks: [...internal], errors },
      null,
      2,
    ),
  );
  console.log(
    `PASS: ${results.length} page/viewport checks; keyboard tabs, workflow, mobile navigation, reduced motion, images, canonical URLs, ${internal.size} internal links, PDF and production admin guards.`,
  );
} finally {
  await browser.close();
}
