import { PropsWithChildren } from 'react';
import { Col } from 'reactstrap';

const SentOutreachWrapper = ({ children, date }: PropsWithChildren<{ date?: string }>) => (
  <>
    <div className="pointer-event-none">
      <Col className="py-4 pl-4">
        <h4 className="mb-0">Sent Outreach</h4>
      </Col>
    </div>
    <div className="px-4 py-4">
      <h6 className="text-gray-600">{date}</h6>
      {children}
    </div>
  </>
);

export { SentOutreachWrapper };
