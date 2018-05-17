import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router';
import http from 'superagent';

import './popular.scss';

let arr = [];
let w;
let current_left;
class Popular extends React.Component{
    state = {
        data: [],
        ul_left: {left:'0px'},
        classSpan1: 'span',
        classSpan2: 'span',
        classSpan3: 'span',
        classSpan4: 'span'
    }
    componentDidMount(){
        http.get('http://10.3.133.75:88/getPics').end((error,res)=>{
            var arr = JSON.parse(res.text)
            this.setState({
                data:arr.data
            })
        })
    }
    getKeys(item = {}){
        return Object.keys(item);
    }
    startMove(e){
        arr.push(e.touches[0].screenX);
        if(arr.length<2){
            w = 0
        }else{
            w = arr[arr.length-1] - arr[arr.length-2];
        }
        let ul = document.querySelector('.popular_p .ul');
        let left = getComputedStyle(ul).left;
        let current_l = parseFloat(left) + w;
        if(current_l>=0){
            current_left = 0;
        }else if(current_l<-2430){
            current_left = -2430
        }else{
            current_left = current_l + 'px';
        }
        this.setState({
            ul_left: {left:current_left}
        })
        if(current_l>=-748){
            this.setState({
                classSpan1: 'span red',
                classSpan2: 'span',
                classSpan3: 'span',
                classSpan4: 'span'
            })
        }else if(current_l<-148 && current_l>=-1490){
            this.setState({
                classSpan1: 'span',
                classSpan2: 'span red',
                classSpan3: 'span',
                classSpan4: 'span',
            })
        }else if(current_l<=-1490 && current_l>=-2235){
            this.setState({
                classSpan1: 'span',
                classSpan2: 'span',
                classSpan3: 'span red',
                classSpan4: 'span',
            })
        }else{
            this.setState({
                classSpan1: 'span',
                classSpan2: 'span',
                classSpan3: 'span',
                classSpan4: 'span red'
            })
        }
    }
    startEnd(e){
        arr = []
    }
    render(){
        return (
            <div className="popular">
                <div className="popular_ing">
                    <i className="fas fa-fire"></i>
                    <h3>正在流行</h3>
                    <span><Link to="/classify">查看更多></Link></span>
                </div>
                <div className="popular_p">
                    <ul className="ul" onTouchMove={this.startMove.bind(this)} onTouchEnd={this.startEnd.bind(this)} style={this.state.ul_left}>
                        {
                            this.state.data.map((item)=>{
                                return (
                                    <li key={item.id}>
                                        <div><Link to="/classify"><img src={item.path} /></Link></div>
                                        <p>{item.describes}</p>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                <div className="popular_d">
                    <div className="popular_d_box">
                        <div className="taday">今天</div>
                        <span className={this.state.classSpan1}></span>
                        <span className={this.state.classSpan2}></span>
                        <span className={this.state.classSpan3}></span>
                        <span className={this.state.classSpan4}></span>
                    </div>
                </div>
            </div>
        )
    }
}

export default Popular