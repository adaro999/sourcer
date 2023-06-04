import { PropsWithChildren } from 'react';
import { CandidateLockedUnlocked } from '../../molecules/CandidateLockedUnlocked';

const CandidateUnlockedPreview = ({ children }: PropsWithChildren<Record<string, unknown>>) => (
  <CandidateLockedUnlocked message="A message has been sent to this candidate about one or more open roles. Unlocked candidate information is displayed below" type="unlocked">
    {children}
  </CandidateLockedUnlocked>
);

export { CandidateUnlockedPreview };
