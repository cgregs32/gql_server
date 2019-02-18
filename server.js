const express = require('express');
const express_graphql = require('express-graphql');
const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Query {
    message: String
  }
`);

const root = {
  message: () => 'Hello World farts'
};

const app = express();
app.use('/graphql', express_graphql({
  schema: schema,
  rootValue: root,
  graphiql: true
}));

app.listen(3000 () => {
  console.log('express graphql server now running on localhost:3000/graphql')
})