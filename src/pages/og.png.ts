import type { APIRoute } from "astro";
import { generateOgImageForSite } from "@utils/generateOgImages";

export const GET: APIRoute = async () => {
  const pngBytes = await generateOgImageForSite();
  const body = new Uint8Array(pngBytes).buffer;
  return new Response(body, {
    headers: { "Content-Type": "image/png" },
  });
};
