import { RefObject } from 'react';
import { IConnectionType } from '../../../pages/api/credits/types';

interface IRenderResume {
  contactDiv: RefObject<HTMLDivElement>;
  resume: string;
  searchType: IConnectionType;
}

export type { IRenderResume };
