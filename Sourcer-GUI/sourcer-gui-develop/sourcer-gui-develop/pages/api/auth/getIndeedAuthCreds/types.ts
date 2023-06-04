interface IIndeedAuth {
  accessToken: string;
  tokenExpiration: Date;
  refreshToken: string;
  employerId: string;
  tokenExpired: boolean;
}

interface IGetIndeedAuthRes {
  auth: IIndeedAuth;
}

export type { IGetIndeedAuthRes };
