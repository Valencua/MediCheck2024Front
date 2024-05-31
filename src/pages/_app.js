import '../styles/globals.css';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Calendar PWA</title>
        <meta name="description" content="Calendar PWA with Next.js" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;