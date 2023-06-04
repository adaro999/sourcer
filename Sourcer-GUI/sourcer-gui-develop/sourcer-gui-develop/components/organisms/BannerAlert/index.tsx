import { Alert, Container } from '@jobtarget/ui-library';
import { IBannerAlert } from './types';

const BannerAlert = ({ isHidden, message }: IBannerAlert) => (
  <Container>
    {!isHidden && (
      <Alert>
        <strong>Holy guacamole!</strong> {message}.
      </Alert>
    )}
  </Container>
);

export { BannerAlert };
