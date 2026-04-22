# Qorgon AI (AgroCheck Pro) - AI qishloq xo'jaligi platformasi

## Maqsad
AI yordamida ekinlarni tahlil qilish, kasalliklarni aniqlash va agro maslahat berish startup loyihasi. Pitch/tadbir uchun tayyorlangan.

## Tech Stack
- **Frontend:** React 19, TypeScript, Vite
- **AI:** Google Gemini API (@google/genai)
- **Map:** Leaflet + React-Leaflet (xarita integratsiyasi)
- **UI:** Lucide React, React Markdown
- **Deploy:** Hali sozlanmagan (statik build)

## Arxitektura
```
App.tsx              — Asosiy ilova
components/          — UI komponentlari
generate_assets.mjs  — Gemini bilan rasm/favicon generatsiya
dist/                — Production build
index.html           — Entry point
```

## Sahifalar
- **AI Skaner** — rasm yuklash va Gemini bilan tahlil
- **Agronom** — AI maslahat berish
- **Map** — Leaflet xarita
- **Statistika** — agro ma'lumotlar
- **Pricing** — tarif rejalari (subscription model)

## Muhim logika
- AI skaner: 3 marta bepul, keyin pricing sahifasiga yo'naltirish
- Gemini bilan rasm tahlili (o'simlik kasalligini aniqlash)
- Subscription model: O'zbekiston tirikchilik to'lov tizimlari
- Founder: Abdulaziz Olimov (LinkedIn profili ulangan)

## Oxirgi ishlar (2026-04)
- Tarif sahifasi yaratish
- AI skaner limit (3 marta bepul)
- Gemini bilan asset generatsiya
- UI mukammalashtirish
- Startup pitch uchun tayyorlash
