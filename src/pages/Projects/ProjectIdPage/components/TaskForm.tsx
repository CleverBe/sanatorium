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
  CreateTaskInput,
  createTaskSchema,
  updateTaskSchema,
} from "../schemas/TaskSchema"
import { Textarea } from "@/components/ui/textarea"
import { useCreateTask } from "../api/useCreateTask"
import { useUpdateTask } from "../api/useUpdateTask"
import { utcToLocalDateYYYYMMDD } from "@/helpers/dates"
import { useParams } from "react-router-dom"
import { useGetCurrentUser } from "@/pages/Profile/api/useGetCurrentUser"
import { ProjectStatusEnum } from "../../types"

export const TaskForm = () => {
  const { data: user } = useGetCurrentUser()

  const userId = user?.id as number

  const modalTask = useTaskModal()

  const isProjectFinished =
    modalTask.item?.project.status === ProjectStatusEnum.COMPLETED

  const params = useParams()

  const projectId = params.projectId as string

  const form = useForm<CreateTaskInput>({
    resolver: zodResolver(modalTask.item ? updateTaskSchema : createTaskSchema),
    defaultValues: {
      title: modalTask.item?.title || "",
      description: modalTask.item?.description || "",
      expectedCompletionDate: modalTask.item?.expectedCompletionDate
        ? utcToLocalDateYYYYMMDD(modalTask.item.expectedCompletionDate)
        : new Date().toISOString().split("T")[0],
      estimatedHours: modalTask.item?.estimatedHours.toString() || "",
    },
  })

  const { mutateAsync: mutateCreate, isPending: isPendingCreate } =
    useCreateTask()
  const { mutateAsync: mutateUpdate, isPending: isPendingUpdate } =
    useUpdateTask()

  const isPending = isPendingCreate || isPendingUpdate

  const onSubmit: SubmitHandler<CreateTaskInput> = async (values) => {
    if (modalTask.item) {
      mutateUpdate({
        data: {
          ...values,
          estimatedHours: Number(values.estimatedHours),
          id: modalTask.item.id,
          projectId: Number(projectId),
          userId,
        },
      }).then(() => modalTask.onClose())
    } else {
      mutateCreate({
        data: {
          ...values,
          estimatedHours: Number(values.estimatedHours),
          projectId: Number(projectId),
          userId,
        },
      }).then(() => modalTask.onClose())
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
                <Input {...field} disabled={isProjectFinished} />
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
                  disabled={isProjectFinished}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {modalTask.item && (
          <FormField
            control={form.control}
            name="expectedCompletionDate"
            render={({ field }) => (
              <FormItem className="col-span-12 md:col-span-6">
                <FormLabel>Fecha de entrega estimada</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    {...field}
                    value={field.value}
                    onChange={field.onChange}
                    disabled={isProjectFinished}
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
            <FormItem className="col-span-12 md:col-span-6">
              <FormLabel>Horas estimadas</FormLabel>
              <FormControl>
                <Input {...field} type="number" disabled={isProjectFinished} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="col-span-12 flex w-full items-center justify-end">
          <Button disabled={isPending || isProjectFinished} type="submit">
            {modalTask.item ? "Actualizar" : "Crear"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
