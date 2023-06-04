import { HTMLAttributes } from 'react';

const ContactInfoButton = ({ children, ...rest }: HTMLAttributes<HTMLButtonElement>) => (
  <button className="position-relative border-0 bg-blue-10 text-body h5 font-weight-normal w-100 text-left has-focus py-3 px-4 mb-0 user-select-none" type="button" {...rest}>
    {children}
  </button>
);

export { ContactInfoButton };
