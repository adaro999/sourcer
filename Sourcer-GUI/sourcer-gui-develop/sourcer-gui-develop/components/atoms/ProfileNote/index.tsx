import { PropsWithChildren } from 'react';

const ProfileNote = ({ children }: PropsWithChildren<Record<string, unknown>>) => (
  <div className="text-gray-600">
    <i className="far fa-sticky-note pr-1 text-body"></i>
    {children}
  </div>
);

export { ProfileNote };
