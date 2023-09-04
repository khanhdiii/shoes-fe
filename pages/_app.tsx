import Head from 'next/head';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';

import '/styles/globals.css';
import Header from './header';
import Footer from './footer';
import store from '../store/store';
import { AuthProvider } from '../hooks/useAuth';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Store | DiiStore</title>
        <meta name="description" content="Genrated app" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />

        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Oswald:wght@200&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Provider store={store}>
        <AuthProvider>
          <Header />
          <Component {...pageProps} />
          <Footer />
        </AuthProvider>
      </Provider>
    </>
  );
}
