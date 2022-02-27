import { AppInitialProps, AppProps } from "next/app";
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from "@apollo/client";
import '../style.css';
import { nanoid } from "nanoid";

const AppWithSetup = ({ Component, pageProps, router }: AppProps) => {

  if (!router.query['session-id'] && typeof window !== 'undefined') {
    router.push({
      query: {
        'session-id': nanoid(),
      }
    })
    return <div>reloading...</div>
  }

  const httpLink = createHttpLink({
    uri: (operation) => {
      return "/graphql?session-id=" + (router.query['session-id']);
    },
  });

  const client = new ApolloClient({
    uri: "/graphql",
    cache: new InMemoryCache(),
    link: httpLink
  });

  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
};

AppWithSetup.getInitialProps = async (context: AppInitialProps) => {
  return {}
};
export default AppWithSetup;