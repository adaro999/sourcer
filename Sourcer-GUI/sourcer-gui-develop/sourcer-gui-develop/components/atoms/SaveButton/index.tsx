import { Button } from 'reactstrap';
import { ISaveButton } from './types';

const SaveButton = ({ saved, ...rest }: ISaveButton) => (
  <Button color="link" className={`${saved ? 'text-primary' : 'text-body'} px-0`} type="button" {...rest}>
    <i aria-hidden="true" className={`${saved ? 'fas' : 'fal'} fa-star pr-1`} />
    {saved ? 'Saved' : 'Save'}
  </Button>
);

export { SaveButton };
