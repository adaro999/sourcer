import { PropsWithChildren } from 'react';
import { Button } from 'reactstrap';
import dayjs from 'dayjs';
import { SvgLoader } from '../../atoms/SvgLoader';
import outreachCopy from './sentOutreach.json';
import { ISentOutreact } from './types';

const SentOutreachEmail = ({ children, name, jobDetails }: PropsWithChildren<ISentOutreact>) => (
  <div className="p-3 rounded" style={{ background: '#e4e6ef' }}>
    <div className="bg-white">
      <div className="border-bottom pl-3">
        <SvgLoader name="JobTarget" />
      </div>
      <div className="py-3 px-4">
        <div className="pb-3" style={{ textTransform: 'capitalize' }}>
          <strong>Hi {name}</strong>
        </div>
        <p>{outreachCopy.intro}</p>
        <p className="text-primary h5">{jobDetails?.job_title}</p>
        <div>
          {jobDetails?.jobDescription_company}
          <pre className="align-middle ml-1 mr-1 mb-1 h6" style={{ display: 'inline-block' }}>
            |
          </pre>
          {jobDetails?.jobDescription_location}
        </div>
        {children}
        <div className="h6">{outreachCopy.whyTitle}</div>
        <p className="text-gray-600">{outreachCopy.whyBody}</p>
        <div className="h6">{outreachCopy.withTitle}</div>
        <p className="text-gray-600">{outreachCopy.withBody}</p>
        <div className="text-center pb-3">
          <Button className="px-4 py-2" color="primary">
            Learn More
          </Button>
        </div>
      </div>
      <div className="py-3 px-4 d-flex flex-column align-items-center text-primary text" style={{ background: '#f3f7f9', fontSize: '12px' }}>
        <div>&copy; {dayjs().get('year')} JobTarget 600 Summer Street, 5th Floor | Stamford, CT 06901</div>
        <ul className="list-unstyled d-flex justify-content-between pt-3 px-5 w-100">
          <li>
            <u>Privacy Policy</u>
          </li>
          <li>
            <u>Terms of Service</u>
          </li>
          <li>
            <u>Unsubscribe</u>
          </li>
        </ul>
      </div>
    </div>
  </div>
);

export { SentOutreachEmail };
