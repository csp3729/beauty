import React from 'react';
import {router, route, Link} from 'react-router';

import './menus.scss';

class Menus extends React.Component{
    state = {
        active: '',
    }

    componentDidMount(){
        this.setState({
            active: this.props.test
        })
    }

 

    render(){
        return(
            <ul className="menus">
                <li>
                    <Link to="/" className={this.state.active == 'home'? 'active' : null}>
                        <i className="fa fa-home"></i>
                        首页
                    </Link>
                </li>
                <li>
                    <Link to="/classify" className={this.state.active == 'classify'? 'active' : null}>
                        <i className="fa fa-th-large"></i>
                        分类
                    </Link>
                </li>
                <li>
                    <Link to="/cart" className={this.state.active == 'cart'? 'active' : null}>
                        <i className="fa fa-shopping-cart"></i>
                        购物车
                    </Link>
                </li>
                <li>
                    <Link to="/user" className={this.state.active == 'user'? 'active' : null}>
                        <i className="fa fa-user"></i>
                        我的
                    </Link>
                </li>
            </ul>
        )
    }
}

export default Menus;