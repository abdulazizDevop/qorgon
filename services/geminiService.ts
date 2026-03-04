
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult } from "../types";

const SYSTEM_INSTRUCTION = `Siz Ko'rg'on Ai platformasining bosh agronom va o'simlik patologi mutaxassisiz.
Vazifangiz: Yuklangan tasvirni tahlil qilish.

MUHIM: Birinchi navbatda rasmda O'SIMLIK bor yoki yo'qligini aniqlang.
- Agar rasm o'simlik, barg, meva, ekin yoki o'simlikka aloqador bo'lmasa: status = "NotPlant", plant = "O'simlik emas", disease_name = "Rasm o'simlik emas", confidence = "0%", risk_level = "Low", symptoms = [], treatment = [], prevention = [] qaytaring.
- Agar rasmda o'simlik bo'lsa:

1. O'simlik turi (masalan: Pomidor, G'o'za, Bug'doy).
2. Sog'liq holati: "Healthy" (Sog'lom) yoki "Diseased" (Kasallangan).
3. Agar kasallik bo'lsa, uning aniq ilmiy va mahalliy nomini ayting.
4. Kasallik xavf darajasini belgilang: "Low" (Past), "Medium" (O'rtacha), "High" (Yuqori).
5. Aniqlik darajasini foizda ko'rsating.
6. Bargdagi ko'rinib turgan simptomlarni sanab o'ting.
7. Davolash uchun aniq agrotexnik va kimyoviy tavsiyalarni bering.
8. Kelajakda bu kasallikning oldini olish choralarini ko'rsating.

Javobni FAQAT o'zbek tilida va belgilangan JSON formatida qaytaring.`;

export const analyzePlantImage = async (base64Image: string): Promise<AnalysisResult> => {
  // Muhitdan API kalitini olish (Netlify/Vercel/Local)
  const apiKey = process.env.API_KEY || (window as any).process?.env?.API_KEY;

  if (!apiKey || apiKey === "undefined" || apiKey === "") {
    throw new Error("API kaliti topilmadi. Iltimos, Netlify panelida (Site Settings > Environment Variables) API_KEY o'zgaruvchisini qo'shing va saytni qayta 'Deploy' qiling.");
  }

  const ai = new GoogleGenAI({ apiKey });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: base64Image,
            },
          },
          {
            text: "Ushbu o'simlik bargini professional agronom sifatida tahlil qil va tashxis qo'y.",
          },
        ],
      },
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            plant: { type: Type.STRING },
            status: { type: Type.STRING },
            disease_name: { type: Type.STRING },
            confidence: { type: Type.STRING },
            symptoms: { type: Type.ARRAY, items: { type: Type.STRING } },
            treatment: { type: Type.ARRAY, items: { type: Type.STRING } },
            prevention: { type: Type.ARRAY, items: { type: Type.STRING } },
            risk_level: { type: Type.STRING }
          },
          required: ["plant", "status", "disease_name", "confidence", "symptoms", "treatment", "prevention", "risk_level"],
        },
      },
    });

    const text = response.text;
    if (!text) throw new Error("AI tahlil natijasini qaytara olmadi.");
    
    return JSON.parse(text) as AnalysisResult;
  } catch (error: any) {
    console.error("Ko'rg'on Ai Error:", error);
    if (error.message?.includes("API Key")) {
      throw new Error("API kaliti xato yoki amal qilish muddati tugagan.");
    }
    throw new Error(error.message || "Tahlil jarayonida xatolik yuz berdi.");
  }
};
