const { ApolloServer, gql } = require("apollo-server");
const HadithApi = require("./HadithApi");

const typeDefs = gql`
  enum CollectionName {
    BUKHARI
    MUSLIM
    NASAI
    ABUDAWUD
    TIRMIDHI
    MALIK
    AHMAD
    NAWAWI40
    FORTY
    RIYADUSSALIHIN
    MISHKAT
    ADAB
    SHAMAIL
    BULUGH
    HISN
  }

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

  type ChapterInfo {
    lang: String
    chapterNumber: String
    chapterTitle: String
    intro: String
    ending: String
  }

  type Chapter {
    bookNumber: String
    chapterId: String
    chapter: [ChapterInfo]
  }

  type Query {
    Collections: [Collection]
    Collection(name: CollectionName!): Collection
    Chapters(collectionName: CollectionName!, bookNumber: Int!): [Chapter]
  }
`;

const resolvers = {
  Query: {
    Collections: async (_, __, { dataSources }) => {
      const response = await dataSources.hadithApi.getCollections();
      return response.data;
    },
    Collection: async (_, { name }, { dataSources }) => {
      return dataSources.hadithApi.getCollection(name);
    },
    Chapters: async (_, { collectionName, bookNumber }, { dataSources }) => {
      const response = await dataSources.hadithApi.getChapters(
        collectionName,
        bookNumber
      );
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
