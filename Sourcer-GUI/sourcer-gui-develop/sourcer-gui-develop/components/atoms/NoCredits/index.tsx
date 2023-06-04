import { PropsWithChildren } from 'react';
import { Card, CardBody } from 'reactstrap';

const NoCredits = ({ children }: PropsWithChildren<Record<string, unknown>>) => (
  <Card className="mb-2 bg-gray-100">
    <CardBody className="d-flex flex-column justify-content-center align-items-center py-5">
      <p className="text-gray-600 text-center m-0">{children}</p>
    </CardBody>
  </Card>
);
export { NoCredits };
