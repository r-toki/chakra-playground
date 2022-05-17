import {
  Box,
  Checkbox,
  CheckboxProps,
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormLabel,
  Input,
  InputProps,
  Radio,
  RadioGroup,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { Props as SelectProps, Select } from "chakra-react-select";
import { FC } from "react";
import { useField } from "react-final-form";
import TextareaAutosize, { TextareaAutosizeProps } from "react-textarea-autosize";

// Message
export const appFormMessage = {
  error: {
    requiredInput: "入力してください",
    requiredSelect: "選択してください",
  },
};

// Required Indicator
export const RedAsterisk: FC = () => {
  return (
    <Box as="span" role="presentation" aria-hidden="true" marginInlineStart="1" color="red">
      *
    </Box>
  );
};

// Base
export type AppFormControlProps = { name: string } & FormControlProps;

export const AppFormControl: FC<AppFormControlProps> = ({ name, ...rest }) => {
  const { meta } = useField(name, { subscription: { touched: true, error: true } });
  return <FormControl {...rest} isInvalid={meta.touched && meta.error} />;
};

export type AppFormErrorProps = { name: string };

export const AppFormError: FC<AppFormErrorProps> = ({ name }) => {
  const { meta } = useField(name, { subscription: { error: true } });
  return <FormErrorMessage>{meta.error}</FormErrorMessage>;
};

// Text Input
export type AppInputControlProps = { name: string; label: string } & InputProps;

export const AppInputControl: FC<AppInputControlProps> = ({ name, label, isRequired, ...rest }) => {
  const { input, meta } = useField(name);
  return (
    <AppFormControl name={name}>
      <FormLabel htmlFor={name}>
        {label}
        {isRequired && <RedAsterisk />}
      </FormLabel>
      <Input {...rest} {...input} id={name} isInvalid={meta.touched && meta.error} />
      <AppFormError name={name} />
    </AppFormControl>
  );
};

// Textarea Input
export type AppTextareaControlProps = { name: string; label: string; isRequired?: true } & TextareaAutosizeProps;

export const AppTextareaControl: FC<AppTextareaControlProps> = ({ name, label, isRequired, ...rest }) => {
  const { input, meta } = useField(name);
  return (
    <AppFormControl name={name}>
      <FormLabel htmlFor={name}>
        {label}
        {isRequired && <RedAsterisk />}
      </FormLabel>
      <Textarea as={TextareaAutosize} {...rest} {...input} id={name} isInvalid={meta.touched && meta.error} />
      <AppFormError name={name} />
    </AppFormControl>
  );
};

// Select Input
export type SelectValueType = { name: string; label: string };

export type AppSelectControlProps = { name: string; label: string } & SelectProps;

export const AppSelectControl: FC<AppSelectControlProps> = ({ name, label, isRequired, ...rest }) => {
  const { input, meta } = useField(name);
  return (
    <AppFormControl name={name}>
      <FormLabel htmlFor={name}>
        {label}
        {isRequired && <RedAsterisk />}
      </FormLabel>
      <Select {...rest} {...input} id={name} isInvalid={meta.touched && meta.error} />
      <AppFormError name={name} />
    </AppFormControl>
  );
};

// Checkbox Input
export type AppCheckboxControlProps = { name: string; label: string } & CheckboxProps;

export const AppCheckboxControl: FC<AppCheckboxControlProps> = ({ name, label, isRequired, ...rest }) => {
  const {
    input: { checked, ...input },
    meta,
  } = useField(name, { type: "checkbox" });
  return (
    <AppFormControl name={name}>
      <FormLabel htmlFor={name}>
        {label}
        {isRequired && <RedAsterisk />}
      </FormLabel>
      <Checkbox {...rest} {...input} isChecked={checked} id={name} isInvalid={meta.touched && meta.error} />
      <AppFormError name={name} />
    </AppFormControl>
  );
};

// Checkbox Array Input
export type AppCheckboxArrayInputProps = { name: string; value: string } & CheckboxProps;

export const AppCheckboxArrayInput: FC<AppCheckboxArrayInputProps> = ({ name, value, ...rest }) => {
  const {
    input: { checked, ...input },
  } = useField(name, { type: "checkbox", value });
  return <Checkbox {...rest} {...input} isChecked={checked} />;
};

export type AppCheckboxArrayControlProps = {
  name: string;
  label: string;
  options: { label: string; value: string }[];
  isRequired?: true;
};

export const AppCheckboxArrayControl: FC<AppCheckboxArrayControlProps> = ({ name, label, options, isRequired }) => {
  return (
    <AppFormControl name={name}>
      <FormLabel htmlFor={name}>
        {label}
        {isRequired && <RedAsterisk />}
      </FormLabel>
      <Stack spacing="1">
        {options.map((o) => (
          <AppCheckboxArrayInput key={o.value} name={name} value={o.value}>
            {o.label}
          </AppCheckboxArrayInput>
        ))}
      </Stack>
      <AppFormError name={name} />
    </AppFormControl>
  );
};

// Radio Group Input
export type AppRadioGroupControlProps = {
  name: string;
  label: string;
  options: { label: string; value: string }[];
  isRequired?: true;
};

export const AppRadioGroupControl: FC<AppRadioGroupControlProps> = ({ name, label, options, isRequired }) => {
  const { input } = useField(name);
  return (
    <AppFormControl name={name}>
      <FormLabel htmlFor={name}>
        {label}
        {isRequired && <RedAsterisk />}
      </FormLabel>
      <RadioGroup {...input}>
        <Stack spacing="1">
          {options.map((o) => (
            <Radio key={o.value} value={o.value}>
              {o.label}
            </Radio>
          ))}
        </Stack>
      </RadioGroup>
      <AppFormError name={name} />
    </AppFormControl>
  );
};
