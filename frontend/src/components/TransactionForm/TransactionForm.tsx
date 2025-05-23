import {
  TransactionType,
  type TransactionCategory,
  type TransactionCurrency,
} from "@/lib/api";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";

import { useGetMe, useGetUsers } from "@/lib/api/user";
import { BaseFormInput } from "../ui/forms/FormInput";
import { BaseFormSelect } from "../ui/forms/FormSelect";
import { SelectItem } from "../ui/select";
import {
  TransactionFormField,
  useCategoryOptions,
  useCurrencyOptions,
  useTransactionForm,
} from "./TransactionForm.utils";
import { DrawerClose } from "../ui/drawer";
import { useStore } from "@tanstack/react-store";

export interface TransactionFormProps {
  onSubmit: () => void;
}

export const TransactionForm = ({ onSubmit }: TransactionFormProps) => {
  const { form } = useTransactionForm(onSubmit);
  const { t } = useTranslation();

  const typeOptions = [
    { value: TransactionType.Expense, label: t("transaction.types.expense") },
    { value: TransactionType.Income, label: t("transaction.types.income") },
  ];
  const categoryOptions = useCategoryOptions();
  const currencyOptions = useCurrencyOptions();

  const users = useGetUsers();
  const { data: me } = useGetMe();

  const filteredUsersData = users.data?.data.filter(
    (user) => user.id !== me?.id
  );

  const [secondUserEmail, accountReceiver, type] = useStore(
    form.store,
    (state) => [
      state.values[TransactionFormField.SecondUserEmail],
      state.values[TransactionFormField.accountReceiver],
      state.values[TransactionFormField.Type],
    ]
  );

  return (
    <form
      className="flex flex-col gap-3 h-full"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <div className="font-bold text-4xl mt-10">{t("transaction.addNew")}</div>
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

      {!secondUserEmail && (
        <form.Field name={TransactionFormField.accountReceiver}>
          {(field) => (
            <BaseFormSelect
              wrapperProps={{
                label:
                  type === TransactionType.Expense
                    ? t("form.receiver")
                    : t("form.sender"),
                error: field.state.meta.errors?.[0]?.message,
              }}
              name={field.name}
              value={field.state.value}
              onValueChange={(val) => field.handleChange(val)}
              triggerClassName="w-full"
            >
              {(filteredUsersData || []).map((user) => (
                <SelectItem key={user.id} value={user.id}>
                  {user.email}
                </SelectItem>
              ))}
              <SelectItem
                className="opacity-70"
                value={null as unknown as string}
              >
                {t("form.clear")}
              </SelectItem>
            </BaseFormSelect>
          )}
        </form.Field>
      )}

      {!accountReceiver && (
        <form.Field name={TransactionFormField.SecondUserEmail}>
          {(field) => (
            <BaseFormInput
              wrapperProps={{
                label: t("form.secondUserEmail"),
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
      )}

      <div className="flex-1 w-full flex">
        <DrawerClose asChild>
          <Button
            type="submit"
            className="w-full self-end"
            disabled={form.state.isSubmitting}
          >
            {t("form.submit")}
          </Button>
        </DrawerClose>
      </div>
    </form>
  );
};
