import { z } from "zod"

export const createTaskSchema = z.object({
  title: z
    .string({
      required_error: "title is required",
      invalid_type_error: "title must be a string",
    })
    .trim()
    .min(1, "El título es requerido")
    .min(4, "El título debe tener al menos 4 caracteres"),
  description: z.union([
    z
      .string({
        required_error: "description is required",
        invalid_type_error: "description must be a string",
      })
      .min(4, "La descripción debe tener al menos 4 caracteres"),
    z.literal(""),
  ]),
  expectedCompletionDate: z.string().date("Selecciona una fecha"),
  estimatedHours: z
    .string({
      required_error: "estimatedHours is required",
      invalid_type_error: "estimatedHours must be a string",
    })
    .refine((val) => {
      const num = Number(val)
      return !isNaN(num) && num > 0
    }, "estimatedHours must be a positive integer"),
})

export type CreateTaskInput = z.infer<typeof createTaskSchema>

export const updateTaskSchema = z.object({
  ...createTaskSchema.shape,
})

export type UpdateTaskInput = z.infer<typeof updateTaskSchema>
