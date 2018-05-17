import React from 'react';
import {Link} from 'react-router';

import Menus from '../menus/menus';
import './classify.scss'
class Classify extends React.Component{
    render(){
        return(
            <div>
                <div className="main">
                    <div className='jk-head'>
                        <div className='search'>
                            <i className="fas fa-search"></i>
                            <input type="text" name="" placeholder="搜索"/>
                        </div>
                        <div className='msg'>
                            <i className="far fa-envelope"></i>
                        </div>
                    </div>
                    <ul className='jk-classifylist'>
                        <li><a href="#"></a></li>  
                        <li><a href="#"></a></li> 
                        <li><a href="#"></a></li> 
                        <li><a href="#"></a></li>
                        <li><a href="#"></a></li>     
                        <li><a href="#"></a></li>
                        <li><a href="#"></a></li>
                        <li><a href="#"></a></li>
                        <li><a href="#"></a></li>
                        <li><a href="#"></a></li>
                        <li><a href="#"></a></li>
                        <li><a href="#"></a></li>
                        <li><a href="#"></a></li>
                        <li><a href="#"></a></li>
                        <li><a href="#"></a></li>
                        <li><a href="#"></a></li>
                    </ul>
                    <div className='jk-goodstab'>
                        <span className='default'>流行</span>
                        <span className='sold'>销量</span>
                        <span className='collection'>上新</span>
                    </div>
                    <div className='jk-goodslist'>
                        <div className='jk-goods'>
                            <img src="./img/goodslist1.png" alt=""/>
                            <p className='goodsname'>clothes</p>
                            <div className='details'>
                                <p className='price'>$998</p>
                                <p className='sold'>239
                                    <i className="fas fa-star"></i>
                                </p>
                            </div>
                        </div>
                        <div className='jk-goods'>
                            <img src="./img/goodslist1.png" alt=""/>
                            <p className='goodsname'>clothes</p>
                            <div className='details'>
                                <p className='price'>$998</p>
                                <p className='sold'>239
                                    <i className="fas fa-star"></i>
                                </p>
                            </div>
                        </div>
                        <div className='jk-goods'>
                            <img src="./img/goodslist1.png" alt=""/>
                            <p className='goodsname'>clothes</p>
                            <div className='details'>
                                <p className='price'>$998</p>
                                <p className='sold'>239
                                    <i className="fas fa-star"></i>
                                </p>
                            </div>
                        </div>
                        <div className='jk-goods'>
                            <img src="./img/goodslist1.png" alt=""/>
                            <p className='goodsname'>clothes</p>
                            <div className='details'>
                                <p className='price'>$998</p>
                                <p className='sold'>239
                                    <i className="fas fa-star"></i>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <Menus />
            </div>
        )
    }

}

export default Classify;