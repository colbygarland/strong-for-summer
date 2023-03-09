import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getQuotes } from '../services/api/quote';
import { colors } from '../theme/colors';

const StyledQuote = styled.blockquote`
  position: relative;
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
    border-radius: 10px;
    z-index: -1;
  }
`;

export const Quote = () => {
  const [quote, setQuote] = useState('');

  useEffect(() => {
    getQuotes().then((resp) => {
      const quotes: string[] = Object.values(resp);
      setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    });
  }, []);

  return <StyledQuote>{quote}</StyledQuote>;
};
