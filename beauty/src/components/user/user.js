import React from 'react';
import {Link} from 'react-router';

import Menus from '../menus/menus';

class User extends React.Component{
    render(){
        return(
            <div>
                <div className="main">
                    <h1>User</h1>
                    <Link to="login">登录</Link>
                </div>
                <Menus />
            </div>
        )
    }
}

export default User;