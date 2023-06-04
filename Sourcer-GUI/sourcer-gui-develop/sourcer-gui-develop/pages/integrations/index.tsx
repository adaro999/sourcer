import { IntegrationsTemplate } from '../../components/templates/Integrations';
import { PageWrapper } from '../../components/atoms/PageWrapper';
import { IPageProps } from '../../types/types';

const Integrations = (props: IPageProps) => (
  <PageWrapper>
    <IntegrationsTemplate {...props} />
  </PageWrapper>
);

export default Integrations;
