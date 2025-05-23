import { TransactionCurrency } from "@/lib/api";
import { useGetSpendWidget, useSetSpendLimit } from "@/lib/api/widgets";
import { formatCurrencyForLocale } from "@/lib/string-formatters";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { TransactionFormDrawer } from "../TransactionForm/TransactionFormDrawer";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader } from "../ui/card";
import { DrawerClose } from "../ui/drawer";
import { BaseFormInput } from "../ui/forms/FormInput";
import { Progress } from "../ui/progress";
import { SetLimitDrawer } from "../SetLimitDrawer";

export interface BudgetLimitWidgetProps {}

const getColor = (value: number) => {
  if (value < 70) {
    return "[&_[data-slot='progress-indicator']]:bg-green-500";
  } else if (value < 100) {
    return "[&_[data-slot='progress-indicator']]:bg-yellow-500";
  } else {
    return "[&_[data-slot='progress-indicator']]:bg-red-500";
  }
};
export const BudgetLimitWidget = (props: BudgetLimitWidgetProps) => {
  const { t } = useTranslation();

  const { data } = useGetSpendWidget();
  const { mutateAsync: setSpendLimit } = useSetSpendLimit();

  const [inputValue, setInputValue] = useState<number>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    if (value?.[0] === "0") {
      value = value.slice(1);
    }

    if (value === "") {
      setInputValue(undefined);
      return;
    }

    const parsedValue = parseFloat(value);

    if (!isNaN(parsedValue)) setInputValue(parsedValue);
  };

  const handleSumbit = () => {
    if (!inputValue) {
      toast.error(t("budget.invalidAmount"));
      return;
    }

    setSpendLimit({
      limit: inputValue,
    });
  };

  const percentageOftarget = ((data?.spend || 0) / (data?.target || 1)) * 100;

  return (
    <Card className="@container/card">
      <CardHeader className="relative">
        <CardDescription className="flex flex-row justify-between items-center">
          {t("budget.spendingLimit")}
          <SetLimitDrawer
            CustomComponent={
              <div className="flex flex-col gap-3 h-full">
                <div className="font-bold text-4xl mt-10">
                  {t("transaction.addNew")}
                </div>
                <BaseFormInput
                  wrapperProps={{
                    label: t("form.amount"),
                    error: undefined,
                  }}
                  type="number"
                  value={inputValue}
                  onChange={handleChange}
                />
                <div className="flex-1 w-full flex">
                  <DrawerClose asChild>
                    <Button
                      disabled={!inputValue}
                      type="submit"
                      className="w-full self-end"
                      onClick={handleSumbit}
                    >
                      {t("budget.submitButton")}
                    </Button>
                  </DrawerClose>
                </div>
              </div>
            }
          >
            <Button variant="outline">{t("budget.setNewLimit")}</Button>
          </SetLimitDrawer>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {t("budget.monthlySpend")}{" "}
        {formatCurrencyForLocale(
          data?.spend || 0,
          data?.currency || TransactionCurrency.USD
        )}
        &nbsp; {t("budget.from")} &nbsp;
        {formatCurrencyForLocale(
          data?.target || 0,
          data?.currency || TransactionCurrency.USD
        )}
        <Progress
          value={Math.min(percentageOftarget, 100)}
          className={getColor(percentageOftarget)}
        />
      </CardContent>
    </Card>
  );
};
