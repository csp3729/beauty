import React from 'react';
import ReactDOM from 'react-dom';

import './search.scss';

class Search extends React.Component{
    state = {
        search_val: '搜宝贝',
        data: ['秋季套装','连衣裙','破洞针织','薄卫衣','薄外套','秋季单鞋','牛仔外套','阔腿裤','小白鞋','包包新款'],
        h_data: ['修身上衣']
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
    getGoods(){
        alert('还没实现')
    }
    render(){
        return (
            <div className="search_all">
                <div className="search">
                    <div className="search_box">
                        <i className="fas fa-search"></i>
                        <input type="text" placeholder={this.state.search_val} />
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
                            this.state.h_data.map((res) => {
                                return (
                                    <li key={res}><span className="his_span">{res}</span></li>
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