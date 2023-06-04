import { PageWrapper } from '../../components/atoms/PageWrapper';
import { ProfileTemplate } from '../../components/templates/Profile';
import { IPageProps } from '../../types/types';

const ProfileId = (props: IPageProps) => (
  <PageWrapper>
    <ProfileTemplate {...props} />
  </PageWrapper>
);

export default ProfileId;
