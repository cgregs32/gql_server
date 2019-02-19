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

app.listen(3000, () =>
  console.log('GraphQL server running on localhost:3000 poop')
);