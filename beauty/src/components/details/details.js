import React from 'react';
import {Link} from 'react-router';
import http from 'superagent';
import './details.scss';
import $ from '../../jquery-3.2.1.js';

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
        username: 'jk'
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
            
        })
    }
    colorChose(e){
        // let $colorTable = $('.jk-detailsSelectMainColor')
        // $colorTable.on('click', 'span' ,function(){
        //     $(this).addClass('colorFocus').siblings('span').removeClass('colorFocus');
        //     this.setState({
        //         tips: '已经选择'+$(this).text()
        //     })
        // })
        if(e.target.innerText == '海牙白'){
            this.setState({
                colorActive: 'span1',
                tips: '已选择',
                color: e.target.innerText,
                size: '请选择尺码'
            })
        }else if(e.target.innerText == '深海蓝'){
            this.setState({
                colorActive: 'span2',
                tips: '已选择',
                color: e.target.innerText,
                size: '请选择尺码'

            })
        }else if(e.target.innerText == '天然粉'){
            this.setState({
                colorActive: 'span3',
                tips: '已选择',
                color: e.target.innerText,
                size: '请选择尺码'
            })
        }else if(e.target.innerText == '奶粉绿'){
            this.setState({
                colorActive: 'span4',
                tips: '已选择',
                color: e.target.innerText,
                size: '请选择尺码'
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
        console.log(e.target)
        // e.target.onmouseup = function(){
        //     this.style.background = '#EE7099'
        // }
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
        // collection:30
        // goodsname:"韩版学院风高腰宽松烂九分牛仔裤女学生bf风百搭破洞毛边直筒哈伦裤潮"
        // path:"src/img/pants2a.jpg,src/img/pants2b.jpg"
        // prices:69
        // sales:250
        // qty
        // color
        // size
        // username
        let _username = this.state.username;
        let _path = $('.jk-detailsSelectMainGood').find('img').attr('src');
        let _collection = parseInt($('.jk-MainGoodDesribes').find('span').eq(2).text().replace(/[^0-9]/ig,""));
        let _price =$('.jk-MainGoodDesribes').find('span').eq(1).text().replace(/[^0-9]/ig,"")/100;
        // let _price = this.state.data[0].prices
        let _goodsname = $('.jk-MainGoodDesribes').find('span').eq(0).text();
        let _qty = this.state.count;
        let _color = $('.jk-detailsSelectMainColor').find('span').filter('.colorFocus').text();
        if($('.jk-detailsSelectMainColor').find('span').filter('.colorFocus').text() == ''){
            alert('请选择颜色');
            return
        }
        let _size = $('.jk-detailsSelectMainSize').find('span').filter('.sizeFocus').text();
        if($('.jk-detailsSelectMainSize').find('span').filter('.sizeFocus').text() == ''){
            alert('请选择尺码');
            return
        }
        console.log(_size)
        http.post('http://10.3.133.75:88/addToCar').set({
            'Content-Type': 'application/x-www-form-urlencoded'
        }).send({
            collection: _collection,
            goodsname: _goodsname,
            path: _path,
            prices: _price,
            qty: _qty,
            color: _color,  
            size: _size,
            username: _username
        }).end((req, res) => {
            console.log(res.body.status)
        })
    }
    render(){
        return(
            
                <div className="main">
                    <div className='jk-detailsHead'>
                        <i className="fas fa-undo-alt" onClick={this.getBack}></i>
                        <div>
                            <i className="fas fa-share-alt"></i>
                            <i className="fa fa-shopping-cart"></i>
                        </div>
                    </div>
                    {
                        this.state.data.map((item, index) => {
                            let url1 = item.path.split(',')[0]
                            let url2 = item.path.split(',')[1]
                            // console.log(item)
                            return(
                                <div className='jk-detailsMain' key={item.id}>
                                    <div className='jk-detailsMainImg'>
                                        <img src={url1} key={url1}/>
                                        <img src={url2} key={url2}/>
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
                                        <div className="jk-detailsMainGuideImg">
                                            {
                                                this.state.allImg.map((item, index) => {
                                                    return(
                                                        <img src={item} key={index}/> 
                                                    )
                                                })
                                            }
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
                </div>
        )
    }
}

export default Details;