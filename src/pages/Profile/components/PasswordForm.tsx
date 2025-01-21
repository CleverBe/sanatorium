import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SubmitHandler, useForm } from "react-hook-form"
import {
  UpdatePasswordInput,
  updatePasswordSchema,
} from "../schemas/ProfileSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useUpdateUserProfile } from "../api/useUpdateProfile"
import { useGetCurrentUser } from "../api/useGetCurrentUser"

export const PasswordForm = () => {
  const { data: user } = useGetCurrentUser()

  const form = useForm<UpdatePasswordInput>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      password: "",
      newPassword: "",
      passwordConfirmation: "",
    },
  })

  const { mutateAsync: mutateUpdate, isPending } = useUpdateUserProfile()

  const onSubmit: SubmitHandler<UpdatePasswordInput> = async (values) => {
    if (user?.id) {
      mutateUpdate({ data: { ...values, id: user.id } })
    }
  }

  return (
    <Card className="mx-auto w-full max-w-3xl">
      <CardHeader>
        <CardTitle>Contraseña</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            className="grid grid-cols-12 gap-2"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="col-span-12">
                  <FormLabel>Contraseña actual</FormLabel>
                  <FormControl>
                    <Input autoComplete="off" placeholder="****" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem className="col-span-12">
                  <FormLabel>Nueva contraseña</FormLabel>
                  <FormControl>
                    <Input autoComplete="off" placeholder="****" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="passwordConfirmation"
              render={({ field }) => (
                <FormItem className="col-span-12">
                  <FormLabel>Confirmar contraseña</FormLabel>
                  <FormControl>
                    <Input autoComplete="off" placeholder="****" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="col-span-12 flex w-full items-center justify-end">
              <Button disabled={isPending} type="submit">
                Actualizar contraseña
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
