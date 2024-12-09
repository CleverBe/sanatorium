import { createUserSchema } from "@/pages/Users/schemas/UserSchema"
import { z } from "zod"

export const createEmployeeSchema = z.object({
  ...createUserSchema.omit({ role: true }).shape,
})

export type CreateEmployeeInput = z.infer<typeof createEmployeeSchema>

export const updateEmployeeSchema = z.object({
  ...createEmployeeSchema.shape,
  password: z.preprocess(
    (password) => {
      return password === "" ? undefined : password
    },
    z
      .string({
        required_error: "password is required",
        invalid_type_error: "password must be a string",
      })
      .min(4, "La contraseña debe tener al menos 4 caracteres")
      .optional(),
  ),
})

export type UpdateEmployeeInput = z.infer<typeof updateEmployeeSchema>
