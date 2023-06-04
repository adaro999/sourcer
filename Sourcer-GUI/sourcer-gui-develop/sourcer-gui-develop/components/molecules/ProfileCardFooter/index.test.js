import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ProfileCardFooter } from './index';

describe('ProfileCardFooter', () => {
  it('renders profile card footer', () => {
    render(<ProfileCardFooter />);
    expect(screen.getByTestId('ProfileCardFooter')).toBeInTheDocument();
  });
});
