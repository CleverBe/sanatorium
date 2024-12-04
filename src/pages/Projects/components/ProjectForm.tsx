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
import { localToUTC, utcToLocal } from "@/helpers/dates"
import { MultiSelect } from "@/components/ui/multiselect"

export const ProjectForm = () => {
  const modalProject = useProjectModal()
  const { data: users = [] } = useGetUsers()
  const managers = users.filter((user) => user.role === RoleEnum.MANAGER)

  const form = useForm<CreateProjectInput>({
    resolver: zodResolver(
      modalProject.item ? updateProjectSchema : createProjectSchema,
    ),
    defaultValues: {
      name: modalProject.item?.name ?? "",
      description: modalProject.item?.description ?? "",
      status: modalProject.item?.status ?? ProjectStatusEnum.PENDING,
      inCharge: modalProject.item?.inCharge ?? "",
      startDate: modalProject.item?.startDate ?? "",
      endDate: modalProject.item?.endDate ?? "",
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
              <FormLabel>Apellido</FormLabel>
              <FormControl>
                <Textarea {...field} className="resize-none" />
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
                      {val}
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
                      placeholder="Seleccione un encargado"
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {managers.map((user) => (
                    <SelectItem key={user.id} value={user.id}>
                      {user.firstname} {user.lastname}
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
          name="startDate"
          render={({ field }) => (
            <FormItem className="col-span-6">
              <FormLabel>Fecha inicio</FormLabel>
              <FormControl>
                <Input
                  type="datetime-local"
                  {...field}
                  value={field.value ? utcToLocal(field.value) : ""}
                  onChange={(e) => {
                    const localDate = e.target.value

                    const utcDate = localToUTC(localDate)

                    field.onChange(utcDate)
                  }}
                />
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
                <Input
                  type="datetime-local"
                  {...field}
                  value={field.value ? utcToLocal(field.value) : ""}
                  onChange={(e) => {
                    const localDate = e.target.value

                    const utcDate = localToUTC(localDate)

                    field.onChange(utcDate)
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="col-span-6">
          <MultiSelect
            options={[
              { label: "Example 1", value: "1" },
              { label: "Example 2", value: "2" },
              { label: "Example 3", value: "3" },
              { label: "Example 4", value: "4" },
              { label: "Example 5", value: "5" },
              { label: "Example 6", value: "6" },
              { label: "Example 7", value: "7" },
              { label: "Example 8", value: "8" },
              { label: "Example 9", value: "9" },
              { label: "Example 10", value: "10" },
              { label: "Example 11", value: "11" },
              { label: "Example 12", value: "12" },
              { label: "Example 13", value: "13" },
              { label: "Example 14", value: "14" },
              { label: "Example 15", value: "15" },
              { label: "Example 16", value: "16" },
            ]}
            defaultValue={["1", "2"]}
            onValueChange={() => {}}
            placeholder="Seleccione un encargado"
          />
        </div>

        <div className="col-span-12 flex w-full items-center justify-end">
          <Button disabled={isPending} type="submit">
            {modalProject.item ? "Actualizar" : "Crear"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
