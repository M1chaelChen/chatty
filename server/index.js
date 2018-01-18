const express = require('express');
const { graphqlExpress, graphiqlExpress} = require('graphql-server-express');
const { makeExecutableSchema, addMockFunctionsToSchema } = require('graphql-tools');
const bodyParser = require('body-parser');
const { createServer } = require('http');
const Schema = require('./data/schema');
const Mocks = require('./data/mocks');
const Resolvers = require('./data/resolvers');

const GRAPHQL_PORT = 8080;
const app = express();

const executableSchema = makeExecutableSchema({
  typeDefs: Schema,
  resolvers: Resolvers,
});

// addMockFunctionsToSchema({
//   schema: executableSchema,
//   mocks: Mocks,
//   preserveResolvers: true,
// });

// `context` must be an object and can't be undefined when using connectors
app.use('/graphql', bodyParser.json(), graphqlExpress({
  schema: executableSchema,
  context: {}, // at least(!) an empty object
}));

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}));

const graphQLServer = createServer(app);
graphQLServer.listen(GRAPHQL_PORT, () => console.log(`GraphQL Server is now running on http://localhost:${GRAPHQL_PORT}/graphql`));