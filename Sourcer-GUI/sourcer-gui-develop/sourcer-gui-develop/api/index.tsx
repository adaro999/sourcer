import axios, { AxiosRequestConfig } from 'axios';
import { Logger } from '../lib/Logger';
import {
  IAuthorizeCabClient,
  IAuthorizeDiceClient,
  IAuthorizeIndeedClient,
  IDecryptEncryptClient,
  IDeleteProfileNotesClient,
  IGetAuthTokenClient,
  IGetConnectedCreditsClient,
  IGetCreditsClient,
  IGetCreditsRes,
  IGetEmailTemplatesClient,
  IGetEmailTemplatesRes,
  IGetIntegrationsCreditsClient,
  IGetJobsByIdClient,
  IGetJobsByIdRes,
  IGetJobsJobTargetClient,
  IGetJobsJobTargetRes,
  IGetOtherJobsClient,
  IGetOtherJobsRes,
  IGetIntegrationsForRecruiterClient,
  IGetMessageClient,
  IGetMessageRes,
  IGetProfile,
  IGetProfileClient,
  IGetProfilesClient,
  IGetProfilesRes,
  IGetAllProfilesClient,
  IGetSavedProfilesClient,
  IGetUnlockedProfileClient,
  IGetUnlockedProfilesClient,
  IHideProfileClient,
  ISaveTemplateClient,
  ISaveJobClient,
  ISaveProfileClient,
  ISaveProfileNotesClient,
  IUnHideProfileClient,
  IUnSaveProfileClient,
  IJobSeekerMessageClient,
  IJobSeekerMessageRes,
  IConnectIntegrationClient,
  IDisconnectIntegrationClient,
  IGetDicTokenClient,
  IGetUnlockedProfileRes,
} from './types';
import { ICard } from '../pages/api/profiles/getProfiles/types';
import { IGetConnectedCredits } from '../pages/api/credits/types';
import { IGetDicTokenRes } from '../pages/api/integrations/getDicToken/types';
import { IntegrationCards } from '../pages/api/integrations/getIntegrationsForRecruiter/types';

// wrapper for making requests with JWT's
const fetchWithAuth = async <T,>(url: string, token: string, requestObj?: Omit<AxiosRequestConfig, 'headers'>): Promise<T> => {
  const { data } = await axios(url, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    ...requestObj,
  });
  return data;
};

const authorizeIndeed: IAuthorizeIndeedClient = async ({ code, employer, token, state }) => {
  try {
    const data = await fetchWithAuth<string>(`/api/auth/authorizeIndeed?code=${code}&employer=${employer}&state=${state}`, token);
    Logger.Info({ event: 'authorizeIndeed fetch', payload: { code, employer, state, token } });
    return data;
  } catch (error) {
    Logger({ error, message: 'error fetching authorizeIndeed' });
    return null;
  }
};

const authorizeCab: IAuthorizeCabClient = async ({ code, token }) => {
  try {
    const data = await fetchWithAuth<string>(`/api/auth/authorizeCab?code=${code}`, token);
    Logger.Info({ event: 'authorizeCab fetch', payload: { code, token } });
    return data;
  } catch (error) {
    Logger({ error, message: 'error fetching authorizeCab' });
    return null;
  }
};

const authorizeDice: IAuthorizeDiceClient = async ({ email, password, token }) => {
  try {
    const data = await fetchWithAuth<string>(`/api/auth/authorizeDice?email=${email}&password=${password}`, token);
    return data;
  } catch (error) {
    Logger({ error, message: 'error fetching authorizeDice' });
    return null;
  }
};

const connectIntegration: IConnectIntegrationClient = async ({ integration_type, access_token, refresh_token, token }) => {
  try {
    const data = await fetchWithAuth<string>(`/api/integrations/connect?integration_type=${integration_type}&access_token=${access_token}&refresh_token=${refresh_token}`, token, {
      method: 'post',
    });
    return data;
  } catch (error) {
    Logger({ error, message: 'error fetching connectIntegration' });
    return null;
  }
};

const decrypt: IDecryptEncryptClient = async ({ token, value }) => {
  try {
    const data = await fetchWithAuth<string>(`/api/decrypt?value=${value}`, token, { method: 'post' });
    Logger.Info({ event: 'decrypt fetch', payload: { value, token } });
    return data;
  } catch (error) {
    Logger({ error, message: 'error fetching decrypt' });
    return null;
  }
};

const deleteProfileNotes: IDeleteProfileNotesClient = async ({ token, ...rest }) => {
  // use the same saveProfileNotes api with empty notes field
  try {
    const data = await fetchWithAuth<string>('/api/profiles/saveProfileNotes', token, { data: { notes: '', ...rest }, method: 'post' });
    Logger.Info({ event: 'deleteProfileNotes fetch', payload: { ...rest, token } });
    return data;
  } catch (error) {
    Logger({ error: { postData: rest, ...(error as Record<string, unknown>) }, message: 'error fetching deleteProfileNotes' });
    return null;
  }
};

const disconnectIntegration: IDisconnectIntegrationClient = async ({ integration_type, token }) => {
  try {
    const data = await fetchWithAuth<string>(`/api/integrations/disconnect?integration_type=${integration_type}`, token, { method: 'post' });
    Logger.Info({ event: 'disconnectIntegration fetch', payload: { integration_type, token } });
    return data;
  } catch (error) {
    Logger({ error, message: 'error fetching disconnectIntegration' });
    return null;
  }
};

const encrypt: IDecryptEncryptClient = async ({ token, value }) => {
  try {
    const data = await fetchWithAuth<string>(`/api/encrypt?value=${value}`, token, { method: 'post' });
    Logger.Info({ event: 'encrypt fetch', payload: { value, token } });
    return data;
  } catch (error) {
    Logger({ error, message: 'error fetching encrypt' });
    return null;
  }
};

const encryptProfileId = async (profile_id: string) => {
  try {
    const { data } = await axios.get<string>(`/api/encryptProfileId?profile_id=${profile_id}`);
    Logger.Info({ event: 'encryptProfileId fetch', payload: { profile_id } });
    return data;
  } catch (error) {
    Logger({ error, message: 'error fetching encryptProfileId' });
    return null;
  }
};

const getAllCredits: IGetCreditsClient = async ({ token }) => {
  try {
    const data = await fetchWithAuth<IGetCreditsRes>('/api/credits/getAllCredits', token);
    return data;
  } catch (error) {
    Logger({ error, message: 'error fetching getAllCredits' });
    return null;
  }
};

const getAllProfiles: IGetAllProfilesClient = async ({ token, ...rest }) => {
  try {
    const data = await fetchWithAuth<IGetProfilesRes>('/api/profiles/getAllProfiles', token, { data: rest, method: 'post' });
    Logger.Info({ event: 'getAllProfiles fetch', payload: { ...rest, token } });
    return data;
  } catch (error) {
    Logger({ error: { postData: rest, ...(error as Record<string, unknown>) }, message: 'error fetching getAllProfiles' });
    return null;
  }
};

const getAuthToken: IGetAuthTokenClient = async ({ integration_type, token }) => {
  try {
    const data = await fetchWithAuth<string>(`/api/auth/getAuthToken?integration_type=${integration_type}`, token);
    Logger.Info({ event: 'getAuthToken fetch', payload: { integration_type, token } });
    return data;
  } catch (error) {
    Logger({ error, message: 'error fetching getAuthToken' });
    return null;
  }
};

const getCredits: IGetCreditsClient = async ({ token }) => {
  try {
    const data = await fetchWithAuth<IGetCreditsRes>('/api/credits/getCredits', token, { method: 'post' });
    return data;
  } catch (error) {
    Logger({ error, message: 'error fetching getCredits' });
    return null;
  }
};

const getConnectedCredits: IGetConnectedCreditsClient = async ({ token }) => {
  try {
    const data = await fetchWithAuth<IGetConnectedCredits[]>('/api/credits/getConnectedCredits', token);
    return data;
  } catch (error) {
    Logger({ error, message: 'error fetching getConnectedCredits' });
    return null;
  }
};

const getDicToken: IGetDicTokenClient = async ({ token, ...rest }) => {
  try {
    const data = await fetchWithAuth<IGetDicTokenRes>('/api/integrations/getDicToken', token, { data: rest, method: 'post' });
    Logger.Info({ event: 'getDicToken fetch', payload: { ...rest, token } });
    return data;
  } catch (error) {
    Logger({ error: { postData: rest, ...(error as Record<string, unknown>) }, message: 'error fetching getDicToken' });
    return null;
  }
};

const getEmailTemplates: IGetEmailTemplatesClient = async ({ token }) => {
  try {
    const data = await fetchWithAuth<IGetEmailTemplatesRes[]>('/api/message/getEmailTemplates', token);
    return data;
  } catch (error) {
    Logger({ error, message: 'error fetching getEmailTemplates' });
    return null;
  }
};

const getIntegrationsCredits: IGetIntegrationsCreditsClient = async ({ cabToken, dicToken, token }) => {
  try {
    const data = await fetchWithAuth<IGetCreditsRes>('/api/credits/getIntegrationsCredits', token, { data: { cabToken, dicToken }, method: 'post' });
    Logger.Info({ event: 'getIntegrationsCredits fetch', payload: { cabToken, dicToken, token } });
    return data;
  } catch (error) {
    Logger({ error: { postData: { cabToken, dicToken }, ...(error as Record<string, unknown>) }, message: 'error fetching getIntegrationsCredits' });
    return null;
  }
};

const getIntegrationsForRecruiter: IGetIntegrationsForRecruiterClient = async ({ token }) => {
  try {
    const data = await fetchWithAuth<IntegrationCards[]>('/api/integrations/getIntegrationsForRecruiter', token);
    return data;
  } catch (error) {
    Logger({ error, message: 'error fetching getIntegrationsForRecruiter' });
    return null;
  }
};

const getJobsById: IGetJobsByIdClient = async ({ job_id, token }) => {
  try {
    const data = await fetchWithAuth<IGetJobsByIdRes>(`/api/jobs/getJobsById?job_id=${job_id}`, token);
    Logger.Info({ event: 'getJobsById fetch', payload: { job_id, token } });
    return data;
  } catch (error) {
    Logger({ error, message: 'error fetching getJobsById' });
    return null;
  }
};

const getJobsJobTarget: IGetJobsJobTargetClient = async ({ division_id, token }) => {
  try {
    const data = await fetchWithAuth<IGetJobsJobTargetRes>(`/api/jobs/getJobsJobTarget?division_id=${division_id}`, token);
    Logger.Info({ event: 'getJobsJobTarget fetch', payload: { division_id, token } });
    return data;
  } catch (error) {
    Logger({ error, message: 'error fetching getJobsJobTarget' });
    return null;
  }
};

const getMessage: IGetMessageClient = async ({ profileId, token }) => {
  try {
    const data = await fetchWithAuth<IGetMessageRes>(`/api/getMessage?profile_id=${profileId}`, token);
    Logger.Info({ event: 'getMessage fetch', payload: { profileId, token } });
    return data;
  } catch (error) {
    Logger({ error, message: 'error fetching getMessage' });
    return null;
  }
};

const getMessageAndProfile = async (params: IGetProfile & { token: string }): Promise<{ message: IGetMessageRes | null; profile: Partial<ICard> }> => {
  try {
    const data = await Promise.all([getMessage({ profileId: params.profile_id, token: params.token }), getProfile(params)]);
    Logger.Info({ event: 'getMessageAndProfile fetch', payload: { ...params } });
    return { message: data[0], profile: data[1] };
  } catch (error) {
    Logger({ error, message: 'error fetching getMessageAndProfile' });
    return { message: null, profile: {} };
  }
};

const getOtherJobs: IGetOtherJobsClient = async ({ token }) => {
  try {
    const data = await fetchWithAuth<IGetOtherJobsRes[]>('/api/jobs/getOtherJobs', token);
    return data;
  } catch (error) {
    Logger({ error, message: 'error fetching getOtherJobs' });
    return null;
  }
};

const getProfile: IGetProfileClient = async ({ getConversation, getCredits, refresh, token, ...rest }) => {
  const params = {
    getConversation: getConversation ? getConversation : false,
    getCredits: getCredits ? getCredits : false,
    refresh: refresh ? refresh : false,
    ...rest,
  };

  try {
    const data = await fetchWithAuth<Partial<ICard>>('/api/profiles/getProfile', token, { data: params, method: 'post' });
    Logger.Info({ event: 'getProfile fetch', payload: { ...params } });
    return data;
  } catch (error) {
    Logger({ error: { postData: params, ...(error as Record<string, unknown>) }, message: 'error fetching getProfile' });
    return {};
  }
};

const getProfiles: IGetProfilesClient = async ({ industry, page_no, radius, signal, token, ...rest }) => {
  // Radius comes in as '10 miles' or '25 miles' by default
  // we need to return only the number
  const computedRadius = radius?.split(' ')?.[0];

  const params = {
    ...rest,
    industries: industry,
    job_titles_search: 'True',
    page_no: page_no === '1' ? '' : page_no,
    radius: computedRadius,
    RecordsPerPage: 10,
  };

  try {
    const data = await fetchWithAuth<IGetProfilesRes>('/api/profiles/getProfiles', token, { data: params, method: 'post', signal });
    Logger.Info({ event: 'getProfiles fetch', payload: { ...params } });
    return data;
  } catch (error) {
    Logger({ error: { postData: params, ...(error as Record<string, unknown>) }, message: 'error fetching getProfiles' });
    return null;
  }
};

const getSavedProfiles: IGetSavedProfilesClient = async ({ token, ...rest }) => {
  try {
    const data = await fetchWithAuth<IGetProfilesRes>('/api/profiles/getSavedProfiles', token, { data: rest, method: 'post' });
    Logger.Info({ event: 'getSavedProfiles fetch', payload: { ...rest, token } });
    return data;
  } catch (error) {
    Logger({ error: { postData: rest, ...(error as Record<string, unknown>) }, message: 'error fetching getSavedProfiles' });
    return null;
  }
};

const getUnlockedProfile: IGetUnlockedProfileClient = async ({ token, ...rest }) => {
  try {
    const params = {
      ...rest,
      resume_type: '1', // 1: pdf, 2:html
    };
    const data = await fetchWithAuth<IGetUnlockedProfileRes>('/api/profiles/getUnlockedProfile', token, { data: params, method: 'post' });
    Logger.Info({ event: 'getUnlockedProfile fetch', payload: { ...rest, token } });
    return data;
  } catch (error) {
    Logger({ error: { postData: rest, ...(error as Record<string, unknown>) }, message: 'error fetching getUnlockedProfile' });
    return null;
  }
};

const getUnlockedProfiles: IGetUnlockedProfilesClient = async ({ token, ...rest }) => {
  try {
    const data = await fetchWithAuth<IGetProfilesRes>('/api/profiles/getUnlockedProfiles', token, { data: rest, method: 'post' });
    Logger.Info({ event: 'getUnlockedProfiles fetch', payload: { ...rest, token } });
    return data;
  } catch (error) {
    Logger({ error: { postData: rest, ...(error as Record<string, unknown>) }, message: 'error fetching getUnlockedProfiles' });
    return null;
  }
};

const hideProfile: IHideProfileClient = async ({ token, ...rest }) => {
  try {
    const data = await fetchWithAuth<string>('/api/profiles/hideProfile', token, { data: rest, method: 'post' });
    Logger.Info({ event: 'hideProfile fetch', payload: { ...rest, token } });
    return data;
  } catch (error) {
    Logger({ error: { postData: rest, ...(error as Record<string, unknown>) }, message: 'error fetching hideProfile' });
    return null;
  }
};

const jobSeekerMessage: IJobSeekerMessageClient = async ({ token, ...rest }) => {
  try {
    const data = await fetchWithAuth<IJobSeekerMessageRes>('/api/message/jobSeekerMessage', token, { data: rest, method: 'post' });
    Logger.Info({ event: 'jobSeekerMessage fetch', payload: { ...rest, token } });
    return data;
  } catch (error) {
    Logger({ error: { postData: rest, ...(error as Record<string, unknown>) }, message: 'error fetching jobSeekerMessage' });
    return null;
  }
};

const saveJob: ISaveJobClient = async ({ token, ...rest }) => {
  try {
    const data = await fetchWithAuth<string>('/api/jobs/saveJob', token, {
      data: rest,
      method: 'post',
    });
    Logger.Info({ event: 'saveJob fetch', payload: { ...rest, token } });
    return data;
  } catch (error) {
    Logger({ error: { postData: rest, ...(error as Record<string, unknown>) }, message: 'error fetching saveJob' });
    return null;
  }
};

const saveProfile: ISaveProfileClient = async ({ token, ...rest }) => {
  try {
    const data = await fetchWithAuth<string>('/api/profiles/saveProfile', token, { data: rest, method: 'post' });
    Logger.Info({ event: 'saveProfile fetch', payload: { ...rest, token } });
    return data;
  } catch (error) {
    Logger({ error: { postData: rest, ...(error as Record<string, unknown>) }, message: 'error fetching saveProfile' });
    return null;
  }
};

const saveProfileNotes: ISaveProfileNotesClient = async ({ token, ...rest }) => {
  try {
    const data = await fetchWithAuth<string>('/api/profiles/saveProfileNotes', token, { data: rest, method: 'post' });
    Logger.Info({ event: 'saveProfileNotes fetch', payload: { ...rest, token } });
    return data;
  } catch (error) {
    Logger({ error: { postData: rest, ...(error as Record<string, unknown>) }, message: 'error fetching saveProfileNotes' });
    return null;
  }
};

const saveTemplate: ISaveTemplateClient = async ({ token, ...rest }) => {
  try {
    const data = await fetchWithAuth<string>('/api/message/saveTemplate', token, { data: rest, method: 'post' });
    Logger.Info({ event: 'saveTemplate fetch', payload: { ...rest, token } });
    return data;
  } catch (error) {
    Logger({ error: { postData: rest, ...(error as Record<string, unknown>) }, message: 'error fetching saveTemplate' });
    return null;
  }
};

const unHideProfile: IUnHideProfileClient = async ({ id, token }) => {
  try {
    const data = await fetchWithAuth<string>(`/api/profiles/unHideProfile?pid=${id}`, token, { method: 'post' });
    Logger.Info({ event: 'unHideProfile fetch', payload: { id, token } });
    return data;
  } catch (error) {
    Logger({ error, message: 'error fetching unHideProfile' });
    return null;
  }
};

const unSaveProfile: IUnSaveProfileClient = async ({ token, ...rest }) => {
  try {
    const data = await fetchWithAuth<string>('/api/profiles/unSaveProfile', token, { data: rest, method: 'post' });
    Logger.Info({ event: 'unSaveProfile fetch', payload: { ...rest, token } });
    return data;
  } catch (error) {
    Logger({ error: { postData: rest, ...(error as Record<string, unknown>) }, message: 'error fetching unSaveProfile' });
    return null;
  }
};

export {
  authorizeIndeed,
  authorizeCab,
  authorizeDice,
  connectIntegration,
  decrypt,
  deleteProfileNotes,
  disconnectIntegration,
  encrypt,
  encryptProfileId,
  fetchWithAuth,
  getAllCredits,
  getAllProfiles,
  getAuthToken,
  getConnectedCredits,
  getCredits,
  getDicToken,
  getEmailTemplates,
  getIntegrationsCredits,
  getIntegrationsForRecruiter,
  getJobsById,
  getJobsJobTarget,
  getMessage,
  getMessageAndProfile,
  getOtherJobs,
  getProfile,
  getProfiles,
  getSavedProfiles,
  getUnlockedProfile,
  getUnlockedProfiles,
  hideProfile,
  jobSeekerMessage,
  saveJob,
  saveProfile,
  saveProfileNotes,
  saveTemplate,
  unHideProfile,
  unSaveProfile,
};
