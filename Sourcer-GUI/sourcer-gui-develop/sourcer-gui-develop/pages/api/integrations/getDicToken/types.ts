interface IGetDicTokenRes {
  access_token: string;
  token_type: string;
  refresh_token: string;
  expires_in: number;
  scope: string;
  client_id: string;
  username: string;
  user_id: number;
  user_type: string;
  dice_user: boolean;
  company_id: number;
  external_id?: unknown;
}

export type { IGetDicTokenRes };
