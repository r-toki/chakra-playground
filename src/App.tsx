import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormLabel,
  Input,
  InputProps,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { Props as SelectProps, Select } from "chakra-react-select";
import { FC } from "react";
import { Form, useField } from "react-final-form";
import ReactTextareaAutosize, { TextareaAutosizeProps } from "react-textarea-autosize";

type AppFormControlProps = { name: string } & FormControlProps;

const AppFormControl: FC<AppFormControlProps> = ({ name, ...rest }) => {
  const { meta } = useField(name, { subscription: { touched: true, error: true } });
  return <FormControl {...rest} isInvalid={meta.touched && meta.error} />;
};

type AppFormErrorProps = { name: string };

const AppFormError: FC<AppFormErrorProps> = ({ name }) => {
  const { meta } = useField(name, { subscription: { error: true } });
  return <FormErrorMessage>{meta.error}</FormErrorMessage>;
};

type AppInputControlProps = { name: string; label: string } & InputProps;

const AppTextInputControl: FC<AppInputControlProps> = ({ name, label, ...rest }) => {
  const { input, meta } = useField(name);
  return (
    <AppFormControl name={name} isRequired={rest.isRequired}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Input {...rest} {...input} id={name} isInvalid={meta.touched && meta.error} />
      <AppFormError name={name} />
    </AppFormControl>
  );
};

type AppTextAreaControlProps = { name: string; label: string } & TextareaAutosizeProps;

const AppTextAreaControl: FC<AppTextAreaControlProps> = ({ name, label, ...rest }) => {
  const { input, meta } = useField(name);
  return (
    <AppFormControl name={name} isRequired={rest.required}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Textarea as={ReactTextareaAutosize} {...rest} {...input} id={name} isInvalid={meta.touched && meta.error} />
      <AppFormError name={name} />
    </AppFormControl>
  );
};

type AppSelectControlProps = { name: string; label: string } & SelectProps;

const AppSelectControl: FC<AppSelectControlProps> = ({ name, label, ...rest }) => {
  const { input, meta } = useField(name);
  return (
    <AppFormControl name={name} isRequired={rest.isRequired}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Select {...rest} {...input} id={name} isInvalid={meta.touched && meta.error} />
      <AppFormError name={name} />
    </AppFormControl>
  );
};

const onSubmit = (v: any) => {
  console.log(v);
};

const AppForm = () => {
  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit }) => (
        <Box as="form" onSubmit={handleSubmit}>
          <Stack>
            <AppTextInputControl name="firstName" label="名前" autoComplete="off" />
            <AppTextAreaControl name="otherComments" label="その他" />
            <AppSelectControl
              name="country"
              label="出身国"
              placeholder="国を選択してください"
              isClearable
              options={[{ label: "韓国", value: "korea" }]}
            />
            <Button type="submit" colorScheme="green">
              SAVE
            </Button>
          </Stack>
        </Box>
      )}
    />
  );
};

export const App = () => {
  return (
    <Container py="4">
      <AppForm />
    </Container>
  );
};
