import { SearchTabItem } from '../../atoms/SearchTabItem';
import { getSearchItems } from './util';
import { IConnectionType, IGetConnectedCredits } from '../../../pages/api/credits/types';

describe('getSearchItems', () => {
  const connCredits: IGetConnectedCredits[] = [
    { type: 'all', credits: 100 },
    { type: 'cab', credits: 100 },
  ];

  it('maps through the connected credits and doesnt break if something unexpected gets passed in', () => {
    const assert1 = getSearchItems(connCredits, 'all');
    const assert2 = getSearchItems([], 'all');
    const assert3 = getSearchItems([{ type: 'rli' as IConnectionType, credits: 100 }], 'all');

    expect(assert1[0]).toMatchObject({ children: <SearchTabItem icon="Globe" title="Internet" />, id: 'all' });
    expect(assert1[1]).toMatchObject({ children: <SearchTabItem icon="CareerBuilder" title="CareerBuilder" />, id: 'cab' });
    expect(assert2).toStrictEqual([]);
    expect(assert3).toStrictEqual([]);
  });
});
