import { PropsWithChildren } from 'react';
import { CandidateLockedUnlocked } from '../../molecules/CandidateLockedUnlocked';

const CandidateLockedPreview = ({ children }: PropsWithChildren<Record<string, unknown>>) => (
  <CandidateLockedUnlocked message="Click the button below to message this candidate and unlock their contact information" type="locked">
    {children}
  </CandidateLockedUnlocked>
);

export { CandidateLockedPreview };
