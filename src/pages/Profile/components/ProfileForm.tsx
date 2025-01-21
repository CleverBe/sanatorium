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
import { defaultImageUrl } from "@/constants"
import { ImagePlus } from "lucide-react"
import { useRef, useState } from "react"
import { toast } from "sonner"

export const ProfileForm = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const { data: user } = useGetCurrentUser()

  const form = useForm<UpdateProfileInput>({
    resolver: zodResolver(updateProfileSchema),
    values: {
      name: user?.name ?? "",
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

  console.log({ imagePreview })

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files && files.length > 0) {
      const file = files[0]

      if (!file.type.startsWith("image/")) {
        toast.error("El archivo seleccionado no es una imagen.")
        return // Detiene el proceso si no es una imagen
      }

      form.setValue("image", files) // Actualiza el valor del archivo en el formulario
      form.trigger("image") // Dispara la validación inmediatamente

      // Genera la vista previa de la imagen
      const reader = new FileReader()
      reader.onload = () => {
        setImagePreview(reader.result as string) // Guarda la URL base64 de la imagen
      }
      reader.readAsDataURL(file) // Lee el archivo como una URL base64
    }
  }

  const handleFileButtonClick = () => {
    fileInputRef.current?.click() // Simula un clic en el input
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
            <div className="col-span-12 flex flex-col justify-center sm:col-span-4">
              <div className="flex w-full items-center justify-center">
                <img
                  src={imagePreview ?? user?.image ?? defaultImageUrl}
                  alt="Profile"
                  className="h-24 w-24 rounded-full"
                />
              </div>
              <div className="flex w-full flex-col items-center justify-center">
                <input
                  type="file"
                  {...form.register("image")}
                  className="hidden"
                  ref={(e) => {
                    form.register("image")
                    fileInputRef.current = e
                  }}
                  onChange={handleFileChange}
                  accept="image/*"
                />
                <Button
                  className="mt-2 w-full sm:w-1/2"
                  type="button"
                  onClick={handleFileButtonClick}
                >
                  <span>Cambiar</span>
                  <ImagePlus className="ml-2 h-4 w-4" />
                </Button>
                {form.formState.errors.image && (
                  <p className="mt-1 text-xs text-red-500">
                    {form.formState.errors.image.message?.toString()}
                  </p>
                )}
              </div>
            </div>
            <div className="col-span-12 grid grid-cols-12 gap-2 sm:col-span-8">
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
            </div>

            <div className="col-span-12 flex w-full items-center justify-end">
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
