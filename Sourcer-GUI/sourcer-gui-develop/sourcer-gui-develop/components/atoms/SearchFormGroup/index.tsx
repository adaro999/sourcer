import { PropsWithChildren } from 'react';
import { SearchFormGroupDiv } from './styles';

const SearchFormGroup = ({ children }: PropsWithChildren<Record<string, unknown>>) => <SearchFormGroupDiv className="no-gutters mb-0 pr-0">{children}</SearchFormGroupDiv>;

export { SearchFormGroup };
