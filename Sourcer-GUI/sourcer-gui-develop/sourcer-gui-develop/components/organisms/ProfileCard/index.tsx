import { PropsWithChildren } from 'react';
import { Card } from 'reactstrap';
import { EnrichedRibbon } from '../../molecules/EnrichedRibbon';
import { ProfileCardBody } from '../../molecules/ProfileCardBody';
import { ProfileCardFooter } from '../../molecules/ProfileCardFooter';
import { ProfileCardHeader } from '../../molecules/ProfileCardHeader';
import { titleCase } from '../../../utils';
import { IProfileCard } from './types';

const ProfileCard = ({ children, handleClick, isActive, ...rest }: PropsWithChildren<IProfileCard>) => {
  if (rest.hidden) {
    return (
      <Card className="w-100 mb-sm-3 mb-2">
        <div className="w-100 p-1 px-3 d-flex justify-content-between align-items-center dropup">
          <div className="text-muted">
            <small>
              <em>{titleCase(rest.name.first_name)} (profile hidden)</em>
            </small>
          </div>
          {children}
        </div>
      </Card>
    );
  }

  return (
    <Card className={`${isActive ? 'border border-2 border-primary rounded' : ''} flex-fill mb-sm-3 mb-2`}>
      <button className="border-0 has-focus bg-transparent w-100 p-0 m-0 text-body text-left" onClick={() => handleClick(rest)} style={{ marginBottom: '1px' }}>
        <ProfileCardHeader {...rest} />
        <ProfileCardBody {...rest} />
      </button>
      <ProfileCardFooter>{children}</ProfileCardFooter>
      {rest.enriched_icon && <EnrichedRibbon position="top-right" />}
    </Card>
  );
};

export { ProfileCard };
