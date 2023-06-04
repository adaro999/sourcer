import styled from 'styled-components';
import { InputGroupText } from 'reactstrap';

const InputIconDiv = styled(InputGroupText)`
  background: none;
  color: #a2a5b9;

  & .fa-search,
  ::placeholder {
    font-weight: 100;
  }

  & + input {
    border-left: 0;
  }
`;

export { InputIconDiv };
