import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { CollapseItem } from './index';

describe('CollapseItem component', () => {
  it('renders', async () => {
    render(<CollapseItem>Hello</CollapseItem>);
    expect(screen.getByTestId('collapse-item')).toBeInTheDocument();
  });

  it('does not show content by default', () => {
    render(<CollapseItem>Hello</CollapseItem>);

    expect(screen.getByTestId('collapse-item')).toBeInTheDocument();
    expect(screen.getByTestId('toggle-icon').classList.contains('fa-plus')).toBe(true);
    expect(screen.getByTestId('collapse-container').classList.contains('collapse')).toBe(true);
  });

  it('shows the content when clicked', async () => {
    const user = userEvent.setup();
    render(<CollapseItem title="click me">Hello</CollapseItem>);

    await user.click(screen.getByText('click me'));

    expect(screen.getByTestId('collapse-item')).toBeInTheDocument();
    expect(screen.getByTestId('toggle-icon').classList.contains('fa-minus')).toBe(true);
    expect(screen.getByTestId('collapse-container').classList.contains('collapse')).toBe(false);
  });
});
