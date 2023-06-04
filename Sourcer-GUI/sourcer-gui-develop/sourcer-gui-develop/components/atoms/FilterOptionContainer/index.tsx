import { Checkbox } from '@jobtarget/ui-library';
import { titleCase } from '../../../utils';
import { IFilterOptionContainer } from './types';
import styles from './styles.module.scss';

const FilterOptionContainer = ({ className, handleChange, items, name, ...rest }: IFilterOptionContainer) => (
  <ul
    className={`${styles.container} position-absolute ml-1 mt-1 shadow-sm border rounded bg-white text-nowrap list-unstyled p-3 ${className}`}
    data-testid="filter-option-container"
    {...rest}
  >
    {items?.length === 0 ? (
      <li>
        <small>
          <em>- No Options Available -</em>
        </small>
      </li>
    ) : (
      items?.map(({ disabled, title, totals, ...rest }, index) => (
        <li className={`d-flex mb-3 ${styles.list}`} key={index}>
          <Checkbox id={title} name={title} label={titleCase(title)} {...{ disabled, handleChange, ...rest }} />
          {name !== 'radius' && <span className={`pl-3 ${disabled ? 'text-muted' : ''}`.trim()}>{totals}</span>}
        </li>
      ))
    )}
  </ul>
);

export { FilterOptionContainer };
