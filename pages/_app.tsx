import { AppProps } from "next/app";
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from "@apollo/client";
import 'normalize.css';
import '../style.css';
import { useRouter } from "next/router";
import { nanoid } from "nanoid";

const AppWithSetup = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  const httpLink = createHttpLink({
    uri: (operation) => {
      return "/graphql?session-id=" + (router.query['session-id'] || nanoid());
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


export default AppWithSetup;