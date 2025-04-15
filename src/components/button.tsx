import React, { ComponentPropsWithoutRef } from "react";

import { Colors } from "@/types/button";

// type ButtonProps = {
//   style?: React.CSSProperties;
//   borderRadius?: Record<string, number>;
//   children?: React.ReactNode;
//   setCount?: React.Dispatch<number>;
//   //   onClick: (title: string) => number;
// };

type User = {
  sessionId: string;
  name: string;
};

// const convertToArray = <T,>(value: T): T[] => {
//   return [value];
// };

function convertToArray<T>(value: T): T[] {
  return [value];
}

type Guest = Omit<User, "name">;

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: "primary" | "secondary";
  colors?: Colors;
};

type SuperButtonProps = ButtonProps & {
  size?: "md" | "lg";
};

function Button({ type, ...rest }: ButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    console.log("hello");
  };

  return (
    <button type={type} {...rest} onClick={handleClick}>
      Hello
    </button>
  );
}

export default Button;
