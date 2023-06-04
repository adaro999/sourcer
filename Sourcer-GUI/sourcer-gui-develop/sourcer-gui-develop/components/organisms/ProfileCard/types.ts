import { ICard } from '../../../pages/api/profiles/getProfiles/types';

interface IProfileCard extends ICard {
  handleClick: (profile: ICard) => void;
  isActive: boolean;
}

export type { IProfileCard };
