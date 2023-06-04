interface ICoreApiGetUser {
  id: number;
  externalId: null | unknown;
  companyId: number;
  partnerId: number;
  channelSiteId: number;
  userType: string;
  active: boolean;
  created: string;
  contactInfo: {
    firstName: string;
    lastName: string;
    title: null | string;
    emailAddress: string;
    phoneNumber: string;
  };
}

interface IJTToken {
  unique_name: string;
  userId: string;
  companyId: string;
  email: string;
  demo_flag: string;
  role: string;
  nbf: number;
  exp: number;
  iat: number;
}

export type { ICoreApiGetUser, IJTToken };
