import express from "express";
import cors from "cors";
import { GraphQLSchema } from "graphql";
import graphQLHTTP from "express-graphql";
import { query } from "./schemas/queries";
import { mutation }from "./schemas/mutations";

const schema = new GraphQLSchema({
  query,
  mutation
});

const app = express();
app.use(cors())

app.use('/', graphQLHTTP((req, res) => {
  return {
    schema: schema,
    graphiql: true
  }
}));

const PORT = 3000
app.listen(PORT, () =>
  console.log(`GraphQL server running on localhost:${PORT}`)
);