import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { checkQuota, recordUsage } from "@/lib/ai-quota";

type Action = "variants" | "recolor" | "upscale" | "extend-frames";

const API_URL = process.env.GEMINI_FREE_API_URL || "https://gemini-api.inspiredjinyao.com";
const API_KEY = process.env.GEMINI_FREE_API_KEY;

async function geminiImageToImage(imageBase64: string, prompt: string): Promise<string | null> {
  const res = await fetch(`${API_URL}/v1/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gemini-3-pro-image",
      messages: [{
        role: "user",
        content: [
          { type: "image_url", image_url: { url: `data:image/png;base64,${imageBase64}` } },
          { type: "text", text: prompt },
        ],
      }],
    }),
  });

  if (!res.ok) throw new Error(await res.text());

  const json = await res.json();
  const text = json.choices?.[0]?.message?.content || "";

  // Extract image URL from markdown ![...](...) in response
  const match = text.match(/!\[.*?\]\((.*?)\)/);
  if (!match) return null;

  // Fetch the proxy image and convert to base64
  const imgRes = await fetch(match[1]);
  if (!imgRes.ok) return null;
  const buf = await imgRes.arrayBuffer();
  return Buffer.from(buf).toString("base64");
}

export async function POST(req: NextRequest) {
  try {
    const { action, imageBase64, prompt, count } = await req.json() as {
      action: Action;
      imageBase64: string;
      prompt?: string;
      count?: number;
    };

    if (!action || !imageBase64) {
      return NextResponse.json({ error: "action and imageBase64 required" }, { status: 400 });
    }

    if (!API_KEY) {
      return NextResponse.json({ error: "AI not configured" }, { status: 503 });
    }

    // Auth + quota
    const session = await auth();
    const userId = session?.user?.id;
    const tier = (session?.user as Record<string, unknown> | undefined)?.tier as string ?? "FREE";
    const frameCount = Math.min(count || 1, 8);

    if (userId) {
      const quota = await checkQuota(userId, tier);
      if (!quota.allowed) {
        return NextResponse.json({ error: `Daily limit reached (${quota.used}/${quota.limit})` }, { status: 429 });
      }
    }

    const raw = imageBase64.replace(/^data:image\/\w+;base64,/, "");
    const images: string[] = [];

    const promptMap: Record<string, string> = {
      variants: prompt || "Create a variation of this game sprite with a different pose, keep the same character and art style, transparent background",
      recolor: prompt || "Recolor this sprite with a completely different color palette, keep the same pose and shape, transparent background",
      upscale: "Upscale this image to higher resolution, preserve all details and pixel art style exactly, transparent background",
      "extend-frames": prompt || "Create the next animation frame for this game sprite, maintain consistent style and character, transparent background",
    };

    const iterations = action === "extend-frames" ? frameCount
      : action === "variants" ? Math.min(count || 3, 4)
      : 1;

    for (let i = 0; i < iterations; i++) {
      const p = action === "extend-frames"
        ? `${promptMap[action]}, frame ${i + 1} of ${frameCount}`
        : promptMap[action];

      const b64 = await geminiImageToImage(raw, p);
      if (!b64) {
        return NextResponse.json({ error: "AI failed to generate image" }, { status: 502 });
      }
      images.push(`data:image/png;base64,${b64}`);
    }

    if (userId) {
      await recordUsage(userId, images.length);
    }

    return NextResponse.json({ images });
  } catch (e) {
    console.error("AI transform error:", e);
    return NextResponse.json({ error: "Transform failed" }, { status: 500 });
  }
}
