import { updateUserSchema } from "@/pages/Users/schemas/UserSchema"
import { z } from "zod"

export const updateProfileSchema = z.object({
  ...updateUserSchema.omit({
    password: true,
    role: true,
  }).shape,
})

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>

export const updatePasswordSchema = z
  .object({
    password: z
      .string({
        required_error: "Current password is required",
        invalid_type_error: "Current password must be a string",
      })
      .min(1, "La contraseña actual es requerida"),
    newPassword: z
      .string({
        required_error: "Password is required",
        invalid_type_error: "Password must be a string",
      })
      .min(4, "La nueva contraseña debe tener al menos 4 caracteres"),
    passwordConfirmation: z
      .string({
        required_error: "Password confirmation is required",
        invalid_type_error: "Password confirmation must be a string",
      })
      .min(4, "La nueva contraseña debe tener al menos 4 caracteres"),
  })
  .refine((data) => data.newPassword === data.passwordConfirmation, {
    message: "Las contraseñas no coinciden",
    path: ["passwordConfirmation"],
  })

export type UpdatePasswordInput = z.infer<typeof updatePasswordSchema>
