interface ICredits {
  premium_credits: string;
  premium_credits_available: string;
  premium_credits_used: string;
}

type IConnectionType = 'all' | 'cab' | 'dic' | 'ind';

type IGetCreditsRes = Record<string, ICredits>;

type IGetConnectedCredits = { credits: number; type: IConnectionType };

export type { IConnectionType, IGetConnectedCredits, IGetCreditsRes };
