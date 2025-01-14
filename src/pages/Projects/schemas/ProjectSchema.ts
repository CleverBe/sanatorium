import { z } from "zod"
import { ProjectStatusEnum } from "../types"

export const createProjectSchema = z.object({
  name: z
    .string({
      invalid_type_error: "name must be a string",
    })
    .trim()
    .min(1, "El nombre es requerido")
    .min(4, "El nombre debe tener al menos 4 caracteres"),
  description: z.union([
    z
      .string({
        invalid_type_error: "description must be a string",
      })
      .min(4, "La descripción debe tener al menos 4 caracteres"),
    z.literal(""),
  ]),
  status: z.nativeEnum(ProjectStatusEnum),
  inCharge: z
    .number({
      invalid_type_error: "Seleccione un encargado",
    })
    .int("Seleccione un encargado")
    .min(1, "Seleccione un encargado"),
  startDate: z
    .string({
      required_error: "startDate is required",
      invalid_type_error: "startDate must be a string",
    })
    .date("Selecciona una fecha"),
  endDate: z
    .string({
      required_error: "endDate is required",
      invalid_type_error: "endDate must be a string",
    })
    .date("Selecciona una fecha"),
  employees: z.array(z.number()).min(1, "Selecciona al menos un empleado"),
})

export type CreateProjectInput = z.infer<typeof createProjectSchema>

export const updateProjectSchema = z.object({
  ...createProjectSchema.shape,
})

export type UpdateProjectInput = z.infer<typeof updateProjectSchema>
