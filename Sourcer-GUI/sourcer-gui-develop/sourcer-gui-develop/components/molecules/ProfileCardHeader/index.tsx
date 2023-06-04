import { CardHeader, CardSubtitle, CardTitle } from 'reactstrap';
import { SvgLoader } from '../../atoms/SvgLoader';
import { ICard } from '../../../pages/api/profiles/getProfiles/types';
import { stringifyTimePassedDetails } from './util';
import { titleCase } from '../../../utils';

const ProfileCardHeader = ({ enriched_icon, location, name, unlocked, source }: ICard) => {
  const updatedOn = source?.updated_on ? stringifyTimePassedDetails(source?.updated_on) : null;

  return (
    <CardHeader className="bg-transparent border-bottom-0">
      {updatedOn && <small className="d-block text-gray-600 font-weight-light pb-2"> Last updated {updatedOn} ago</small>}
      <CardTitle>
        <h4 className="text-capitalize mb-0">
          {titleCase(name?.first_name)} {unlocked ? titleCase(name?.last_name) : ''}{' '}
          {enriched_icon && (
            <span className="pl-1">
              <SvgLoader name="Enrich" />
            </span>
          )}
        </h4>
      </CardTitle>
      <CardSubtitle className="text-capitalize font-weight-light">{location}</CardSubtitle>
    </CardHeader>
  );
};

export { ProfileCardHeader };
