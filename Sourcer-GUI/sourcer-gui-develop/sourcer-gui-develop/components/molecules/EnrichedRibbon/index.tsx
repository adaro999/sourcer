import { IRibbon, Ribbon } from '@jobtarget/ui-library';
import { SvgLoader } from '../../atoms/SvgLoader';

const EnrichedRibbon = ({ position }: IRibbon) => (
  <Ribbon {...{ position }}>
    <SvgLoader color="#fff" className="mt-n1" height={14} name="Enrich" width={14} />
    <span className="pl-2">Enriched</span>
  </Ribbon>
);

export { EnrichedRibbon };
