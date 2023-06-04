import { svgComponents } from '../../../componentLoader';

interface ISearchTabItem {
  icon: keyof typeof svgComponents;
  title: string;
}

export type { ISearchTabItem };
