import { PillButton } from '../../atoms/PillButton';
import { IPillButtonToggle } from './types';

const PillButtonToggle = ({ activeIndex, onChange }: IPillButtonToggle) => (
  <div className="d-flex justify-content-between rounded bg-gray-200 p-2">
    <PillButton
      className="mr-1"
      isActive={activeIndex === 0}
      onClick={() => {
        onChange(0);
      }}
    >
      Invite to Connect
    </PillButton>
    <PillButton
      className="ml-1"
      isActive={activeIndex === 1}
      onClick={() => {
        onChange(1);
      }}
    >
      Invite to Apply
    </PillButton>
  </div>
);

export { PillButtonToggle };
