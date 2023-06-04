import { components } from 'react-select';
import { Button } from '@jobtarget/ui-library';
import { IOption, ISelectOptionType } from './types';

const CustomOption = ({ children, handleDelete, icon, ...rest }: ISelectOptionType & IOption) => (
  <components.Option className="d-flex justify-content-between align-items-center" {...{ children, ...rest }}>
    <div>
      <i className={`far ${icon} pr-4 text-gray-500`} />
      <span className="text-body">{children}</span>
    </div>
    <Button
      onClick={e => {
        e.stopPropagation();
        handleDelete(children?.toString() || '');
      }}
      variant="transparent"
    >
      <i className="text-gray-500 fal fa-solid fa-times" />
    </Button>
  </components.Option>
);

export { CustomOption };
