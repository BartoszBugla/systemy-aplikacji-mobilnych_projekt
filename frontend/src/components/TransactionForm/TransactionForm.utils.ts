import {
  TransactionCategory,
  TransactionCurrency,
  TransactionType,
} from "@/lib/api";
import { useCreateTransaction } from "@/lib/api/transaction";
import { useGetMe } from "@/lib/api/user";
import { useForm } from "@tanstack/react-form";
import { useTranslation } from "react-i18next";

import { z } from "zod";

export enum TransactionFormField {
  Amount = "amount",
  Currency = "currency",
  Type = "type",
  Description = "description",
  Category = "category",
  accountReceiver = "accountReceiver",
  SecondUserEmail = "secondUserEmail",
}

export const createValidatorSchema = (
  t: (key: string) => string,
  currentUserEmail?: string
) =>
  z.object({
    [TransactionFormField.Amount]: z.coerce
      .number()
      .positive(t("validation.amountPositive")),
    [TransactionFormField.Currency]: z.nativeEnum(TransactionCurrency),
    [TransactionFormField.Type]: z.nativeEnum(TransactionType),
    [TransactionFormField.Description]: z
      .string()
      .min(1, t("validation.descriptionRequired")),
    [TransactionFormField.Category]: z.nativeEnum(TransactionCategory),
    [TransactionFormField.accountReceiver]: z.string().optional(),
    [TransactionFormField.SecondUserEmail]: z
      .string()
      .refine((value) => !currentUserEmail || value !== currentUserEmail, {
        message: t("validation.secondUserEmail"),
      })
      .optional(),
  });

export type FormValues = z.infer<ReturnType<typeof createValidatorSchema>>;

const defaultFormValues = {
  [TransactionFormField.Amount]: "" as unknown as number,
  [TransactionFormField.Currency]: TransactionCurrency.USD,
  [TransactionFormField.Type]: TransactionType.Expense,
  [TransactionFormField.Description]: "",
  [TransactionFormField.Category]: TransactionCategory.Food,
  [TransactionFormField.accountReceiver]: "",
  [TransactionFormField.SecondUserEmail]: "",
};

export const useTransactionForm = (externalOnSubmit: () => void) => {
  const { mutate } = useCreateTransaction();
  const { t } = useTranslation();

  const { data: currentUser } = useGetMe();

  const handleSubmit = ({
    accountReceiver,
    amount,
    category,
    currency,
    description,
    type,
    secondUserEmail,
  }: FormValues) => {
    mutate({
      accountReceiver,
      amount,
      category,
      currency,
      description,
      type,
      secondUserEmail,
    });

    externalOnSubmit();
  };

  const form = useForm({
    defaultValues: defaultFormValues,
    onSubmit: ({ value }) => {
      handleSubmit(value);
    },
    onSubmitInvalid: (error) => {
      console.error("Form submission error", error);
    },
    validators: {
      onSubmit: createValidatorSchema(t, currentUser?.email) as any,
    },
  });

  return {
    form,
  };
};

export const useTypeOptions = () => {
  const { t } = useTranslation();
  return [
    { value: TransactionType.Income, label: t("transaction.types.income") },
    { value: TransactionType.Expense, label: t("transaction.types.expense") },
  ];
};

export const useCategoryOptions = () => {
  const { t } = useTranslation();
  return [
    {
      value: TransactionCategory.Food,
      label: t("transaction.categories.food"),
    },
    {
      value: TransactionCategory.Transport,
      label: t("transaction.categories.transport"),
    },
    {
      value: TransactionCategory.Salary,
      label: t("transaction.categories.salary"),
    },
  ];
};

export const useCurrencyOptions = () => {
  const { t } = useTranslation();
  return [
    // { value: TransactionCurrency.EUR, label: t("transaction.currencies.eur") },
    { value: TransactionCurrency.USD, label: t("transaction.currencies.usd") },
  ];
};
