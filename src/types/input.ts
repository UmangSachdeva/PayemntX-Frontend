// import { ControllerProps } from "react-hook-form";
import { InputProps as HeroInputProps } from "@heroui/input";

export type InputProps = {
  controller: {
    name: string;
  };
  input?: HeroInputProps;
};
