import { Select, SelectContent, SelectTrigger, SelectValue } from "../select";
import {
  BaseFormFieldWrapper,
  type BaseFormWrapperProps,
} from "./BaseFormFieldWrapper";

export interface FormInputProps extends React.ComponentProps<typeof Select> {
  wrapperProps?: BaseFormWrapperProps;
  placeholder?: string;
  triggerClassName?: string;
}

export const BaseFormSelect = ({
  wrapperProps,
  children,
  placeholder,
  triggerClassName,
  ...props
}: FormInputProps) => {
  return (
    <BaseFormFieldWrapper {...wrapperProps}>
      <Select {...props}>
        <SelectTrigger className={triggerClassName}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>{children}</SelectContent>
      </Select>
    </BaseFormFieldWrapper>
  );
};
