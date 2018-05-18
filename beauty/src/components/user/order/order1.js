import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import Action from './orderaction';

import './order.scss';

class Order extends React.Component{
    state = {
        active: '',
    }

    componentDidMount(){
        this.setState({
            active: this.props.children.props.route.active
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
                <ul>
                    <li>
                        <Link to="all" className={this.state.active == 'all'? 'active' : null} onClick={this.active.bind(this,'all')}>全部</Link>
                    </li>
                    <li>
                        <Link to="payment" className={this.state.active == 'payment'? 'active' : null} onClick={this.active.bind(this,'payment')}>待付款</Link>
                    </li>
                    <li>
                        <Link to="take" className={this.state.active == 'take'? 'active' : null} onClick={this.active.bind(this,'take')}>待收货</Link>
                    </li>
                    <li>
                        <Link to="estimate" className={this.state.active == 'estimate'? 'active' : null} onClick={this.active.bind(this,'estimate')}>待评价</Link>
                    </li>
                    <li>
                        <Link to="salesreturn" className={this.state.active == 'salesreturn'? 'active' : null} onClick={this.active.bind(this,'salesreturn')}>退款退货</Link>
                    </li>
                </ul>
                <div>{this.props.children}</div>
            </div>
        )
    }
}

const mapStateToProps = (store) => {
    return{
        order: store.order
    }
}
export default connect(mapStateToProps, Action)(Order)
