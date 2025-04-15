import React from "react";
import { useController, UseControllerProps } from "react-hook-form";

import { Checkbox as HeroCheckbox } from "@heroui/checkbox";

interface CheckboxProps extends UseControllerProps {
  label: string;
  labelProps?: Object;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, ...props }) => {
  const {
    field,
    fieldState: { error },
  } = useController(props);

  return (
    <div className="flex flex-col">
      <label className="flex items-center space-x-2">
        <HeroCheckbox
          {...field}
          checked={field.value}
          className="form-checkbox"
        />
        <span {...props.labelProps}>{label}</span>
      </label>
      {error && <span className="text-sm text-red-500">{error.message}</span>}
    </div>
  );
};

export default Checkbox;
