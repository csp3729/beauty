import React from 'react';
import ReactDOM from 'react-dom';
import http from 'superagent'
import './search.scss';
import '../goods/goods.scss'
class Search extends React.Component{
    state = {
        search_val: '',
        data: ['蕾丝裙','小清新','连衣裙','牛仔','短裤','上衣','卡通','休闲鞋','迷你包包','百搭'],
        h_data: ['休闲鞋'],
        goodsData: []
    }
    getVal(e){
        for(let i=0;i<this.state.h_data.length;i++){
            if(this.state.h_data[i] !== e.target.innerText){
                this.state.h_data.push(e.target.innerText)
                break
            }
        }
        this.setState({
            search_val: e.target.innerText
        })
    }
    getGoods(e){
        let _key = document.querySelector('.search_box input').value;
        console.log(_key)
        http.post('http://10.3.133.75:88/dimSelect')
        .set({'Content-Type': 'application/x-www-form-urlencoded'})
        .send({keyword: _key})
        .end((req, res) => {
            console.log(res.body.data)
            this.setState({
                goodsData: res.body.data
            })
        })
    }
    keyChange(e){
        this.setState({
            search_val:e.target.value
        })
    }
    transmission(e){
        let targetid = e.target.parentNode.getAttribute('id')
        console.log(targetid)
        if(targetid == null){
            return
        }
        location.href = '#/details/'+ targetid;
    } 
    render(){
        return (
            <div className="search_all">
                <div className="search">
                    <div className="search_box">
                        <i className="fas fa-search"></i>
                        <input type="text" placeholder='搜宝贝' value={this.state.search_val} onChange={this.keyChange.bind(this)}/>
                        <i className="fas fa-expand"></i>
                    </div>
                    <span onClick={this.getGoods.bind(this)}>搜索</span>
                </div>
                <div className="search_ho">
                    <div className="search_ho_s">
                        <i className="fas fa-fire"></i>
                        热门搜索
                    </div>
                    <ul>
                        {
                            this.state.data.map((item) => {
                                return (
                                    <li key={item}><span onClick={this.getVal.bind(this)}>{item}</span></li>
                                )
                            })
                        }
                    </ul>
                    <div className="search_ho_s">
                        <i className="fas fa-heart"></i>
                        历史记录 
                    </div>
                    <ul>
                        {
                            this.state.h_data.map((res, index) => {
                                return (
                                    <li key={index}><span className="his_span">{res}</span></li>
                                )
                            })
                        }
                    </ul>
                </div>
                <div className="goods">
                <h3 className="popular_goods"><i className="fas fa-gem"></i>搜索相关</h3>
                <ul className="popular_goods_show">
                    {
                        this.state.goodsData.map((item)=>{
                            return (
                                <li key={item.id} id={item.id} onClick={this.transmission.bind(this)}>
                                    <img src={item.path.split(',')[0]} />
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
            </div>
        )
    }
}

export default Search