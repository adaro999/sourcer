import { PropsWithChildren } from 'react';
import { SvgLoader } from '../SvgLoader';
import { ISearchTabItem } from './types';

const SearchTabItem = ({ children, icon, title }: PropsWithChildren<ISearchTabItem>) => (
  <div className="p-0 text-center">
    <div className="d-flex p-0">
      <SvgLoader className="mr-2" height="18" name={icon} width="18" />
      <h6>{title}</h6>
    </div>
    <div className="text-primary p-0" style={{ fontSize: '12px' }}>
      {children}
    </div>
  </div>
);

export { SearchTabItem };
