# CV manbasi

`rezyume.html` — CV'ning yagona manbasi. PDF shu fayldan generatsiya qilinadi:

```bash
weasyprint cv/rezyume.html public/cv/Sarvar_Tolipov_CV.pdf
```

Saytdagi "CV (PDF)" tugmasi `public/cv/Sarvar_Tolipov_CV.pdf` ga ishora qiladi —
qayta generatsiyadan keyin havola o'zgarmaydi.

Qoidalar:
- Bitta A4 sahifada turishi kerak — o'zgartirishdan keyin `pdfinfo` bilan tekshiring.
- Faqat Lato shrifti ishlatiladi (`pdffonts` da boshqa shrift chiqmasligi kerak).
- Mijoz nomlari, domenlar va IP manzillar CV'ga yozilmaydi.
