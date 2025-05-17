import { Input } from "../input";
import {
  BaseFormFieldWrapper,
  type BaseFormWrapperProps,
} from "./BaseFormFieldWrapper";

export interface FormInputProps extends React.ComponentProps<typeof Input> {
  wrapperProps?: BaseFormWrapperProps;
}

export const BaseFormInput = ({ wrapperProps, ...props }: FormInputProps) => {
  console.log("BaseFormInput", props, wrapperProps);
  return (
    <BaseFormFieldWrapper {...wrapperProps}>
      <Input {...props} />
    </BaseFormFieldWrapper>
  );
};
