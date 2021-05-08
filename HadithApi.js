const { RESTDataSource } = require("apollo-datasource-rest");

class HadithApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://api.sunnah.com/v1/";
  }

  willSendRequest(request) {
    request.headers.set("x-api-key", process.env.X_API_KEY);
  }

  async getCollections() {
    return this.get("collections");
  }

  async getCollection(name) {
    return this.get(`collections/${name}`);
  }
}

module.exports = HadithApi;
