import { GroupTypeBase, OptionProps, OptionTypeBase } from 'react-select';

interface IOption {
  handleDelete: (str: string) => void;
  icon: string;
}

type ISelectOptionType = OptionProps<OptionTypeBase, false, GroupTypeBase<OptionTypeBase>>;

export type { IOption, ISelectOptionType };
