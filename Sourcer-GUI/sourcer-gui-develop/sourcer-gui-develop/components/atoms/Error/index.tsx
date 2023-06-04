import { FallbackProps } from 'react-error-boundary';

const Error = ({ error }: FallbackProps) => (
  <div role="alert">
    <p>Oops! Something went wrong:</p>
    <pre>{error.message}</pre>
    <p>Please refresh the page and try again.</p>
  </div>
);

export { Error };
