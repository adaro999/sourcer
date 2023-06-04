import { ILocation } from './ILocation';

export interface ISchool {
  domain?: string;
  facebook_url?: string | null;
  id?: string | null;
  linkedin_id?: string | null;
  linkedin_url?: string;
  location: string | ILocation | null;
  name: string;
  profiles?: string[];
  twitter_url?: string | null;
  type?: string;
  website?: string | null;
}
