import React from 'react';
import {Link} from 'react-router';

import http from '../../../../utils/httpclient';

import './allorder.scss';

export class All extends React.Component{
    state = {
        data: []
    }

    componentDidMount(){
        let username = window.localStorage.getItem('username');
        http.post('getAllOrder', {username}).then((res) => {
            this.setState({
                data: JSON.parse(res.text).data
            })
        })
    }

    render(){
        let total = 0;
        return(
            <div className="orderlist">
                <ul >
                    {
                        this.state.data.map((item) => {
                            total += (item.prices*1 * item.qty)
                            return(
                                <li id={item.id} key={item.id}>
                                    <div className="goods">
                                        <img src={item.path}/>
                                        <div className="mess">
                                            <h4>{item.goodsname}</h4>
                                            <p>尺码:{item.sizes}</p>
                                            <p>{item.status}</p>
                                        </div>
                                        <div className="prices">
                                            <p>&nbsp;￥{item.prices*2}</p>
                                            <p>&nbsp;￥{item.prices}</p>
                                            <p className="qty">&times;{item.qty}</p>
                                            <p>合计: ￥{item.prices*1 * item.qty}</p>
                                        </div>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}

export class Payment extends React.Component{
    state = {
        data: []
    }
    
    componentDidMount(){
        let username = window.localStorage.getItem('username');
        http.post('getAllOrder', {username}).then((res) => {
            this.setState({
                data: JSON.parse(res.text).data
            })
        })
    }

    render(){
        let total = 0;
        return(
            <div className="payment">
                <ul >
                    {
                        this.state.data.map((item) => {
                            if(item.status == '待付款'){
                                total += (item.prices*1 * item.qty)
                                return(
                                    <li id={item.id} key={item.id}>
                                        <div className="goods">
                                            <img src={item.path}/>
                                            <div className="mess">
                                                <h4>{item.goodsname}</h4>
                                                <p>尺码:{item.sizes}</p>
                                                <p>{item.status}</p>
                                            </div>
                                            <div className="prices">
                                                <p>&nbsp;￥{item.prices*2}</p>
                                                <p>&nbsp;￥{item.prices}</p>
                                                <p className="qty">&times;{item.qty}</p>
                                                <p>合计: ￥{item.prices*1 * item.qty}</p>
                                            </div>
                                        </div>
                                        <div className="singleton">
                                            <div>去付款</div>
                                        </div>
                                    </li>
                                )
                            }
                        })
                    }
                </ul>
                <div className="all">
                    <div>
                        <p>全国包邮　总计：<span>￥{total}</span></p>
                    </div>
                    <div>
                        <p>全部付款</p>
                    </div>
                </div>
            </div>
        )
    }
}

export class Take extends React.Component{
    state = {
        data: []
    }
    
    componentDidMount(){
        let username = window.localStorage.getItem('username');
        http.post('getAllOrder', {username}).then((res) => {
            this.setState({
                data: JSON.parse(res.text).data
            })
        })
    }

    render(){
        return(
            <div className="take">
                <ul >
                    {
                        this.state.data.map((item) => {
                            if(item.status == '待收货'){
                                return(
                                    <li id={item.id} key={item.id}>
                                        <div className="goods">
                                            <img src={item.path}/>
                                            <div className="mess">
                                                <h4>{item.goodsname}</h4>
                                                <p>尺码:{item.sizes}</p>
                                                <p>{item.status}</p>
                                            </div>
                                            <div className="prices">
                                                <p>&nbsp;￥{item.prices*2}</p>
                                                <p>&nbsp;￥{item.prices}</p>
                                                <p className="qty">&times;{item.qty}</p>
                                                <p>合计: ￥{item.prices*1 * item.qty}</p>
                                            </div>
                                        </div>
                                        <div className="singleton">
                                            <div>确认收货</div>
                                        </div>
                                    </li>
                                )
                            }
                        })
                    }
                </ul>
                <div className="all">
                    <div>
                        {/* <p>全国包邮　总计：<span>￥{total}</span></p> */}
                    </div>
                    <div>
                        <p>全部收货</p>
                    </div>
                </div>
            </div>
        )
    }
}

export class Estimate extends React.Component{
    state = {
        data: []
    }
    
    componentDidMount(){
        let username = window.localStorage.getItem('username');
        http.post('getAllOrder', {username}).then((res) => {
            this.setState({
                data: JSON.parse(res.text).data
            })
        })
    }

    render(){
        return(
            <div className="estimate">
                <ul >
                    {
                        this.state.data.map((item) => {
                            if(item.status == '待评价'){
                                return(
                                    <li id={item.id} key={item.id}>
                                        <div className="goods">
                                            <img src={item.path}/>
                                            <div className="mess">
                                                <h4>{item.goodsname}</h4>
                                                {/* <p>颜色:{item.color};尺码:{item.sizes}</p> */}
                                                <p>尺码:{item.sizes}</p>
                                                <p>{item.status}</p>
                                            </div>
                                            <div className="prices">
                                                <p>&nbsp;￥{item.prices*2}</p>
                                                <p>&nbsp;￥{item.prices}</p>
                                                <p className="qty">&times;{item.qty}</p>
                                                <p>合计: ￥{item.prices*1 * item.qty}</p>
                                            </div>
                                        </div>
                                        <div className="singleton">
                                            <div>去评价</div>
                                        </div>
                                    </li>
                                )
                            }
                        })
                    }
                </ul>
                {/* <div>
                    <div>
                        <p>全国包邮　总计：<span>￥{total}</span></p>
                    </div>
                    <div>
                        <p>全部付款</p>
                    </div>
                </div> */}
            </div>
        )
    }
}

export class Salesreturn extends React.Component{
    state = {
        data: []
    }
    
    componentDidMount(){
        let username = window.localStorage.getItem('username');
        http.post('getAllOrder', {username}).then((res) => {
            this.setState({
                data: JSON.parse(res.text).data
            })
        })
    }

    render(){
        return(
            <div className="salesreturn">
                <ul >
                    {
                        this.state.data.map((item) => {
                            if(item.status == '退货完成'){
                                return(
                                    <li id={item.id} key={item.id}>
                                        <div className="goods">
                                            <img src={item.path}/>
                                            <div className="mess">
                                                <h4>{item.goodsname}</h4>
                                                {/* <p>颜色:{item.color};尺码:{item.sizes}</p> */}
                                                <p>尺码:{item.sizes}</p>
                                                <p>{item.status}</p>
                                            </div>
                                            <div className="prices">
                                                <p>&nbsp;￥{item.prices*2}</p>
                                                <p>&nbsp;￥{item.prices}</p>
                                                <p className="qty">&times;{item.qty}</p>
                                                <p>合计: ￥{item.prices*1 * item.qty}</p>
                                            </div>
                                        </div>
                                    </li>
                                )
                            }
                        })
                    }
                </ul>
                {/* <div>
                    <div>
                        <p>全国包邮　总计：<span>￥{total}</span></p>
                    </div>
                    <div>
                        <p>全部付款</p>
                    </div>
                </div> */}
            </div>
        )
    }
}

// export default (
//     <Route>
//         <Route path="/all" component={All}/>
//         <Route path="/payment" component={Payment}/>
//         <Route path="/take" component={Take}/>
//         <Route path="/estimate" component={Estimate}/>
//         <Route path="/salesreturn" component={Salesreturn}/>
//     </Route>
// )

// export default {All, Payment, Take, Estimate, Salesreturn}


