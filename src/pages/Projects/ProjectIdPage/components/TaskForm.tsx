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
import { useTaskModal } from "../hooks/useTaskModal"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  CreateTaskInput,
  createTaskSchema,
  updateTaskSchema,
} from "../schemas/TaskSchema"
import { TaskPriorityEnum } from "@/db/db"
import { Textarea } from "@/components/ui/textarea"
import { useCreateTask } from "../api/useCreateTask"
import { useUpdateTask } from "../api/useUpdateTask"
import { getTaskPriority } from "../../helpers"
import { utcToLocalDateYYYYMMDD } from "@/helpers/dates"

export const TaskForm = () => {
  const modalTask = useTaskModal()

  const form = useForm<CreateTaskInput>({
    resolver: zodResolver(modalTask.item ? updateTaskSchema : createTaskSchema),
    defaultValues: {
      title: modalTask.item?.title || "",
      description: modalTask.item?.description || "",
      priority: modalTask.item?.priority || TaskPriorityEnum.MEDIUM,
      expectedCompletionDate: modalTask.item?.expectedCompletionDate
        ? utcToLocalDateYYYYMMDD(modalTask.item.expectedCompletionDate)
        : "",
      estimatedHours: modalTask.item?.estimatedHours || 0,
    },
  })

  const { mutateAsync: mutateCreate, isPending: isPendingCreate } =
    useCreateTask()
  const { mutateAsync: mutateUpdate, isPending: isPendingUpdate } =
    useUpdateTask()

  const isPending = isPendingCreate || isPendingUpdate

  const onSubmit: SubmitHandler<CreateTaskInput> = async (values) => {
    if (modalTask.item) {
      mutateUpdate({ data: { ...values, id: modalTask.item.id } }).then(() =>
        modalTask.onClose(),
      )
    } else {
      mutateCreate({ data: values }).then(() => modalTask.onClose())
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
          name="title"
          render={({ field }) => (
            <FormItem className="col-span-12">
              <FormLabel>Título</FormLabel>
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
              <FormLabel>Descripción</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  className="resize-none"
                  placeholder="Descripción de la tarea"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="priority"
          render={({ field }) => (
            <FormItem className="col-span-6">
              <FormLabel>Prioridad</FormLabel>
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
                      placeholder="Seleccione una prioridad"
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(TaskPriorityEnum).map((val) => (
                    <SelectItem key={val} value={val}>
                      {getTaskPriority(val)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {modalTask.item && (
          <FormField
            control={form.control}
            name="expectedCompletionDate"
            render={({ field }) => (
              <FormItem className="col-span-6">
                <FormLabel>Fecha de entrega estimada</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    {...field}
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <FormField
          control={form.control}
          name="estimatedHours"
          render={({ field }) => (
            <FormItem className="col-span-6">
              <FormLabel>Horas estimadas</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="col-span-12 flex w-full items-center justify-end">
          <Button disabled={isPending} type="submit">
            {modalTask.item ? "Actualizar" : "Crear"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
