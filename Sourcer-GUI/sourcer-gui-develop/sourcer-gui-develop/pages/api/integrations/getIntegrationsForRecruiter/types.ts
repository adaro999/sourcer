import { IConnectionType } from '../../credits/types';

interface IntegrationCards {
  company_id: number;
  created_date: string;
  integration_id: number;
  integration_type: IConnectionType | 'lev';
  recruiter_id: number;
  token_expiration: string;
  updated_date: string;
}

interface IGetIntegrationsForRecruiterRes {
  // could return 'no rows found'
  value: IntegrationCards[] | string;
  statusCode: number;
  contentType?: null | unknown;
}

export type { IGetIntegrationsForRecruiterRes, IntegrationCards };
