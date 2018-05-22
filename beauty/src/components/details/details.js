import React from 'react';
import {Link} from 'react-router';
import http from 'superagent';
import './details.scss';
import $ from '../../jquery-3.2.1.js';
import '../home/banner/swiper/swiper-4.2.0.min.scss';
import Swiper from '../home/banner/swiper/swiper-4.2.0.min.js'
class Details extends React.Component{
    state = {
        data: [],
        allImg: [],
        size: '尺码',
        color: '颜色',
        count: 1,
        tips: '请选择',
        colorActive: '',
        sizeActive: '',
        username: window.localStorage.getItem('username'),
        modl:'',
        
    }
    popupAppear(e){
        let $popup = $('.jk-detailsSelect')
        $popup.css({display:'block'});
        $popup.find('.jk-detailsSelectMain').slideToggle(300)
    }
    popupDisappear(e){
        let $popup = $('.jk-detailsSelect')
        $popup.find('.jk-detailsSelectMain').slideToggle(300);
        $popup.css({display:'none'});
    }
    componentDidMount(){
        let id = this.props.params.orderid;
        http.get('http://10.3.133.75:88/getAllGoods').end((req, res) => {
            var data = res.body.data;
            let url =[];
            for(let items of data){
                url.push(items.path)
            }
            let url1 = url.map((item, index) => {
                return item.split(',')
            })
            let url2 = []
            for(var i=0;i<url1.length;i++){
                for(var j=0;j<url1[i].length;j++){
                    url2.push(url1[i][j])
                }
            }
            let goods = res.body.data.filter(function(item){
                return item.id  == id;                    
            });

            this.setState({
                data: goods,
                allImg: url2
            })
            var swiper = new Swiper('.jk-detailsMainImg', {
                slidesPerView: 'auto',
                spaceBetween: 30,
                // autoplay: {
                //     delay: 2500,
                //     disableOnInteraction: false,
                // },
            })
            var swiper = new Swiper('.jk-detailsMainGuideImg', {
                slidesPerView: 4,
                slidesPerColumn: 2,
                spaceBetween: 70,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                autoplay: {
                    delay: 1500,
                    disableOnInteraction: false,
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
            })

        })
        
    }
    colorChose(e){
        if(e.target.innerText == '海牙白'){
            console.log(e.target.parentNode.nextSibling.children)

            this.setState({
                colorActive: 'span1',
                tips: '已选择',
                color: e.target.innerText,
                size: '请选择尺码',
                sizeActive: ''
            });
            // e.target.parentNode.nextSibling.children[1].classList.remove('sizeFocus')
            
        }else if(e.target.innerText == '深海蓝'){
            this.setState({
                colorActive: 'span2',
                tips: '已选择',
                color: e.target.innerText,
                size: '请选择尺码',
                sizeActive: ''
            })
        }else if(e.target.innerText == '天然粉'){
            this.setState({
                colorActive: 'span3',
                tips: '已选择',
                color: e.target.innerText,
                size: '请选择尺码',
                sizeActive: ''
            })
        }else if(e.target.innerText == '奶粉绿'){
            this.setState({
                colorActive: 'span4',
                tips: '已选择',
                color: e.target.innerText,
                size: '请选择尺码',
                sizeActive: ''
            })
        }
        
    }    
    sizeChose(e){
        if(e.target.innerText == 'S'){
            this.setState({
                sizeActive: 'span1',
                tips: '',
                size: e.target.innerText,
            })
        }else if(e.target.innerText == 'M'){
            this.setState({
                sizeActive: 'span2',
                tips: '',
                size: e.target.innerText,
            })
        }else if(e.target.innerText == 'L'){
            this.setState({
                sizeActive: 'span3',
                tips: '',
                size: e.target.innerText,
            })
        }else if(e.target.innerText == 'XL'){
            this.setState({
                sizeActive: 'span4',
                tips: '',
                size: e.target.innerText,
            })
        }
    }
    qtyIncrement(){
        this.setState({
            count: this.state.count + 1
        })
    }
    qtyDecrement(e){
        if(this.state.count > 1){
            this.setState({
                count: this.state.count - 1
            })
        }
    }
    qtyChange(e){
        this.setState({
            count:e.target.value
        })
    }
    getBack(){
        location.href = "#/classify"
    }
    addCar(){
        let warn;
        let _username = this.state.username;
        let _path = $('.jk-detailsSelectMainGood').find('img').attr('src');
        let _collection = parseInt($('.jk-MainGoodDesribes').find('span').eq(2).text().replace(/[^0-9]/ig,""));
        let _price =$('.jk-MainGoodDesribes').find('span').eq(1).text().replace(/[^0-9]/ig,"")/100;
        let _goodsname = $('.jk-MainGoodDesribes').find('span').eq(0).text();
        let _qty = this.state.count;
        let _color = $('.jk-detailsSelectMainColor').find('span').filter('.colorFocus').text();
        if($('.jk-detailsSelectMainColor').find('span').filter('.colorFocus').text() == ''){
            warn = '请选择颜色';
                this.setState({
                    spmodl: 'block',
                    status: warn
                })
                setTimeout(function(){
                    this.setState({
                        spmodl: 'none',
                        status: ''
                    })
                }.bind(this),2000)

            return
        }
        let _size = $('.jk-detailsSelectMainSize').find('span').filter('.sizeFocus').text();
        if($('.jk-detailsSelectMainSize').find('span').filter('.sizeFocus').text() == ''){
                warn = '请选择尺码';
                this.setState({
                    spmodl: 'block',
                    status: warn
                })
                setTimeout(function(){
                    this.setState({
                        spmodl: 'none',
                        status: ''
                    })
                }.bind(this),2000)
            return
        }
        
        http.post('http://10.3.133.75:88/addToCar')
        .set({'Content-Type': 'application/x-www-form-urlencoded','auth':window.localStorage.getItem('token')})
        .send({
            collection: _collection,
            goodsname: _goodsname,
            path: _path,
            prices: _price,
            qty: _qty,
            color: _color,  
            size: _size,
            username: this.state.username
        }).end((req, res) => {
            console.log(res.body.status)
            if(res.body.status){
                warn = '添加成功';
                this.setState({
                    spmodl: 'block',
                    status: warn
                })
                setTimeout(function(){
                    this.setState({
                        spmodl: 'none',
                        status: ''
                    })
                }.bind(this),2000)
            } else {
                this.props.router.push('login')
            }
        })
    }
    render(){
        return(
            
                <div className="main">
                    <div className='jk-detailsHead'>
                        <i className="fas fa-undo-alt" onClick={this.getBack}></i>
                        <div>
                            <i className="fas fa-share-alt"></i>
                            {/* <i className="fa fa-shopping-cart"></i> */}
                            <Link to="cart"><i className="fa fa-shopping-cart"></i></Link>
                        </div>
                    </div>
                    {
                        this.state.data.map((item, index) => {
                            let url1 = item.path.split(',')[0]
                            let url2 = item.path.split(',')[1]
                            // console.log(item)
                            return(
                                <div className='jk-detailsMain' key={item.id}>
                                    <div className='jk-detailsMainImg swiper-container'>
                                        <div className="swiper-wrapper">    
                                            <div className="swiper-slide"><img src={url1} key={url1}/></div>
                                            <div className="swiper-slide"><img src={url2} key={url2}/></div>
                                        </div>
                                    </div>

                                    <p className='jk-detailsMainGoodName'>{item.goodsname}</p>
                                    <div className='jk-detailsMainPrice'>
                                        <span>￥{item.prices-13.14}</span>
                                        <span><s>￥{item.prices+'.00'}</s></span>
                                        <span>优惠价</span>
                                    </div>
                                    <div className="jk-detailsMainDescribe">
                                        <span>销量{item.sales}</span>
                                        <span>收藏{item.collection}人</span>
                                        <span>72小时内发货</span>
                                    </div>
                                    <div className="jk-detailsMainPost">
                                        <span><i className="fa fa-check-circle" aria-hidden="true"></i>退货补运费</span>
                                        <span><i className="fa fa-check-circle" aria-hidden="true"></i>全国包邮</span>
                                        <span><i className="fa fa-check-circle" aria-hidden="true"></i>7天无理由退货</span>
                                        <span>></span>
                                    </div>
                                    <div className="jk-detailsMainEvaluate">
                                        <span>商品评价 {item.collection}</span>
                                        <span>更多></span>
                                    </div>
                                    <div className="jk-detailsMainGuide">
                                        <h4>为你推荐</h4>
                                        <div className="jk-detailsMainGuideImg swiper-container">
                                            <div className="swiper-wrapper">
                                            {
                                                this.state.allImg.map((item, index) => {
                                                    return(
                                                        <div className="swiper-slide" key={index}>
                                                            <img src={item} key={item}/>
                                                        </div> 
                                                    )
                                                })
                                            }
                                            </div>   
                                            <div className="swiper-pagination"></div>  
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                    <div className="jk-detailsMenus">
                        <span><i className="far fa-comments"></i>客服</span>
                        <span><i className="fas fa-store"></i>店铺</span>
                        <span><i className="far fa-star"></i>收藏</span>
                        <span onClick={this.popupAppear.bind(this)}>加入购物车</span>
                        <span onClick={this.popupAppear.bind(this)}>购买</span>
                    </div>
                    <div className='jk-detailsSelect'>
                        <div className='jk-detailsSelectShade'></div>
                        <div className='jk-detailsSelectMain'>
                            <div className="jk-detailsSelectMaincontainer">
                                    {
                                        this.state.data.map((item ,index) => {
                                            let url1 = item.path.split(',')[0]
                                            // console.log(item)
                                            return(
                                                <div className='jk-detailsSelectMainGood' key={index}>
                                                    <img src={url1} key={url1}/>
                                                    <div className='jk-MainGoodDesribes' key={item.goodsname}>
                                                        <span key={item.describes}>{item.goodsname}</span><br/>
                                                        <span >￥{item.prices-13.14}</span>
                                                        <span>(库存:{item.collection}件)</span><br/>
                                                        <span>{this.state.tips} {this.state.color} {this.state.size}</span>
                                                    </div>
                                                    <span className='jk-detailsSelectClose' onClick={this.popupDisappear.bind(this)}>&times;</span>
                                                </div>
                                            )
                                            
                                        })
                                    }
                                    <div onClick={this.colorChose.bind(this)}
                                        className="jk-detailsSelectMainColor">
                                        <h4>颜色：</h4>
                                        <span className={this.state.colorActive == 'span1' ? 'colorFocus' : null}>海牙白</span>
                                        <span className={this.state.colorActive == 'span2' ? 'colorFocus' : null}>深海蓝</span>
                                        <span className={this.state.colorActive == 'span3' ? 'colorFocus' : null}>天然粉</span>
                                        <span className={this.state.colorActive == 'span4' ? 'colorFocus' : null}>奶粉绿</span>
                                    </div>
                                    <div className='jk-detailsSelectMainSize' onClick={this.sizeChose.bind(this)}>
                                        <h4>尺码：</h4>
                                        <span className={this.state.sizeActive == 'span1' ? 'sizeFocus' : null}>S</span>
                                        <span  className={this.state.sizeActive == 'span2' ? 'sizeFocus' : null}>M</span>
                                        <span  className={this.state.sizeActive == 'span3' ? 'sizeFocus' : null}>L</span>
                                        <span  className={this.state.sizeActive == 'span4' ? 'sizeFocus' : null}>XL</span>
                                    </div>
                                    <div className='jk-detailsSelectMainQty'>
                                        <h4>数量</h4>
                                        <span onClick={this.qtyDecrement.bind(this)}>-</span>
                                        <input type='text' value={this.state.count} onChange={this.qtyChange}/>
                                        <span onClick={this.qtyIncrement.bind(this)}>+</span>
                                    </div>
                                    <div className='jk-detailsSelectMainComfirm' onClick={this.addCar.bind(this)}>
                                        确定
                                    </div>
                            </div>
                        </div>
                    </div>
                     <div className="jk-detailsTips" style={{display:this.state.spmodl}}>{this.state.status}</div>
                </div>
        )
    }
}

export default Details;