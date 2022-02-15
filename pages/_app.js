import { SessionProvider } from "next-auth/react";
import { Provider, useSelector } from "react-redux";
import Layout from "../components/layout/layout";

import store from "../store";
import "../styles/globals.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session} refetchInterval={0}>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;
