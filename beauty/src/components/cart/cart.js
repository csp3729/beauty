import React from 'react';
import {Link} from 'react-router';

import Menus from '../menus/menus';

class Cart extends React.Component{
    render(){
        return(
            <div>
                <div className="main">
                    <h1>Cart</h1>
                </div>
                <Menus test="cart"/>
            </div>
        )
    }
}

export default Cart;