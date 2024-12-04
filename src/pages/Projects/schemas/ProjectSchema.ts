import { z } from "zod"
import { ProjectStatusEnum } from "../types"

export const createProjectSchema = z.object({
  name: z
    .string({
      required_error: "name is required",
      invalid_type_error: "name must be a string",
    })
    .trim()
    .min(1, "El nombre es requerido")
    .min(4, "El nombre debe tener al menos 4 caracteres"),
  description: z.union([
    z
      .string({
        required_error: "description is required",
        invalid_type_error: "description must be a string",
      })
      .min(4, "La descripcion debe tener al menos 4 caracteres"),
    z.literal(""),
  ]),
  status: z.nativeEnum(ProjectStatusEnum),
  inCharge: z.string({
    required_error: "inCharge is required",
    invalid_type_error: "inCharge must be a string",
  }),
  startDate: z
    .string({
      required_error: "startDate is required",
      invalid_type_error: "startDate must be a string",
    })
    .datetime("Debe ser una fecha valida"),
  endDate: z
    .string({
      required_error: "endDate is required",
      invalid_type_error: "endDate must be a string",
    })
    .datetime("Debe ser una fecha valida"),
})

export type CreateProjectInput = z.infer<typeof createProjectSchema>

export const updateProjectSchema = z.object({
  ...createProjectSchema.shape,
})

export type UpdateProjectInput = z.infer<typeof updateProjectSchema> & {
  id: string
}
