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
import { Switch } from "@/components/ui/switch"
import {
  CreateEmployeeInput,
  createEmployeeSchema,
  updateEmployeeSchema,
} from "../schemas/EmployeeSchema"
import { useCreateEmployee } from "../api/useCreateEmployee"
import { useUpdateEmployee } from "../api/useUpdateEmployee"

export const EmployeeForm = () => {
  const modalEmployee = useEmployeeModal()

  const form = useForm<CreateEmployeeInput>({
    resolver: zodResolver(
      modalEmployee.item ? updateEmployeeSchema : createEmployeeSchema,
    ),
    defaultValues: {
      firstname: modalEmployee.item?.firstname ?? "",
      lastname: modalEmployee.item?.lastname ?? "",
      email: modalEmployee.item?.email ?? "",
      password: "",
      status: modalEmployee.item?.status ?? true,
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
      mutateCreate({ data: values }).then(() => modalEmployee.onClose())
    }
  }

  return (
    <Form {...form}>
      <form
        className="grid grid-cols-12 gap-2"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {modalEmployee.item && (
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem className="col-span-12">
                <div className="flex items-center justify-end space-x-2">
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <FormLabel>Activo</FormLabel>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <FormField
          control={form.control}
          name="firstname"
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
          name="lastname"
          render={({ field }) => (
            <FormItem className="col-span-12">
              <FormLabel>Apellido</FormLabel>
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
