import { HTMLAttributes } from 'react';

interface IPillButton extends HTMLAttributes<HTMLButtonElement> {
  isActive: boolean;
}

export type { IPillButton };
