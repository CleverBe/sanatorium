import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useUserModal } from "../hooks/useUserModal";
import {
  CreateUserInput,
  createUserSchema,
  updateUserSchema,
} from "../schemas/UserSchema";
import { Role } from "../Types";
import { useCreateUser } from "../api/useCreateUser";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useUpdateUser } from "../api/useUpdateUser";

export const UserForm = () => {
  const modalUser = useUserModal();

  const form = useForm<CreateUserInput>({
    resolver: zodResolver(modalUser.item ? updateUserSchema : createUserSchema),
    defaultValues: {
      firstname: modalUser.item?.firstname ?? "",
      lastname: modalUser.item?.lastname ?? "",
      email: modalUser.item?.email ?? "",
      password: "",
      status: modalUser.item?.status ?? true,
      role: modalUser.item?.role ?? Role.ADMIN,
    },
  });

  const { mutateAsync: mutateCreate, isPending: isPendingCreate } =
    useCreateUser();
  const { mutateAsync: mutateUpdate, isPending: isPendingUpdate } =
    useUpdateUser();

  const isPending = isPendingCreate || isPendingUpdate;

  const onSubmit: SubmitHandler<CreateUserInput> = async (values) => {
    if (modalUser.item) {
      mutateUpdate({ data: values }).then(() => modalUser.onClose());
    } else {
      mutateCreate({ data: values }).then(() => modalUser.onClose());
    }
  };

  return (
    <Form {...form}>
      <form
        className="grid grid-cols-12 gap-2"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {modalUser.item && (
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
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="col-span-6">
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <Input placeholder="****" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem className="col-span-6">
              <FormLabel>Rol</FormLabel>
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
                      placeholder="Seleccione un rol"
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(Role).map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="col-span-12 flex w-full items-center justify-end">
          <Button disabled={isPending} type="submit">
            Crear
          </Button>
        </div>
      </form>
    </Form>
  );
};
