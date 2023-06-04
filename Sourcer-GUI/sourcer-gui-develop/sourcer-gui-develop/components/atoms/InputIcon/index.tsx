import { PropsWithChildren } from 'react';
import { InputIconDiv } from './styles';

const InputIcon = ({ children }: PropsWithChildren<Record<string, unknown>>) => <InputIconDiv>{children}</InputIconDiv>;

export { InputIcon };
