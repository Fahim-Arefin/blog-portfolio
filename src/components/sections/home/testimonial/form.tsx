"use client";

import dynamic from "next/dynamic";
import { useActionState, useEffect, useRef, useState } from "react";
import { submitTestimonial } from "@/lib/actions/testimonials/submit-testimonial";
import { MAX_PORTRAIT_BYTES, PORTRAIT_TYPES } from "@/lib/testimonials/limits";
import type { TestimonialField, TestimonialFormState } from "@/lib/testimonials/types";

const PortraitCropper = dynamic(() => import("./portrait-cropper"), { ssr: false, loading: () => <p role="status" className="mt-3 text-sm">Loading portrait cropper…</p> });
const initialState: TestimonialFormState = { status: "idle", message: "", errors: {} };
const emptyValues = { name: "", email: "", organization: "", story: "" };
const labelClass = "block text-[17.25px] leading-[1.25] font-bold lg:text-[calc(23*var(--home-type-unit))]";
const inputClass = "mt-3 block min-h-11 w-full rounded-t-2xl rounded-b-sm border border-transparent bg-white px-4 py-3 text-[13.5px] leading-[1.25] outline-none placeholder:text-[#737b80] focus-visible:border-[#0d1317] focus-visible:ring-1 focus-visible:ring-[#0d1317] aria-invalid:border-[#a12222] autofill:shadow-[inset_0_0_0_1000px_white] autofill:[-webkit-text-fill-color:#0d1317] lg:min-h-[calc(52*var(--home-type-unit))] lg:text-[calc(15*var(--home-type-unit))]";

type Props = { heading: string; consent: string; microcopy: string };

export function TestimonialForm({ heading, consent, microcopy }: Props) {
  const [values, setValues] = useState(emptyValues);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [consentGranted, setConsentGranted] = useState(false);
  const [portrait, setPortrait] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [draft, setDraft] = useState<{ file: File; url: string } | null>(null);
  const [uploadError, setUploadError] = useState("");
  const [checkingPortrait, setCheckingPortrait] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);
  const form = useRef<HTMLFormElement>(null);
  const previewUrl = useRef<string | null>(null);
  const draftUrl = useRef<string | null>(null);
  const selectionVersion = useRef(0);

  useEffect(() => () => {
    if (previewUrl.current) URL.revokeObjectURL(previewUrl.current);
    if (draftUrl.current) URL.revokeObjectURL(draftUrl.current);
  }, []);

  function closeCropper() {
    if (draftUrl.current) URL.revokeObjectURL(draftUrl.current);
    draftUrl.current = null;
    setDraft(null);
    if (fileInput.current) fileInput.current.value = "";
  }

  function removePortrait() {
    selectionVersion.current += 1;
    setCheckingPortrait(false);
    if (previewUrl.current) URL.revokeObjectURL(previewUrl.current);
    previewUrl.current = null;
    setPortrait(null);
    setPreview(null);
    setUploadError("");
    if (fileInput.current) fileInput.current.value = "";
  }

  const [state, formAction, pending] = useActionState(async (previous: TestimonialFormState, data: FormData): Promise<TestimonialFormState> => {
    if (portrait) data.set("portrait", portrait);
    try {
      const result = await submitTestimonial(previous, data);
      if (result.status === "success") {
        form.current?.reset();
        setValues(emptyValues);
        setRating(0);
        setHoverRating(0);
        setConsentGranted(false);
        removePortrait();
      }
      return result;
    } catch {
      return { status: "error", message: "We couldn’t reach the server. Your entries are still here—please try again.", errors: {} };
    }
  }, initialState);

  useEffect(() => {
    if (state.status === "error") form.current?.querySelector<HTMLElement>("[aria-invalid=true]")?.focus();
  }, [state]);

  async function chooseFile(file?: File) {
    if (!file) return;
    const version = ++selectionVersion.current;
    setCheckingPortrait(false);
    setUploadError("");
    if (!PORTRAIT_TYPES.includes(file.type as typeof PORTRAIT_TYPES[number])) {
      setUploadError("Choose a JPEG, PNG, or WebP image.");
      if (fileInput.current) fileInput.current.value = "";
      return;
    }
    if (!file.size || file.size > MAX_PORTRAIT_BYTES) {
      setUploadError("Your portrait must be 1 MB or smaller.");
      if (fileInput.current) fileInput.current.value = "";
      return;
    }
    setCheckingPortrait(true);
    let bitmap: ImageBitmap | null = null;
    try {
      bitmap = await createImageBitmap(file);
      if (bitmap.width * bitmap.height > 16_000_000) throw new Error("Choose a portrait under 16 megapixels.");
      if (version !== selectionVersion.current) return;
      if (draftUrl.current) URL.revokeObjectURL(draftUrl.current);
      draftUrl.current = URL.createObjectURL(file);
      setDraft({ file, url: draftUrl.current });
    } catch (error) {
      if (version === selectionVersion.current) {
        setUploadError(error instanceof Error && error.message.includes("megapixels") ? error.message : "This image could not be read. Choose a valid JPEG, PNG, or WebP image.");
        if (fileInput.current) fileInput.current.value = "";
      }
    } finally {
      bitmap?.close();
      if (version === selectionVersion.current) setCheckingPortrait(false);
    }
  }

  function fieldError(field: TestimonialField) {
    return state.errors[field]?.[0];
  }

  function errorMessage(field: TestimonialField) {
    const error = fieldError(field);
    return error ? <p id={`testimonial-${field}-error`} className="mt-2 text-[13.5px] leading-normal text-[#a12222]">{error}</p> : null;
  }

  return (
    <div className="rounded-2xl bg-[#faf7f5] p-5 font-holand tracking-[.05em] sm:p-8 lg:p-[calc(48*var(--home-type-unit))]">
      <h3 id="testimonial-form-title" className="border-b border-[#0d1317]/15 pb-3 font-sangira text-[27.75px] leading-[1.1] font-normal tracking-[.03em] lg:text-[calc(37*var(--home-type-unit))]">{heading}</h3>
      <form ref={form} action={formAction} noValidate aria-labelledby="testimonial-form-title" aria-busy={pending} className="mt-8 lg:mt-[calc(36*var(--home-type-unit))]">
        <fieldset disabled={pending} className="min-w-0 space-y-6 lg:space-y-[calc(24*var(--home-type-unit))]">
          <legend className="sr-only">Your testimonial</legend>
          {([
            { name: "name", label: "Full Name", placeholder: "e.g. Eleanor Vance", type: "text", autoComplete: "name", maxLength: 80, minLength: 2 },
            { name: "email", label: "Email Address", placeholder: "e.g. eleanor@studio.co", type: "email", autoComplete: "email", maxLength: 254, minLength: undefined },
            { name: "organization", label: "Role & Organization", placeholder: "e.g. Founder at Studio Co.", type: "text", autoComplete: "organization", maxLength: 120, minLength: 2 },
          ] as const).map((field) => (
            <div key={field.name}>
              <label htmlFor={`testimonial-${field.name}`} className={labelClass}>{field.label}</label>
              <input id={`testimonial-${field.name}`} name={field.name} type={field.type} autoComplete={field.autoComplete} required maxLength={field.maxLength} minLength={field.minLength} placeholder={field.placeholder} value={values[field.name]} onChange={(event) => setValues({ ...values, [field.name]: event.target.value })} aria-invalid={!!fieldError(field.name)} aria-describedby={fieldError(field.name) ? `testimonial-${field.name}-error` : undefined} className={inputClass} />
              {errorMessage(field.name)}
            </div>
          ))}
          <fieldset role="radiogroup" className="min-w-0" aria-invalid={!!fieldError("rating")} tabIndex={fieldError("rating") ? -1 : undefined} aria-describedby={fieldError("rating") ? "testimonial-rating-error" : undefined}>
            <legend className={labelClass}>Your Rating</legend>
            <div className="mt-3 flex w-fit gap-1.5" onMouseLeave={() => setHoverRating(0)}>
              {[1, 2, 3, 4, 5].map((star) => (
                <label key={star} className="relative grid size-10 cursor-pointer place-items-center rounded-md focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-[#0d1317]" onMouseEnter={() => setHoverRating(star)}>
                  <input type="radio" name="rating" value={star} checked={rating === star} onChange={() => setRating(star)} required aria-label={`${star} ${star === 1 ? "star" : "stars"}`} className="absolute inset-0 size-full cursor-pointer opacity-0" />
                  {/* eslint-disable-next-line @next/next/no-img-element -- Original local Figma star vectors. */}
                  <img src={star <= (hoverRating || rating) ? "/icons/testimonial/star-filled.svg" : "/icons/testimonial/star-outline.svg"} alt="" width={24} height={24} />
                </label>
              ))}
            </div>
            {errorMessage("rating")}
          </fieldset>
          <div>
            <label htmlFor="testimonial-story" className={labelClass}>Your Story</label>
            <textarea id="testimonial-story" name="story" required minLength={20} maxLength={3000} rows={7} placeholder="Reflect here on your experiences, the journey we shared, and the final design..." value={values.story} onChange={(event) => setValues({ ...values, story: event.target.value })} aria-invalid={!!fieldError("story")} aria-describedby={fieldError("story") ? "testimonial-story-error" : undefined} className={`${inputClass} min-h-[160px] resize-y lg:min-h-[calc(200*var(--home-type-unit))]`} />
            {errorMessage("story")}
          </div>
          <div>
            <label htmlFor="testimonial-portrait" className={labelClass}>Add Your Portrait (Optional)</label>
            <input ref={fileInput} id="testimonial-portrait" name="portrait" type="file" accept={PORTRAIT_TYPES.join(",")} onChange={(event) => chooseFile(event.target.files?.[0])} aria-invalid={!!uploadError || !!fieldError("portrait")} aria-describedby="testimonial-portrait-help testimonial-portrait-error" className="sr-only" />
            <button type="button" onClick={() => fileInput.current?.click()} onDragOver={(event) => event.preventDefault()} onDrop={(event) => { event.preventDefault(); chooseFile(event.dataTransfer.files[0]); }} className="mt-3 flex min-h-[88px] w-full items-center justify-center gap-4 rounded-t-2xl rounded-b-sm border border-transparent bg-white px-4 py-5 text-left text-[13.5px] leading-[1.25] font-bold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d1317] lg:text-[calc(18*var(--home-type-unit))]">
              {/* eslint-disable-next-line @next/next/no-img-element -- Original local Figma camera icon. */}
              <img src="/icons/testimonial/camera.svg" alt="" width={24} height={24} />
              <span>{portrait ? "Replace your portrait" : "Drag portrait file here, or click to browse"}</span>
            </button>
            <p id="testimonial-portrait-help" className="mt-2 text-[12px] leading-normal text-[#4b565b]">JPEG, PNG, or WebP. Maximum 1 MB. Crop your portrait before submitting.</p>
            {checkingPortrait && <p role="status" className="mt-2 text-[13.5px]">Checking portrait…</p>}
            <p id="testimonial-portrait-error" role={uploadError ? "alert" : undefined} className="mt-2 text-[13.5px] leading-normal text-[#a12222]">{uploadError || fieldError("portrait")}</p>
            {preview && <div className="mt-3 flex items-center gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element -- Local cropped upload preview. */}
              <img src={preview} alt="Your cropped portrait" width={64} height={64} className="rounded-lg" />
              <button type="button" onClick={removePortrait} className="min-h-11 px-2 text-[13.5px] underline underline-offset-4">Remove portrait</button>
            </div>}
          </div>
          <div>
            <label className="flex items-start gap-4 text-[12px] leading-[1.4] lg:text-[calc(15*var(--home-type-unit))]">
              <input type="checkbox" name="consent" required checked={consentGranted} onChange={(event) => setConsentGranted(event.target.checked)} aria-invalid={!!fieldError("consent")} aria-describedby={fieldError("consent") ? "testimonial-consent-error" : undefined} className="mt-0.5 size-5 shrink-0 accent-[#0d1317]" />
              <span>{consent}</span>
            </label>
            {errorMessage("consent")}
          </div>
          <div className="pt-2 lg:pt-3">
            <button type="submit" disabled={pending || checkingPortrait || !!draft} className="group inline-flex min-h-11 items-stretch gap-1 text-[13.5px] font-bold focus-visible:rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0d1317] disabled:cursor-wait disabled:opacity-50 lg:min-h-[55px] lg:text-[calc(18*var(--home-type-unit))]">
              <span aria-hidden="true" className="grid size-11 place-items-center overflow-hidden rounded-tl-2xl rounded-tr-lg rounded-br-lg rounded-bl-sm bg-[#0d1317] lg:size-[55px]">
                {/* eslint-disable-next-line @next/next/no-img-element -- Existing original Figma arrow. */}
                <img src="/icons/arrow-right-light.png" alt="" width={18} height={11} className="motion-safe:group-hover:animate-arrow-return" />
              </span>
              <span className="flex items-center rounded-t-sm rounded-br-2xl rounded-bl-sm bg-[#0d1317] px-5 py-3 text-[#faf7f5]">{pending ? "Submitting…" : "Submit"}</span>
            </button>
            <p className="mt-4 text-[12px] leading-[1.4] text-[#4b565b] lg:text-[calc(15*var(--home-type-unit))]">{microcopy}</p>
          </div>
        </fieldset>
        <p role={state.status === "error" ? "alert" : "status"} aria-live="polite" className={`mt-4 text-[13.5px] leading-normal ${state.status === "error" ? "text-[#a12222]" : "text-[#006c67]"}`}>{state.message}</p>
      </form>
      {draft && <PortraitCropper image={draft.url} file={draft.file} onCancel={closeCropper} onConfirm={(file) => {
        if (previewUrl.current) URL.revokeObjectURL(previewUrl.current);
        previewUrl.current = URL.createObjectURL(file);
        setPreview(previewUrl.current);
        setPortrait(file);
        closeCropper();
      }} />}
    </div>
  );
}
