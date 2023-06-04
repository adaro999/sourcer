import { PageWrapper } from '../../components/atoms/PageWrapper';
import { SearchTemplate } from '../../components/templates/Search';
import { IPageProps } from '../../types/types';

const Search = (props: IPageProps) => (
  <PageWrapper>
    <SearchTemplate {...props} />
  </PageWrapper>
);

export default Search;
