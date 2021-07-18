import Messages from './dbMessages.js';

export const resolvers = {
    Query: {
        
        Messages: () => Messages.find()
    },
    Mutation: {
        createMessage: async(_, { message, name ,timestamp, group, received},{pubsub}) => {
            
            const newMessage =new Messages({ message, name ,timestamp, group, received});
            await newMessage.save();
            /*await pubsub.publish('CHAT_CHANNEL', {
                Messages: newMessage
            });
            */
            

            return newMessage;
        }
    },
    Subscription: {
        Messages: {
            
            subscribe: async(_, __, {pubsub}) => { 
                
                return await pubsub.asyncIterator('CHAT_CHANNEL'); },
        }
    }
}