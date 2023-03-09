import { css } from 'styled-components';
const gridBreakpoints = {
  xs: '0px',
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
  xxl: '1400px',
  xxxl: '1850px',
} as const;

type Breakpoints = keyof typeof gridBreakpoints;
type MixinParameters = Parameters<typeof css>;

export const from = (Object.keys(gridBreakpoints) as Breakpoints[]).reduce((accumulator, label) => {
  const fn = (...args: MixinParameters) => css`
    @media (min-width: ${gridBreakpoints[label]}) {
      ${css(...args)};
    }
  `;
  accumulator[label] = fn as any;
  return accumulator;
}, {} as Record<Breakpoints, typeof css>);
