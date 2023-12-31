import React from "react";
import "../styles/tailwind.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import Layout from "../components/Layout";
import { ApolloProvider } from "@apollo/client";
import client from "../lib/apollo";
interface MyAppProps {
  Component: React.ComponentType;
  pageProps: any;
}

function MyApp({ Component, pageProps }: MyAppProps) {
  return (
    <UserProvider>
      <ApolloProvider client={client}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </UserProvider>
  );
}

export default MyApp;
