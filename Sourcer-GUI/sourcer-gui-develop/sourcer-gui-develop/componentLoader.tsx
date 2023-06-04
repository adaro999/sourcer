import dynamic from 'next/dynamic';

const svgLoading = {
  loading: () => <svg aria-hidden data-testid="svgloader" role="presentation" />,
};

const svgComponents = {
  AppIcon: dynamic(() => import('./components/atoms/SvgLoader/Svgs/AppIcon'), {
    ...svgLoading,
  }),
  CareerBuilder: dynamic(() => import('./components/atoms/SvgLoader/Svgs/CareerBuilder'), {
    ...svgLoading,
  }),
  Dice: dynamic(() => import('./components/atoms/SvgLoader/Svgs/Dice'), {
    ...svgLoading,
  }),
  Enrich: dynamic(() => import('./components/atoms/SvgLoader/Svgs/Enrich'), {
    ...svgLoading,
  }),
  Glass: dynamic(() => import('./components/atoms/SvgLoader/Svgs/Glass'), {
    ...svgLoading,
  }),
  Globe: dynamic(() => import('./components/atoms/SvgLoader/Svgs/Globe'), {
    ...svgLoading,
  }),
  ICims: dynamic(() => import('./components/atoms/SvgLoader/Svgs/ICims'), {
    ...svgLoading,
  }),
  Indeed: dynamic(() => import('./components/atoms/SvgLoader/Svgs/Indeed'), {
    ...svgLoading,
  }),
  JobTarget: dynamic(() => import('./components/atoms/SvgLoader/Svgs/JobTarget'), {
    ...svgLoading,
  }),
  Lever: dynamic(() => import('./components/atoms/SvgLoader/Svgs/JobTarget'), {
    ...svgLoading,
  }),
  NoResults: dynamic(() => import('./components/atoms/SvgLoader/Svgs/NoResults'), {
    ...svgLoading,
  }),
  ProfileUnlock: dynamic(() => import('./components/atoms/SvgLoader/Svgs/ProfileUnlock'), {
    ...svgLoading,
  }),
};

export { svgComponents };
