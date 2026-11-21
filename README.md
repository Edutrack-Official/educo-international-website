# Educo International — website

Static Next.js site for Educo International, Thudiyalur, Coimbatore.

```
npm install
npm run dev      # http://localhost:3000
npm run build    # static site in ./out
```

All copy and contact details live in `lib/site.ts`. Deploys to Render as a static site via `render.yaml`.

## Confirm before launch (marked VERIFY in lib/site.ts)

- Domain (`site.url`)
- WhatsApp number (assumed 93638 31003)
- Opening hours and days (brief only says "closes 9 PM")
- Destination countries Educo actually serves
- Test formats (exam bodies change them, e.g. TOEFL in 2026)
- FAQ answers
