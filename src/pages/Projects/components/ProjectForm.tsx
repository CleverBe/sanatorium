import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"
import { useProjectModal } from "../hooks/useProjectModal"
import {
  CreateProjectInput,
  createProjectSchema,
  updateProjectSchema,
} from "../schemas/ProjectSchema"
import { useCreateProject } from "../api/useCreateProject"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useUpdateProject } from "../api/useUpdateProject"
import { ProjectStatusEnum } from "../types"
import { Textarea } from "@/components/ui/textarea"
import { useGetUsers } from "@/pages/Users/api/useGetUsers"
import { RoleEnum } from "@/pages/Users/types"
import { MultiSelect } from "@/components/ui/multiselect"
import { getProjectStatus } from "../helpers"
import { CustomSelect } from "@/components/ui/customSelect"

export const ProjectForm = () => {
  const modalProject = useProjectModal()
  const { data: users = [] } = useGetUsers()
  const managers = users.filter((user) => user.role === RoleEnum.MANAGER)
  const employees = users.filter((user) => user.role === RoleEnum.EMPLOYEE)

  const form = useForm<CreateProjectInput>({
    resolver: zodResolver(
      modalProject.item ? updateProjectSchema : createProjectSchema,
    ),
    defaultValues: {
      name: modalProject.item?.name ?? "",
      description: modalProject.item?.description ?? "",
      status: modalProject.item?.status ?? ProjectStatusEnum.PENDING,
      inCharge: modalProject.item?.inCharge ?? 0,
      startDate: modalProject.item?.startDate ?? "",
      endDate: modalProject.item?.endDate ?? "",
      employees: modalProject.item?.employees ?? [],
    },
  })

  const { mutateAsync: mutateCreate, isPending: isPendingCreate } =
    useCreateProject()
  const { mutateAsync: mutateUpdate, isPending: isPendingUpdate } =
    useUpdateProject()

  const isPending = isPendingCreate || isPendingUpdate

  const onSubmit: SubmitHandler<CreateProjectInput> = async (values) => {
    if (modalProject.item) {
      mutateUpdate({
        data: { ...values, id: modalProject.item.id },
      }).then(() => modalProject.onClose())
    } else {
      mutateCreate({ data: values }).then(() => modalProject.onClose())
    }
  }

  return (
    <Form {...form}>
      <form
        className="grid grid-cols-12 gap-2"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="col-span-12">
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="col-span-12">
              <FormLabel>Descripción</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  className="resize-none"
                  placeholder="Descripción del proyecto"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className="col-span-6">
              <FormLabel>Estado</FormLabel>
              <Select
                disabled={isPending}
                onValueChange={field.onChange}
                value={field.value}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      defaultValue={field.value}
                      placeholder="Seleccione un estado"
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(ProjectStatusEnum).map((val) => (
                    <SelectItem key={val} value={val}>
                      {getProjectStatus(val)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="inCharge"
          render={({ field }) => (
            <FormItem className="col-span-6">
              <FormLabel>Encargado</FormLabel>
              <FormControl>
                <CustomSelect
                  options={managers.map((user) => ({
                    label: user.name,
                    value: user.id.toString(),
                  }))}
                  defaultValue={field.value !== 0 ? field.value.toString() : ""}
                  onValueChange={field.onChange}
                  placeholder="Seleccione un encargado"
                  showSearch
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <FormItem className="col-span-6">
              <FormLabel>Fecha inicio</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="endDate"
          render={({ field }) => (
            <FormItem className="col-span-6">
              <FormLabel>Fecha fin</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="employees"
          render={({ field }) => (
            <FormItem className="col-span-12">
              <FormLabel>Empleados</FormLabel>
              <FormControl>
                <MultiSelect
                  options={employees.map((user) => ({
                    label: user.name,
                    value: user.id.toString(),
                  }))}
                  defaultValue={field.value.map((id) => id.toString())}
                  onValueChange={field.onChange}
                  placeholder="Seleccione los empleados"
                  showSearch
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="col-span-12 flex w-full items-center justify-end">
          <Button disabled={isPending} type="submit">
            {modalProject.item ? "Actualizar" : "Crear"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
