import { svgComponents } from '../../../componentLoader';
import { getDynamicObject } from '../../../utils';
import { ISvgLoader } from './types';

const SvgLoader = ({ name, ...rest }: ISvgLoader) => {
  const ariaAttrs = { 'aria-hidden': true, 'role': 'presentation' };
  const SvgComponent = getDynamicObject(svgComponents, name);

  return <SvgComponent {...{ ...ariaAttrs, ...rest }} />;
};

export { SvgLoader };
