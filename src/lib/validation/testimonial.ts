import { z } from "zod";

export const testimonialSchema = z.object({
  name: z.string().trim().min(2, "Enter at least 2 characters.").max(80, "Use 80 characters or fewer."),
  email: z.string().trim().max(254, "Use a shorter email address.").pipe(z.email("Enter a valid email address.")),
  organization: z.string().trim().min(2, "Enter your role and organization.").max(120, "Use 120 characters or fewer."),
  rating: z.coerce.number().int("Choose a rating from 1 to 5.").min(1, "Choose a rating from 1 to 5.").max(5, "Choose a rating from 1 to 5."),
  story: z.string().trim().min(20, "Please share at least 20 characters.").max(3000, "Use 3,000 characters or fewer."),
  consent: z.literal("on", { error: "Please authorize publication before submitting." }),
});
