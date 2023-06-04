import { PropsWithChildren } from 'react';
import { Card, CardBody } from 'reactstrap';
import { UnlockedCandidateIcon } from '../../atoms/UnlockedCandidateIcon';
import { ICandidateLockedUnlocked } from './types';

const CandidateLockedUnlocked = ({ children, message, type }: PropsWithChildren<ICandidateLockedUnlocked>) => (
  <Card className="mb-2 bg-gray-100">
    <CardBody className="d-flex flex-column justify-content-center align-items-center">
      <h6 className="text-center">
        <UnlockedCandidateIcon {...{ type }} />
      </h6>
      <p className="text-gray-600 text-center">{message}</p>
      {children}
    </CardBody>
  </Card>
);

export { CandidateLockedUnlocked };
