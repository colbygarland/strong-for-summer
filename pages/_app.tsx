import type { AppProps } from 'next/app';
import { PageHead } from '../components/PageHead';
import '../services/firebase';
import { ChakraProvider } from '@chakra-ui/react';
import { GlobalStyle } from '../theme/global';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      router.replace('/enter-name');
    }
  }, []);

  return (
    <>
      <PageHead />
      <GlobalStyle />
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
}

export default MyApp;
