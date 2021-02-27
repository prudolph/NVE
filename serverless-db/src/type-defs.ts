import { gql } from 'apollo-server-lambda';

export const typeDefs = gql`
type Shirt {
  id:Int
  design:String
  small:Int
  medium:Int
  large:Int
}

type User {
	UUID: String
	Name: String
	Posts: [Post]
}

type Post {
	UUID: String
	Text: String
}

input UserInput {
	Name: String
	Posts: [PostInput]
}

input PostInput{
	Text: String
}



type Mutation {
	reset:String
  addshirt:String
  purchase(id:Int!,size:String!,qty:Int!):Shirt
}

type Query {
  hello: String
	mysql_getUser(uuid: String!): User
  getAll:[Shirt]
}

schema {
	query: Query
	mutation: Mutation
}
`;
