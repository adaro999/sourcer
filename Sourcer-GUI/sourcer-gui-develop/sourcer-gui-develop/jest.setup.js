import '@testing-library/jest-dom/extend-expect';
import 'jest-canvas-mock';
import { TextEncoder, TextDecoder } from 'util';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

const { getComputedStyle } = window;
window.getComputedStyle = elt => getComputedStyle(elt);
