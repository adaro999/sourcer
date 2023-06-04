import { svgComponents } from '../../../componentLoader';

interface IIntegration {
  connected: boolean;
  type: string;
  image: keyof typeof svgComponents;
  title: string;
  url: string | undefined;
}

export type { IIntegration };
