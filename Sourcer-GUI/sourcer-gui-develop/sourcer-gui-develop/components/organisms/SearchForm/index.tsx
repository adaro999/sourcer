import React, { PropsWithChildren, useState } from 'react';
import { Col, Button, Label, InputGroup, InputGroupAddon } from 'reactstrap';
import Select from 'react-select';
import { InputIcon } from '../../atoms/InputIcon';
import { CustomOption } from '../../atoms/CustomOption';
import { geocodeByAddress, getLatLng, GoogleAutocomplete } from '../../atoms/GoogleAutocomplete';
import { SearchFormGroup } from '../../atoms/SearchFormGroup';
import { pushAnalyticsEvent } from '../../../utils/analytics';
import { titleCase } from '../../../utils';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import { ISearchForm } from './types';

const SearchForm = ({ children, formData, setFormData }: PropsWithChildren<ISearchForm>) => {
  const [localPlaces, setLocalPlaces] = useLocalStorage('sourcer-places', [{ label: '', value: '' }]);
  const [localJobs, setLocalJobs] = useLocalStorage<{ label?: string; value?: string }[]>('sourcer-jobs', [{ label: '', value: '' }]);
  const [newJob, setNewJob] = useState('');
  // only return unique values to options that have a label
  const selectOptions = [...new Map([{ label: newJob, value: newJob }, ...localJobs].map(elm => [JSON.stringify(elm), elm])).values()].filter(elm => elm?.label);

  const handleSearchTerm = (obj?: { label?: string; value?: string } | null) => {
    setNewJob(obj?.value || '');
    setFormData({ what: obj?.value || '' });
    setLocalJobs(oldState => {
      // first check if we already have it in the oldState to avoid duplicate items
      if (oldState.some(elm => elm['label'] === obj?.value) || !obj) return oldState;
      return [obj, ...oldState].filter(elm => elm?.label).slice(0, 5);
    });
  };

  const handlePlaceSelect = async (loc: string) => {
    const geoResults = await geocodeByAddress(loc);
    const { lat, lng } = await getLatLng(geoResults[0]);

    pushAnalyticsEvent('location-selection', { location: loc });
    setFormData({ where: { lat: lat.toString(), lon: lng.toString(), loc } });
  };

  const handleChange = (event: { label?: string } | null) => {
    if (event?.label) {
      handlePlaceSelect(event.label);
      setLocalPlaces(oldState => {
        // first check if we already have it in the oldState to avoid duplicate items
        if (oldState.some(elm => elm['label'] === event.label)) return oldState;
        return [{ label: event.label || '', value: event.label || '' }, ...oldState].filter(elm => elm.label).slice(0, 5);
      });
    } else {
      // location value has been cleared from the input
      setFormData({ where: { lat: '', lon: '', loc: '' } });
    }
  };

  const handleJobsDelete = (str: string) => {
    setLocalJobs(oldState => oldState.filter(elm => elm.label !== str));
  };

  const handlePlacesDelete = (str: string) => {
    setLocalPlaces(oldState => oldState.filter(elm => elm.label !== str));
  };

  return (
    <>
      <Col sm={6} className="px-0">
        <SearchFormGroup className="no-gutters">
          <Label for="search-what">What</Label>
          <InputGroup>
            <InputGroupAddon addonType="prepend" className="bg-white">
              <InputIcon>
                <i className="fas fa-search" />
              </InputIcon>
            </InputGroupAddon>
            <Select
              className="basic-single flex-grow-1"
              classNamePrefix="select"
              components={{
                Option: props => <CustomOption handleDelete={handleJobsDelete} icon="fa-search" {...props} />,
                IndicatorSeparator: () => null,
                DropdownIndicator: () => null,
              }}
              id="search-what"
              isClearable={true}
              isSearchable={true}
              name="what"
              onChange={handleSearchTerm}
              onInputChange={val => setNewJob(titleCase(val))}
              options={selectOptions}
              placeholder="Job Title, Skills, or Company"
              value={selectOptions.filter(elm => elm.value === formData?.what)}
              styles={{
                container: base => ({
                  ...base,
                  flex: '1',
                  position: 'static',
                  zIndex: 10,
                }),
                control: (provided, { isFocused }: { isFocused: boolean }) => ({
                  ...provided,
                  'width': '100%',
                  'borderColor': '#ced4da',
                  'marginLeft': '-1px',
                  'borderLeft': 'none',
                  'borderTopLeftRadius': '0',
                  'borderBottomLeftRadius': '0',
                  'boxShadow': 'none',
                  'position': 'static',
                  '&:hover': {
                    cursor: 'text',
                  },
                  ...(isFocused && {
                    borderColor: 'lightblue',
                  }),
                }),
                input: provided => ({
                  ...provided,
                }),
                menu: provided => ({
                  ...provided,
                  boxShadow: '0 0 20px lightgray',
                  left: '0',
                  position: 'absolute',
                }),
                option: (provided, { isFocused }: { isFocused: boolean }) => ({
                  ...provided,
                  'backgroundColor': '#fff',
                  'color': '#3f4254',
                  '&:hover': {
                    backgroundColor: '#F5F5F5',
                  },
                  ...(isFocused && {
                    background: '#F5F5F5',
                    color: '#3f4254',
                  }),
                }),
              }}
            />
          </InputGroup>
        </SearchFormGroup>
      </Col>
      <Col sm={6} className="d-flex align-items-end pr-0 mt-3 mt-md-auto">
        <SearchFormGroup className="flex-grow-1">
          <Label for="search-where">Where</Label>
          <InputGroup className="position-relative" data-testid="SearchWhere">
            <InputGroupAddon addonType="prepend" className="bg-white">
              <InputIcon>
                <i className="far fa-map-marker-alt" />
              </InputIcon>
            </InputGroupAddon>
            <GoogleAutocomplete
              defaultOptions={localPlaces.filter(elm => elm.label)}
              handleDelete={handlePlacesDelete}
              placeholder="City, State, or Zip"
              value={formData?.location?.loc ? { label: formData.location.loc, value: formData.location.loc } : undefined}
              {...{ handleChange }}
            />
          </InputGroup>
        </SearchFormGroup>
        <div className="pt-3">
          <Button className="ml-2" color="primary" disabled={!formData?.what} data-testid="SearchButton" type="submit">
            <i className="fal fa-search" />
          </Button>
        </div>
      </Col>
      {children}
    </>
  );
};

export { SearchForm };
