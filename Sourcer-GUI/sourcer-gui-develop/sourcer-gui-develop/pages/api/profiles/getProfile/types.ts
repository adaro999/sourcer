import { ICompanyLocation } from '../../../../utils/interfaces/ICompanyLocation';
import { IEducation } from '../../../../utils/interfaces/IEducation';
import { IExperience } from '../../../../utils/interfaces/IExperience';
import { ILoc } from '../../../../utils/interfaces/ILoc';
import { IPDLSource } from '../../../../utils/interfaces/sources/IPdlSource';

interface IProfileResumes {
  appId: string;
  channel: string;
  date: string;
  format: string;
  jobId: string;
  link: string;
  resumeId: string;
  resumeXml: string;
  source: string;
}

interface IProfile {
  educations: IEducation[];
  enriched_emails?: string[];
  enriched_phone?: string[];
  email: string;
  emails: { email: string; type: string }[];
  firstName: string;
  image: { date: string; link: string };
  jobSeekerId: string;
  jobs: IExperience[];
  lastName: string;
  location: ICompanyLocation;
  overview: string;
  phone: string;
  profileId: string;
  resumes: IProfileResumes[];
  skills: { name: string }[];
  title: string;
}

interface IJBTSource {
  appName: string;
  creationdate: string;
  job_seeker_id: string;
  myloc: ILoc;
  response: { profile: IProfile };
  resumeDate: string;
  resume_id: string;
}

interface IConnection {
  company_id: string;
  connection_time: string;
  isBlocked: string;
  isConnected: string;
  isPending: string;
  jobseeker_id: string;
  profile_id: string;
  recruiter_id: string;
  status: string;
}

interface IConversationDetails {
  company: string;
  connection_time: string;
  job_description: string;
  job_title: string;
  link: string;
  location: string;
  message: string;
  statusBlocked: string;
}

interface IResultRaw {
  number_pages: number;
  original_filename: string;
  pages: { content: string; filename: string; size: string }[];
  record_id: string;
}

interface IRawResponse {
  bulkResponses?: any;
  data?: any;
  desired_job_title: string;
  drivers_license: string;
  educational_level: string;
  email: string;
  emails?: string[];
  enriched_emails?: string[];
  enriched_phone?: string[];
  first_name: string;
  id: string;
  job_type: string;
  key_skills: string[];
  last_name: string;
  last_updated_utc: string;
  latest_job_title: string;
  lat: number;
  lon: number;
  max_expected_salary: string;
  min_expected_salary: string;
  pdf_only: boolean;
  phone?: string;
  phone_number: string;
  result: IResultRaw;
  source_id: number;
  state: string;
  town: string;
  unlock_status: string;
  unlock_timestamp: string;
  willing_to_relocate: string;
  willing_to_travel: number;
  work_experience: string;
  zip: string;
}

interface IJBT_PDLResponse {
  _id: string;
  _index: string;
  _primary_term: number;
  _seq_no: number;
  _type: string;
  _version: number;
  connection: IConnection;
  found: boolean;
  isConnected: string;
  conversationDetails: IConversationDetails;
  credits: string;
}

interface IJBT_Response extends IJBT_PDLResponse {
  _source: IJBTSource;
}

interface IPDL_Response extends IJBT_PDLResponse {
  _source: IPDLSource;
}

interface IRLIResponse {
  ADPresume: string;
  connection: IConnection;
  isConnected: string;
  raw_response: IRawResponse;
  resume: string;
  conversationDetails: IConversationDetails;
  credits: string;
}

type IGetProfileRes = IJBT_Response & IPDL_Response & IRLIResponse;

export type { IGetProfileRes, IJBT_PDLResponse, IJBT_Response, IPDL_Response, IRLIResponse, IRawResponse };
