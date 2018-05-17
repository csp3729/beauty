import React from 'react';
import {Route, IndexRoute, hashHistory} from 'react-router';

import Home from '../components/home/home';
import Classify from '../components/classify/classify';
import Cart from '../components/cart/cart';
import User from '../components/user/user';
import Login from '../components/user/login/login';
import Details from '../components/details/details';
import './base.css';
import Search from '../components/home/search/search';

class MlsComponent extends React.Component{
    render(){
        return(
            <div className="Mls">{this.props.children}</div>
        )
    }
}

const routes = (
    <Route path="/" component={MlsComponent}>
        <IndexRoute component={Home} />
        <Route path="/" component={Home} />
        <Route path="/classify" component={Classify}></Route>
        <Route path="/cart" component={Cart} />
        <Route path="/user" component={User} />
        <Route path="/login" component={Login} />
        <Route path='/details(/:orderid)' component={Details} />
        <Route path="/search" component={Search} />

    </Route>
)

export default routes;