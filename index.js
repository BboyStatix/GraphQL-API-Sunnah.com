const { ApolloServer, gql } = require("apollo-server");
const HadithApi = require("./HadithApi");
const resolvers = require("./resolvers");

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

  type CollectionDetail {
    lang: String
    title: String
    shortIntro: String
  }

  type Collection {
    name: String
    hasBooks: Boolean
    hasChapters: Boolean
    collection: [CollectionDetail]
    totalHadith: Int
    totalAvailableHadith: Int
  }

  type ChapterDetail {
    lang: String
    chapterNumber: String
    chapterTitle: String
    intro: String
    ending: String
  }

  type Chapter {
    bookNumber: String
    chapterId: String
    chapter: [ChapterDetail]
  }

  type Grade {
    graded_by: String
    grade: String
  }

  type HadithInfo {
    lang: String
    chapterNumber: String
    chapterTitle: String
    urn: Int
    body: String
    grades: [Grade]
  }

  type Hadith {
    collection: String
    bookNumber: String
    chapterId: String
    hadithNumber: String
    hadith: [HadithInfo]
  }

  type BookInfo {
    lang: String
    name: String
  }

  type Book {
    bookNumber: String
    book: [BookInfo]
    hadithStartNumber: Int
    hadithEndNumber: Int
    numberOfHadith: Int
  }

  type Query {
    Collections: [Collection]
    Collection(name: CollectionName!): Collection
    Chapters(collectionName: CollectionName!, bookNumber: Int!): [Chapter]
    getHadithsByCollectionAndBookNumber(
      collectionName: CollectionName!
      bookNumber: Int!
    ): [Hadith]
    Book(collectionName: CollectionName!, bookNumber: Int!): Book
    Books(collectionName: CollectionName!): [Book]
    getHadithByCollectionAndHadithNumber(
      collectionName: CollectionName!
      hadithNumber: Int!
    ): Hadith
    getRandomHadith: Hadith
    getHadithByUrn(urn: Int!): Hadith
  }
`;

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
