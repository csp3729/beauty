import React from 'react';
import {Route, IndexRoute} from 'react-router';

import Home from '../components/home/home';
import Classify from '../components/classify/classify';
import Cart from '../components/cart/cart';
import User from '../components/user/user';
import Login from '../components/user/login/login';
import Order from '../components/user/order/order';
import Reg from '../components/user/registration/registration';
import Setup from '../components/setup/setup';
import Personal from '../components/user/personal/personal';
import Nicknam from '../components/user/personal/set/nikename';
import Birthday from '../components/user/personal/set/birthday';
import PerExplain from '../components/user/personal/set/perExplain';
import Site from '../components/user/personal/set/site';

import{All, Payment, Take, Estimate, Salesreturn} from '../components/user/order/allorder/allorder'

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
    componentDidMount(){

    }
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
        <Route path="/user" component={User} onEnter={isLogin}/>personal
        <Route path="/personal" component={Personal}/>
        <Route path="/nickname" component={Nicknam}/>
        <Route path="/birthday" component={Birthday}/>
        <Route path="/perExplain" component={PerExplain}/>
        <Route path="/site" component={Site}/>
        <Route path="/login" component={Login} />
        <Route path="/reg" component={Reg} />
        <Route path="/setup" component={Setup} />
        <Route path="/order" component={Order}>
            <Route path="/order/all" component={All} active='all' />
            <Route path="/order/payment" component={Payment} active='payment'/>
            <Route path="/order/take" component={Take} active='take'/>
            <Route path="/order/estimate" component={Estimate} active='estimate'/>
            <Route path="/order/salesreturn" component={Salesreturn} active='salesreturn'/>
        </Route>
    </Route>
)

export default routes;