import GooglePlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
import { CustomOption } from '../CustomOption';
import { IGoogleAutocomplete } from './types';

const GoogleAutocomplete = ({ defaultOptions, handleChange, handleDelete, placeholder, value }: IGoogleAutocomplete) => (
  <GooglePlacesAutocomplete
    apiKey={process.env.NEXT_PUBLIC_API_KEY_GOOGLE_PLACES}
    autocompletionRequest={{
      componentRestrictions: {
        country: ['ca', 'us'],
      },
      types: ['(regions)'],
    }}
    selectProps={{
      defaultOptions,
      name: 'where',
      innerProps: {
        'data-testid': 'SearchWhere',
      },
      components: {
        LoadingIndicator: null,
        Option: props => <CustomOption icon="fa-map-marker-alt" {...{ handleDelete, ...props }} />,
        IndicatorSeparator: null,
        DropdownIndicator: null,
      },
      isClearable: true,
      onChange: handleChange,
      noOptionsMessage: () => null,
      placeholder,
      styles: {
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
          '&:hover': {
            backgroundColor: '#F5F5F5',
          },
          ...(isFocused && {
            background: '#F5F5F5',
          }),
        }),
      },
      value,
    }}
  />
);

export { geocodeByAddress, getLatLng, GoogleAutocomplete };
