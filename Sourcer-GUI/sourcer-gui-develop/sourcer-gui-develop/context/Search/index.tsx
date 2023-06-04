import React, { createContext, PropsWithChildren, useState } from 'react';
import { ISearchProps } from './types';

// TODO: do we need this context?
const SearchContext = createContext<ISearchProps>({
  searchData: '',
  setSearchData: '',
});

const SearchProvider = ({ children }: PropsWithChildren<Record<string, unknown>>) => {
  const [searchData, setSearchData] = useState(null);
  return <SearchContext.Provider value={{ searchData, setSearchData }}>{children}</SearchContext.Provider>;
};

export { SearchContext, SearchProvider };
