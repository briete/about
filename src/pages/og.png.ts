import { generateOgImageForSite } from "@utils/generateOgImages";
import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  const pngBytes = await generateOgImageForSite();
  const body = new Uint8Array(pngBytes).buffer;
  return new Response(body, {
    headers: { "Content-Type": "image/png" },
  });
};
