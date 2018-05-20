import React from 'react';
import {Link} from 'react-router';
import { hashHistory } from 'react-router'

import http from '../../../utils/httpclient';

import './order.scss';

class Order extends React.Component{
    state = {
        active: '',
        data: []
    }

    componentDidMount(){
        this.setState({
            active: this.props.children.props.route.active
        })
        let username = window.localStorage.getItem('username')
        http.post('getAllOrder', {username}).then((res) => {
            this.setState({
                data: res.text.data
            })
        })
    }

    active= (e) => {
        this.setState({
            active: e
        })
    }

    render(){
        return(
            <div className="order">
                <div className="head">
                    <h3>我的订单</h3>
                    <Link className="return" to="/user"><i className="fas fa-chevron-left"></i></Link>
                </div>
                <ul className="order-menus">
                    <li>
                        <Link to="/order/all" className={this.state.active == 'all'? 'active' : null} onClick={this.active.bind(this,'all')}>全部</Link>
                    </li>
                    <li>
                        <Link to="/order/payment" className={this.state.active == 'payment'? 'active' : null} onClick={this.active.bind(this,'payment')}>待付款</Link>
                    </li>
                    <li>
                        <Link to="/order/take" className={this.state.active == 'take'? 'active' : null} onClick={this.active.bind(this,'take')}>待收货</Link>
                    </li>
                    <li>
                        <Link to="/order/estimate" className={this.state.active == 'estimate'? 'active' : null} onClick={this.active.bind(this,'estimate')}>待评价</Link>
                    </li>
                    <li>
                        <Link to="/order/salesreturn" className={this.state.active == 'salesreturn'? 'active' : null} onClick={this.active.bind(this,'salesreturn')}>退款退货</Link>
                    </li>
                </ul>
                {/* <ul>
                    <li>
                        <Link acitveClassName="activeRoute" to="/all" >全部</Link>
                    </li>
                    <li>
                        <Link acitveClassName="activeRoute"  to="/payment">待付款</Link>
                    </li>
                    <li>
                        <Link acitveClassName="activeRoute"  to="/take">待收货</Link>
                    </li>
                    <li>
                        <Link acitveClassName="activeRoute"  to="/estimate">待评价</Link>
                    </li>
                    <li>
                        <Link acitveClassName="activeRoute"  to="/salesreturn">退款退货</Link>
                    </li>
                </ul> */}
                {this.props.children}
            </div>
        )
    }
}

export default Order;
