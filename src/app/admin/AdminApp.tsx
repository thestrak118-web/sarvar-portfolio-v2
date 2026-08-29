"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { sections, type Field, type Section } from "./schema";

type Json = unknown;
type Bag = Record<string, Json>;
type Path = (string | number)[];

/* ── immutable helpers ─────────────────────────────────────────────────── */

function getIn(value: Json, path: Path): Json {
  return path.reduce<Json>((acc, key) => {
    if (acc === null || acc === undefined) return undefined;
    return (acc as Record<string | number, Json>)[key];
  }, value);
}

function setIn(value: Json, path: Path, next: Json): Json {
  if (path.length === 0) return next;
  const [head, ...rest] = path;
  if (typeof head === "number") {
    const list = Array.isArray(value) ? [...value] : [];
    list[head] = setIn(list[head], rest, next);
    return list;
  }
  const object = { ...((value as Bag) ?? {}) };
  object[head] = setIn(object[head], rest, next);
  return object;
}

function emptyValue(field: Field): Json {
  switch (field.type) {
    case "boolean":
      return false;
    case "number":
      return 0;
    case "strings":
      return [];
    case "objects":
      return [];
    case "select":
      return field.options[0];
    default:
      return "";
  }
}

function blankItem(fields: Field[]): Bag {
  return Object.fromEntries(fields.map((field) => [field.key, emptyValue(field)]));
}

/** Drops empty list entries and trims strings before writing to disk. */
function clean(value: Json): Json {
  if (Array.isArray(value)) {
    return value
      .map(clean)
      .filter((item) => !(typeof item === "string" && item.trim() === ""));
  }
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value as Bag).map(([k, v]) => [k, clean(v)]));
  }
  if (typeof value === "string") return value.trim();
  return value;
}

/* ── inputs ────────────────────────────────────────────────────────────── */

const inputClass =
  "w-full rounded-lg border border-line bg-void px-3 py-2.5 text-[13.5px] text-fg outline-none transition-colors placeholder:text-faint focus:border-acid/60";

function Label({ field }: { field: Field }) {
  return (
    <div className="mb-2 flex items-baseline gap-2">
      <span className="text-[12.5px] font-medium text-fg">{field.label}</span>
      {"hint" in field && field.hint ? (
        <span className="text-[11.5px] text-dim">{field.hint}</span>
      ) : null}
    </div>
  );
}

function FieldControl({
  field,
  value,
  path,
  onChange,
}: {
  field: Field;
  value: Json;
  path: Path;
  onChange: (path: Path, next: Json) => void;
}) {
  if (field.type === "objects") {
    const items = Array.isArray(value) ? (value as Bag[]) : [];
    return (
      <ObjectList field={field} items={items} path={path} onChange={onChange} />
    );
  }

  if (field.type === "image") {
    return <ImageControl field={field} value={value} path={path} onChange={onChange} />;
  }

  if (field.type === "boolean") {
    return (
      <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-line bg-void px-3 py-2.5">
        <input
          type="checkbox"
          checked={Boolean(value)}
          onChange={(event) => onChange(path, event.target.checked)}
          className="size-4 accent-[#c3ff3e]"
        />
        <span className="text-[13px] text-fg">{field.label}</span>
        {field.hint ? <span className="text-[11.5px] text-dim">{field.hint}</span> : null}
      </label>
    );
  }

  return (
    <div>
      <Label field={field} />
      {field.type === "textarea" ? (
        <textarea
          value={String(value ?? "")}
          rows={field.rows ?? 3}
          onChange={(event) => onChange(path, event.target.value)}
          className={`${inputClass} resize-y leading-relaxed`}
        />
      ) : field.type === "strings" ? (
        <textarea
          value={(Array.isArray(value) ? (value as string[]) : []).join("\n")}
          rows={Math.max(3, (Array.isArray(value) ? value.length : 0) + 1)}
          onChange={(event) => onChange(path, event.target.value.split("\n"))}
          className={`${inputClass} resize-y font-mono text-[12.5px] leading-relaxed`}
        />
      ) : field.type === "select" ? (
        <select
          value={String(value ?? "")}
          onChange={(event) => onChange(path, event.target.value)}
          className={inputClass}
        >
          {field.options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : field.type === "number" ? (
        <input
          type="number"
          value={Number(value ?? 0)}
          onChange={(event) => onChange(path, Number(event.target.value))}
          className={inputClass}
        />
      ) : (
        <input
          type="text"
          value={String(value ?? "")}
          placeholder={field.type === "text" ? field.placeholder : undefined}
          onChange={(event) => onChange(path, event.target.value)}
          className={inputClass}
        />
      )}
    </div>
  );
}

function ImageControl({
  field,
  value,
  path,
  onChange,
}: {
  field: Extract<Field, { type: "image" }>;
  value: Json;
  path: Path;
  onChange: (path: Path, next: Json) => void;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const src = typeof value === "string" ? value : "";

  const upload = async (file: File) => {
    setBusy(true);
    setError("");
    try {
      const body = new FormData();
      body.append("file", file);
      const response = await fetch("/api/admin/upload", { method: "POST", body });
      const result = (await response.json()) as { url?: string; error?: string };
      if (!response.ok || !result.url) throw new Error(result.error ?? `HTTP ${response.status}`);
      onChange(path, result.url);
    } catch (uploadError) {
      setError((uploadError as Error).message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <Label field={field} />
      <div className="flex flex-wrap items-start gap-4 rounded-xl border border-line bg-void p-4">
        <div className="flex size-24 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-line bg-surface">
          {src ? (
            // Local preview inside a dev-only tool: plain <img> keeps it simple.
            // eslint-disable-next-line @next/next/no-img-element
            <img src={src} alt="" className="size-full object-cover" />
          ) : (
            <span className="text-[11px] text-dim">rasm yo&rsquo;q</span>
          )}
        </div>

        <div className="flex-1 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <label className="cursor-pointer rounded-lg border border-acid/40 bg-acid/10 px-3 py-1.5 text-[12px] text-acid transition-colors hover:bg-acid/20">
              {busy ? "Yuklanmoqda…" : "Rasm yuklash"}
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp,image/avif,image/gif"
                className="hidden"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (file) void upload(file);
                  event.target.value = "";
                }}
              />
            </label>
            {src ? (
              <button
                type="button"
                onClick={() => onChange(path, "")}
                className="rounded-lg border border-line px-3 py-1.5 text-[12px] text-dim transition-colors hover:text-danger"
              >
                Olib tashlash
              </button>
            ) : null}
          </div>
          <input
            type="text"
            value={src}
            placeholder="/uploads/rasm.png"
            onChange={(event) => onChange(path, event.target.value)}
            className={`${inputClass} font-mono text-[12px]`}
          />
          <p className="text-[11.5px] text-dim">
            PNG, JPG, WEBP, AVIF yoki GIF · eng ko&rsquo;pi 8 MB · fayl{" "}
            <code className="font-mono">public/uploads/</code> ichiga saqlanadi
          </p>
          {error ? <p className="text-[12px] text-danger">{error}</p> : null}
        </div>
      </div>
    </div>
  );
}

function ObjectList({
  field,
  items,
  path,
  onChange,
}: {
  field: Extract<Field, { type: "objects" }>;
  items: Bag[];
  path: Path;
  onChange: (path: Path, next: Json) => void;
}) {
  const [open, setOpen] = useState<number | null>(items.length === 1 ? 0 : null);

  const replace = (next: Bag[]) => onChange(path, next);

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-baseline gap-2">
          <span className="text-[12.5px] font-medium text-fg">{field.label}</span>
          <span className="font-mono text-[11px] text-dim">{items.length} ta</span>
        </div>
        {!field.fixed ? (
          <button
            type="button"
            onClick={() => {
              replace([...items, blankItem(field.fields)]);
              setOpen(items.length);
            }}
            className="rounded-lg border border-acid/40 bg-acid/10 px-3 py-1.5 text-[12px] text-acid transition-colors hover:bg-acid/20"
          >
            + {field.addLabel}
          </button>
        ) : null}
      </div>

      <div className="space-y-2">
        {items.map((item, index) => {
          const isOpen = open === index;
          const title = String(item[field.titleKey] ?? "").trim() || `#${index + 1}`;
          return (
            <div key={index} className="rounded-xl border border-line bg-surface">
              <div className="flex items-center gap-2 px-3 py-2.5">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : index)}
                  className="flex flex-1 items-center gap-3 text-left"
                >
                  <span className="font-mono text-[11px] text-dim">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="line-clamp-1 text-[13px] text-fg">{title}</span>
                  <span className="ml-auto text-[11px] text-dim">{isOpen ? "yopish" : "ochish"}</span>
                </button>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    aria-label="Yuqoriga"
                    disabled={index === 0}
                    onClick={() => {
                      const next = [...items];
                      [next[index - 1], next[index]] = [next[index], next[index - 1]];
                      replace(next);
                    }}
                    className="rounded-md border border-line px-2 py-1 text-[11px] text-dim disabled:opacity-30 enabled:hover:text-fg"
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    aria-label="Pastga"
                    disabled={index === items.length - 1}
                    onClick={() => {
                      const next = [...items];
                      [next[index + 1], next[index]] = [next[index], next[index + 1]];
                      replace(next);
                    }}
                    className="rounded-md border border-line px-2 py-1 text-[11px] text-dim disabled:opacity-30 enabled:hover:text-fg"
                  >
                    ↓
                  </button>
                  {!field.fixed ? (
                    <button
                      type="button"
                      aria-label="O'chirish"
                      onClick={() => {
                        if (!confirm(`"${title}" o'chirilsinmi?`)) return;
                        replace(items.filter((_, i) => i !== index));
                        setOpen(null);
                      }}
                      className="rounded-md border border-line px-2 py-1 text-[11px] text-dim hover:border-danger/50 hover:text-danger"
                    >
                      ✕
                    </button>
                  ) : null}
                </div>
              </div>

              {isOpen ? (
                <div className="space-y-4 border-t border-line p-4">
                  {field.fields.map((sub) => (
                    <FieldControl
                      key={sub.key}
                      field={sub}
                      value={item[sub.key]}
                      path={[...path, index, sub.key]}
                      onChange={onChange}
                    />
                  ))}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── app ───────────────────────────────────────────────────────────────── */

export function AdminApp({ initial }: { initial: Record<string, Json> }) {
  const [data, setData] = useState<Record<string, Json>>(initial);
  const [activeFile, setActiveFile] = useState(sections[0].file);
  const [dirty, setDirty] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<{ kind: "idle" | "saving" | "ok" | "error"; text: string }>({
    kind: "idle",
    text: "",
  });

  const section = useMemo(
    () => sections.find((item) => item.file === activeFile) as Section,
    [activeFile],
  );

  const sectionValue = useMemo(() => {
    const value = data[section.file];
    return section.arrayRoot ? { root: value } : value;
  }, [data, section]);

  const handleChange = useCallback(
    (path: Path, next: Json) => {
      setData((current) => {
        const file = path[0] as string;
        return { ...current, [file]: setIn(current[file], path.slice(1), next) };
      });
      setDirty((current) => ({ ...current, [section.file]: true }));
      setStatus({ kind: "idle", text: "" });
    },
    [section.file],
  );

  // The array-root files are edited through a synthetic `root` key.
  const changeInSection = useCallback(
    (path: Path, next: Json) => {
      if (section.arrayRoot) {
        const [, ...rest] = path; // strip the synthetic "root"
        handleChange([section.file, ...rest], next);
      } else {
        handleChange(path, next);
      }
    },
    [handleChange, section],
  );

  const save = useCallback(
    async (file: string) => {
      setStatus({ kind: "saving", text: "Saqlanmoqda…" });
      try {
        const response = await fetch("/api/admin/content", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ file, data: clean(data[file]) }),
        });
        if (!response.ok) {
          const detail = await response.text();
          throw new Error(detail || `HTTP ${response.status}`);
        }
        setDirty((current) => ({ ...current, [file]: false }));
        setStatus({ kind: "ok", text: "Saqlandi ✓ sayt avtomatik yangilanadi" });
      } catch (error) {
        setStatus({ kind: "error", text: `Xatolik: ${(error as Error).message}` });
      }
    },
    [data],
  );

  const dirtyCount = Object.values(dirty).filter(Boolean).length;

  useEffect(() => {
    const handler = (event: BeforeUnloadEvent) => {
      if (dirtyCount > 0) event.preventDefault();
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [dirtyCount]);

  return (
    <div className="min-h-screen bg-void">
      <header className="sticky top-0 z-20 border-b border-line bg-void/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1180px] flex-wrap items-center gap-4 px-5 py-3.5">
          <div className="flex items-center gap-2.5">
            <span className="size-1.5 rounded-full bg-acid" aria-hidden />
            <span className="font-mono text-[13px] tracking-[0.14em] text-fg">SAYT TAHRIRI</span>
          </div>
          <span className="text-[12px] text-dim">
            Lokal rejim — bu sahifa faqat sizning kompyuteringizda ochiladi
          </span>

          <div className="ml-auto flex items-center gap-3">
            {status.text ? (
              <span
                className={
                  status.kind === "error"
                    ? "text-[12.5px] text-danger"
                    : status.kind === "ok"
                      ? "text-[12.5px] text-acid"
                      : "text-[12.5px] text-dim"
                }
              >
                {status.text}
              </span>
            ) : null}
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-line px-3 py-2 text-[12.5px] text-muted transition-colors hover:text-fg"
            >
              Saytni ko&rsquo;rish ↗
            </a>
            <button
              type="button"
              onClick={() => save(section.file)}
              disabled={!dirty[section.file] || status.kind === "saving"}
              className="rounded-lg border border-acid bg-acid px-4 py-2 text-[12.5px] font-medium text-void transition-opacity disabled:opacity-35"
            >
              Saqlash
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1180px] gap-8 px-5 py-8 lg:grid-cols-[240px_1fr]">
        <nav aria-label="Bo'limlar">
          <ul className="space-y-1 lg:sticky lg:top-24">
            {sections.map((item) => {
              const active = item.file === activeFile;
              return (
                <li key={item.file}>
                  <button
                    type="button"
                    onClick={() => setActiveFile(item.file)}
                    className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-[13.5px] transition-colors ${
                      active ? "bg-surface text-fg" : "text-muted hover:bg-surface/60 hover:text-fg"
                    }`}
                  >
                    <span
                      className={`size-1.5 rounded-full ${
                        dirty[item.file] ? "bg-warn" : active ? "bg-acid" : "bg-line"
                      }`}
                      aria-hidden
                    />
                    {item.title}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <main>
          <h1 className="text-[22px] font-semibold tracking-tight text-fg">{section.title}</h1>
          <p className="mt-2 text-[13px] text-muted">{section.description}</p>

          <div className="mt-7 space-y-6">
            {section.fields.map((field) => (
              <FieldControl
                key={field.key}
                field={field}
                value={getIn(sectionValue, [field.key])}
                path={[section.file, field.key]}
                onChange={changeInSection}
              />
            ))}
          </div>

          <div className="mt-10 flex items-center gap-3 border-t border-line pt-6">
            <button
              type="button"
              onClick={() => save(section.file)}
              disabled={!dirty[section.file] || status.kind === "saving"}
              className="rounded-lg border border-acid bg-acid px-4 py-2.5 text-[13px] font-medium text-void transition-opacity disabled:opacity-35"
            >
              Saqlash
            </button>
            <span className="text-[12px] text-dim">
              Fayl: <code className="font-mono">src/content/{section.file}.json</code>
              {" · "}eski nusxa <code className="font-mono">.backups/</code> ichida saqlanadi
            </span>
          </div>
        </main>
      </div>
    </div>
  );
}
