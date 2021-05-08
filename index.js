const { ApolloServer, gql } = require("apollo-server");
const HadithApi = require("./HadithApi");

const typeDefs = gql`
  type CollectionDescription {
    lang: String
    title: String
    shortIntro: String
  }

  type Collection {
    name: String
    hasBooks: Boolean
    hasChapters: Boolean
    collection: [CollectionDescription]
    totalHadith: Int
    totalAvailableHadith: Int
  }

  type Query {
    Collections: [Collection]
  }
`;

const resolvers = {
  Query: {
    Collections: async (_, __, { dataSources }) => {
      const response = await dataSources.hadithApi.getCollections();
      return response.data;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    hadithApi: new HadithApi(),
  }),
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
