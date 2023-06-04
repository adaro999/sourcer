import { IMenuItems } from '../../organisms/MoreMenu/types';

interface IMoreMenuListItem extends Omit<IMenuItems, 'page'> {
  variant?: 'large';
}

export type { IMoreMenuListItem };
