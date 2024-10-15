import { InputHTMLAttributes, FC } from "react";
import {
  GroupContainer,
  FormInputContainer,
  FormInputLabel,
} from "./form-input.styles";

type FormInputProps = {
  label: string;
} & InputHTMLAttributes<HTMLInputElement>;

const FormInput: FC<FormInputProps> = ({ label, ...inputOptions }) => {
  return (
    <GroupContainer>
      <FormInputContainer {...inputOptions} />
      {label && (
        <FormInputLabel
          $shrink={Boolean(
            inputOptions.value &&
              typeof inputOptions.value === "string" &&
              inputOptions.value.length
          )}
        >
          {label}
        </FormInputLabel>
      )}
    </GroupContainer>
  );
};

export default FormInput;
