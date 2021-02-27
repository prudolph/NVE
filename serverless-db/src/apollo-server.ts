import { ApolloServer } from 'apollo-server-lambda';
import { Context, APIGatewayEvent, APIGatewayProxyResultV2 } from "aws-lambda";
import { resolvers } from './resolvers';
import { typeDefs } from './type-defs';

const apolloServer = new ApolloServer({ resolvers, typeDefs });

export const graphqlHandler = apolloServer.createHandler();

