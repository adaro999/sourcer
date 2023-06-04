import styled from 'styled-components';
import { FormGroup } from 'reactstrap';

const SearchFormGroupDiv = styled(FormGroup)`
  margin: 0;
  padding: 0;
  padding-right: 1rem;
  width: 100%;

  & .form-control {
    padding-left: 0rem;
    border: 1px solid #ced4da;
    border-left: none;
  }

  & .input-group-prepend,
  .input-group-text {
    background: none;
    border: none;
  }

  & .input-group-prepend {
    border-radius: 5px 0 0 5px;
    border: 1px solid #ced4da;
    border-right: none;
  }

  & input,
  .input-group-prepend,
  .input-group-text,
  input:focus {
    outline: none;
    box-shadow: none;
  }
`;

export { SearchFormGroupDiv };
