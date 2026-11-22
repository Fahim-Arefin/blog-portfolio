export type TestimonialField = "name" | "email" | "organization" | "rating" | "story" | "consent" | "portrait";

export type TestimonialFormState = {
  status: "idle" | "error" | "success";
  message: string;
  errors: Partial<Record<TestimonialField, string[]>>;
};
