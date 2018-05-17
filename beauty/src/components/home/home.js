import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router';

import Menus from '../menus/menus';
import Banner from './banner/banner';
import Popular from './popular/popular';
import Goods from './goods/goods';

import './home.scss';

class Home extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
             contentClass:"search"
        };
    }
    componentDidMount(){
        document.querySelector('.Mls .main').addEventListener('scroll',this.handleScroll.bind(this));
    }
    handleScroll(){
        let Top = document.querySelector('.Mls .main').scrollTop;
        if(Top >= 53){
            this.setState({
                contentClass:"search search_fixed"
            });
        }else{
            this.setState({
                contentClass:"search"
            });
        }
    }
    render(){
        return(
            <div>
                <div className="main">
                    <Banner />
                    <div className={this.state.contentClass}>
                        <div className="search_box">
                            <i className="fas fa-search"></i>
                            <Link to="/search"><input type="text" placeholder="搜索" /></Link>
                            <i className="fas fa-expand"></i>
                        </div>
                        <i className="far fa-envelope"></i>
                    </div>
                    <ul className="module">
                        <li><i className="fas fa-circle"></i>全场包邮</li>
                        <li><i className="fas fa-database"></i>先行赔付</li>
                        <li><i className="fas fa-baseball-ball"></i>7天无忧退</li>
                        <li><i className="fas fa-bookmark"></i>退货补贴</li>
                    </ul>
                    <div className="geli"></div>
                    <ul className="silde_box">
                        <li><Link to="/classify"><img src="src/img/silde_box1.gif" /></Link>9块9特卖</li>
                        <li><Link to="/classify"><img src="src/img/silde_box2.png" /></Link>初夏上新</li>
                        <li><Link to="/classify"><img src="src/img/silde_box3.png" /></Link>直播特卖</li>
                        <li><Link to="/classify"><img src="src/img/silde_box4.png" /></Link>大家都在买</li>
                    </ul>
                    <div className="geli"></div>
                    <Popular />
                    <div className="geli"></div>
                    <Goods />
                </div>
                <Menus test="home"/>
            </div>
        )
    }
}

export default Home;

