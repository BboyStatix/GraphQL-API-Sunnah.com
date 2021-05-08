const { RESTDataSource } = require("apollo-datasource-rest");

class HadithApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://api.sunnah.com/v1/";
  }
}

module.exports = HadithApi;
