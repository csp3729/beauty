import React from 'react';
import {Link,hashHistory} from 'react-router';
import Menus from '../menus/menus';
import './classify.scss';
import http from 'superagent';
import $ from '../../jquery-3.2.1.js';
import LazyLoad from 'react-lazyload';
import {lazyload} from '../../lazyload.min.js';
class Classify extends React.Component{
    state = {
        data: [],
        targetData: [],
        search: '',
        toTop: ''
    }
    componentDidMount(){
        http.get('http://10.3.133.75:88/getAllGoods').end((req, res) => {
            
            this.setState({
                data: res.body.data.splice(0,4)
            })
        })
        document.querySelector('.Mls .main').addEventListener('scroll',this.handleScroll.bind(this));  
    }
    handleScroll(){
        let top = document.querySelector('.Mls .main').scrollTop;
        // console.log(top)
        if(top >= 53){
            this.setState({
                search: 'ceiling'
            })
        }if(top <= 53){
            this.setState({
                search: ''
            })
        }
        if(top >= 1334){
            this.setState({
                toTop: 'toTopDisappear'

            })
        }if(top <= 1334){
            this.setState({
                toTop: ''
            })
        }if(top >= 1286){
            http.get('http://10.3.133.75:88/getAllGoods').end((req, res) => {
                this.setState({
                    data: res.body.data.splice(0,8)
                })
                // console.log(this.state.data)
            })
        }if(top >= 2572){
            http.get('http://10.3.133.75:88/getAllGoods').end((req, res) => {
                this.setState({
                    data: res.body.data.splice(0,12)
                })
                // console.log(this.state.data)
            })
        }if( top >= 3857){
            http.get('http://10.3.133.75:88/getAllGoods').end((req, res) => {
                this.setState({
                    data: res.body.data.splice(0,17)
                })
                // console.log(this.state.data)
            })
        }
       
        
    }
    defaultSort(e){
        e.target.classList.add('tabfoucus')
        let $default = $('.default').eq(0) 
        $default.addClass('tabfoucus').siblings('span').removeClass('tabfoucus')
        let defaultdata = this.state.data.sort(function(a,b){
            return a.id - b.id;
        })  
        this.setState({
            data: defaultdata
        })
    }
    soldSort(e){
        console.log(e.target)
        let $sold = $('.sold').eq(0) 
        $sold.addClass('tabfoucus').siblings('span').removeClass('tabfoucus')
        let solddata = this.state.data.sort(function(a,b){
            return b.sales - a.sales;
        }) 
        this.setState({
            data: solddata
        })  
    }
    collectionSort(){
        let $collection = $('.collection').eq(0) 
        $collection.addClass('tabfoucus').siblings('span').removeClass('tabfoucus')
        let collectiondata = this.state.data.sort(function(a,b){
            return b.collection - a.collection;
        })
        this.setState({
            data: collectiondata
        })  
    }
    priceSort(){   
        let $price = $('.price').eq(0) 
        $price.addClass('tabfoucus').siblings('span').removeClass('tabfoucus')
        let pricedata = this.state.data.sort(function(a,b){
            return b.prices - a.prices;
        }) 
        this.setState({
            data: pricedata
        }) 
    }
    transmission(e){
        let targetid = e.target.parentNode.parentNode.getAttribute('data-id')
        console.log(targetid)
        if(targetid == null){
            return
        }
        // let goods = this.state.data.filter(function(item){
        //         return item.id  == targetid;                    
        //     });
        
        // if(goods != null){
        //     this.setState({
        //         targetData : goods
        //     })
        //     var path = {
        //       pathname:'/detail',
        //       state: this.state.targetData,
        //     }
        //     hashHistory.push(path)
        // }
        location.href = '#/details/'+ targetid;
    }
    toTop(){
        $('.Mls .main').animate({scrollTop:0}, 500); 
    }
    render(){
        return(
            <div>
                <div className="main">
                    <div className={`jk-classifyToTop ${this.state.toTop}`} onClick={this.toTop}>TOP</div>
                    <div className='jk-classifyHead'>
                        <div className={`jk-classifyHeadSearch ${this.state.search}`}>
                            <i className="fas fa-search"></i>
                            <Link to="/search"><input type="text" placeholder="搜索" /></Link>
                        </div>
                        <div className='msg'>
                            <i className="far fa-envelope"></i>
                        </div>
                    </div>
                    <ul className='jk-classifylist'>
                        <li><Link to="/details/3"></Link></li>  
                        <li><Link to="/details/3"></Link></li> 
                        <li><Link to="/details/3"></Link></li> 
                        <li><Link to="/details/3"></Link></li>
                        <li><Link to="/details/3"></Link></li>     
                        <li><Link to="/details/3"></Link></li>
                        <li><Link to="/details/3"></Link></li>
                        <li><Link to="/details/3"></Link></li>
                        <li><Link to="/details/3"></Link></li>
                        <li><Link to="/details/3"></Link></li>
                        <li><Link to="/details/3"></Link></li>
                        <li><Link to="/details/3"></Link></li>
                        <li><Link to="/details/3"></Link></li>
                        <li><Link to="/details/3"></Link></li>
                        <li><Link to="/details/3"></Link></li>
                        <li><Link to="/details/3"></Link></li>
                    </ul>
                    <div className='jk-goodstab'>
                        <span className='default tabfoucus' onClick={this.defaultSort.bind(this)} >流行</span>
                        <span className='sold' onClick={this.soldSort.bind(this)}>销量</span>
                        <span className='collection' onClick={this.collectionSort.bind(this)}>上新</span>
                        <span className='price' onClick={this.priceSort.bind(this)}>价格</span>
                    </div>
                    <div className='jk-goodslist'>
                        
                        {
                            this.state.data.map((item,index) => {
                                // console.log(item.path)
                                let path = item.path;
                                let arr = path.split(',');
                                let id = item.id;
                                return(
                                    
                                    <Link to='' key={id} data-id={id} onClick={this.transmission.bind(this)}>
                                    
                                    <div className='jk-goods' key={arr[1]}>
                                        
                                            <img src={arr[0]} key={arr[0]}/>
                                        
                                        <p className='goodsname' key={item.goodsname}>{item.goodsname}</p>
                                        <div className='details' key={item.index}>
                                            <p className='price' key={item.prices}>￥{item.prices}</p>
                                            <p className='sold' key={item.sales}>{item.sales}
                                                <i className="fas fa-star"></i>
                                            </p>
                                        </div>
                                    </div>

                                    </Link>
                                    
                                )
                            })
                        }
                        
                    </div>
                </div>
                <Menus />
                
            </div>
        )
    }
    
}

export default Classify;