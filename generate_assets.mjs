// Generate plant disease sample images via Gemini for AI Skaner demo
// Saves to public/demo-samples/

import { GoogleGenAI } from "@google/genai";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function loadEnv() {
  const txt = await fs.readFile(path.join(__dirname, ".env"), "utf8");
  for (const line of txt.split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.+?)\s*$/);
    if (m) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}
await loadEnv();

const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
if (!apiKey) {
  console.error("ERROR: GEMINI_API_KEY not found");
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey });
const MODEL = "gemini-3.1-flash-image-preview";

const targets = [
  {
    outPath: path.join(__dirname, "public", "demo-samples", "potato-blight.jpg"),
    prompt:
      "Close-up photograph of a single potato plant leaf showing late blight disease " +
      "(Phytophthora infestans). Visible symptoms: dark brown to black irregular lesions " +
      "spreading from the leaf edges, water-soaked appearance, some yellowing around the spots, " +
      "white fuzzy growth on the underside. Outdoor field setting with natural daylight, " +
      "shallow depth of field, sharp focus on the diseased leaf, photographic realism, " +
      "agricultural documentation style, square composition.",
  },
  {
    outPath: path.join(__dirname, "public", "demo-samples", "grape-mildew.jpg"),
    prompt:
      "Close-up photograph of a grape vine leaf showing powdery mildew disease (Erysiphe necator / oidium). " +
      "Visible symptoms: distinctive white powdery fungal coating covering large patches of the leaf surface, " +
      "some chlorotic yellow spots, slightly curled leaf edges. " +
      "Vineyard setting with natural daylight, shallow depth of field, sharp focus, " +
      "photographic realism, agricultural documentation style, square composition.",
  },
  {
    outPath: path.join(__dirname, "public", "demo-samples", "healthy-leaf.jpg"),
    prompt:
      "Close-up photograph of a perfectly healthy bright green plant leaf, " +
      "vibrant deep green color with clear vein pattern, glossy surface with morning dew drops, " +
      "no spots, no discoloration, no damage. Natural outdoor lighting, " +
      "shallow depth of field with soft blurred green background, sharp crisp focus on the leaf, " +
      "photographic realism, agricultural documentation style, square composition.",
  },
  {
    outPath: path.join(__dirname, "public", "demo-samples", "apple-scab.jpg"),
    prompt:
      "Close-up photograph of an apple tree leaf showing apple scab disease (Venturia inaequalis). " +
      "Visible symptoms: olive-green to dark brown velvety spots scattered across the leaf surface, " +
      "some spots merging into larger patches, slight leaf distortion and yellowing around lesions. " +
      "Orchard setting with natural daylight, shallow depth of field, sharp focus on the diseased leaf, " +
      "photographic realism, agricultural documentation style, square composition.",
  },
];

async function generateImage(prompt) {
  const response = await ai.models.generateContent({
    model: MODEL,
    contents: prompt,
  });
  const parts = response?.candidates?.[0]?.content?.parts ?? [];
  for (const part of parts) {
    if (part?.inlineData?.data) return part.inlineData.data;
  }
  throw new Error("No image data returned: " + JSON.stringify(response).slice(0, 400));
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
