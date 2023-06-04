import { PropsWithChildren, useState } from 'react';
import { Collapse, Card } from 'reactstrap';
import { ToggleIcon } from '../../atoms/ToggleIcon';
import { ICollapseItem } from './types';

const CollapseItem = ({ children, index = 0, isOpen = false, title }: PropsWithChildren<ICollapseItem>) => {
  const [isActive, setIsActive] = useState(isOpen);
  return (
    <div className="border-bottom" data-testid="collapse-item">
      <button
        aria-controls={`collapse-container-${index}`}
        aria-expanded={isActive}
        className="has-focus border-0 bg-transparent mb-1 py-3 w-100 text-left"
        onClick={() => setIsActive(!isActive)}
        type="button"
      >
        <ToggleIcon className="mr-2" {...{ isActive }} />
        <span className="user-select-none" style={{ fontSize: '16px' }}>
          {title}
        </span>
      </button>
      <Collapse data-testid="collapse-container" id={`collapse-container-${index}`} isOpen={isActive}>
        <Card className="border-0 pb-1 bg-gray-100">
          <div className="px-3 py-4">
            <div className="py-2">{children}</div>
          </div>
        </Card>
      </Collapse>
    </div>
  );
};

export { CollapseItem };
