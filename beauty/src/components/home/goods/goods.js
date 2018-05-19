import React from 'react';
import ReactDOM from 'react-dom';
import http from 'superagent';
import LazyLoad from 'react-lazyload';

import './goods.scss';

class Goods extends React.Component{
    state = {
        data: []
    }
    componentDidMount(){console.log(LazyLoad)
        http.get('http://10.3.133.75:88/getAllGoods').end((error,res)=>{
            var arr = JSON.parse(res.text)
            this.setState({
                data: arr.data.splice(0,6)
            })
        })
        document.querySelector('.Mls .main').addEventListener('scroll', this.handleScroll.bind(this));
    }
    handleScroll(){
        let top = document.querySelector('.Mls .main').scrollTop
        // console.log(top)
        if( top >=2200){
            http.get('http://10.3.133.75:88/getAllGoods').end((error,res)=>{
                var arr = JSON.parse(res.text)
                this.setState({
                    data: arr.data.splice(0,17)
                })
            })
        }
        // else if( top >2890){
        //     http.get('http://10.3.133.75:88/getAllGoods').end((error,res)=>{
        //         var arr = JSON.parse(res.text)
        //         this.setState({
        //             data: arr.data.splice(0,8)
        //         })
        //     })
        // }


    }
    getKeys(item = {}){
        return Object.keys(item);
    }
    showDetail(e){
        var id = e.target.parentNode.id
        location.href = '#/details/'+ id;
        // console.log(e)
        // http.post('',id).then((error,res)=>{
        //     console.log(error,res)
        // })
    }
    render(){
        return (
            <div className="goods">
                <h3 className="popular_goods"><i className="fas fa-gem"></i>流行商品</h3>
                <ul className="popular_goods_show">
                    {
                        this.state.data.map((item)=>{
                            return (
                                <li key={item.id} id={item.id}>
                                    <img src={item.path.split(',')[0]} onClick={this.showDetail.bind(this)}/>
                                    <span>{item.describes}</span>
                                    <div className="pri">
                                        <div className="price">￥{item.prices}</div>
                                        <div className="collection">{item.collection}<i className="fas fa-star"></i></div>
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

export default Goods