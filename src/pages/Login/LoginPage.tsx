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
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoginInput, loginSchema } from "./schemas/LoginSchema"
import { useNavigate } from "react-router-dom"
import { useLoginUser } from "./api/useLoginUser"
import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"

export const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false)

  const navigate = useNavigate()

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const { mutateAsync: loginMutation, isPending } = useLoginUser()

  const onSubmit = async (data: LoginInput) => {
    loginMutation(data).then(() => navigate("/dashboard"))
  }

  return (
    <div className="flex h-[calc(100vh-210px)] items-center justify-center">
      <Card className="w-96">
        <CardHeader>
          <CardTitle>Ingresa a tu cuenta</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 md:space-y-6"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Correo electrónico</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="carlos@gmail.com"
                        type="email"
                        autoFocus
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setShowPassword((prev) => !prev)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent"
                        >
                          {showPassword ? <EyeOff /> : <Eye />}
                        </button>
                        <Input
                          type={showPassword ? "text" : "password"}
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full" disabled={isPending}>
                Ingresar
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
