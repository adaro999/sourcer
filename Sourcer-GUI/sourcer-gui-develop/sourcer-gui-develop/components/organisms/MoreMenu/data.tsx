import { PAGE_NAMES } from '../../../utils/enums';

const moreMenuItems = [
  {
    description: 'Search, message, and unlock resumes',
    icon: 'far fa-search',
    page: PAGE_NAMES.SEARCH,
    title: 'Find Resume',
    variant: 'large',
  },
  {
    description: 'Send message and manage candidates',
    icon: 'fal fa-star',
    page: PAGE_NAMES.CANDIDATES,
    title: 'Saved candidates',
    variant: 'large',
  },
  {
    description: 'Explore and Connect apps on Sourcer',
    icon: 'fal fa-shapes',
    page: PAGE_NAMES.INTEGRATIONS,
    title: 'Integrations',
    variant: 'large',
  },
];

export { moreMenuItems };
