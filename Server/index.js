import pkg from 'apollo-server-express';
import pk from 'graphql-subscriptions';
import mongoose from 'mongoose';
import express from 'express';
import { resolvers } from './resolver.js';
import { typeDefs } from './typeDefs.js';
import { createServer } from 'http';
import packg from 'graphql';
import subs from 'subscriptions-transport-ws';
import makepkg from '@graphql-tools/schema'
import cors from 'cors';
const app=express();
app.use(cors());
const { ApolloServer, gql}=pkg;
const { SubscriptionServer }=subs;
const { execute, subscribe }=packg;
const { makeExecutableSchema }=makepkg;
const { PubSub }=pk;
const pubsub= new PubSub();
const connection_url = 'mongodb+srv://DebayanDhar:Debayan@51@cluster0.pcxsy.mongodb.net/groupchatDB?retryWrites=true&w=majority';
mongoose.connect(connection_url,{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})




const startServer = async () => {
    
const httpServer = createServer(app);
const schema = makeExecutableSchema({ typeDefs, resolvers })

const server = new ApolloServer({
     typeDefs,
     resolvers,
     context: ({req, res}) => ({req, res, pubsub}) });
await server.start();

server.applyMiddleware({ app });
const subscriptionServer = SubscriptionServer.create({
  schema,
  execute,
  subscribe,
},{
  server: httpServer,
  path: server.graphqlPath,
});
['SIGINT','SIGTERM'].forEach(signal =>{
  process.on(signal, () => subscriptionServer.close());
});

httpServer.listen({ port: 4000 } ,() => {
  console.log(` Server ready `)
});
}
startServer();