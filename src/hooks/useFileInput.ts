import { ChangeEventHandler, useRef, useState } from "react";

export const useFileInput = () => {
  const ref = useRef<HTMLInputElement | null>(null);

  const [value, setValue] = useState<File>();

  const onClick = () => ref.current?.click();

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const files = e.target.files;
    if (!files || !files[0]) {
      return;
    }
    setValue(files[0]);
  };

  const reset = () => {
    setValue(undefined);
    if (ref.current?.value) ref.current.value = "";
  };

  return { ref, value, setValue, onClick, onChange, reset };
};
