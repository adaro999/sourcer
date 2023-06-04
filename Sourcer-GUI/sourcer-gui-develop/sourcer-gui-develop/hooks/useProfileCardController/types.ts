import { ICard } from '../../pages/api/profiles/getProfiles/types';
import { IFilterItem, ISelectedOption } from '../../components/molecules/FilterSearch/types';
import { IGetMessageRes } from '../../api/types';
import { IOffCanvas } from '../../components/atoms/OffCanvas/types';

interface ICardStateDetail {
  isEditing: boolean;
  notes: string;
}

interface ILocation {
  lat: string;
  loc: string;
  lon: string;
}

// { 'profileId': { isEditing: boolean, notes: string } }
type ICardState = Record<string, Partial<ICardStateDetail>>;

interface IProfileCandidate {
  active: Partial<ICard>;
  editingState: ICardState;
  isLoading: boolean;
  message: IGetMessageRes | null;
}

interface IProfilePanel {
  content: 'locked' | 'unlocked';
  isOpen: boolean;
  variant: IOffCanvas['variant'];
}

interface IProfileQuery {
  filterItems: IFilterItem[];
  form?: 'Advanced' | 'Candidate' | 'Search';
  hasSearched: boolean;
  isLoading: boolean;
  isSearching: boolean;
  jobTitleTokens: string[];
  loadMore: boolean;
  page: number;
  results: ICard[];
  rliNewScroll: string;
  searchLimit: Partial<Record<'Company' | 'Job Title' | 'Skills', boolean>>;
  selectedOptions: ISelectedOption;
  skillTokens: string[];
  scrollId: string | null;
  scrollJbtId: string;
  totalResults: string;
  what?: string;
  where?: ILocation;
}

interface IProfileCardState {
  candidate: IProfileCandidate;
  query: IProfileQuery;
  panel: IProfilePanel;
}

interface IProfileCardCandidateAction {
  type: 'candidate';
  payload: Partial<IProfileCandidate>;
}

interface IProfileCardCardEditingAction {
  type: 'card-editing';
  payload: ICardState;
}

interface IProfileCardPanelAction {
  type: 'panel';
  payload: Partial<IProfilePanel>;
}

interface IProfileCardQueryAction {
  type: 'query';
  payload: Partial<IProfileQuery>;
}

type IProfileCardReducerAction = IProfileCardCandidateAction | IProfileCardQueryAction | IProfileCardCardEditingAction | IProfileCardPanelAction;

type IUpdateResultsArrayValue = (obj: { profileId: string; cardKey: keyof ICard; newCardKeyValue: string | boolean }) => void;

export type { ICardStateDetail, ICardState, ILocation, IProfileCandidate, IProfileQuery, IProfileCardReducerAction, IProfileCardState, IUpdateResultsArrayValue };
