import { z } from "zod"
import { RoleEnum } from "../types"

export const createUserSchema = z.object({
  firstname: z
    .string({
      required_error: "Firstname is required",
      invalid_type_error: "Firstname must be a string",
    })
    .trim()
    .min(1, "El nombre es requerido")
    .min(4, "El nombre debe tener al menos 4 caracteres"),
  lastname: z
    .string({
      required_error: "Lastname is required",
      invalid_type_error: "Lastname must be a string",
    })
    .trim()
    .min(1, "El apellido es requerido")
    .min(4, "El apellido debe tener al menos 4 caracteres"),
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .trim()
    .min(1, "El email es requerido")
    .email("Debe ser un email"),
  password: z
    .string({
      required_error: "password is required",
      invalid_type_error: "password must be a string",
    })
    .min(1, "La contraseña es requerida")
    .min(4, "La contraseña debe tener al menos 4 caracteres"),
  status: z.boolean(),
  role: z.nativeEnum(RoleEnum),
})

export type CreateUserInput = z.infer<typeof createUserSchema>

export const updateUserSchema = z.object({
  ...createUserSchema.shape,
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

export type UpdateUserInput = z.infer<typeof updateUserSchema> & { id: string }
