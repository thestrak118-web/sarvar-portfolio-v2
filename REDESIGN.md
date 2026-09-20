# Portfolio V2

Production: https://sarvar-portfoli.vercel.app

## Development

Use `npm ci`, then `npm run dev`. The existing local editor remains at `/admin` and is unavailable in production. `npm run build` uses the same webpack build verified before deployment.

Content remains in `src/content`. `case-studies.json` adds editable, evidence-focused project records. Original project URLs remain available; unfinished lab/reporting material is explicitly marked as in preparation. `layout.json` controls the homepage sections and navigation; standalone public routes remain available even when their section appears on the homepage. Contact is shared across all public pages.

The new UI lives in `src/components/portfolio` and `src/app/portfolio.css`. Shared identity, experience, certificates, social links, photographs and CV continue to use the existing content/assets. Copy is kept separate from styling, with Uzbek as the current language.

Inter and JetBrains Mono are self-hosted WOFF2 subsets. Their SIL Open Font Licenses are included in `public/fonts`; builds do not depend on Google Fonts availability.

## Evidence Sources

- Production findings and counts come from the existing ASOS IT experience records. The report previews are labelled summaries, not screenshots of confidential reports. No client identifiers, request payloads, endpoints or credentials were imported.
- The approximately four-hour to ninety-minute result is the existing personal enumeration observation, not a controlled recontool benchmark.
- The CLI excerpt was checked against the local `recontool --help` output. No external target was scanned.
- The JSON download is labelled as a format example derived from recontool's public data model, not an actual scan result.
- HAAD Red-0 has an existing certificate image. Completed courses with pending exams and ongoing studies are displayed separately. No unearned credential is presented as obtained.
- Project-specific remediation remains a recommendation where implementation and retest evidence are not public.

## Verification

Run `npm run lint`, `npm run typecheck`, `npm run build`, then start the production server. `TEST_URL=http://127.0.0.1:4173 npm test` exercises all public routes at 375, 768 and 1440 pixels, mobile navigation, keyboard tabs, workflow controls, reduced motion, image decoding, canonical URLs, internal links, PDF contents and production admin guards.

The browser test uses Chromium at `/usr/bin/chromium` by default; set `CHROME_PATH` for another installation. `QA_OUTPUT` selects the screenshot/report directory. Lighthouse is a development dependency and can be run against the production server or deployment preview.

External LinkedIn automated requests may receive HTTP 999. Its original profile URL is preserved; Telegram and the public GitHub repository were checked successfully.

## Deployment

Push `redesign-v2` to the existing GitHub repository to create a Vercel preview. Verify the preview before merging into `main`. The existing Vercel project retains the production domain; no alternate hosting account is required.
