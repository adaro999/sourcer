import { SVGAttributes } from 'react';
import { svgComponents } from '../../../componentLoader';

interface ISvgLoader extends SVGAttributes<HTMLOrSVGElement> {
  name: keyof typeof svgComponents;
}

export type { ISvgLoader };
