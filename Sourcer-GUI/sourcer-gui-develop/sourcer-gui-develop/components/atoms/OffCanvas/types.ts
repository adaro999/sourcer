interface IOffCanvas {
  isActive: boolean;
  toggleActive: (state: boolean) => void;
  variant: 'small' | 'large';
}

export type { IOffCanvas };
