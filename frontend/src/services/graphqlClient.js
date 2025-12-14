import { ApolloClient, HttpLink, InMemoryCache, gql } from '@apollo/client';

const GRAPHQL_URL = import.meta.env.VITE_GRAPHQL_URL || 'http://localhost:4000/graphql';

export const graphqlClient = (token) =>
  new ApolloClient({
    link: new HttpLink({
      uri: GRAPHQL_URL,
      headers: token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {},
    }),
    cache: new InMemoryCache(),
  });

export const MEDICATIONS_BY_USER_QUERY = gql`
  query MedicationsByUser($userId: Int!) {
    medicationsByUser(userId: $userId) {
      id
      name
      dosage
      currentPills
      pillsPerBox
      lowStockThreshold
      sideEffects
    }
  }
`;
