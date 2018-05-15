import React from 'react';
import {Link} from 'react-router';

import Menus from '../menus/menus';

class Home extends React.Component{
    render(){
        return(
            <div>
                <div className="main">
                    <h1>Home</h1>
                </div>
                <Menus test="home"/>
            </div>
        )
    }
}

export default Home;