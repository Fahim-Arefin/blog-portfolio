import assert from "node:assert/strict";
import { test } from "node:test";
import sharp from "sharp";
import { testimonialSchema } from "../src/lib/validation/testimonial";
import { validatePortrait, PortraitValidationError } from "../src/lib/testimonials/portrait.server";
import { submitTestimonial } from "../src/lib/actions/testimonials/submit-testimonial";
import type { TestimonialFormState } from "../src/lib/testimonials/types";

const valid = { name: "Preview Person", email: "preview@example.com", organization: "Designer at Example Studio", rating: "4", story: "The collaboration was thoughtful, clear, and useful from start to finish.", consent: "on" };
const initial: TestimonialFormState = { status: "idle", message: "", errors: {} };
function data(values: Record<string, string> = valid) {
  const form = new FormData();
  for (const [key, value] of Object.entries(values)) form.set(key, value);
  return form;
}

test("valid testimonials are trimmed and ratings are normalized", () => {
  const value = testimonialSchema.parse({ ...valid, name: "  Preview Person  " });
  assert.equal(value.name, valid.name);
  assert.equal(value.rating, 4);
});

test("server schema rejects missing consent, invalid email, out-of-range ratings and oversized text", () => {
  for (const override of [{ consent: "" }, { email: "invalid" }, { rating: "0" }, { rating: "6" }, { rating: "2.5" }, { story: "short" }, { story: "a".repeat(3001) }, { name: " " }, { organization: " " }]) {
    assert.equal(testimonialSchema.safeParse({ ...valid, ...override }).success, false);
  }
});

test("portrait is optional, but files larger than 1 MB are rejected before decoding", async () => {
  assert.equal(await validatePortrait(null), null);
  assert.equal(await validatePortrait(new File([], "")), null);
  assert.equal(await validatePortrait(new File([], "undefined", { type: "application/octet-stream" })), null);
  await assert.rejects(validatePortrait(new File([new Uint8Array(1_000_001)], "portrait.jpg", { type: "image/jpeg" })), /1 MB/);
});

test("portrait validation rejects corrupt bytes, forged MIME types, and non-image values", async () => {
  await assert.rejects(validatePortrait("forged"), PortraitValidationError);
  await assert.rejects(validatePortrait(new File(["not an image"], "portrait.jpg", { type: "image/jpeg" })), PortraitValidationError);
  const png = await sharp({ create: { width: 16, height: 16, channels: 3, background: "blue" } }).png().toBuffer();
  await assert.rejects(validatePortrait(new File([new Uint8Array(png)], "forged.jpg", { type: "image/jpeg" })), PortraitValidationError);
  await assert.rejects(validatePortrait(new File(["<svg/>"], "portrait.svg", { type: "image/svg+xml" })), /JPEG, PNG, or WebP/);
});

test("valid portrait is decoded and normalized to a small 512px square without metadata", async () => {
  const png = await sharp({ create: { width: 300, height: 200, channels: 3, background: "blue" } }).png().toBuffer();
  const portrait = await validatePortrait(new File([new Uint8Array(png)], "portrait.png", { type: "image/png" }));
  assert.ok(portrait);
  const metadata = await sharp(portrait.buffer).metadata();
  assert.equal(metadata.width, 512);
  assert.equal(metadata.height, 512);
  assert.equal(metadata.format, "webp");
  assert.equal(metadata.exif, undefined);
  assert.ok(portrait.size < 1_000_000);
});

test("oversized decoded images cannot bypass the pixel limit with a small compressed file", async () => {
  const png = await sharp({ create: { width: 4001, height: 4001, channels: 3, background: "blue" } }).png().toBuffer();
  assert.ok(png.length < 1_000_000);
  await assert.rejects(validatePortrait(new File([new Uint8Array(png)], "large.png", { type: "image/png" })), PortraitValidationError);
});

test("Server Action returns field errors for tampered requests without logging a submission", async (t) => {
  const log = t.mock.method(console, "info", () => {});
  const result = await submitTestimonial(initial, data({ ...valid, email: "bad", consent: "" }));
  assert.equal(result.status, "error");
  assert.ok(result.errors.email);
  assert.ok(result.errors.consent);
  assert.equal(log.mock.callCount(), 0);
});

test("Server Action logs validated fields and portrait metadata, never image bytes", async (t) => {
  const log = t.mock.method(console, "info", () => {});
  const form = data();
  const png = await sharp({ create: { width: 16, height: 16, channels: 3, background: "blue" } }).png().toBuffer();
  form.set("portrait", new File([new Uint8Array(png)], "portrait.png", { type: "image/png" }));
  const result = await submitTestimonial(initial, form);
  assert.equal(result.status, "success");
  assert.equal(log.mock.callCount(), 1);
  const payload = log.mock.calls[0].arguments[1] as { rating: number; consent: boolean; portrait: Record<string, unknown> };
  assert.equal(payload.rating, 4);
  assert.equal(payload.consent, true);
  assert.equal(payload.portrait.width, 512);
  assert.equal("buffer" in payload.portrait, false);
});

test("Server Action returns a safe recoverable message if submission processing fails", async (t) => {
  t.mock.method(console, "info", () => { throw new Error("Private internal error"); });
  const result = await submitTestimonial(initial, data());
  assert.equal(result.status, "error");
  assert.equal(result.message.includes("Private internal error"), false);
  assert.match(result.message, /try again/);
});
