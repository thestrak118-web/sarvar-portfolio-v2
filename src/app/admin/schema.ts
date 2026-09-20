/**
 * Uzbek-language description of every editable content file.
 * The admin form is generated from this — adding a field here is enough.
 */

export type Field =
  | { key: string; label: string; type: "text"; hint?: string; placeholder?: string; wide?: boolean }
  | { key: string; label: string; type: "textarea"; rows?: number; hint?: string }
  | { key: string; label: string; type: "number"; hint?: string }
  | { key: string; label: string; type: "boolean"; hint?: string }
  | { key: string; label: string; type: "select"; options: string[]; hint?: string }
  | { key: string; label: string; type: "strings"; hint?: string }
  | { key: string; label: string; type: "image"; hint?: string }
  | {
      key: string;
      label: string;
      type: "objects";
      addLabel: string;
      titleKey: string;
      fields: Field[];
      hint?: string;
      /** Items cannot be added or removed (fixed-length lists such as report phases). */
      fixed?: boolean;
    };

export type Section = {
  file: string;
  title: string;
  description: string;
  /** The JSON file is an array at its root (edited as one object list). */
  arrayRoot?: boolean;
  fields: Field[];
};

const keyValueFields: Field[] = [
  { key: "key", label: "Nomi", type: "text" },
  { key: "value", label: "Qiymati", type: "text" },
];

export const sections: Section[] = [
  {
    file: "case-studies", title: "V2 case studylar", description: "Tanlangan loyihalar, dalil manbalari va yakuniy holat. Faqat tekshirilgan faktlarni kiriting.",
    fields: [{ key: "items", label: "Loyihalar", type: "objects", titleKey: "title", addLabel: "Loyiha qo'shish", fields: [
      { key: "slug", label: "URL nomi", type: "text" },
      { key: "title", label: "Sarlavha", type: "text" },
      { key: "category", label: "Yo'nalish", type: "select", options: ["Production", "Tooling", "Lab", "Reporting"] },
      { key: "role", label: "Rol", type: "text" },
      { key: "period", label: "Davr", type: "text" },
      { key: "challenge", label: "Vazifa", type: "textarea" },
      { key: "result", label: "Asosiy natija", type: "text" },
      { key: "summary", label: "Qisqa xulosa", type: "textarea" },
      { key: "technologies", label: "Texnologiyalar", type: "strings" },
      { key: "flow", label: "Jarayon bosqichlari", type: "strings" },
      { key: "finding", label: "Asosiy topilma", type: "textarea" },
      { key: "impact", label: "Ta'sir", type: "textarea" },
      { key: "evidenceLabel", label: "Dalilning manbasi", type: "text" },
      { key: "evidence", label: "Ochiq dalil qatorlari", type: "strings" },
      { key: "remediation", label: "Tuzatish yoki arxitektura", type: "strings" },
      { key: "outcome", label: "Yakuniy holat", type: "textarea" },
      { key: "cvss", label: "CVSS", type: "text" },
      { key: "github", label: "GitHub URL", type: "text" },
      { key: "review", label: "Material tayyorlanmoqda", type: "boolean" },
    ] }],
  },
  {
    file: "layout",
    title: "Sahifa tuzilishi",
    description:
      "Har bir bo'lim uchun: bosh sahifada chiqsinmi (home), alohida sahifa bo'lsinmi (page), yoki umuman ko'rsatilmasinmi (off). ↑↓ bilan tartibini o'zgartirasiz — bosh sahifadagi tartib ham, menyudagi tartib ham shundan olinadi.",
    fields: [
      {
        key: "sections",
        label: "Bo'limlar",
        type: "objects",
        addLabel: "",
        titleKey: "label",
        fixed: true,
        fields: [
          { key: "label", label: "Nomi (faqat shu panel uchun)", type: "text" },
          {
            key: "place",
            label: "Qayerda ko'rinsin",
            type: "select",
            options: ["home", "page", "off"],
            hint: "home = bosh sahifada · page = alohida sahifa · off = ko'rsatilmaydi",
          },
          { key: "nav", label: "Menyudagi nomi", type: "text", hint: "Bo'sh bo'lsa menyuga chiqmaydi" },
        ],
      },
    ],
  },
  {
    file: "profile",
    title: "Shaxsiy ma'lumot",
    description: "Ism, lavozim, sarlavha, bio, metrikalar va statistika.",
    fields: [
      { key: "name", label: "To'liq ism", type: "text" },
      { key: "shortName", label: "Logotip matni", type: "text", hint: "Yuqori chap burchakdagi qisqa nom" },
      { key: "role", label: "Lavozim", type: "text" },
      { key: "roleLine", label: "Lavozim qatori", type: "text", hint: "Masalan: Penetration Tester / Cybersecurity" },
      { key: "location", label: "Joylashuv", type: "text" },
      {
        key: "photo",
        label: "Suratingiz",
        type: "image",
        hint: "About bo'limida chiqadi. Bo'sh qoldirsangiz surat umuman ko'rsatilmaydi.",
      },
      { key: "availability", label: "Holat matni", type: "text", hint: "Hero'dagi yashil belgidagi yozuv" },
      { key: "available", label: "Ish takliflariga ochiqman", type: "boolean" },
      { key: "experience", label: "Tajriba", type: "text" },
      { key: "certification", label: "Sertifikatlar qatori", type: "text" },
      { key: "machines", label: "Mashinalar soni", type: "text" },
      { key: "securityProjects", label: "Loyihalar soni", type: "text" },
      { key: "headlineLine1", label: "Bosh sarlavha — 1-qator", type: "text" },
      { key: "headlineLine2", label: "Bosh sarlavha — 2-qator", type: "text" },
      { key: "intro", label: "Qisqa tavsif", type: "textarea", rows: 3 },
      {
        key: "bio",
        label: "Bio (har bir xatboshi alohida qatorda)",
        type: "strings",
        hint: "About bo'limidagi matn. Bo'sh qator bilan ajratmang — har bir xatboshi bitta qator.",
      },
      {
        key: "spec",
        label: "Texnik kartochka qatorlari",
        type: "objects",
        addLabel: "Qator qo'shish",
        titleKey: "key",
        fields: keyValueFields,
      },
      {
        key: "heroMetrics",
        label: "Hero metrikalari",
        type: "objects",
        addLabel: "Metrika qo'shish",
        titleKey: "value",
        fields: [
          { key: "value", label: "Katta matn", type: "text" },
          { key: "href", label: "Havola", type: "text", hint: "Masalan: /skills — bo'sh bo'lsa bosilmaydi" },
          { key: "hint", label: "Yuqoridagi kichik yozuv", type: "text" },
          { key: "label", label: "Yonidagi izoh", type: "text" },
        ],
      },
      {
        key: "statistics",
        label: "Statistika bo'limi",
        type: "objects",
        addLabel: "Statistika qo'shish",
        titleKey: "label",
        fields: [
          { key: "value", label: "Raqam", type: "number" },
          { key: "suffix", label: "Qo'shimcha belgi", type: "text", hint: "Masalan: +" },
          { key: "label", label: "Sarlavha", type: "text" },
          { key: "detail", label: "Izoh", type: "text" },
        ],
      },
    ],
  },
  {
    file: "links",
    title: "Havolalar",
    description: "Bo'sh qoldirilgan havola saytda 'not set' bo'lib ko'rinadi — noto'g'ri havola chiqmaydi.",
    fields: [
      { key: "github", label: "GitHub profil URL", type: "text", placeholder: "https://github.com/..." },
      { key: "linkedin", label: "LinkedIn profil URL", type: "text", placeholder: "https://www.linkedin.com/in/..." },
      { key: "email", label: "Email", type: "text", hint: "mailto: avtomatik qo'shiladi", placeholder: "ism@example.com" },
      { key: "htb", label: "Hack The Box profil URL", type: "text", placeholder: "https://app.hackthebox.com/users/..." },
      { key: "telegram", label: "Telegram profil URL", type: "text", placeholder: "https://t.me/username" },
      { key: "cv", label: "CV (PDF) havolasi", type: "text", hint: "public/ ichidagi yo'l yoki tashqi URL", placeholder: "/cv/Sarvar_Tolipov_CV.pdf" },
    ],
  },
  {
    file: "experience",
    title: "Ish tajribasi",
    description: "Kompaniya nomi, sanalar va ish yo'nalishlari.",
    fields: [
      { key: "note", label: "NDA izohi", type: "textarea", rows: 2 },
      {
        key: "engagements",
        label: "Ish joylari",
        type: "objects",
        addLabel: "Ish joyi qo'shish",
        titleKey: "role",
        fields: [
          { key: "organisation", label: "Kompaniya / tashkilot", type: "text" },
          { key: "organisationPending", label: "Kompaniya nomi hali yo'q (placeholder)", type: "boolean" },
          { key: "role", label: "Lavozim", type: "text" },
          { key: "period", label: "Davr", type: "text", hint: "Masalan: Feb 2026 — Aug 2026" },
          { key: "periodPending", label: "Sanalar hali yo'q (placeholder)", type: "boolean" },
          { key: "mode", label: "Davomiylik qatori", type: "text" },
          { key: "confidential", label: "NDA belgisi ko'rsatilsin", type: "boolean" },
          { key: "summary", label: "Umumiy tavsif", type: "textarea", rows: 4 },
          { key: "tags", label: "Teglar", type: "strings", hint: "Har biri alohida qatorda: Web, API, Cloud, QA..." },
          {
            key: "areas",
            label: "Ish yo'nalishlari",
            type: "objects",
            addLabel: "Yo'nalish qo'shish",
            titleKey: "title",
            fields: [
              { key: "title", label: "Sarlavha", type: "text" },
              { key: "detail", label: "Tavsif", type: "textarea", rows: 3 },
            ],
          },
        ],
      },
    ],
  },
  {
    file: "projects",
    title: "Loyihalar (case study)",
    description: "Har bir mashina va uning 8 bosqichli hisoboti. Bosqich matnini yozsangiz, placeholder o'rniga chiqadi.",
    fields: [
      { key: "note", label: "Bo'lim izohi", type: "textarea", rows: 3 },
      {
        key: "items",
        label: "Mashinalar",
        type: "objects",
        addLabel: "Mashina qo'shish",
        titleKey: "title",
        fields: [
          { key: "slug", label: "URL nomi (slug)", type: "text", hint: "/work/<slug> — faqat lotin harflari va tire" },
          { key: "index", label: "Tartib raqami", type: "text" },
          { key: "title", label: "Nomi", type: "text" },
          { key: "codename", label: "Mashina kod nomi", type: "text", hint: "Bo'sh bo'lsa '[ withheld ]' chiqadi" },
          { key: "category", label: "Turkum", type: "text" },
          { key: "targetType", label: "Nishon turi", type: "text" },
          { key: "summary", label: "Qisqa tavsif", type: "textarea", rows: 4 },
          { key: "cover", label: "Karta rasmi", type: "image", hint: "Loyihalar bo'limidagi kartaning tepasida chiqadi" },
          { key: "tags", label: "Teglar", type: "strings", hint: "Har biri alohida qatorda: WEB, LINUX, PRIVESC..." },
          {
            key: "severity",
            label: "Xavflilik darajasi",
            type: "select",
            options: ["unrated", "low", "medium", "high", "critical"],
          },
          {
            key: "status",
            label: "Holati",
            type: "select",
            options: ["Chop etilgan", "Yuborilgan — ko'rikda", "Ishlanmoqda", "Rejada"],
          },
          { key: "difficulty", label: "Qiyinlik", type: "text" },
          { key: "cvss", label: "CVSS ball", type: "text", hint: "Bo'sh bo'lsa '[ not scored ]'" },
          { key: "cwe", label: "CWE", type: "text" },
          { key: "tools", label: "Ishlatilgan vositalar", type: "strings" },
          { key: "vulnerabilities", label: "Zaiflik sinflari", type: "strings" },
          { key: "reportUrl", label: "Walkthrough havolasi", type: "text" },
          { key: "githubUrl", label: "GitHub havolasi", type: "text" },
          {
            key: "mitre",
            label: "MITRE ATT&CK texnikalari",
            type: "objects",
            addLabel: "Texnika qo'shish",
            titleKey: "id",
            fields: [
              { key: "id", label: "ID", type: "text", hint: "Masalan: T1190" },
              { key: "name", label: "Texnika nomi", type: "text" },
              { key: "tactic", label: "Taktika", type: "text" },
            ],
          },
          {
            key: "chapters",
            label: "Hisobot bosqichlari",
            type: "objects",
            addLabel: "Bosqich qo'shish",
            titleKey: "title",
            fields: [
              { key: "no", label: "Raqam", type: "text" },
              { key: "title", label: "Bosqich nomi", type: "text" },
              { key: "objective", label: "Metodika (umumiy)", type: "textarea", rows: 3 },
              {
                key: "content",
                label: "Shu mashina bo'yicha matn",
                type: "textarea",
                rows: 5,
                hint: "Bo'sh bo'lsa 'findings pending' placeholder chiqadi",
              },
              { key: "points", label: "Qisqa punktlar", type: "strings" },
            ],
          },
          {
            key: "screenshots",
            label: "Skrinshotlar",
            type: "objects",
            addLabel: "Skrinshot qo'shish",
            titleKey: "caption",
            fields: [
              { key: "caption", label: "Izoh", type: "text" },
              { key: "src", label: "Rasm", type: "image" },
            ],
          },
        ],
      },
    ],
  },
  {
    file: "skills",
    title: "Ko'nikmalar",
    description:
      "Security stack: yo'nalishlar, ularning capability'lari va har birining tool badge'lari; pastda methodology bosqichlari.",
    fields: [
      { key: "title", label: "Sarlavha", type: "text" },
      { key: "subtitle", label: "Tavsif", type: "textarea", rows: 2 },
      {
        key: "categories",
        label: "Yo'nalishlar",
        type: "objects",
        addLabel: "Yo'nalish qo'shish",
        titleKey: "name",
        fields: [
          { key: "id", label: "ID", type: "text" },
          { key: "name", label: "Nomi", type: "text" },
          { key: "code", label: "Kodi", type: "text", hint: "Masalan: WEB-SEC" },
          { key: "caption", label: "Izoh", type: "textarea", rows: 2 },
          {
            key: "capabilities",
            label: "Capability'lar",
            type: "objects",
            addLabel: "Capability qo'shish",
            titleKey: "name",
            fields: [
              { key: "name", label: "Nomi", type: "text" },
              { key: "tools", label: "Tool va texnikalar", type: "strings" },
            ],
          },
        ],
      },
      { key: "methodology.title", label: "Methodology sarlavhasi", type: "text" },
      { key: "methodology.caption", label: "Methodology izohi", type: "textarea", rows: 2 },
      {
        key: "methodology.steps",
        label: "Methodology bosqichlari",
        type: "objects",
        addLabel: "Bosqich qo'shish",
        titleKey: "name",
        fields: [
          { key: "name", label: "Nomi", type: "text" },
          { key: "detail", label: "Izoh", type: "text" },
        ],
      },
    ],
  },
  {
    file: "certifications",
    title: "Sertifikatlar",
    description: "Olingan sertifikatlar va reja. 'Currently pursuing' faqat belgilansa chiqadi.",
    fields: [
      {
        key: "earned",
        label: "Olingan sertifikatlar",
        type: "objects",
        addLabel: "Sertifikat qo'shish",
        titleKey: "abbr",
        fields: [
          { key: "abbr", label: "Qisqartma", type: "text" },
          { key: "name", label: "To'liq nomi", type: "text" },
          { key: "issuer", label: "Bergan tashkilot", type: "text" },
          { key: "earned", label: "Olingan sana", type: "text", hint: "Masalan: 27 August 2026" },
          { key: "credentialId", label: "Credential ID", type: "text" },
          { key: "verifyUrl", label: "Tekshirish havolasi", type: "text" },
          { key: "summary", label: "Tavsif", type: "textarea", rows: 4 },
          { key: "domains", label: "Mavzular", type: "strings" },
        ],
      },
      {
        key: "roadmap",
        label: "Rejadagi sertifikatlar",
        type: "objects",
        addLabel: "Reja qo'shish",
        titleKey: "abbr",
        fields: [
          { key: "abbr", label: "Qisqartma", type: "text" },
          { key: "name", label: "To'liq nomi", type: "text" },
          { key: "issuer", label: "Bergan tashkilot", type: "text" },
          { key: "pursuing", label: "Hozir tayyorlanyapman", type: "boolean" },
        ],
      },
    ],
  },
  {
    file: "research",
    title: "Tadqiqot",
    description: "Research bo'limidagi yo'nalishlar va maqolalar.",
    arrayRoot: true,
    fields: [
      {
        key: "root",
        label: "Yo'nalishlar",
        type: "objects",
        addLabel: "Yo'nalish qo'shish",
        titleKey: "title",
        fields: [
          { key: "id", label: "ID", type: "text" },
          { key: "code", label: "Kodi", type: "text" },
          { key: "title", label: "Nomi", type: "text" },
          { key: "focus", label: "Yo'nalish", type: "text" },
          { key: "description", label: "Tavsif", type: "textarea", rows: 3 },
          {
            key: "articles",
            label: "Maqolalar",
            type: "objects",
            addLabel: "Maqola qo'shish",
            titleKey: "title",
            fields: [
              { key: "title", label: "Sarlavha", type: "text" },
              { key: "url", label: "Havola", type: "text" },
              { key: "date", label: "Sana", type: "text" },
            ],
          },
        ],
      },
    ],
  },
  {
    file: "github",
    title: "GitHub repolari",
    description: "Presence bo'limida ko'rinadigan repolar.",
    fields: [
      { key: "user", label: "GitHub username", type: "text" },
      {
        key: "repos",
        label: "Repolar",
        type: "objects",
        addLabel: "Repo qo'shish",
        titleKey: "name",
        fields: [
          { key: "name", label: "Nomi", type: "text" },
          { key: "description", label: "Tavsif", type: "textarea", rows: 2 },
          { key: "language", label: "Til", type: "text" },
          { key: "tag", label: "Teg", type: "text" },
          { key: "url", label: "Havola", type: "text" },
          { key: "featured", label: "Kattaroq ko'rsatilsin", type: "boolean" },
        ],
      },
    ],
  },
];
