import React, { HTMLAttributes } from 'react';

const Dd = ({ children }: HTMLAttributes<HTMLDivElement>) => <dd className="mb-2 text-capitalize font-weight-normal-bold pl-3 ml-1">{children}</dd>;

export { Dd };
