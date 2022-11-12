interface IOptionType {
  label: string;
  value: string;
}

export interface ISelectProps {
  options: IOptionType[];
  onChange: (args: any) => any;
  value: IOptionType;
  selectedIcon?: any;
}
