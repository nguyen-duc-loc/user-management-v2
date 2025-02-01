import { z } from "zod";

export const UserSchema = z.object({
  fullname: z
    .string()
    .min(1, { message: "Name is required." })
    .max(50, { message: "Name cannot exceed 50 characters." })
    .regex(/^[a-zA-Z\s]+$/, {
      message: "Name can only contain letters and spaces.",
    }),

  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please provide a valid email address." }),

  phone: z
    .string()
    .length(10, { message: "Phone number must be 10 digits long." })
    .regex(/^[0-9_]+$/, {
      message: "Username can only numbers.",
    }),

  birthdate: z.coerce.date({ message: "Date of birth is required" }),
});

export const AvatarSchema = z.object({
  image: (() => {
    const maxUploadSize = 1024 * 1024; // 1MB
    const acceptedFilesTypes = ["image/"];

    return z
      .custom<FileList>()
      .refine((files) => files?.length === 1, "Avatar is required")
      .refine(
        (files) => files?.[0]?.size <= maxUploadSize,
        "File size must be less than 1MB"
      )
      .refine(
        (files) =>
          acceptedFilesTypes.some((type) => files?.[0]?.type.startsWith(type)),
        "File must be an image"
      );
  })(),
});
