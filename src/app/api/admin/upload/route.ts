import { NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";
import { randomBytes } from "node:crypto";

/** Image upload for the local admin panel. Development only. */

const ALLOWED: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
  "image/avif": "avif",
  "image/gif": "gif",
};

const MAX_BYTES = 8 * 1024 * 1024;
const uploadDir = path.join(process.cwd(), "public", "uploads");

function slugify(name: string) {
  return (
    name
      .toLowerCase()
      .replace(/\.[^.]+$/, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 40) || "image"
  );
}

export async function POST(request: Request) {
  if (process.env.NODE_ENV !== "development") {
    return new NextResponse("Not found", { status: 404 });
  }

  const form = await request.formData();
  const file = form.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Fayl topilmadi" }, { status: 400 });
  }

  const extension = ALLOWED[file.type];
  if (!extension) {
    return NextResponse.json(
      { error: `Bu format qo'llab-quvvatlanmaydi: ${file.type || "noma'lum"}. PNG, JPG, WEBP, AVIF yoki GIF yuklang.` },
      { status: 400 },
    );
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { error: `Fayl juda katta (${(file.size / 1024 / 1024).toFixed(1)} MB). Eng ko'pi 8 MB.` },
      { status: 400 },
    );
  }

  await fs.mkdir(uploadDir, { recursive: true });
  const name = `${slugify(file.name)}-${randomBytes(3).toString("hex")}.${extension}`;
  await fs.writeFile(path.join(uploadDir, name), Buffer.from(await file.arrayBuffer()));

  return NextResponse.json({ url: `/uploads/${name}`, bytes: file.size });
}
