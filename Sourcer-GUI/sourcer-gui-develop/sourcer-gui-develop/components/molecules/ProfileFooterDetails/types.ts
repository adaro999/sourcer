import { ICard } from '../../../pages/api/profiles/getProfiles/types';

interface IProfileFooterDetails {
  card: ICard;
  isUnlocked: boolean;
  onSaveClick: () => void;
}

export type { IProfileFooterDetails };
