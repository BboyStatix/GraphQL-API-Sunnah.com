# GraphQL-API-Sunnah.com

Simple GraphQL layer on top of [Sunnah.com's REST API](https://sunnah.api-docs.io/1.0/getting-started)

Try it out in the [GraphQL Playground](https://sunnah-com-graphql-server.herokuapp.com)!

![GraphQL Playground demo](demo.gif)

# Getting Started

Create a `.env` file based off of `.env.sample`. You can get a demo x-api-key from the [API docs](https://sunnah.api-docs.io/1.0/getting-started) under some of the listed endpoints.

You can also use the real api key if you have it.

To install dependencies run

```
npm install
```

To run the app

```
npm start
```

# TODOS

- [ ] add `page` and `limit` option to queries
- [ ] query by language rather than returning both Arabic and English versions
- [ ] make queries less REST-specific. Currently the queries are pretty much a 1-to-1 mapping of the REST API. This isn't really using the full power of GraphQL.

# Note

The [/hadiths](https://sunnah.api-docs.io/1.0/hadiths/get-a-list-of-hadiths) endpoint isn't currently working (at least with the demo api key). It returns a `403` error.

# Disclaimer

I am not affiliated with Sunnah.com. This was just something I created over a weekend and thought would be beneficial to app developers by giving them a more declarative way of asking for the data they need.
