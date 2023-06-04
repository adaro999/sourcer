interface IAuth {
  body: string;
}

interface IGetAuthRes {
  body: IAuth;
}

export type { IGetAuthRes };
