/* eslint @typescript-eslint/no-explicit-any: 0 */
// TODO: fix this
import { ILoc } from '../ILoc';

export interface IJbtSource {
  appName: string;
  creationdate: string | Date;
  email?: string;
  emails?: { address: string }[];
  job_seeker_id: string;
  mobile_phone?: string;
  myloc: ILoc;
  personal_emails?: string[];
  phone_numbers?: string[];
  phone_number?: string;
  profiles?: { url?: string }[];
  response: any; // this is a doozy
  resumeDate: string;
  resume_content?: string;
  resume_loaded?: boolean;
  updated_on?: string;
}
