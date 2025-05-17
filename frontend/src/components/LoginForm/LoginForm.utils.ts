import { useLogin } from "@/lib/api";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { z } from "zod";

export enum LoginFormField {
  Email = "email",
  Password = "password",
}
export const validatorSchema = z.object({
  [LoginFormField.Email]: z.string().email(),
  [LoginFormField.Password]: z.string().min(8),
});

export type FormValues = z.infer<typeof validatorSchema>;

const defaultFormValues: FormValues = {
  [LoginFormField.Email]: "",
  [LoginFormField.Password]: "",
};

export const useLoginForm = () => {
  const { mutate: loginAction } = useLogin({
    onError: () => {
      toast.error("Login failed. Please check your credentials and try again.");
    },
  });

  const handleSubmit = ({ email, password }: FormValues) => {
    loginAction({
      email,
      password,
    });
  };

  const form = useForm({
    defaultValues: defaultFormValues,
    onSubmit: ({ value }) => {
      handleSubmit(value);
    },
  });

  return {
    form,
  };
};
