import { Avatar, IconButton } from '@material-ui/core'
import { AttachFile, MoreVert, SearchOutlined } from '@material-ui/icons'
import InsertEmoticonIcon from  '@material-ui/icons/InsertEmoticon'
import MicIcon from  '@material-ui/icons/Mic'
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {gql, useMutation} from '@apollo/client'
//import axios from "./axios";
import './Chat.css'
import { useStateValue } from './StateProvider';


const setMessages = gql`
    mutation ($message: String!,$name: String!,$timestamp: String!,$group: String! $received: Boolean!)
{
  createMessage(
    message: $message
    name: $name
    timestamp: $timestamp
    group: $group
    received: $received
  ){
    id
    message
    name
    timestamp
    group
    received
  }
}
`

function Chat({ messages })
{
    const [input,setInput]=useState('');
    const [addMessage]=useMutation(setMessages);
    const [{ user }, dispatch] = useStateValue();
    //const [textMessages,setTextMessages]=useState([]);
    const [groupname , setGroupName] = useState('');
    const { groupName }=useParams();
    //const temparray=messages.filter((message) => { return message.group === groupname});
        //setTextMessages(temparray);

    useEffect(() => {
        setGroupName(groupName);
        //const temparray=messages.filter((message) => { return message.group === groupname});
        //setTextMessages(temparray);

    } , [groupName]);


    const sendMessage =  (e)=> {
        e.preventDefault();
        
        try {

            addMessage({
            variables: {
            message: input,
            name: user,
            timestamp: new Date().toUTCString(),
            group: groupname,
            received: false,

            }
        })
            
        } catch (error) {
            console.log(error);
        }
         /*axios.post('/messages/new',{
            message: input,
            name: "Debayan",
            timestamp: new Date().toUTCString(),
            group: groupname,
            received: false,

        });*/



        setInput("");
    }
    
    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar/>
                <div className="chat__headerInfo">
                    <h3>{groupname}</h3>
                    <p>Last Seen at ...</p>
                </div>
                <div className="char__headerRight">
                    <IconButton>
                        <SearchOutlined/>
                    </IconButton>
                    <IconButton>
                        <AttachFile/>
                    </IconButton>
                    <IconButton>
                        <MoreVert/>
                    </IconButton>
                </div>
            </div>
            <div className="chat__body">
                { messages.filter((message) => { return message.group === groupname}).map((message) => {
                    const classname= message.name === user ? "chat__message chat__reciever" : "chat__message";
                    return (<p className={classname} key={message.id}>
                        <span className="chat__name">{message.name}</span>
                        {message.message}
                        <span className="chat__timestamp">{message.timestamp}</span>
                    </p>)
                                        
                })

                }


            </div>
            <div className="chat__footer">
                <InsertEmoticonIcon/>
                <form>
                    <input value={input} onChange={
                        (e)=> setInput(e.target.value)
                    } placeholder="Type a message" type="text"></input>
                    <button onClick={sendMessage} type="Submit">Send a message</button>
                </form>
                <MicIcon/>
            </div>
            

        </div>
    )
}

export default Chat