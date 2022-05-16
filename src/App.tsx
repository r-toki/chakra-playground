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
  TextareaProps,
} from "@chakra-ui/react";
import { FC } from "react";
import { Form, useField } from "react-final-form";

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

const AppInputControl: FC<AppInputControlProps> = ({ name, label, ...rest }) => {
  const { input, meta } = useField(name);
  return (
    <AppFormControl name={name} isRequired={rest.isRequired}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Input {...input} id={name} isInvalid={meta.touched && meta.error} />
      <AppFormError name={name} />
    </AppFormControl>
  );
};

type AppTextAreaControlProps = { name: string; label: string } & TextareaProps;

const AppTextAreaControl: FC<AppTextAreaControlProps> = ({ name, label, ...rest }) => {
  const { input, meta } = useField(name);
  return (
    <AppFormControl name={name} isRequired={rest.isRequired}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Textarea {...input} id={name} isInvalid={meta.touched && meta.error} />
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
            <AppInputControl name="firstName" label="名前" />
            <AppTextAreaControl name="otherComments" label="その他" />
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
