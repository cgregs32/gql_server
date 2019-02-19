import { GraphQLSchema } from "graphql";
import express from "express";
import expressGraphQl from "express-graphql";
import { query }from "./schemas/queries";
import { mutation }from "./schemas/mutations";

const schema = new GraphQLSchema({
  query,
  mutation
});

const app = express();
app.use(
  '/graphql',
  expressGraphQl({
    schema: schema,
    graphiql: true
  })
);

const PORT = 3000
app.listen(PORT, () =>
  console.log(`GraphQL server running on localhost:${PORT}`)
);