import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { NavTabs } from './index';

// mock next/router
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
    };
  },
}));

describe('NavTabs', () => {
  it('renders navigation tabs', () => {
    render(<NavTabs />);
    expect(screen.getByTestId('NavTabs-Item1')).toBeInTheDocument();
    expect(screen.getByTestId('NavTabs-Item2')).toBeInTheDocument();
  });
});
