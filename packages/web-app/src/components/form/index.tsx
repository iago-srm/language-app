import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';

import { FormStyled } from './styles';

interface IForm {
  defaultValues?: {
    [key: string]: string;
  };
  children: any;
  onSubmit: (args: any) => any;
  schema: any;
}
export function Form({ defaultValues, children, onSubmit, schema }: IForm) {
  const defaults = defaultValues || {};
  const { register, formState: {errors}, handleSubmit } =
    useForm({
      defaultValues: defaults,
      resolver: yupResolver(schema)
    });

  return (
    <FormStyled onSubmit={handleSubmit(onSubmit)}>
      {React.Children.map(children, child => {
        return child.props.name
          ? React.createElement(child.type, {
              ...{
                ...child.props,
                register: register,
                key: child.props.name,
                errors
              }
            })
          : child;
       })}
    </FormStyled>
  );
}
