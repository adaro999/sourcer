import { HTMLAttributes } from 'react';

const FilterButton = ({ children, ...rest }: HTMLAttributes<HTMLButtonElement>) => (
  <button className="bg-white border rounded text-body has-focus mx-1 p-2" type="button" {...rest}>
    {children}
  </button>
);

export { FilterButton };
