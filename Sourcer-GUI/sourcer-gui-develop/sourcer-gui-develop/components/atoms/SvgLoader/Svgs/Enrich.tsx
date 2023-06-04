import React, { SVGAttributes } from 'react';

const Enrich = ({ color = '#2f86dd', height = 16, width = 16, ...rest }: SVGAttributes<HTMLOrSVGElement>) => (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...{ color, height, width, ...rest }}>
    <path
      xmlns="http://www.w3.org/2000/svg"
      d="M10.1365 3.24366L12.0078 3.9922L12.7563 5.86355C12.8187 5.95712 12.8811 6.01949 13.0058 6.01949C13.0994 6.01949 13.1618 5.95712 13.2242 5.86355L14.0039 3.9922L15.8441 3.24366C15.9376 3.18129 16 3.11891 16 2.99415C16 2.90058 15.9376 2.83821 15.8441 2.77583L14.0039 1.9961L13.2242 0.155945C13.1618 0.0623782 13.0994 0 12.9747 0C12.8811 0 12.8187 0.0623782 12.7563 0.155945L12.0078 1.9961L10.1365 2.77583C10.0429 2.83821 9.98051 2.90058 9.98051 2.99415C9.98051 3.11891 10.0429 3.18129 10.1365 3.24366ZM15.8441 12.7563L14.0039 11.9766L13.2242 10.1365C13.1618 10.0429 13.0994 9.98051 12.9747 9.98051C12.8811 9.98051 12.8187 10.0429 12.7563 10.1365L12.0078 11.9766L10.1365 12.7563C10.0429 12.8187 9.98051 12.8811 9.98051 13.0058C9.98051 13.0994 10.0429 13.1618 10.1365 13.2242L12.0078 13.9727L12.7563 15.8441C12.8187 15.9376 12.8811 16 13.0058 16C13.0994 16 13.1618 15.9376 13.2242 15.8441L14.0039 13.9727L15.8441 13.2242C15.9376 13.1618 16 13.0994 16 12.9747C16 12.8811 15.9376 12.8187 15.8441 12.7563ZM12.0078 7.98441C11.9766 7.79727 11.883 7.61014 11.7271 7.54776L8.20273 5.76998L6.45614 2.2768C6.26901 1.93372 5.73879 1.93372 5.55166 2.2768L3.80507 5.76998L0.280702 7.54776C0.124756 7.61014 0 7.79727 0 7.98441C0 8.17154 0.124756 8.35868 0.280702 8.42105L3.80507 10.1988L5.55166 13.7232C5.64522 13.8791 5.80117 13.9727 6.01949 13.9727C6.20663 13.9727 6.36257 13.8791 6.45614 13.7232L8.20273 10.1988L11.7271 8.42105C11.883 8.35868 12.0078 8.17154 12.0078 7.98441Z"
      fill="currentColor"
    />
  </svg>
);

export default Enrich;
