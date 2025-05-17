import { cn } from "@/lib/utils";
import { Label } from "../label";

export interface BaseFormWrapperProps {
  label?: string;
  labelProps?: React.ComponentProps<typeof Label>;
  error?: string;
  children?: React.ReactNode;
}

export const BaseFormFieldWrapper = ({
  label,
  labelProps = {},
  error,
  children,
}: BaseFormWrapperProps) => {
  return (
    <div>
      <Label className={cn("mb-1.5", labelProps.className)} {...labelProps}>
        {label}
      </Label>
      {children}
      {error && (
        <div className="text-destructive-foreground text-sm mt-1">{error}</div>
      )}
    </div>
  );
};
