import { GenericAbortSignal } from 'axios';
import { ICard } from '../pages/api/profiles/getProfiles/types';
import { IConnectionType, IGetCreditsRes } from '../pages/api/credits/types';
import { IGetEmailTemplatesRes } from '../pages/api/message/getEmailTemplates/types';
import { IGetMessageRes } from '../pages/api/getMessage/types';
import { IGetJobsJobTargetRes } from '../pages/api/jobs/getJobsJobTarget/types';
import { IGetOtherJobsRes } from '../pages/api/jobs/getOtherJobs/types';
import { IGetIntegrationsForRecruiterRes } from '../pages/api/integrations/getIntegrationsForRecruiter/types';
import { IGetAllProfilesRes } from '../pages/api/profiles/getAllProfiles/types';
import { IGetConnectedCredits } from '../pages/api/credits/types';
import { IGetProfileRes } from '../pages/api/profiles/getProfile/types';
import { IGetProfilesRes } from '../pages/api/profiles/getProfiles/types';
import { IGetSavedProfilesRes } from '../pages/api/profiles/getSavedProfiles/types';
import { IGetUnlockedProfilesRes } from '../pages/api/profiles/getUnlockedProfiles/types';
import { IntegrationCards } from '../pages/api/integrations/getIntegrationsForRecruiter/types';
import { IJobSeekerMessageRes } from '../pages/api/message/jobSeekerMessage/types';
import { IGetJobsByIdRes } from '../pages/api/jobs/getJobsById/types';
import { IGetDicTokenRes } from '../pages/api/integrations/getDicToken/types';
import { IGetUnlockedProfileRes } from '../pages/api/profiles/getUnlockedProfile/types';

type IAuthorizeCabClient = (args: { code: string; token: string }) => Promise<string | null>;

type IAuthorizeDiceClient = (args: { email: string; password: string; token: string }) => Promise<string | null>;

type IAuthorizeIndeedClient = (args: { code: string; employer: string; state: string; token: string }) => Promise<string | null>;

type IConnectIntegrationClient = (args: { integration_type: string; access_token: string; refresh_token: string; token: string }) => Promise<string | null>;

type IDecryptEncryptClient = (args: { token: string; value: string }) => Promise<string | null>;

type IDeleteProfileNotesClient = (args: Pick<IProfile, 'id'> & { token: string }) => Promise<string | null>;

type IDisconnectIntegrationClient = (args: { integration_type: string; token: string }) => Promise<string | null>;

type IGetAllProfilesClient = (args: IGetRIdProfiles & { token: string }) => Promise<IGetProfilesRes | null>;

type IGetAuthTokenClient = (args: { integration_type: number; token: string }) => Promise<string | null>;

type IGetConnectedCreditsClient = (args: { token: string }) => Promise<IGetConnectedCredits[] | null>;

type IGetCreditsClient = (args: { token: string }) => Promise<IGetCreditsRes | null>;

type IGetDicTokenClient = (args: { email: string; password: string; token: string }) => Promise<IGetDicTokenRes | null>;

type IGetEmailTemplatesClient = (args: { token: string }) => Promise<IGetEmailTemplatesRes[] | null>;

type IGetIntegrationsCreditsClient = (args: { cabToken: string; dicToken: string; token: string }) => Promise<IGetCreditsRes | null>;

type IGetIntegrationsForRecruiterClient = (args: { token: string }) => Promise<IntegrationCards[] | null>;

type IGetJobsByIdClient = (args: { job_id: string; token: string }) => Promise<IGetJobsByIdRes | null>;

type IGetJobsJobTargetClient = (args: { division_id: string; token: string }) => Promise<IGetJobsJobTargetRes | null>;

type IGetMessageClient = (args: { profileId: string; token: string }) => Promise<IGetMessageRes | null>;

type IGetOtherJobsClient = (args: { token: string }) => Promise<IGetOtherJobsRes[] | null>;

interface IGetProfile {
  profile_id: string;
  refresh?: boolean;
  getConversation?: boolean;
  getCredits?: boolean;
}

interface IGetProfiles {
  'companies_search'?: string;
  'company'?: string;
  'education'?: string;
  'industry'?: string;
  'industries'?: string;
  'job title'?: string;
  'job_title'?: string;
  'job_titles_search'?: string;
  'jobtitle_must_have'?: string;
  'lat': string;
  'lon': string;
  'page_no': string;
  'radius'?: string;
  'rli_new_scroll'?: string;
  'scroll_id'?: string;
  'scroll_jbt_id'?: string;
  'skills_must_have'?: string;
  'skills_search'?: string;
  'sources'?: IConnectionType;
  'school'?: string;
  'what': string;
  'where': string;
}

type IGetProfileClient = (args: IGetProfile & { token: string }) => Promise<Partial<ICard>>;

type IGetProfilesClient = (args: IGetProfiles & { signal: GenericAbortSignal; token: string }) => Promise<IGetProfilesRes | null>;

interface IGetRIdProfiles {
  page_no_saved_profile: number;
  q?: string;
}

type IGetSavedProfilesClient = (args: IGetRIdProfiles & { token: string }) => Promise<IGetProfilesRes | null>;

type IGetUnlockedProfileClient = (args: { profile_id: string; token: string }) => Promise<IGetUnlockedProfileRes | null>;

type IGetUnlockedProfilesClient = (args: IGetRIdProfiles & { token: string }) => Promise<IGetProfilesRes | null>;

type IHideProfileClient = (args: Required<Pick<IProfile, 'first_name' | 'id' | 'json' | 'last_name' | 'location'>> & { token: string }) => Promise<string | null>;

interface IJobSeekerMessage {
  body: string;
  jobDescriptionCompany: string;
  jobDescriptionLocation: string;
  jobDescriptionLink: string;
  jobDescriptionText: string;
  jobTitle: string;
  pphOptIn: string;
  profileId: string;
}

type IJobSeekerMessageClient = (args: IJobSeekerMessage & { token: string }) => Promise<IJobSeekerMessageRes | null>;

interface IProfile {
  id: string;
  first_name?: string;
  last_name?: string;
  location?: string;
  json?: string | ICard;
}

interface ISaveJob {
  job_title: string;
  job_company: string;
  job_description: string;
  job_location: string;
  sourcing_oppurtunity_name: string;
}

type ISaveJobClient = (args: ISaveJob & { token: string }) => Promise<string | null>;

type ISaveProfileClient = (args: Required<Pick<IProfile, 'first_name' | 'id' | 'json' | 'last_name' | 'location'>> & { token: string }) => Promise<string | null>;

type ISaveProfileNotesClient = (args: Pick<IProfile, 'id'> & { notes: string; token: string }) => Promise<string | null>;

interface ISaveTemplate {
  body: string;
  template_name: string;
}

type ISaveTemplateClient = (args: ISaveTemplate & { token: string }) => Promise<string | null>;

type IUnHideProfileClient = (args: Pick<IProfile, 'id'> & { token: string }) => Promise<string | null>;

type IUnSaveProfileClient = (args: Pick<IProfile, 'id'> & { token: string }) => Promise<string | null>;

export type {
  IAuthorizeDiceClient,
  IAuthorizeCabClient,
  IAuthorizeIndeedClient,
  IConnectIntegrationClient,
  IDecryptEncryptClient,
  IDeleteProfileNotesClient,
  IDisconnectIntegrationClient,
  IGetAllProfilesClient,
  IGetAllProfilesRes,
  IGetAuthTokenClient,
  IGetConnectedCreditsClient,
  IGetCreditsClient,
  IGetCreditsRes,
  IGetDicTokenClient,
  IGetEmailTemplatesClient,
  IGetEmailTemplatesRes,
  IGetIntegrationsCreditsClient,
  IGetIntegrationsForRecruiterClient,
  IGetIntegrationsForRecruiterRes,
  IGetJobsByIdClient,
  IGetJobsByIdRes,
  IGetJobsJobTargetClient,
  IGetJobsJobTargetRes,
  IGetMessageClient,
  IGetMessageRes,
  IGetOtherJobsClient,
  IGetOtherJobsRes,
  IGetProfile,
  IGetProfileClient,
  IGetProfileRes,
  IGetProfiles,
  IGetProfilesClient,
  IGetProfilesRes,
  IGetRIdProfiles,
  IGetSavedProfilesRes,
  IGetSavedProfilesClient,
  IGetUnlockedProfileClient,
  IGetUnlockedProfileRes,
  IGetUnlockedProfilesRes,
  IGetUnlockedProfilesClient,
  IHideProfileClient,
  IJobSeekerMessage,
  IJobSeekerMessageClient,
  IJobSeekerMessageRes,
  IProfile,
  ISaveJob,
  ISaveJobClient,
  ISaveProfileClient,
  ISaveProfileNotesClient,
  ISaveTemplate,
  ISaveTemplateClient,
  IUnHideProfileClient,
  IUnSaveProfileClient,
};
