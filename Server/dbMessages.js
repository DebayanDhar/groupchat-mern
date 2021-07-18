import mongoose from 'mongoose'
//defining our data schema
const groupchatSchema={
    message: String,
    name: String,
    timestamp: String,
    group: String,
    received: Boolean,
}
const Messages=mongoose.model('messagecontents',groupchatSchema);//collection name,data structure
export default Messages