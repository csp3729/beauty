import React from 'react';
import {Route, IndexRoute} from 'react-router';

import Home from '../components/home/home';
import Classify from '../components/classify/classify';
import Cart from '../components/cart/cart';
import User from '../components/user/user';
import Login from '../components/user/login/login';
import Order from '../components/user/order/order';
import Reg from '../components/user/registration/registration';

import './base.css';

let isLogin = (nextState, replace, next) => {
    if(window.localStorage.getItem('token')){
        next();
    } else {
        replace({pathname: 'login'});
        next();
    }
}

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
        <Route path="/classify" component={Classify} />
        <Route path="/cart" component={Cart} />
        <Route path="/user" component={User} onEnter={isLogin}/>
        <Route path="/login" component={Login} />
        <Route path="/order" component={Order} />
        <Route path="/reg" component={Reg} />
    </Route>
)

export default routes;