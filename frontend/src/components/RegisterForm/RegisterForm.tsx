import { Link } from "@tanstack/react-router";
import { Button, buttonVariants } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { BaseFormInput } from "../ui/forms/FormInput";
import { RegisterFormField, useRegisterForm } from "./RegisterForm.utils";

export const RegisterForm = () => {
  const { form } = useRegisterForm();

  return (
    <Card className="w-full max-w-sm mx-auto mt-[10%]">
      <CardContent>
        <form
          className="flex flex-col gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <form.Field name={RegisterFormField.Email}>
            {(field) => (
              <BaseFormInput
                wrapperProps={{
                  label: "Email",
                }}
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            )}
          </form.Field>

          <div className="flex gap-2">
            <form.Field name={RegisterFormField.FirstName}>
              {(field) => (
                <BaseFormInput
                  wrapperProps={{
                    label: "First name",
                  }}
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              )}
            </form.Field>
            <form.Field name={RegisterFormField.LastName}>
              {(field) => (
                <BaseFormInput
                  wrapperProps={{
                    label: "Last name",
                  }}
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              )}
            </form.Field>
          </div>

          <form.Field name={RegisterFormField.Password}>
            {(field) => (
              <BaseFormInput
                wrapperProps={{
                  label: "Password",
                  error: field.state.meta.errors?.[0],
                }}
                type="password"
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            )}
          </form.Field>

          <div className="flex justify-end gap-2">
            <Link
              className={buttonVariants({
                variant: "outline",
              })}
              to="/register"
              disabled={form.state.isSubmitting}
            >
              Zarejestruj się
            </Link>
            <Button disabled={form.state.isSubmitting}>Zaloguj się</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
