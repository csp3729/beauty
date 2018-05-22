import React from 'react';
import {Link} from 'react-router';

import Menus from '../menus/menus';
import http from '../../utils/httpclient';

import './user.scss';

class User extends React.Component{
    state = {
        data:{}
    }

    componentDidMount(){
        let username = window.localStorage.getItem('username')
        http.post('getUser', {username}).then((res) => {
            this.setState({
                data: JSON.parse(res.text).data[0]
            })
        })
    }

    render(){
        return(
            <div className="user">
                <div className="main">
                    <div className="head">
                        <Link to="/personal"><i className="fas fa-cog"></i></Link>
                        <i className="far fa-comment-dots"></i>
                    </div>
                    <div className="user-tow">
                        <div className="portrait">
                            <Link to="/personal"><img src="src/img/bag1a.jpg"/></Link>
                        </div>
                        <div className="tow-user">
                            <p className="username">{this.state.data.nickname}</p>
                            <p>累计积分：<span>0</span></p>
                        </div>
                        <div className="member">
                            <span>普通会员</span>
                        </div>
                        <div className="sign">
                            <i className="far fa-edit"></i>签到
                        </div>
                    </div>
                    <div className="user-three">
                        <ul>
                            <li><Link to="/order/payment"><i className="fab fa-cc-amazon-pay"></i>待付款</Link></li>
                            <li><Link to="/order/take"><i className="fas fa-plane"></i>待收货</Link></li>
                            <li><Link to="/order/estimate"><i className="far fa-keyboard"></i>待评价</Link></li>
                            <li><Link to="/order/salesreturn"><i className="fas fa-exchange-alt"></i>退换货</Link></li>
                            <li><Link to="/order/all"><i className="far fa-clipboard"></i>全部订单</Link></li>
                        </ul>
                    </div>
                    <div className="user-four">
                        <ul>
                            <li>
                                <Link><i className="far fa-star"></i>收藏</Link>
                            </li>
                            <li>
                                <Link><i className="fas fa-shoe-prints"></i>足迹</Link>
                            </li>
                            <li>
                                <Link><i className="fas fa-gift"></i>热卖好货</Link>
                            </li>
                            <li>
                                <Link><i className="fas fa-tags"></i>流行趋势</Link>
                            </li>
                            <li>
                                <Link><i className="far fa-heart"></i>猜你喜欢</Link>
                            </li>
                            <li>
                                <Link><i className="fas fa-wallet"></i>钱包</Link>
                            </li>
                            <li>
                                <Link><i className="fas fa-phone"></i>客服帮助</Link>
                            </li>
                            <li>
                                <Link><i className="fas fa-money-check-alt"></i>优惠卷</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <Menus ref="menus" test="user"/>
            </div>
        )
    }
}

export default User;