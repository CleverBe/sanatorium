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
import { zodResolver } from "@hookform/resolvers/zod"
import {
  UpdateProfileInput,
  updateProfileSchema,
} from "../schemas/ProfileSchema"
import { useGetCurrentUser } from "../api/useGetCurrentUser"
import { useUpdateUserProfile } from "../api/useUpdateProfile"

export const ProfileForm = () => {
  const { data: user } = useGetCurrentUser()

  const form = useForm<UpdateProfileInput>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      firstname: user?.firstname ?? "",
      lastname: user?.lastname ?? "",
      email: user?.email ?? "",
    },
  })

  const { mutateAsync: mutateUpdate, isPending } = useUpdateUserProfile()

  const onSubmit: SubmitHandler<UpdateProfileInput> = async (values) => {
    if (user?.id) {
      mutateUpdate({
        data: {
          ...values,
          id: user.id,
        },
      })
    }
  }

  return (
    <Card className="mx-auto w-full max-w-3xl">
      <CardHeader>
        <CardTitle>Datos de perfil</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            className="grid grid-cols-12 gap-2"
            onSubmit={form.handleSubmit(onSubmit)}
          >
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

            <div className="col-span-12 flex w-full items-center">
              <Button disabled={isPending} type="submit">
                Actualizar datos
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
