import { CandidatesTemplate } from '../../components/templates/Candidates';
import { PageWrapper } from '../../components/atoms/PageWrapper';
import { IPageProps } from '../../types/types';

const Candidates = (props: IPageProps) => (
  <PageWrapper>
    <CandidatesTemplate {...props} />
  </PageWrapper>
);

export default Candidates;
