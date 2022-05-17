import { Box, Button, Container, Stack } from "@chakra-ui/react";
import { Form } from "react-final-form";

import {
  AppCheckboxArrayControl,
  appFormMessage,
  AppInputControl,
  AppRadioGroupControl,
  AppSelectControl,
  AppTextareaControl,
  SelectValueType,
} from "./components/app-form-components";

type ExampleFormValues = {
  nickname: string;
  age: number;
  gender: "MALE" | "FEMALE" | "OTHER";
  prefecture: SelectValueType;
  otherComments: string;
};

const initialValues: Partial<ExampleFormValues> = {
  nickname: "",
  age: 30,
  gender: "MALE",
  otherComments: "",
};

const validate = (values: ExampleFormValues) => {
  const { requiredInput, requiredSelect } = appFormMessage.error;

  const errors: Partial<Record<keyof ExampleFormValues, string>> = {};

  if (!values.prefecture) errors.prefecture = requiredSelect;

  return errors;
};

const onSubmit = (v: ExampleFormValues) => {
  console.log(v);
};

const ExampleForm = () => {
  return (
    <Form
      initialValues={initialValues}
      validate={validate}
      onSubmit={onSubmit}
      render={({ handleSubmit }) => (
        <Box as="form" onSubmit={handleSubmit}>
          <Stack spacing="8">
            <Stack spacing="4">
              <AppInputControl name="nickname" label="ニックネーム" autoComplete="off" />
              <AppInputControl name="age" label="年齢" type="number" />
              <AppRadioGroupControl
                name="gender"
                label="性別"
                options={[
                  { value: "MALE", label: "男性" },
                  { value: "FEMALE", label: "女性" },
                  { value: "OTHER", label: "その他" },
                ]}
              />
              <AppCheckboxArrayControl
                name="favoriteSports"
                label="好きなスポーツ"
                options={[
                  { value: "soccer", label: "サッカー" },
                  { value: "baseball", label: "野球" },
                ]}
              />
              <AppSelectControl
                name="prefecture"
                label="都道府県"
                placeholder="選択してください"
                options={[
                  { value: "新潟県", label: "新潟県" },
                  { value: "石川県", label: "石川県" },
                ]}
              />
              <AppTextareaControl name="otherComments" label="最後にアピールしてください" isRequired />
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
      <ExampleForm />
    </Container>
  );
};
