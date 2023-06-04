import { PropsWithChildren } from 'react';

const PDFViewer = ({ children, height }: PropsWithChildren<Record<string, unknown>>) => (
  <embed
    src={`data:application/pdf;base64,${children}`}
    style={{
      width: '100%',
      minHeight: `${height ? `${height}px` : '100px'}`,
    }}
    type="application/pdf"
  />
);

export { PDFViewer };
