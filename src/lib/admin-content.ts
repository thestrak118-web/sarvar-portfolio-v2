import { promises as fs } from "node:fs";
import path from "node:path";

export const CONTENT_FILES = [
  "layout",
  "profile",
  "links",
  "experience",
  "projects",
  "case-studies",
  "skills",
  "certifications",
  "research",
  "github",
] as const;
export const contentDir = path.join(process.cwd(), "src", "content");
export async function readAllContent(): Promise<Record<string, unknown>> {
  const entries = await Promise.all(
    CONTENT_FILES.map(async (file) => [
      file,
      JSON.parse(
        await fs.readFile(path.join(contentDir, `${file}.json`), "utf8"),
      ),
    ]),
  );
  return Object.fromEntries(entries);
}
