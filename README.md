# Closet Companion

A closet app that builds outfits from the clothes you already own. Upload photos of your wardrobe, describe your day, and get up to three outfit ideas. It also suggests the one item to buy next to add the most new outfits.

**Live demo:** [add link after deploy]
**Demo video:** [add link after recording]

## The problem

Most people own clothes they rarely wear together, and they buy more without knowing what they already have. Closet Companion helps people use what they own and make smarter purchases.

## Features

- Upload clothing photos, with the background removed automatically
- Automatic tagging of type, color, pattern, and formality (you can correct any tag)
- Digital closet with filters
- Plan a look: describe your day in plain words and get 3 outfit suggestions
- Gap analysis: the one item that adds the most new outfits
- Save and rate outfits

## Results

| Metric | Result |
|---|---|
| Tagging accuracy, color | [add after Phase 4] |
| Tagging accuracy, category | [add after Phase 4] |
| Outfit ranking quality (nDCG) | [add after Phase 6] |
| Request reading, keyword vs. LLM | [add after Phase 7] |
| Real user test (suggestions rated useful) | [add after Phase 10] |

## What didn't work

[Add real failure cases here, such as patterned or layered outfits, dark photos, and cluttered backgrounds, and what you changed.]

## Architecture

```
React (Vite) ──> Express API ──> PostgreSQL
                    │
                    ├──> Cloudinary (image storage)
                    └──> FastAPI ML service (rembg, CLIP)
```

## Tech stack

- Frontend: React, Vite, React Router
- Backend: Node.js, Express
- Database: PostgreSQL
- ML: Python, FastAPI, rembg, CLIP
- Hosting: Vercel (frontend), Render (backend)

## Run it locally

1. Clone the repo.
2. Copy `.env.example` to `.env` and fill in your values.
3. Start the backend: `cd server && npm install && npm run dev`
4. Start the frontend: `cd client && npm install && npm run dev`
5. (Phase 2 onward) Start the ML service: `cd ml-service && pip install -r requirements.txt && uvicorn main:app --reload`

## Future work

- Virtual try-on using a pose-based overlay
- Learned outfit compatibility model trained on user ratings

## Credits

Public datasets used: [add names and links]. Models: CLIP (OpenAI), rembg.

## License

MIT
