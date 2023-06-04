import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { SvgLoader } from './index';

describe('SvgLoader component', () => {
  it('renders', async () => {
    render(<SvgLoader name="AppIcon" />);

    // Suspense fallback empty svg
    expect(screen.getByTestId('svgloader')).toBeInTheDocument();
    expect(await screen.queryByTestId('svg-logo')).not.toBeInTheDocument();

    // Real svg that was loaded from the prop 'name'
    const lazyLoadedSvg = await waitFor(() => screen.getByTestId('svg-logo'));
    expect(lazyLoadedSvg).toBeInTheDocument();
  });
});
