import React from 'react';
import {Link} from 'react-router';

import Menus from '../menus/menus';

class Classify extends React.Component{
    render(){
        return(
            <div>
                <div className="main">
                    <h1>Classify</h1>
                </div>
                <Menus />
            </div>
        )
    }
}

export default Classify;