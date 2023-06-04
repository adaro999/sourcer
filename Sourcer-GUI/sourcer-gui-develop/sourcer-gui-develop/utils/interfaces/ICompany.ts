import { ICompanyLocation } from './ICompanyLocation';

export interface ICompany {
  facebook_url?: null | string;
  founded: string | number;
  id?: string;
  industry: string | null;
  linkedin_id?: string;
  linkedin_url?: string;
  location: ICompanyLocation;
  name: string;
  size: string;
  twitter_url?: null | string;
  website: string | null;
}
