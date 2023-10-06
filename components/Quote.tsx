import styled from 'styled-components';
import { colors } from '../theme/colors';

const StyledQuote = styled.blockquote`
  margin-left: -20px;
  margin-right: -20px;
  position: relative;
  z-index: 1;
  padding: 20px;
  margin-bottom: 20px;
  color: ${colors.white};
  &:before {
    content: '';
    background-color: ${colors.secondary};
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: -1;
  }
`;

export const Quote = ({ quote }: { quote: string }) => {
  return <StyledQuote>{quote}</StyledQuote>;
};
