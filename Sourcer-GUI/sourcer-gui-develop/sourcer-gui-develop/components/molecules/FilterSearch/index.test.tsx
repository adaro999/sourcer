import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { FilterSearch } from './index';

describe('FilterSearch', () => {
  it('renders', () => {
    render(<FilterSearch items={[]} onChange={() => {}} />);
    expect(screen.getByTestId('filter-search')).toBeInTheDocument();
  });

  it('opens the options container when you click a button', async () => {
    const user = userEvent.setup();
    render(
      <FilterSearch
        items={[
          {
            name: 'job title',
            options: [
              { title: 'graphic designer', totals: 883 },
              { title: 'senior graphic designer', totals: 816 },
              { title: 'owner', totals: 130 },
              { title: 'freelance graphic designer', totals: 703 },
            ],
          },
        ]}
        onChange={() => {}}
      />,
    );

    expect(screen.getByTestId('filter-option-container')).toBeInTheDocument();
    expect(screen.getByTestId('filter-option-container').classList.contains('d-none')).toBe(true);

    // click the button to show the options container
    await user.click(screen.getByText('Job Title'));

    expect(screen.getByTestId('filter-option-container').classList.contains('d-block')).toBe(true);
  });

  it('closes the options container when you press the escape key', async () => {
    const user = userEvent.setup();
    render(
      <FilterSearch
        items={[
          {
            name: 'job title',
            options: [
              { title: 'graphic designer', totals: 883 },
              { title: 'senior graphic designer', totals: 816 },
              { title: 'owner', totals: 130 },
              { title: 'freelance graphic designer', totals: 703 },
            ],
          },
        ]}
        onChange={() => {}}
      />,
    );

    expect(screen.getByTestId('filter-option-container')).toBeInTheDocument();
    expect(screen.getByTestId('filter-option-container').classList.contains('d-none')).toBe(true);

    // click the button to show the options container
    await user.click(screen.getByText('Job Title'));

    expect(screen.getByTestId('filter-option-container').classList.contains('d-block')).toBe(true);

    // press the escape key
    await user.keyboard('[Escape]');

    expect(screen.getByTestId('filter-option-container').classList.contains('d-none')).toBe(true);
  });
});
