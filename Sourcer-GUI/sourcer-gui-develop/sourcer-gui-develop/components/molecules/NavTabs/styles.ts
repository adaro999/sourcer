import styled from 'styled-components';
import { TabPane, Nav, NavItem, NavLink } from 'reactstrap';

const Tab = styled(NavItem)`
  cursor: pointer;
  border-radius: 5px 5px 0 0;
  justify-content: center;
`;

const Tabs = styled(Nav)`
  margin: 2.5rem 0;
  padding: 0;
  border-bottom: 1px solid #2f86dd;
`;

const TabLink = styled(NavLink)`
  display: inline-block;
  border: none;
  color: #2f86dd;

  &:hover {
    border: none;
    text-decoration: none;
  }

  &.nav-link {
    border: none;

    &.active {
      background: #2f86dd;
      color: #fff;
    }
  }
`;

const TabPanel = styled(TabPane)`
  width: 100%;
`;

export { Tab, TabLink, TabPanel, Tabs };
