import { Button } from 'reactstrap';

const ShowOptionsButton = () => (
  <Button aria-expanded="false" aria-haspopup="true" aria-label="view more options" color="transparent" data-toggle="dropdown" id="integrationsMenuButton" type="button">
    <span className="sr-only">Show more</span>
    <i aria-hidden={true} className="fal fa-ellipsis-v text-15" />
  </Button>
);

export { ShowOptionsButton };
