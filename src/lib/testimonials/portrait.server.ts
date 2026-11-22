import "server-only";
import sharp from "sharp";
import { MAX_PORTRAIT_BYTES, PORTRAIT_TYPES } from "./limits";

export class PortraitValidationError extends Error {}

export async function validatePortrait(value: FormDataEntryValue | null) {
  if (value === null || (value instanceof File && value.size === 0)) return null;
  if (!(value instanceof File)) throw new PortraitValidationError("Select a valid portrait image.");
  if (value.size > MAX_PORTRAIT_BYTES) throw new PortraitValidationError("Your portrait must be 1 MB or smaller.");
  if (!PORTRAIT_TYPES.includes(value.type as typeof PORTRAIT_TYPES[number])) throw new PortraitValidationError("Use a JPEG, PNG, or WebP image.");

  try {
    const buffer = Buffer.from(await value.arrayBuffer());
    const image = sharp(buffer, { limitInputPixels: 16_000_000, failOn: "warning", animated: true });
    const metadata = await image.metadata();
    const mimeByFormat: Record<string, string> = { jpeg: "image/jpeg", png: "image/png", webp: "image/webp" };
    const expectedMime = mimeByFormat[metadata.format ?? ""];
    if (!expectedMime || expectedMime !== value.type || (metadata.pages ?? 1) !== 1) throw new Error("Unsupported image");
    // Decode, crop, and re-encode the actual pixels, dropping embedded metadata.
    const portrait = await image.rotate().resize(512, 512, { fit: "cover" }).webp({ quality: 90 }).toBuffer();
    if (portrait.length > MAX_PORTRAIT_BYTES) throw new Error("Image is too large");
    return { buffer: portrait, type: "image/webp" as const, width: 512, height: 512, size: portrait.length };
  } catch {
    throw new PortraitValidationError("This image could not be read. Choose a valid, non-animated JPEG, PNG, or WebP image under 16 megapixels.");
  }
}
