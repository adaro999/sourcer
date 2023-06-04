import { IPillButton } from './types';

const PillButton = ({ children, className, isActive, ...rest }: IPillButton) => {
  const activeClass = isActive ? 'active bg-white text-primary font-weight-normal-bold' : 'bg-transparent';
  const baseClass = 'has-focus rounded py-3 w-100 border-0 user-select-none';

  return (
    <button className={`${baseClass} ${activeClass} ${className || ''}`.trim()} type="button" {...rest}>
      {children}
    </button>
  );
};

export { PillButton };
