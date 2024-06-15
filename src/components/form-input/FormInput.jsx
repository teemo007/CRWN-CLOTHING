import {
  GroupContainer,
  FormInputContainer,
  FormInputLabel,
} from "./form-input.styles.jsx";

const FormInput = ({ label, inputOptions }) => {
  return (
    <GroupContainer>
      <FormInputContainer {...inputOptions} />
      {label && (
        <FormInputLabel
          htmlFor={inputOptions.id}
          $shrink={inputOptions.value.length}
        >
          {label}
        </FormInputLabel>
      )}
    </GroupContainer>
  );
};

export default FormInput;
