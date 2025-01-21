import { z } from "zod"
import { RoleEnum } from "../types"

export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
]

export const createUserSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
    .trim()
    .min(1, "El nombre es requerido")
    .min(4, "El nombre debe tener al menos 4 caracteres"),
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
  image: z
    .any()
    .superRefine((files, ctx) => {
      if (files instanceof FileList === false) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Invalid value",
        })
      }
      if (files?.length === 1) {
        if (!ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Debe ser una imagen",
          })
        }
      }
    })
    .optional(),
})

export type UpdateUserInput = z.infer<typeof updateUserSchema>
