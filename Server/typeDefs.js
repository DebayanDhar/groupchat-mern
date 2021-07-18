import pkg from 'apollo-server-express';
const {gql}=pkg;
export const typeDefs =gql`

type Query{
   
    Messages: [Messages!]
}


type Messages
{
    id: ID!
    message: String!
    name: String!
    timestamp: String!
    group: String!
    received: Boolean!
}

type Mutation{
    createMessage(
        message: String!
        name: String!
        timestamp: String!
        group: String!
        received: Boolean!): Messages!
}

type Subscription{
    Messages: [Messages!]
}





`;

/*type Query{
    helloWorld: String!
    dogs: [Dog!]
    messages: [Messages!]
}

type Dog
{
    id: ID!
    name: String!
}

type Mutation{
    createDog(name: String!): Dog!
}
*/