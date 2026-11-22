"use server";

import { testimonialSchema } from "@/lib/validation/testimonial";
import { PortraitValidationError, validatePortrait } from "@/lib/testimonials/portrait.server";
import type { TestimonialFormState, TestimonialField } from "@/lib/testimonials/types";

export async function submitTestimonial(_previous: TestimonialFormState, formData: FormData): Promise<TestimonialFormState> {
  const parsed = testimonialSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    organization: formData.get("organization"),
    rating: formData.get("rating"),
    story: formData.get("story"),
    consent: formData.get("consent"),
  });
  const errors: TestimonialFormState["errors"] = {};
  if (!parsed.success) {
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as TestimonialField;
      (errors[field] ??= []).push(issue.message);
    }
  }

  let portrait: Awaited<ReturnType<typeof validatePortrait>> = null;
  try {
    portrait = await validatePortrait(formData.get("portrait"));
  } catch (error) {
    if (error instanceof PortraitValidationError) errors.portrait = [error.message];
    else return { status: "error", message: "We couldn’t process your portrait. Please try again.", errors: {} };
  }
  if (!parsed.success || Object.keys(errors).length) return { status: "error", message: "Please check the highlighted fields.", errors };

  try {
    // Replace this log with the external POST API later. Never log the image bytes.
    console.info("Testimonial received", {
      ...parsed.data,
      consent: true,
      portrait: portrait ? { type: portrait.type, width: portrait.width, height: portrait.height, size: portrait.size } : null,
    });
    return { status: "success", message: "Thank you! Your testimonial was received.", errors: {} };
  } catch {
    return { status: "error", message: "We couldn’t submit your testimonial. Your entries are still here—please try again.", errors: {} };
  }
}
