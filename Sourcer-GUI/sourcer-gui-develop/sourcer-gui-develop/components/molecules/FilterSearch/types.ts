type IFilterCategory = 'job title' | 'job_title' | 'company' | 'education' | 'industry' | 'industries' | 'school' | 'radius';

// { 'job title': { 'the name of the job': true/false } }
type ISelectedOption = Partial<Record<IFilterCategory, Record<string, boolean>>>;

interface IFilterOptions {
  checked?: boolean;
  disabled?: boolean;
  title: string;
  totals?: number | string;
}

interface IFilterItem {
  name: IFilterCategory;
  options?: IFilterOptions[];
}

interface IFilterSearch {
  items?: IFilterItem[];
  onChange: (obj: ISelectedOption) => void;
}

interface IOptionReducerAction {
  type: IFilterCategory;
  update: ISelectedOption;
}

export type { IFilterCategory, IFilterItem, IFilterOptions, IFilterSearch, IOptionReducerAction, ISelectedOption };
