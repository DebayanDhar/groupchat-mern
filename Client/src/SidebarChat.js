import { Avatar } from '@material-ui/core'
import React from  'react'
import './SidebarChat.css'
import { Link } from 'react-router-dom';
function SidebarChat({ groupName })
{
    const link='/group/'+groupName;
    return(
        <Link to={ link }>
        <div className="sidebarChat">
            <Avatar/>
            <div className="sidebarChat__info">
                <h2>{ groupName }</h2>
                <p>This is the last message</p>
            </div>

        </div>
        </Link>
    )
}
export default SidebarChat