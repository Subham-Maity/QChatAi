import * as z from "zod";

export const ContentSchema = z.object({
  title: z
    .string()
    .min(5, "😬 Title is too short - should be 5 chars minimum.")
    .max(100, "😱 Title is too long - should be 100 chars maximum.")
    .regex(
      /[a-zA-Z0-9\s]/,
      "😖 Title can only contain letters, numbers, and spaces.",
    )
    .min(1, "Title Required...! 😣"),

  description: z
    .string()
    .min(20, "😬 Description is too short - should be 20 chars minimum.")
    .max(500, "😱 Description is too long - should be 500 chars maximum.")
    .regex(
      /[a-zA-Z0-9\s]/,
      "😖 Description can only contain letters, numbers, and spaces.",
    )
    .min(1, "Description Required...! 😣"),
});
