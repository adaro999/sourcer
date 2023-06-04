import { useEffect, useState } from 'react';
import { PDFViewer } from '../../atoms/PDFViewer';
import { useWindowSize } from '../../../hooks/useWindowSize';
import { IRenderResume } from './types';

const RenderResume = ({ contactDiv, resume, searchType }: IRenderResume) => {
  const { windowSize } = useWindowSize(contactDiv);
  const [resumeHeight, setResumeHeight] = useState(0);

  useEffect(() => {
    const offsetFromBottom = 35;
    const { height, y } = contactDiv.current?.getBoundingClientRect() || { height: 0, y: 0 };
    const contactCandidateDiv = height + y;

    // set the height of the resume container based on the browser window
    setResumeHeight((windowSize.height || 0) - contactCandidateDiv - offsetFromBottom);
  }, [contactDiv, windowSize]);

  if (searchType === 'ind') {
    return <iframe height={resumeHeight} src={resume} style={{ border: 0 }} width="100%" />;
  } else {
    return (
      <div className="mb-3">
        <PDFViewer height={resumeHeight}>{resume}</PDFViewer>
      </div>
    );
  }
};

export { RenderResume };
