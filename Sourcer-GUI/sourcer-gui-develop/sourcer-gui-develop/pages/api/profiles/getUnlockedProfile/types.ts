import { ICard, IFacets } from '../getProfiles/types';

interface Meta {
  page_no: number;
}

interface IGetUnlockedProfileRes {
  card: Partial<ICard>;
  facets?: Partial<IFacets>;
  meta: Meta;
}

export type { IGetUnlockedProfileRes };
