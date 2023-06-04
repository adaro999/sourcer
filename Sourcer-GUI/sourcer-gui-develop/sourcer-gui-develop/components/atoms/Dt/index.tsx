import React, { PropsWithChildren } from 'react';
import { IDt } from './types';

const Dt = ({ children, title }: PropsWithChildren<IDt>) => (
  <dt className="font-weight-light text-capitalize">
    {children}
    {title}
  </dt>
);

export { Dt };
