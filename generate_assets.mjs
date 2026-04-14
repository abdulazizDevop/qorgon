// Generate founder portrait and favicon via Gemini image generation
// Uses gemini-2.5-flash-image-preview model
// Reads GEMINI_API_KEY from .env

import { GoogleGenAI } from "@google/genai";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load .env
async function loadEnv() {
  try {
    const txt = await fs.readFile(path.join(__dirname, ".env"), "utf8");
    for (const line of txt.split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.+?)\s*$/);
      if (m) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
    }
  } catch (e) {
    console.warn("Could not read .env:", e.message);
  }
}

await loadEnv();

const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
if (!apiKey) {
  console.error("ERROR: GEMINI_API_KEY not found in .env");
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey });
const MODEL = "gemini-3.1-flash-image-preview";

const targets = [
  {
    outPath: path.join(__dirname, "public", "team", "abdulaziz.jpg"),
    prompt:
      "Professional headshot portrait of a young Uzbek man named Abdulaziz, age around 25-30, " +
      "short dark hair, clean modern look, wearing a smart casual emerald green or white shirt, " +
      "warm friendly smile, soft natural lighting, shallow depth of field, neutral light background, " +
      "high quality corporate photography style, suitable for a tech startup founder bio. " +
      "Square aspect ratio, centered face.",
  },
  {
    outPath: path.join(__dirname, "public", "favicon.png"),
    prompt:
      "Minimalist flat icon for an agriculture AI app called 'Korgon AI'. " +
      "A stylized green leaf shape combined with a subtle digital/circuit element, " +
      "emerald and teal gradient on white background, " +
      "centered, simple geometric shapes, app icon style, no text, " +
      "rounded square format, suitable for use as a favicon. " +
      "Modern, clean, professional.",
  },
];

async function generateImage(prompt) {
  const response = await ai.models.generateContent({
    model: MODEL,
    contents: prompt,
  });
  const parts = response?.candidates?.[0]?.content?.parts ?? [];
  for (const part of parts) {
    const data = part?.inlineData?.data ?? part?.inline_data?.data;
    if (data) return data;
  }
  throw new Error("No image data returned: " + JSON.stringify(response, null, 2).slice(0, 600));
}

for (const t of targets) {
  process.stdout.write(`Generating ${path.basename(t.outPath)}... `);
  try {
    const base64 = await generateImage(t.prompt);
    await fs.mkdir(path.dirname(t.outPath), { recursive: true });
    await fs.writeFile(t.outPath, Buffer.from(base64, "base64"));
    const stat = await fs.stat(t.outPath);
    console.log(`OK (${(stat.size / 1024).toFixed(1)} KB)`);
  } catch (err) {
    console.log("FAILED");
    console.error("  →", err.message);
  }
}
