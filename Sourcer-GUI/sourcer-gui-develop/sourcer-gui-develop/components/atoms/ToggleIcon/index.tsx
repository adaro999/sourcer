import { IToggleIcon } from './types';
import styles from './styles.module.scss';

const ToggleIcon = ({ className, isActive, ...rest }: IToggleIcon) => (
  <div aria-hidden className={`${styles.toggle} d-inline-flex align-items-center justify-content-center border-0 m-0 p-0 bg-blue-20 ${className}`} {...rest}>
    <i data-active={isActive} data-testid="toggle-icon" className={`text-primary fal fa-solid fa-${isActive ? 'minus' : 'plus'}`} />
  </div>
);

export { ToggleIcon };
