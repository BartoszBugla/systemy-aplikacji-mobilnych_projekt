import { useRegister } from "@/lib/api";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { z } from "zod";

export enum RegisterFormField {
  Email = "email",
  Password = "password",
  FirstName = "firstName",
  LastName = "lastName",
}
export const validatorSchema = z.object({
  [RegisterFormField.Email]: z.string().email(),
  [RegisterFormField.Password]: z.string().min(8),
  [RegisterFormField.FirstName]: z.string().min(1, "First name is required"),
  [RegisterFormField.LastName]: z.string().min(1, "Last name is required"),
});

export type FormValues = z.infer<typeof validatorSchema>;

const defaultFormValues: FormValues = {
  [RegisterFormField.Email]: "",
  [RegisterFormField.Password]: "",
  [RegisterFormField.FirstName]: "",
  [RegisterFormField.LastName]: "",
};

export const useRegisterForm = () => {
  const { mutate: registerAction } = useRegister({
    onError: () => {
      toast.error("Login failed. Please check your credentials and try again.");
    },
  });

  const handleSubmit = ({
    email,
    password,
    firstName,
    lastName,
  }: FormValues) => {
    registerAction({
      email,
      password,
      firstName,
      lastName,
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
