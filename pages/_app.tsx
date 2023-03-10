import type { AppProps } from 'next/app';
import { PageHead } from '../components/PageHead';
import '../services/firebase';
import { ChakraProvider } from '@chakra-ui/react';
import { GlobalStyle } from '../theme/global';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { createGlobalStyle } from 'styled-components';
import { Cookie, Montserrat } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const cookie = Cookie({ weight: '400', subsets: ['latin'] });
const montserrat = Montserrat({ weight: ['400', '700'], subsets: ['latin'] });

const Fonts = createGlobalStyle`
  :root {
    --font-montserrat: ${montserrat.style.fontFamily};
    --font-cookie: ${cookie.style.fontFamily}
  }
`;

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
      <Fonts />
      <PageHead />
      <GlobalStyle />
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default MyApp;
