import { Button } from 'reactstrap';
import { ISentOutreactMessage } from './types';

const SentOutreachMessage = ({ message, recruiter }: ISentOutreactMessage) => {
  return (
    <div className="bg-blue-10 rounded p-4 mb-4">
      <div className="pb-3">
        <strong>
          Message from {recruiter?.firstName} {recruiter?.lastName}
        </strong>
      </div>
      <p style={{ whiteSpace: 'pre-wrap' }}>{message}</p>
      <div className="pb-3">
        Sincerely,
        <div className="font-weight-semi-bold">{recruiter?.firstName}</div>
        Sourcing Specialist
      </div>
      <div className="d-flex justify-content-between">
        <Button className="px-4" color="primary">
          Interested
        </Button>
        <Button className="px-4" color="primary" outline>
          View Job
        </Button>
        <Button className="px-4" color="primary" outline>
          Not Interested
        </Button>
      </div>
    </div>
  );
};

export { SentOutreachMessage };
