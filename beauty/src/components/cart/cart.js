import React from 'react';
import {Link} from 'react-router';
import Lazyload from "react-lazyload"

import Menus from '../menus/menus';
import http from 'superagent';
import Goods from '../goods/goods'

import './cart.scss';

var c1 = {
    display:'block',
    color:'#fff',
    width:330,
    height:100,
    borderRadius:20,
    background:'#FF6699',
    fontSize:42,
    textAlign:'center',
    lineHeight:'100px',
    margin:'0 auto'
}
var c2 = {
    fontSize:42,
    width:300,
    height:200,
    margin:'0 auto',
    textAlign:'center',
    color:'#F60',
    lineHeight:'200px'
}
var c3 = {
    lineHeight:'40px',
    fontSize:28,
    color:'#f60',
    textAlign:'center'

}
var c4 = {
    display:'block',
    width:100,
    height:60,
    background:'#FF6699',
    color:'#fff',
    borderRadius:8,
    fontSize:30,
    lineHeight:'60px',
    margin:'0 auto',
    textAlign:'center',
    marginTop:10
}


class Cart extends React.Component{
    state = {
        data: [],
        // status:false
        style:"block",
        actionTitle:false,
        status: '编辑',
        carlist:[],
        total:0,
        total_qty:0,
        display: {},
        username:window.localStorage.getItem('username')
    }
    
     status(){
         if(this.state.status == '编辑'){
             this.setState({
                 status: '完成'
             })
         } else {
            this.setState({
                status: '编辑'
            })
         }

         if(this.state.style == 'block'){
             this.setState({
                 style: 'none'
             })
         } else {
             this.setState({
                 style: 'block'
             })
         }
        //  this.props.refs.cont
     }

    add(e){
        var id = e.target.parentNode.parentNode.parentNode.getAttribute('id');
        var currentLi = document.getElementById(id);
        var prices = currentLi.getElementsByClassName('yjPrices')[0].innerText.slice(1)*1;
        var checkbox = currentLi.firstElementChild.firstElementChild;
        if(!checkbox.checked == true){
            this.state.total = this.state.total
        }else{
            this.state.total += 1 * prices;
        }
        id = id*1;
        var qty = null;
        e.target.previousSibling.previousSibling.classList.remove('reduces');
        for(var i = 0; i < this.state.data.length; i++){
            if(id == this.state.data[i].id){
                this.state.data[i].qty  = this.state.data[i].qty+ 1;
                qty = this.state.data[i].qty
                this.setState({
                    data:this.state.data,
                    total:this.state.total,
                })
            }
        }
        http.post('http://10.3.133.75:88/updateGoods').set({
            'Content-Type': 'application/x-www-form-urlencoded'
        }).send({
            id,
            qty
        }).end((err,res) => {
            // console.log(res);
        })
    }

    reduce(e){
        var id = e.target.parentNode.parentNode.parentNode.getAttribute('id');
        var currentLi = document.getElementById(id);
        var prices = currentLi.getElementsByClassName('yjPrices')[0].innerText.slice(1)*1;
        var checkbox = currentLi.firstElementChild.firstElementChild;
        if(!checkbox.checked == true){
            this.state.total = this.state.total
        }else{
            this.state.total -= 1 * prices;
        }
        id = id*1;
        var qty = null;
        for(var i = 0; i < this.state.data.length; i++){
            if(id == this.state.data[i].id){
                if(this.state.data[i].qty == 1){
                    this.state.data[i].qty = 1;
                    e.target.classList.add('reduces');
                    
                    return;
                }else{
                    this.state.data[i].qty  = this.state.data[i].qty- 1;
                    qty = this.state.data[i].qty;
                    if(qty == 1){
                        e.target.classList.add('reduces');
                    }
                }
                this.setState({
                    data:this.state.data,
                    total:this.state.total,
                })
            }
        }
        http.post('http://10.3.133.75:88/updateGoods').set({
            'Content-Type': 'application/x-www-form-urlencoded'
        }).send({
            id,
            qty
        }).end((err,res) => {
            // console.log(res);
        })
    }

    change(idx,event){
        this.state.carlist[idx].qty = event.target.value;
        this.setState({carlist:this.state.carlist})
    }

    componentDidMount(){
        let username = window.localStorage.getItem('username')
        if(username == null){
            this.setState({
                display: {display: 'block'}
            })
        } else {
            this.setState({
                display: {display: 'none'}
            })
        }
        
        http.post('http://10.3.133.75:88/getCars')
        .set({'Content-Type': 'application/x-www-form-urlencoded','auth':window.localStorage.getItem('token')})
        .send({username:this.state.username}).end((error, res) => {
            if(!res.body.status){
                this.setState({
                    data:[]
                })
            }else{

                var arr = JSON.parse(res.text)
            
                if(arr.data.length > 0){
                    this.refs.noGoods.style.display = 'none'; 
                    this.setState({
                        data:arr.data
                    })
                }else{
                    this.refs.hasGoods.style.display = 'none';
                    this.setState({
                        data:arr.data
                    })
                }
            }
        })
    } 

    getKeys(item = {}){
        return Object.keys(item);
    }

    // 全选
    checkAll(){
        this.state.total = 0;
        var all = document.getElementById('all');
        var one = document.getElementsByName('my');
        if(all.checked == true){
            for(var i = 0; i < one.length; i++){
                one[i].checked = true;
                // console.log(one[i].parentNode.parentNode.getAttribute('id'));
                var id = one[i].parentNode.parentNode.getAttribute('id');
                var currentLi = document.getElementById(id);
                var qty = currentLi.getElementsByClassName('yjQty')[0].innerText.slice(1)*1;
                var prices = currentLi.getElementsByClassName('yjPrices')[0].innerText.slice(1)*1;
                this.state.total += qty * prices
            }
            this.setState({
                total:this.state.total,
                total_qty:one.length
            })
        }else{
            for(var j = 0; j < one.length; j++){
                one[j].checked = false;
                this.state.total = 0;
            }
            this.setState({
                total:this.state.total,
                total_qty:0
            })
        }
    }

    // 单选
    cancelCheckAll(e){
        var all = document.getElementById('all');
        var one = document.getElementsByName('my');
        var count = 0,num = 0;
        for(var i = 0; i < one.length; i++){
            if(one[i].checked == true){
                count++;
            }
            if(one[i].checked == false){
                num ++;
            }
            if(count == one.length){
                all.checked = true;
            }
            if(num > 0){
                if(all.checked == true){
                    all.checked = false;
                }
            }
        }
        
        if(e.target.checked == true){
            var id = e.target.parentNode.parentNode.getAttribute('id');
            var currentLi = document.getElementById(id);
            var qty = currentLi.getElementsByClassName('yjQty')[0].innerText.slice(1)*1;
            var prices = currentLi.getElementsByClassName('yjPrices')[0].innerText.slice(1)*1;
            this.state.total += qty *prices;
            this.setState({
                total:this.state.total,
                total_qty:this.state.total_qty+1
            })        
        }else{
            var id = e.target.parentNode.parentNode.getAttribute('id');
            var currentLi = document.getElementById(id);
            var qty = currentLi.getElementsByClassName('yjQty')[0].innerText.slice(1)*1;
            var prices = currentLi.getElementsByClassName('yjPrices')[0].innerText.slice(1)*1;
            this.state.total -= qty *prices;
            this.setState({
                total:this.state.total,
                total_qty:this.state.total_qty-1
            }) 
        }
    }

    del(e){
        var one = document.getElementsByName('my');
        var arr = [];
        for(var i = 0; i < one.length; i++){
            if(one[i].checked == true){
                arr.push(one[i].parentNode.parentNode.getAttribute('id'));
                // console.log(arr);
            }
        }
        var obj = {};
        for(var i = 0; i < arr.length; i++){
            obj[i] = arr[i]*1;
        }

        // var checkboxs = document.getElementsByName('my');
        // for(var i =0; i < checkboxs.length; i++){
        //     if(checkboxs[i].checked == true){
        //         var id = checkboxs[i].parentNode.parentNode.getAttribute('id');
        //         var currentLi = document.getElementById('id');
        //         var qty = currentLi.getElementsByClassName('yjQty')[0].innerText.slice(1)*1;
        //         var prices = currentLi.getElementsByClassName('yjPrices')[0].innerText.slice(1)*1;
        //         this.state.total -= qty * prices;
        //         this.setState({
        //             total:this.state.total
        //         })
                
        //     }
        // }

        http.post('http://10.3.133.75:88/deleteCarGood').set({
            'Content-Type': 'application/x-www-form-urlencoded'
        }).send(obj).end((err,res) => {
            var t = JSON.parse(res.text)
            if(t.status){
                var length = arr.length;
                this.setState({
                    total_qty:this.state.total_qty-length,
                    total:0
                })
                for(var i = 0; i < this.state.data.length; i++){
                    for(var j = 0; j < arr.length; j++){
                        if(this.state.data[i].id == arr[j]){
                            this.state.data.splice(i,1);
                        }
                    }
                }
            if(this.state.data.length > 0){
                this.refs.noGoods.style.display = 'none';
            }else{
                this.refs.noGoods.style.display = 'block';
            }
            this.setState({
                    data:this.state.data,
                })
            }
        })
    }
    
    render(){
        return(
            <div className="car">
                <div className="cartHead">
                    <ul>
                        <li></li>
                        <li> <h1>购物车<span className="num"></span></h1></li>
                        <li onClick={this.status.bind(this)}><span className="bianji">{this.state.status}</span></li>
                    </ul>
                </div>
                <div className="main">
                    <div className="goods" ref = "hasGoods">
                        <ul className="order_list"  ref="opt">
                        {
                            this.state.data.map((item,idx) => {
                                return (
                                    <li className="good_list" key={item.id}>
                                        <ul className="goods">
                                            <li className="good" key={item.id} id={item.id}>
                                                <div className="left box_btn">
                                                    <input type="checkbox" id="select_goods" className="select_goods" onClick={this.cancelCheckAll.bind(this)} name="my"/>
                                                </div>
                                                <div className="center picture"><Link to="/"><img src={item.path}/></Link></div> 
                                                <div className="right cont" ref="cont"  style={this.state.style == 'block' ? {dispaly:'block'} : {display:'none'}}>
                                                    <p className="good_title top">{item.goodsname}</p>
                                                    <p className="size center"><span>颜色:{item.color}</span><span>尺码：{item.size}</span></p>
                                                    <p className="bottom"><span className="yjPrices">￥{item.prices}</span><span className="yjQty">X{item.qty}</span></p>
                                                </div> 
                                                <div className="num" ref="num" style={this.state.style == 'block' ? {dispaly:'none'} : {display:'block'}}>
                                                    <div className="var">
                                                        <span className="reduce"  onClick={this.reduce.bind(this)} style= {item.qty ==1 ? {opacity:.5}:{opacity:1}}>-</span>
                                                        <span className="qty" onClick={this.change.bind(this,idx)}>{item.qty}</span>
                                                        <span className="add" onClick={this.add.bind(this)}>+</span>
                                                    </div>
                                                    <div className="bottom"><span>颜色:{item.color}</span><span>尺码：{item.size}</span></div>
                                                </div> 
                                            </li>
                                        </ul>
                                    </li>
                                )
                            })
                        }
                        </ul>
                    </div>
                    <div ref = "noGoods">
                        <div style={this.state.display}>
                            <p style={c3}>温馨提示，现在登录，您可以查看您的购物车</p>
                            <Link to="login" style={c4}>登录</Link>
                        </div>
                        <div className="none" style={c2}>购物车空空如也</div>
                        <div className="home"><Link to="/" id="a" style= {c1}>随便逛逛</Link></div>
                    </div>
                    <Goods/>
                </div>
                <div className="total">
                    <div className="btnAll">
                        <input type="checkbox" className="checkbox" id="all" onClick = {this.checkAll.bind(this)}/>
                        <span>全选</span>
                    </div>
                    <div className="right" ref="right" style={this.state.style == 'block' ? {dispaly:'block'} : {display:'none'}}>
                        <div className="totalPrice">
                            <p>合计<span>{this.state.total}</span></p>
                            <p>不含运费、优惠扣减</p>
                        </div>
                        <div className="account">
                            去结算
                            <span>({this.state.total_qty})</span>
                        </div>
                    </div> 
                    <div className="right2" ref="right2" style={this.state.style == 'block' ? {dispaly:'none'} : {display:'block'}}>
                        <span>收藏</span>
                        <span onClick = {this.del.bind(this)}>删除</span>
                    </div>  
                </div>
                <Menus test="cart"/>
            </div>
        )
    }
}

export default Cart;