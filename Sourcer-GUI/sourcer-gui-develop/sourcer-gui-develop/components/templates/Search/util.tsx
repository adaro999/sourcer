import { SearchTabItem } from '../../atoms/SearchTabItem';
import { snakeCase, titleCase } from '../../../utils';
import { svgComponents } from '../../../componentLoader';
import { IConnectionType } from '../../../pages/api/credits/types';
import { IFilterCategory, IFilterItem } from '../../molecules/FilterSearch/types';
import { IFacetsKey, IGetProfilesRes } from '../../../pages/api/profiles/getProfiles/types';
import { IGetConnectedCredits } from '../../../pages/api/credits/types';

// builds the filter drop down options in the search form
const buildFilterItems = (facets: IGetProfilesRes['facets'], state?: Partial<Record<IFilterCategory, string>>): IFilterItem[] => {
  const builder: { name: IFilterCategory; arr: IFacetsKey }[] = [
    { name: 'job title', arr: 'job_titles' },
    { name: 'company', arr: 'companies' },
    { name: 'education', arr: 'degree' },
    { name: 'industry', arr: 'industries' },
    { name: 'school', arr: 'education' },
    { name: 'radius', arr: 'radius' },
  ];

  return builder
    .map(elm => ({
      name: elm.name,
      options: facets?.[elm.arr]?.buckets?.map(({ doc_count, key }) => {
        // check the incoming state to see if we have a checked value for one of the filter categories
        const stateFilterCategory = Object.keys(state || {}).find(item => item === snakeCase(elm.name));
        // mark it as isChecked if the state value (something like 'wells fargo') matches the current 'key' in the bucket arr
        const isChecked = state?.[stateFilterCategory as IFilterCategory] === key.toLowerCase();

        return {
          checked: isChecked,
          // disable the rest of the checkboxes if we already have a checked input in the current filter category
          // this is because we can only send one value per category to the api
          disabled: Boolean(!isChecked && stateFilterCategory),
          title: titleCase(key),
          totals: doc_count,
        };
      }),
    }))
    .filter(elm => elm?.options?.length > 0);
};

// turns the connected credits into Tab items for the Search template
const getSearchItems = (connectedCredits: IGetConnectedCredits[], searchType: IConnectionType) => {
  const searchMap: Record<IConnectionType, { icon: keyof typeof svgComponents; id: IConnectionType; title: string }> = {
    cab: { icon: 'CareerBuilder', id: 'cab', title: 'CareerBuilder' },
    dic: { icon: 'Dice', id: 'dic', title: 'Dice' },
    ind: { icon: 'Indeed', id: 'ind', title: 'Indeed' },
    all: { icon: 'Globe', id: 'all', title: 'Internet' },
  };

  return connectedCredits
    .map(elm => {
      if (!searchMap[elm.type]) {
        return { children: null, id: '' as IConnectionType };
      } else {
        const { icon, id, title } = searchMap[elm.type];
        if (id == 'ind') {
          return {
            children: <SearchTabItem {...{ icon, title }}>{''}</SearchTabItem>,
            id,
          };
        }
        return {
          children: <SearchTabItem {...{ icon, title }}>{searchType === id && `${elm.credits} Credits`}</SearchTabItem>,
          id,
        };
      }
    })
    .filter(elm => elm.children);
};

const optionReducer = <T,>(state: T, action: T) => ({
  ...state,
  ...action,
});

export { buildFilterItems, getSearchItems, optionReducer };
