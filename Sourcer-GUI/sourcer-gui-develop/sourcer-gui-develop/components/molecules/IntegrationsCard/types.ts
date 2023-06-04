import { IIntegration } from '../../templates/Integrations/types';
import { IPageProps } from '../../../types/types';

type IIntegrationsExtend = IIntegration & Pick<IPageProps, 'jtToken'>;

interface IIntegrationsCard extends IIntegrationsExtend {
  handleConnection: (connect: boolean, type: string, url: string) => void;
}

export type { IIntegrationsCard };
