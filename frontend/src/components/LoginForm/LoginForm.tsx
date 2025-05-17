import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Button, buttonVariants } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { BaseFormInput } from "../ui/forms/FormInput";
import { LoginFormField, useLoginForm } from "./LoginForm.utils";

export const LoginForm = () => {
  const { form } = useLoginForm();
  const { t } = useTranslation();

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
          <form.Field name={LoginFormField.Email}>
            {(field) => (
              <BaseFormInput
                wrapperProps={{
                  label: t("form.email"),
                }}
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            )}
          </form.Field>

          <form.Field name={LoginFormField.Password}>
            {(field) => (
              <BaseFormInput
                wrapperProps={{
                  label: t("form.password"),
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
              {t("dashboard.register")}
            </Link>
            <Button disabled={form.state.isSubmitting}>
              {t("common.submit")}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
