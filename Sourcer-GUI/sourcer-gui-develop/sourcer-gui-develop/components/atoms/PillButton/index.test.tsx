import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PillButton } from './index';

describe('PillButton component', () => {
  it('renders', async () => {
    render(<PillButton isActive>the button</PillButton>);
    expect(screen.getByText('the button')).toBeInTheDocument();
  });

  it('has does not have active classes if isActive prop is false', () => {
    render(<PillButton isActive={false}>the button</PillButton>);
    const theButton = screen.getByText('the button');

    expect(theButton).toBeInTheDocument();
    expect(theButton.classList.contains('active')).toBe(false);
  });

  it('has does have active classes if isActive prop is true', () => {
    render(<PillButton isActive>the button</PillButton>);
    const theButton = screen.getByText('the button');

    expect(theButton).toBeInTheDocument();
    expect(theButton.classList.contains('active')).toBe(true);
  });
});
