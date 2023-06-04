import { PropsWithChildren } from 'react';
import { Container, Row } from 'reactstrap';

const FormWrapper = ({ children }: PropsWithChildren<Record<string, unknown>>) => (
  <Container>
    <Row className="bg-gray-100 p-3 mb-3 mt-0">{children}</Row>
  </Container>
);

export { FormWrapper };
