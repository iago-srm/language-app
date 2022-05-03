import React from "react";

interface IInput {
  name: string;
  register?: any;
  errors?: any;
  placeholder?: string;
  inputType?: "input" | "textarea";
  type?: string;
}

export function Input({ register, name, errors, inputType, ...rest }: IInput) {
  return (
    <>
      <input {...register(name)} {...rest} className={className}/>
    <div className={styles.errorMessageContainer}>{<p>{errors[name]?.message}</p>}</div>
    </>
  )
}
