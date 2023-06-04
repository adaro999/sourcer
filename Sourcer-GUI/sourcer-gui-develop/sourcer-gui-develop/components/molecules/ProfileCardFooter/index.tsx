import { PropsWithChildren } from 'react';
import { CardFooter } from 'reactstrap';

const ProfileCardFooter = ({ children }: PropsWithChildren<Record<string, unknown>>) => (
  <CardFooter className="bg-transparent border-top-0 px-2 py-0" data-testid="ProfileCardFooter">
    <div className="w-100 border-top p-2 d-flex flex-column dropup">{children}</div>
  </CardFooter>
);

export { ProfileCardFooter };
