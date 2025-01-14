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
import { useEmployeeModal } from "../hooks/useEmployeeModal"
import {
  CreateEmployeeInput,
  createEmployeeSchema,
  updateEmployeeSchema,
} from "../schemas/EmployeeSchema"
import { useCreateEmployee } from "../api/useCreateEmployee"
import { useUpdateEmployee } from "../api/useUpdateEmployee"
import { useGetCurrentUser } from "@/pages/Profile/api/useGetCurrentUser"

export const EmployeeForm = () => {
  const modalEmployee = useEmployeeModal()

  const { data: user } = useGetCurrentUser()

  const form = useForm<CreateEmployeeInput>({
    resolver: zodResolver(
      modalEmployee.item ? updateEmployeeSchema : createEmployeeSchema,
    ),
    defaultValues: {
      name: modalEmployee.item?.name ?? "",
      email: modalEmployee.item?.email ?? "",
      password: "",
    },
  })

  const { mutateAsync: mutateCreate, isPending: isPendingCreate } =
    useCreateEmployee()
  const { mutateAsync: mutateUpdate, isPending: isPendingUpdate } =
    useUpdateEmployee()

  const isPending = isPendingCreate || isPendingUpdate

  const onSubmit: SubmitHandler<CreateEmployeeInput> = async (values) => {
    if (modalEmployee.item) {
      mutateUpdate({ data: { ...values, id: modalEmployee.item.id } }).then(
        () => modalEmployee.onClose(),
      )
    } else {
      mutateCreate({ data: { ...values, managerId: user?.id as number } }).then(
        () => modalEmployee.onClose(),
      )
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
          name="email"
          render={({ field }) => (
            <FormItem className="col-span-12">
              <FormLabel>Correo electrónico</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="col-span-12">
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <Input autoComplete="off" placeholder="****" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="col-span-12 flex w-full items-center justify-end">
          <Button disabled={isPending} type="submit">
            {modalEmployee.item ? "Actualizar" : "Crear"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
