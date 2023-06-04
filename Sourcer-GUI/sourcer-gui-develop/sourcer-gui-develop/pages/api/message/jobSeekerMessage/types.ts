interface IDsSettingsLink {
  connectionId: string;
  entityId: string;
  showAddress: boolean;
  showBackgroundCheck: boolean;
  showEmail: boolean;
  showHideReferences: boolean;
  showPhone: boolean;
  showProfile: boolean;
  showProfileUpdates: boolean;
  showResume: boolean;
  showToRecruiter: boolean;
}

interface ICount {
  totalActive: number;
  totalBlocked: number;
  totalInactive: number;
  totalPending: number;
}

interface IDsSettingsSelf {
  connectionId: string;
  entityId: string;
  showAddress: boolean;
  showEmail: boolean;
  showPhone: boolean;
  showProfile: boolean;
  showResume: boolean;
}

interface ICompanyInfo {
  addressLine1: string;
  addressLine2: string;
  city: string;
  companyName: string;
  connections: string[];
  contactInfoEnabled: boolean;
  count: ICount;
  country: string;
  date: string;
  dsSettingsSelf: IDsSettingsSelf;
  isBlocked: boolean;
  isConnected: boolean;
  profileAccessEnabled: boolean;
  state: string;
  url: string;
  zipCode: string;
}

interface IConnectionInfo {
  channel: string;
  companyId: string;
  contactInfoEnabled: boolean;
  date: string;
  dsSettingsLink: IDsSettingsLink;
  dsSettingsSelf: IDsSettingsLink;
  email: string;
  firstName: string;
  id: string;
  id64: string;
  isBlocked: boolean;
  isBlockedLink: boolean;
  isConnected: boolean;
  lastName: string;
  phone: string;
  profileAccessEnabled: boolean;
  status: string;
  timestamp: number;
}

interface IEmailInfo {
  isBlocked: boolean;
  isConnected: boolean;
  profileId: string[];
}

interface Entity {
  appliedDate?: null | string;
  channel: string;
  companies: Record<number, ICompanyInfo>;
  companyAddedDate?: null | string;
  companyIds: string[];
  connectionIds: string[];
  connections: Record<number, IConnectionInfo>;
  date: string;
  email: string;
  emails: Record<string, IEmailInfo>;
  firstName: string;
  id: string;
  id64: string;
  lastName: string;
  phone?: null | string;
  profileId: string;
  profileIds: string[];
  relativity: string;
  source?: null | unknown;
  status?: null | unknown;
  timestamp: number;
  type: string;
}

interface Data {
  entity: Entity;
}

interface IJobSeekerMessageRes {
  'data'?: Data;
  'message'?: string;
  'successEmail'?: string;
  'messages'?: string;
  'validateEmails'?: any;
  'error'?: string;
  'status'?: any;
  'total_message_count'?: number;
  'status_code'?: number;
  'lastKeyEvaluated'?: any;
  'ELK Response'?: { data: Data };
  'JS Response'?: { data: Data };
}

export type { IJobSeekerMessageRes };
