import { KeyboardEvent, useEffect, useReducer, useRef, useState } from 'react';
import { FilterButton } from '../../atoms/FilterButton';
import { FilterOptionContainer } from '../../atoms/FilterOptionContainer';
import { optionReducer } from './util';
import { snakeCase, titleCase } from '../../../utils';
import { useOutsideClick } from '../../../hooks/useOutsideClick';
import { IFilterCategory, IFilterItem, IFilterSearch } from './types';

const FilterSearch = ({ items, onChange }: IFilterSearch) => {
  const [activeFilter, setActiveFilter] = useState<IFilterItem['name'] | null>(null);
  const [selectedOptions, setSelectedOptions] = useReducer(optionReducer, {});
  const containerRef = useRef(null);
  const { isOutside } = useOutsideClick(containerRef);

  const handleChange = (obj: Record<string, boolean>) => {
    // incomingValue = { 'job title': { 'the name of the job': true/false } }
    // we need to snake_case it to convert job title -> job_title
    const snakeCasedFilter = snakeCase(activeFilter || '');
    const incomingValue = { [snakeCasedFilter]: obj };
    activeFilter && setSelectedOptions({ type: snakeCasedFilter as IFilterCategory, update: incomingValue });

    // close the menu after a user makes a selection so they can't select a second value.
    // the checkboxes will only get disabled once the api has returned and the filter logic gets ran again
    setActiveFilter(null);
  };

  // hide the options container when pressing the escape key
  const handleKeyDown = ({ code }: KeyboardEvent) => {
    if (code === 'Escape') setActiveFilter(null);
  };

  // close the filter option dropdown if clicking outside
  // of the containing div
  useEffect(() => {
    if (isOutside) setActiveFilter(null);
  }, [isOutside]);

  useEffect(() => {
    if (Object.keys(selectedOptions).length > 0) {
      onChange(selectedOptions);
    }
  }, [onChange, selectedOptions]);

  return (
    <div className="d-flex align-items-center" data-testid="filter-search" ref={containerRef}>
      <h6 className="mb-0 text-gray-600 font-weight-normal user-select-none">
        <i className="far fa-filter"></i>
        <span className="pl-2 pr-3">Filter Search By:</span>
      </h6>
      <ul className="d-flex m-0 list-unstyled">
        {items?.map(({ name, options }, index) => {
          const isActive = name === activeFilter;

          return (
            <li className="position-relative" key={index}>
              <FilterButton onClick={() => setActiveFilter(isActive ? null : name)} onKeyDown={handleKeyDown}>
                {titleCase(name)}
              </FilterButton>
              <FilterOptionContainer className={isActive ? 'd-block' : 'd-none'} items={options} onKeyDown={handleKeyDown} {...{ handleChange, name }} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export { FilterSearch };
