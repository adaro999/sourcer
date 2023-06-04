import { HTMLAttributes } from 'react';

const CloseButton = (props: HTMLAttributes<HTMLButtonElement>) => (
  <button aria-label="Close" className="close opacity-10" type="button" {...props}>
    <span aria-hidden="true">
      <i className="fal fa-times text-15 text-dark-fill"></i>
    </span>
  </button>
);

export { CloseButton };
