import React from 'react';
import {Link} from 'react-router';

import './menus.scss';


class Menus extends React.Component{
    render(){
        return(
            <ul className="menus">
                <li>
                    <Link to="/" className="active">
                        <i className="fa fa-home"></i>
                        首页
                    </Link>
                </li>
                <li>
                    <Link to="/classify">
                        <i className="fa fa-th-large"></i>
                        分类
                    </Link>
                </li>
                <li>
                    <Link to="/cart">
                        <i className="fa fa-shopping-cart"></i>
                        购物车
                    </Link>
                </li>
                <li>
                    <Link to="/user">
                        <i className="fa fa-user"></i>
                        我的
                    </Link>
                </li>
            </ul>
        )
    }
}

export default Menus;