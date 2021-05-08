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
}

module.exports = HadithApi;
