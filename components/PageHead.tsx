import Head from 'next/head';
import { PAGE_DESCRIPTION, PAGE_TITLE } from '../strings';

interface PageHeadProps {
  title?: string;
  description?: string;
}

export const PageHead = ({ title = PAGE_TITLE, description = PAGE_DESCRIPTION }: PageHeadProps) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#283618" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#283618" />
      </Head>
    </>
  );
};
