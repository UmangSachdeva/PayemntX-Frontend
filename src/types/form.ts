import React, { FormEvent } from "react";

export type FormProps = {
  className?: string;
  children: React.ReactNode;
  onSubmit?: (event?: any) => void;
  resolver?: any;
};
