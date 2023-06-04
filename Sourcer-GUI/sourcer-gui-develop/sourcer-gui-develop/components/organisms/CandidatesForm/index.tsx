import React, { useState } from 'react';
import Select from 'react-select';
import { Col, Form, FormGroup, Button, InputGroup, InputGroupAddon, Label } from 'reactstrap';
import { CustomOption } from '../../atoms/CustomOption';
import { FormWrapper } from '../../molecules/FormWrapper';
import { InputIcon } from '../../atoms/InputIcon';
import { SearchFormGroup } from '../../atoms/SearchFormGroup';
import { ICandidatesForm } from './types';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import { titleCase } from '../../../utils';

const CandidatesForm = ({ formData, setFormData, handleSubmit }: ICandidatesForm) => {
  const [localTerms, setLocalTerms] = useLocalStorage<{ label?: string; value?: string }[]>('sourcer-candidate-terms', [{ label: '', value: '' }]);
  const [newTerm, setNewTerm] = useState('');

  const handleSearchTerm = (obj?: { label?: string; value?: string } | null) => {
    setNewTerm(obj?.value || '');
    setFormData({ what: obj?.value || '' });
    setLocalTerms(oldState => {
      // first check if we already have it in the oldState to avoid duplicate items
      if (oldState.some(elm => elm['label'] === obj?.value) || !obj) return oldState;
      return [obj, ...oldState].filter(elm => elm?.label).slice(0, 5);
    });
  };

  const handleTermsDelete = (str: string) => {
    setLocalTerms(oldState => oldState.filter(elm => elm.label !== str));
  };

  return (
    <Form onSubmit={handleSubmit} id="search-candidates-form" data-testid="SearchCandidatesForm" className="pt-0">
      <FormWrapper>
        <div className="d-flex align-items-end w-100">
          <Col sm={4} xs={10} className="mr-3 px-0">
            <SearchFormGroup className="no-gutters mb-0 pr-0">
              <Label for="search-what">Search Candidates</Label>
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
                    Option: props => <CustomOption handleDelete={handleTermsDelete} icon="fa-search" {...props} />,
                    IndicatorSeparator: () => null,
                    DropdownIndicator: () => null,
                  }}
                  id="search-what"
                  isClearable={false}
                  isSearchable={true}
                  name="what"
                  onChange={handleSearchTerm}
                  onInputChange={val => setNewTerm(titleCase(val))}
                  // only return unique values to options that have a label
                  options={[...new Map([{ label: newTerm, value: newTerm }, ...localTerms].map(elm => [JSON.stringify(elm), elm])).values()].filter(elm => elm?.label)}
                  placeholder=""
                  styles={{
                    container: base => ({
                      ...base,
                      flex: '1',
                      position: 'static',
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
          <Col sm={2} className="p-0" style={{ maxWidth: '6rem' }}>
            <FormGroup className="no-gutters search-button mb-0">
              <Button color="primary" block={true} type="submit" disabled={!formData?.what} data-testid="SearchButton">
                <i className="fal fa-search mr-1" /> Search
              </Button>
            </FormGroup>
          </Col>
        </div>
      </FormWrapper>
    </Form>
  );
};

export { CandidatesForm };
