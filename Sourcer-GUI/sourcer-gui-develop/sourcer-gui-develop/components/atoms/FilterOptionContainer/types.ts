import { HTMLAttributes } from 'react';
import { IFilterCategory, IFilterOptions } from '../../molecules/FilterSearch/types';

interface IFilterOptionContainer extends HTMLAttributes<HTMLUListElement> {
  handleChange: (obj: Record<string, boolean>) => void;
  items?: IFilterOptions[];
  name?: IFilterCategory;
}

export type { IFilterOptionContainer };
