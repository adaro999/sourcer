import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import '@testing-library/jest-dom';
import { CandidateContact } from './index';

const scrollIntoViewMock = jest.fn();
window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;

const server = setupServer(
  rest.get('/api/message/getEmailTemplates', (req, res, ctx) => {
    return res(ctx.json([]));
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('CandidateContact component', () => {
  it('renders', async () => {
    render(<CandidateContact recruiter={{ company_id: '32120', recruiter_id: '1050600' }} />);
    expect(screen.getByTestId('candidate-contact')).toBeInTheDocument();
  });

  it('has two list items by default', async () => {
    render(<CandidateContact recruiter={{ company_id: '32120', recruiter_id: '1050600' }} />);
    const theRoot = screen.getByTestId('candidate-contact');
    const listItems = theRoot.querySelectorAll('li');
    expect(theRoot).toBeInTheDocument();
    expect(listItems).toHaveLength(2);
  });

  it('hides the first list item if invite to apply button is clicked', async () => {
    const user = userEvent.setup();
    render(<CandidateContact recruiter={{ company_id: '32120', recruiter_id: '1050600' }} />);
    const theRoot = screen.getByTestId('candidate-contact');
    const listItems = theRoot.querySelectorAll('li');
    await user.click(screen.getByText('Invite to Apply'));
    expect(theRoot).toBeInTheDocument();
    expect(listItems).toHaveLength(2);
    expect(listItems[1]).toHaveAttribute('aria-hidden', 'true');
    expect(listItems[0]).not.toHaveAttribute('aria-hidden');
  });
});
