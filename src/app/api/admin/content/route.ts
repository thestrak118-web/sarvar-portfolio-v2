import { NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";

/**
 * Local content API for the admin panel.
 *
 * Development only: in a production build every method returns 404, so the
 * deployed site has no write endpoint at all.
 */

export const CONTENT_FILES = [
  "layout",
  "profile",
  "links",
  "experience",
  "projects",
  "skills",
  "certifications",
  "research",
  "github",
] as const;

export type ContentFile = (typeof CONTENT_FILES)[number];

const contentDir = path.join(process.cwd(), "src", "content");
const backupDir = path.join(contentDir, ".backups");

const isDev = () => process.env.NODE_ENV === "development";

export async function readAllContent(): Promise<Record<string, unknown>> {
  const entries = await Promise.all(
    CONTENT_FILES.map(async (file) => {
      const raw = await fs.readFile(path.join(contentDir, `${file}.json`), "utf8");
      return [file, JSON.parse(raw)] as const;
    }),
  );
  return Object.fromEntries(entries);
}

export async function GET() {
  if (!isDev()) return new NextResponse("Not found", { status: 404 });
  return NextResponse.json(await readAllContent());
}

export async function PUT(request: Request) {
  if (!isDev()) return new NextResponse("Not found", { status: 404 });

  let body: { file?: string; data?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON o'qib bo'lmadi" }, { status: 400 });
  }

  const file = body.file;
  if (!file || !(CONTENT_FILES as readonly string[]).includes(file)) {
    return NextResponse.json({ error: `Noma'lum fayl: ${file}` }, { status: 400 });
  }
  if (body.data === undefined || body.data === null) {
    return NextResponse.json({ error: "Ma'lumot bo'sh" }, { status: 400 });
  }

  const target = path.join(contentDir, `${file}.json`);
  const serialised = `${JSON.stringify(body.data, null, 2)}\n`;

  // Keep the previous version — a mis-click should never lose content.
  try {
    const previous = await fs.readFile(target, "utf8");
    await fs.mkdir(backupDir, { recursive: true });
    const stamp = new Date().toISOString().replace(/[:.]/g, "-");
    await fs.writeFile(path.join(backupDir, `${file}-${stamp}.json`), previous, "utf8");
  } catch {
    // No previous file: nothing to back up.
  }

  await fs.writeFile(target, serialised, "utf8");

  return NextResponse.json({ ok: true, file, bytes: serialised.length });
}
