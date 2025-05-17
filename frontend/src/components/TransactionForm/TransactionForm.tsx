import type {
  TransactionCategory,
  TransactionCurrency,
  TransactionType,
} from "@/lib/api";
import { Button } from "../ui/button";
import { useTranslation } from "react-i18next";

import { BaseFormInput } from "../ui/forms/FormInput";
import { BaseFormSelect } from "../ui/forms/FormSelect";
import { SelectItem } from "../ui/select";
import {
  TransactionFormField,
  useCategoryOptions,
  useCurrencyOptions,
  useTransactionForm,
  useTypeOptions,
} from "./TransactionForm.utils";
import { useGetUsers } from "@/lib/api/user";

export interface TransactionFormProps {}

export const TransactionForm = (props: TransactionFormProps) => {
  const { form } = useTransactionForm();
  const { t } = useTranslation();

  const typeOptions = useTypeOptions();
  const categoryOptions = useCategoryOptions();
  const currencyOptions = useCurrencyOptions();

  const users = useGetUsers();

  return (
    <form
      className="flex flex-col gap-3 h-full"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <div className="font-bold text-4xl">{t("transaction.addNew")}</div>
      <form.Field name={TransactionFormField.Amount}>
        {(field) => (
          <BaseFormInput
            wrapperProps={{
              label: t("form.amount"),
              error: field.state.meta.errors?.[0]?.message,
            }}
            type="number"
            step={10}
            id={field.name}
            name={field.name}
            value={field.state.value}
            onBlur={field.handleBlur}
            onChange={(e) => field.handleChange(Number(e.target.value))}
            className="w-full"
          />
        )}
      </form.Field>
      <form.Field name={TransactionFormField.Currency}>
        {(field) => (
          <BaseFormSelect
            wrapperProps={{
              label: t("form.currency"),
              error: field.state.meta.errors?.[0]?.message,
            }}
            name={field.name}
            value={field.state.value}
            onValueChange={(val) =>
              field.handleChange(val as TransactionCurrency)
            }
            triggerClassName="w-full"
          >
            {currencyOptions.map(({ value, label }) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </BaseFormSelect>
        )}
      </form.Field>
      <form.Field name={TransactionFormField.Type}>
        {(field) => (
          <BaseFormSelect
            wrapperProps={{
              label: t("form.type"),
              error: field.state.meta.errors?.[0]?.message,
            }}
            name={field.name}
            value={field.state.value}
            onValueChange={(value) =>
              field.handleChange(value as TransactionType)
            }
            triggerClassName="w-full"
          >
            {typeOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </BaseFormSelect>
        )}
      </form.Field>
      <form.Field name={TransactionFormField.Description}>
        {(field) => (
          <BaseFormInput
            wrapperProps={{
              label: t("form.description"),
              error: field.state.meta.errors?.[0]?.message,
            }}
            id={field.name}
            name={field.name}
            value={field.state.value}
            onBlur={field.handleBlur}
            onChange={(e) => field.handleChange(e.target.value)}
          />
        )}
      </form.Field>
      <form.Field name={TransactionFormField.Category}>
        {(field) => (
          <BaseFormSelect
            wrapperProps={{
              label: t("form.category"),
              error: field.state.meta.errors?.[0]?.message,
            }}
            placeholder={t("transaction.selectCurrency")}
            name={field.name}
            value={field.state.value}
            onValueChange={(value) =>
              field.handleChange(value as TransactionCategory)
            }
            triggerClassName="w-full"
          >
            {categoryOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </BaseFormSelect>
        )}
      </form.Field>

      <form.Field name={TransactionFormField.accountReceiver}>
        {(field) => (
          <BaseFormSelect
            wrapperProps={{
              label: t("form.receiver"),
              error: field.state.meta.errors?.[0]?.message,
            }}
            name={field.name}
            value={field.state.value}
            onValueChange={(val) => field.handleChange(val)}
            triggerClassName="w-full"
          >
            {users.data?.data.map((user) => (
              <SelectItem key={user.id} value={user.id}>
                {user.email}
              </SelectItem>
            ))}
          </BaseFormSelect>
        )}
      </form.Field>

      <div className="flex-1 w-full flex">
        <Button
          type="submit"
          className="w-full self-end"
          disabled={form.state.isSubmitting}
        >
          Submit
        </Button>
      </div>
    </form>
  );
};
