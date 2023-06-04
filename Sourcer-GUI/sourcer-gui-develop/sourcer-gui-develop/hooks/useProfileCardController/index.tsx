import { useCallback, useEffect, useReducer } from 'react';
import { profileCardReducer, profileCardState } from './reducer';
import { deleteProfileNotes, getMessageAndProfile, saveProfileNotes, saveProfile } from '../../api';
import { buildFilterItems } from '../../components/templates/Search/util';
import { handleHideUnHide, handleSaveUnSave } from './util';
import { pushAnalyticsEvent } from '../../utils/analytics';
import { ICard } from '../../pages/api/profiles/getProfiles/types';
import { IGetProfilesRes, IGetSavedProfilesRes } from '../../api/types';
import { IPageProps } from '../../types/types';
import { ISelectedOption } from '../../components/molecules/FilterSearch/types';
import { IUpdateResultsArrayValue } from './types';

const useProfileCardController = ({ company, jtToken, recruiterId }: Pick<IPageProps, 'company' | 'jtToken' | 'recruiterId'>) => {
  const [cardState, setCardState] = useReducer(profileCardReducer, profileCardState);

  // A helper wrapper around the profile results array to allow a reusable way to update
  // a single value inside a single object in that array
  // An example would be once a user has added a note to a profile, we will then update the
  // results array in place, changing their 'note' value to whatever they just typed in
  const updateResultsArrayValue: IUpdateResultsArrayValue = ({ profileId, cardKey, newCardKeyValue }) => {
    setCardState({
      type: 'query',
      payload: {
        results: cardState.query.results.map(elm => {
          if (elm.id === profileId) {
            (elm[cardKey] as typeof newCardKeyValue) = newCardKeyValue;
          }
          return elm;
        }),
      },
    });
  };

  // open candidate contact page
  const handleCandidateContact = (id?: string) => {
    if (id) {
      if (id.startsWith('ind')) {
        pushAnalyticsEvent('Indeed, Contact');
        window.open(cardState.candidate.active.raw_response?.bulkResponses[1]?.response.viewResumeUrls.onIndeed, '_blank');
      } else {
        const candidateUrl = `/candidates/${id}?contact&jtToken=${jtToken}`;
        window.open(candidateUrl, '_blank');
      }
    }
  };

  // DELETE NOTE
  const handleDeleteNote = async ({ id }: Pick<ICard, 'id'>) => {
    if (id) {
      const data = await deleteProfileNotes({ id, token: jtToken || '' });

      if (data?.toLowerCase() === 'success') {
        // update the selected profile to have no notes and reset the local state for that profile
        updateResultsArrayValue({ profileId: id, cardKey: 'notes', newCardKeyValue: '' });
        setCardState({ type: 'card-editing', payload: { [id]: { isEditing: false, notes: '' } } });
      }
    }
  };

  // click handler for 3-dotted 'meatball' menu in the profile card footer
  // this controls all of the different options inside of that menu
  const handleProfileFooterMenuClick = async ({ buttonName, ...rest }: ICard & { buttonName: string }) => {
    const { hidden, id } = rest;

    // HIDE/UNHIDE
    if (buttonName.toLowerCase() === 'hide' || buttonName.toLowerCase() === 'unhide') {
      const data = await handleHideUnHide({ buttonName, token: jtToken || '', ...rest });

      if (data?.toLowerCase() === 'success') {
        // update the selected profile to toggle the 'hidden' value
        updateResultsArrayValue({ profileId: id, cardKey: 'hidden', newCardKeyValue: !hidden });
      }
    }

    // ADD/EDIT NOTE
    if (buttonName.toLowerCase() === 'add note' || buttonName.toLowerCase() === 'edit note') {
      // update the local state to track we're editing the card now
      setCardState({ type: 'card-editing', payload: { [id]: { isEditing: true } } });
    }
  };

  // click handler for the save/unsaved button in the profile card footer
  const handleProfileFooterSaveClick = async (elm: ICard) => {
    const { id, saved } = elm;
    const data = await handleSaveUnSave({ token: jtToken || '', ...elm });

    if (data && data.toLowerCase() === 'success') {
      // update the selected profile to toggle the 'saved' value
      updateResultsArrayValue({ profileId: id, cardKey: 'saved', newCardKeyValue: !saved });
    }
  };

  // click handler for saving notes about the candidate
  // profile must be saved before adding notes
  const handleSaveNotes = async (elm: ICard) => {
    const { id, location, name } = elm;

    await saveProfile({
      first_name: name.first_name,
      id,
      json: elm,
      last_name: name.last_name || '',
      location,
      token: jtToken || '',
    });

    const data = await saveProfileNotes({ id: id || '', notes: cardState.candidate.editingState[id]?.notes || '', token: jtToken || '' });

    if (data && data.toLowerCase() === 'success') {
      // update the selected profile to have note
      updateResultsArrayValue({ profileId: id, cardKey: 'notes', newCardKeyValue: cardState.candidate.editingState[id]?.notes || '' });
      updateResultsArrayValue({ profileId: id, cardKey: 'saved', newCardKeyValue: true });
      // clear out the local state for the notes now that we've saved it
      setCardState({ type: 'card-editing', payload: { [id]: { isEditing: false, notes: '' } } });
    }
  };

  // callback handler for when one of the 'filter search by' options get checked/unchecked
  const onFilterBySearch = useCallback(
    async (obj: ISelectedOption) => {
      if (Object.keys(obj).length > 0) {
        setCardState({ type: 'query', payload: { isSearching: false, hasSearched: true, page: 1, results: [], selectedOptions: { ...cardState.query.selectedOptions, ...obj } } });
      }
    },
    [cardState.query.selectedOptions],
  );

  // clear out the old results when doing a new search
  const onSourceChange = useCallback(() => {
    setCardState({ type: 'query', payload: { hasSearched: true, isSearching: true, page: 1, results: [] } });
    setCardState({ type: 'candidate', payload: { active: {} } });
  }, []);

  // for when the search form has been submitted
  const onSubmit = useCallback(
    ({ newPage }: { newPage: number }) => {
      setCardState({ type: 'query', payload: { hasSearched: true, isSearching: true } });

      // increment the page count by 1 because we're adding more results from the same search term
      if (cardState.query.loadMore) {
        setCardState({ type: 'query', payload: { page: newPage } });
      } else {
        // clear out the old results when doing a new search
        setCardState({ type: 'query', payload: { page: 1, results: [] } });
        setCardState({ type: 'candidate', payload: { active: {}, message: null } });
      }
    },
    [cardState.query.loadMore],
  );

  // after searching, we need to update the results array and also
  // reset the loading state and whether or not the 'load more' button has been clicked
  const updateResults = useCallback(
    (data: IGetProfilesRes | IGetSavedProfilesRes) => {
      const totalResults = new Intl.NumberFormat().format((data as IGetProfilesRes)?.total_hits || 0);

      setCardState({
        type: 'query',
        // add to existing results on a loadMore, overwrite it if not
        payload: {
          hasSearched: true,
          isSearching: false,
          loadMore: false,
          results: cardState.query.loadMore ? [...cardState.query.results, ...data.card] : [...data.card],
          rliNewScroll: (data as IGetProfilesRes)?.meta?.rli_new_scroll,
          scrollId: (data as IGetProfilesRes)?.meta?.scroll_id,
          scrollJbtId: (data as IGetProfilesRes)?.meta?.scroll_jbt_id,
          totalResults,
        },
      });

      pushAnalyticsEvent.Search(data.card[0].id, cardState.query, totalResults);

      if (cardState.query.form === 'Advanced') {
        pushAnalyticsEvent('Advanced Search', { skills: cardState.query.skillTokens, jobTitle: cardState.query.jobTitleTokens });
      }
    },
    [cardState.query.form, cardState.query.jobTitleTokens, cardState.query.loadMore, cardState.query.results, cardState.query.skillTokens, cardState.query.what],
  );

  const onSuccessfulSubmit = useCallback(
    (data: IGetProfilesRes) => {
      setCardState({ type: 'query', payload: { filterItems: buildFilterItems(data.facets) } });
      updateResults(data);
    },
    [updateResults],
  );

  // side effect to load the resume and recruiter message whenever the active candidate changes
  useEffect(() => {
    if (cardState.candidate.active?.id && !cardState.candidate.active.source?.resume_loaded && !cardState.candidate.isLoading) {
      setCardState({ type: 'candidate', payload: { isLoading: true } });
      getMessageAndProfile({ profile_id: cardState.candidate.active.id, token: jtToken || '' }).then(({ message, profile }) => {
        setCardState({
          type: 'candidate',
          payload: {
            active: {
              ...cardState.candidate.active,
              ...profile,
              name: {
                first_name: profile.name?.first_name || cardState.candidate.active.name?.first_name || '',
                last_name: profile.name?.last_name || cardState.candidate.active.name?.last_name || '',
              },
              source: {
                ...cardState.candidate.active.source,
                ...profile?.source,
                resume_content: profile?.resume,
                resume_loaded: true,
              },
            },
            message,
          },
        });
        setCardState({ type: 'candidate', payload: { isLoading: false } });
      });
    }
  }, [cardState.candidate.active, cardState.candidate.isLoading, company?.companyId, jtToken, recruiterId, setCardState]);

  return {
    cardState,
    handleCandidateContact,
    handleDeleteNote,
    handleProfileFooterMenuClick,
    handleProfileFooterSaveClick,
    handleSaveNotes,
    onFilterBySearch,
    onSourceChange,
    onSubmit,
    onSuccessfulSubmit,
    setCardState,
    updateResults,
    updateResultsArrayValue,
  };
};

export { useProfileCardController };
