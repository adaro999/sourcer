import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ToggleIcon } from './index';

describe('ToggleIcon component', () => {
  it('renders', async () => {
    render(<ToggleIcon isActive />);
    expect(screen.getByTestId('toggle-icon')).toBeInTheDocument();
  });

  it('has a plus icon if not active', () => {
    render(<ToggleIcon isActive={false} />);
    const theIcon = screen.getByTestId('toggle-icon');

    expect(theIcon).toBeInTheDocument();
    expect(theIcon.classList.contains('fa-plus')).toBe(true);
    expect(theIcon.classList.contains('fa-minus')).toBe(false);
  });

  it('has a minus icon if active', () => {
    render(<ToggleIcon isActive />);
    const theIcon = screen.getByTestId('toggle-icon');

    expect(theIcon).toBeInTheDocument();
    expect(theIcon.classList.contains('fa-plus')).toBe(false);
    expect(theIcon.classList.contains('fa-minus')).toBe(true);
  });
});
