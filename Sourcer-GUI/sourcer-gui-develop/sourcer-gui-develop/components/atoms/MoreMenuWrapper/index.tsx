import { PropsWithChildren } from 'react';

const MoreMenuWrapper = ({ children }: PropsWithChildren<Record<string, unknown>>) => (
  <div aria-labelledby="integrationsMenuButton" className="dropdown-menu fade dropdown-menu-right border rounded shadow-sm py-2">
    {children}
  </div>
);

export { MoreMenuWrapper };
