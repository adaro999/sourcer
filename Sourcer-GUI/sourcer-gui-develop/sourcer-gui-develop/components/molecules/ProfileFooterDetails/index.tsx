import { PropsWithChildren } from 'react';
import { MoreMenuWrapper } from '../../atoms/MoreMenuWrapper';
import { SaveButton } from '../../atoms/SaveButton';
import { ShowOptionsButton } from '../ShowOptionsButton';
import { UnlockedCandidateIcon } from '../../atoms/UnlockedCandidateIcon';
import { IProfileFooterDetails } from './types';

const ProfileFooterDetails = ({ card, children, isUnlocked, onSaveClick }: PropsWithChildren<IProfileFooterDetails>) => {
  const ellipsisButton = (
    <>
      <ShowOptionsButton />
      <MoreMenuWrapper>{children}</MoreMenuWrapper>
    </>
  );

  if (card.hidden) {
    return ellipsisButton;
  }

  if (isUnlocked) {
    return (
      <>
        <UnlockedCandidateIcon type="unlocked" />
        {ellipsisButton}
      </>
    );
  } else {
    return (
      <>
        <SaveButton saved={!!card.saved} onClick={() => onSaveClick()} />
        {ellipsisButton}
      </>
    );
  }
};

export { ProfileFooterDetails };
