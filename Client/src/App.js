import './App.css';
import Sidebar from './Sidebar.js'; 
import Chat from './Chat.js'; 
//import Pusher from 'pusher-js';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useEffect, useState} from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  //useSubscription,
  gql,
  
} from "@apollo/client";
import { WebSocketLink } from '@apollo/client/link/ws';
import Login from './Login';
import { useStateValue } from './StateProvider';

const link = new WebSocketLink({
  uri: 'ws://localhost:4000/graphql',
  options: {
    reconnect: true,
  },
});

const client = new ApolloClient({
  link: link,
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
});
console.log(link.onopen);


const getMessages=gql`
    query{
        Messages{
            id
            message
            name
            timestamp
            group 
            received
        }
    }
`
function AppBody()
{
  const {loading,error, data }=useQuery(getMessages, { pollInterval : 500, });
  

  if(loading)
  return 'Loading...';
    if(error)
    return 'Error Loading Data';

  return(
    <div className="app_body">
        <Router>
          <Sidebar/>
            <Switch>
              <Route path="/group/:groupName">
                <Chat messages={data.Messages}/>
              </Route>
              <Route path="/">
                
              </Route>
            
            </Switch>
        </Router>

      </div>
      

  )
}



function App() {


 

  const [{ user }, dispatch] = useStateValue();
  return (
    <ApolloProvider client={client}>
    <div className="app">
      {!user ? <Login/> : <AppBody/>}
      
    </div>
    </ApolloProvider>
    
  );
}

export default App;
