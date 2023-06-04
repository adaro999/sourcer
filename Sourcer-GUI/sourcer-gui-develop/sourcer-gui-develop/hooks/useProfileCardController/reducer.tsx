import { IProfileCardReducerAction, IProfileCardState } from './types';

const profileCardState: IProfileCardState = {
  candidate: {
    active: {},
    editingState: {},
    isLoading: false,
    message: null,
  },
  panel: {
    content: 'locked',
    isOpen: false,
    variant: 'large',
  },
  query: {
    filterItems: [],
    hasSearched: false,
    isLoading: false,
    isSearching: false,
    jobTitleTokens: [],
    loadMore: false,
    page: 1,
    results: [],
    rliNewScroll: '',
    searchLimit: {},
    selectedOptions: {},
    scrollId: '',
    scrollJbtId: '',
    skillTokens: [],
    totalResults: '0',
  },
};

const profileCardReducer = (state: IProfileCardState, { payload, type }: IProfileCardReducerAction) => {
  switch (type) {
    case 'candidate':
      return {
        ...state,
        candidate: {
          ...state.candidate,
          ...payload,
        },
      };
    case 'card-editing':
      const actionKey = Object.keys(payload)[0];

      return {
        ...state,
        candidate: {
          ...state.candidate,
          editingState: {
            ...state.candidate.editingState,
            [actionKey]: {
              ...state.candidate.editingState[actionKey],
              ...payload[actionKey],
            },
          },
        },
      };
    case 'panel':
      return {
        ...state,
        panel: {
          ...state.panel,
          ...payload,
        },
      };
    case 'query':
      return {
        ...state,
        query: {
          ...state.query,
          ...payload,
        },
      };
    default:
      throw new Error();
  }
};

export { profileCardReducer, profileCardState };
