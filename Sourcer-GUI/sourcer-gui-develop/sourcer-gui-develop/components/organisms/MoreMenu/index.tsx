import { Button } from 'reactstrap';
import { MoreMenuList } from '../../molecules/MoreMenuList';
import { moreMenuItems } from './data';

const MoreMenu = () => (
  <div className="dropdown d-inline">
    <Button
      aria-expanded="false"
      aria-haspopup="true"
      aria-label="view more options"
      className="bg-blue-10 ml-2 px-3 py-1 btn-light-primary text-primary"
      data-toggle="dropdown"
      id="integrationsMenuButton"
      type="button"
    >
      <i aria-hidden="true" className="fal fa-ellipsis-v h4 mb-0 text-primary" />
    </Button>
    <MoreMenuList items={moreMenuItems} />
  </div>
);

export { MoreMenu };
