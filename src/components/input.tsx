import { Input as HeroInput } from "@heroui/input";
import { Controller, useFormContext } from "react-hook-form";

import { InputProps } from "@/types/input";

function Input({ controller, input }: InputProps) {
  const { control } = useFormContext();

  const { name } = controller;

  return (
    <Controller
      {...controller}
      control={control}
      name={name}
      render={({
        field: { name, value, onChange, onBlur, ref },
        fieldState: { invalid, error },
      }) => (
        <HeroInput
          {...input}
          ref={ref}
          errorMessage={error?.message}
          isInvalid={invalid}
          name={name}
          validationBehavior="aria"
          value={value}
          onBlur={onBlur}
          onChange={onChange}
        />
      )}
    />
  );
}

export default Input;
