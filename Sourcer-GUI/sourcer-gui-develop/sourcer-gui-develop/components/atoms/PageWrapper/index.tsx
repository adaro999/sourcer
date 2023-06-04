import Head from 'next/head';
import { PropsWithChildren } from 'react';

interface IPageWrapper {
  title?: string;
}

const PageWrapper = ({ children, title = 'Sourcer' }: PropsWithChildren<IPageWrapper>) => (
  <>
    <Head>
      <title>JobTarget {title}</title>
    </Head>
    {children}
  </>
);

export { PageWrapper };
