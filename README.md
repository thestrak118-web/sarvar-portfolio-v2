# Sarvar Tolipov — Penetration Tester Portfolio

Next.js 16 (App Router) · TypeScript · Tailwind v4 · Motion · React Three Fiber.

```bash
npm run dev      # sayt:  http://localhost:4173
npm run edit     # tahrir: http://localhost:4173/admin
npm run build    # production build
npm start        # production serverni ishga tushirish
npx tsc --noEmit # tiplarni tekshirish
npm run lint
```

## Saytni tahrirlash (o'zbekcha admin panel)

1. `npm run edit`
2. Brauzerda **http://localhost:4173/admin**
3. Chapdagi bo'limni tanlang → maydonlarni to'ldiring → **Saqlash**

Saqlanganda `src/content/*.json` fayllari yangilanadi va sayt darhol qayta
chiziladi (hot reload). Har bir saqlashdan oldin eski nusxa
`src/content/.backups/` ichiga yoziladi (git'ga tushmaydi).

**Muhim:** `/admin` sahifasi va `/api/admin/content` endpointi faqat `next dev`
rejimida ishlaydi. Production build'da ikkalasi ham 404 qaytaradi — deploy
qilingan saytda hech kim kontentni o'zgartira olmaydi.

Deploy qilish tartibi: admin panelda tahrirlash → `git commit` → push/deploy.

## Sahifa tuzilishi

Sayt ko'p sahifali. Har bir bo'lim uchun `src/content/layout.json` da (admin
panel → **Sahifa tuzilishi**) uch xil holat bor:

| Qiymat | Ma'nosi |
| --- | --- |
| `home` | bosh sahifada bo'lim sifatida chiqadi (menyuda anchor havola) |
| `page` | alohida sahifa bo'ladi, masalan `/skills` (menyuda oddiy havola) |
| `off` | umuman ko'rsatilmaydi, sahifasi 404 qaytaradi |

Hozirgi holat: bosh sahifada Work (3 ta karta) + Statistics + Contact;
alohida sahifalar `/experience`, `/skills`, `/certifications`, `/about`;
`/work` doim mavjud (barcha assessmentlar), har biri `/work/<slug>` case
study'siga olib boradi. Research va Presence o'chirilgan.

## Kontent fayllari

| Fayl | Nimani boshqaradi |
| --- | --- |
| `src/content/layout.json` | qaysi bo'lim qayerda: home / page / off, tartibi va menyu nomi |
| `src/content/profile.json` | ism, lavozim, bio, hero metrikalari, statistika, texnik kartochka |
| `src/content/links.json` | GitHub, LinkedIn, email, HTB havolalari |
| `src/content/experience.json` | ish tajribasi va 8 ta yo'nalish |
| `src/content/projects.json` | 5 ta mashina + har birining 8 bosqichli case study'si |
| `src/content/skills.json` | skill map klasterlari |
| `src/content/certifications.json` | olingan sertifikatlar va reja |
| `src/content/research.json` | tadqiqot yo'nalishlari va maqolalar |
| `src/content/github.json` | Presence bo'limidagi repolar |

Kod ichida hech qanday matn hardcode qilinmagan — barchasi shu JSON'lardan
o'qiladi (`src/data/*.ts` faqat tiplarni beradi).

### Qoida: to'qib chiqarilgan ma'lumot yo'q

Bo'sh qoldirilgan maydon saytda ochiq belgilangan placeholder bo'lib ko'rinadi
(`[ not provided ]`, `not set`, `findings pending`). Havola bo'sh bo'lsa, tugma
bosilmaydigan holatga tushadi — o'ylab topilgan URL hech qachon chiqmaydi.

### Case study to'ldirish

`projects.json` → kerakli mashina → `chapters` ichidagi bosqichning `content`
maydonini to'ldiring; `mitre`, `cvss`, `cwe`, `codename`, `reportUrl`,
`githubUrl` va `severity` ni ham o'sha yerda kiritasiz. Placeholderlar o'zi
yo'qoladi.

## Texnik eslatmalar

- 3D sahna faqat desktopda (≥900px, sichqoncha bilan) va viewport'ga
  kirgandan keyin, brauzer bo'sh vaqtida yuklanadi; mobil qurilmada statik
  fallback qoladi, `prefers-reduced-motion` da esa bitta statik kadr.
- Lighthouse (mobil, bosh sahifa): Performance 94 · Accessibility 100 · Best Practices 100 · SEO 100 · LCP 3.1s · 326 KB.
- Runtime'da tashqi so'rov yo'q; shriftlar build vaqtida yuklab olinadi.
