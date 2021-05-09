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
    getHadithsByCollectionAndBookNumber: async (
      _,
      { collectionName, bookNumber },
      { dataSources }
    ) => {
      const response = await dataSources.hadithApi.getHadithsByCollectionAndBookNumber(
        collectionName,
        bookNumber
      );
      return response.data;
    },
    Books: async (_, { collectionName }, { dataSources }) => {
      const response = await dataSources.hadithApi.getBooks(collectionName);
      return response.data;
    },
    Book: async (_, { collectionName, bookNumber }, { dataSources }) => {
      return dataSources.hadithApi.getBook(collectionName, bookNumber);
    },
    getHadithByCollectionAndHadithNumber: async (
      _,
      { collectionName, hadithNumber },
      { dataSources }
    ) => {
      return dataSources.hadithApi.getHadithByCollectionAndHadithNumber(
        collectionName,
        hadithNumber
      );
    },
    getRandomHadith: async (_, __, { dataSources }) => {
      return dataSources.hadithApi.getRandomHadith();
    },
    getHadiths: async (_, queryParams, { dataSources }) => {
      return dataSources.hadithApi.getHadiths(queryParams);
    },
    getHadithByUrn: async (_, { urn }, { dataSources }) => {
      return dataSources.hadithApi.getHadithByUrn(urn);
    },
  },
};

module.exports = resolvers;
