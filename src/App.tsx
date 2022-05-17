import { Box, Button, Container, Stack } from "@chakra-ui/react";
import { Form } from "react-final-form";

import { AppCheckboxArrayControl, AppRadioGroupControl, AppTextInputControl } from "./components/app-form-components";

const onSubmit = (v: any) => {
  console.log(v);
};

const AppForm = () => {
  return (
    <Form
      initialValues={{}}
      onSubmit={onSubmit}
      render={({ handleSubmit }) => (
        <Box as="form" onSubmit={handleSubmit}>
          <Stack spacing="8">
            <Stack spacing="4">
              <AppTextInputControl name="firstName" label="First name" isRequired />
              <AppCheckboxArrayControl
                name="toppings"
                label="Toppings"
                options={[
                  { value: "chicken", label: "Chicken" },
                  { value: "ham", label: "Ham" },
                  { value: "mushrooms", label: "Mushrooms" },
                ]}
                isRequired
              />
              <AppRadioGroupControl
                name="gender"
                label="Gender"
                options={[
                  { value: "MALE", label: "Male" },
                  { value: "FEMALE", label: "Female" },
                  { value: "OTHER", label: "Other" },
                ]}
                isRequired
              />
            </Stack>

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
