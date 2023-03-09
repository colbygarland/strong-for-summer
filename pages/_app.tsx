import type { AppProps } from 'next/app';
import { PageHead } from '../components/PageHead';
import '../services/firebase';
import { ChakraProvider } from '@chakra-ui/react';
import { GlobalStyle } from '../theme/global';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { colors } from '../theme/colors';
import { Cookie, Montserrat } from 'next/font/google';

const cookie = Cookie({ weight: '400', subsets: ['latin'] });
const montserrat = Montserrat({ weight: ['400', '700'], subsets: ['latin'] });

const Page = styled.div`
  display: grid;
  place-items: center;
  padding-left: 20px;
  padding-right: 20px;
`;

const H1 = styled.h1`
  font-family: 'Cookie', cursive;
  font-size: 140px;
  text-align: center;
  color: ${colors.primary};
`;

const Fonts = createGlobalStyle`
  :root {
    --font-montserrat: ${montserrat.style.fontFamily};
    --font-cookie: ${cookie.style.fontFamily}
  }
`;

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      router.replace('/enter-name');
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [loading]);

  if (loading) {
    return (
      <Page>
        <H1>
          Strong <br />
          for <br />
          Summer <br />
          💪
        </H1>
      </Page>
    );
  }

  return (
    <>
      <Fonts />
      <PageHead />
      <GlobalStyle />
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
}

export default MyApp;
