import { FormProvider, useForm } from "react-hook-form";

import { FormProps } from "@/types/form";

function Form({
  onSubmit = () => {},
  className,
  resolver,
  children,
}: FormProps) {
  const methods = useForm({
    resolver: resolver,
  });

  const onSubmitForm = methods.handleSubmit((data: Object) => {
    onSubmit(data);
  });

  return (
    <FormProvider {...methods}>
      <form
        className={className}
        onSubmit={(e) => {
          e.preventDefault();
          onSubmitForm();
        }}
      >
        {children}
      </form>
    </FormProvider>
  );
}

export default Form;
