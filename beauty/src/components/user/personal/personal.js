import React from 'react';
import {Link, hashHistory} from 'react-router';

import http from '../../../utils/httpclient';

import './personal.scss';

class Personal extends React.Component{
    state = {
        data: {},
        amendSex: {display:'none'},
        sex:'hide',
        modl:''
    }

    componentDidMount(){
        this.getUser()
    }

    getUser(){
        let username = window.localStorage.getItem('username')
        http.post('getUser', {username}).then((res) => {
            this.setState({
                data: JSON.parse(res.text).data[0]
            })
        })
    }

    amendNickname(){
        this.props.router.push({
            pathname: '/nickname', 
            state:{
                username:  this.state.data.username
            }
        })
    }

    amendPerExplain(){
        this.props.router.push({
            pathname: '/perExplain', 
            state:{
                username:  this.state.data.username
            }
        })
    }

    amendSite(){
        this.props.router.push({
            pathname: '/site', 
            state:{
                username:  this.state.data.username
            }
        })
    }

    amendSex(){
        this.setState({
            amendSex: {display: 'block'},
            sex:'show'
        })
    }

    saveSex(e){
        let warn;
        let username = this.state.data.username;
        let sex = e.target.innerText;
        if(sex == '取消'){
            this.setState({
                sex:'hied',
            })
            setTimeout(() => {
                this.setState({
                    amendSex: {display: 'none'},
                })
            },100)
            return
        }
        this.updateUser({username, sex},(e) => {
            if(e == true){
                this.setState({
                    sex:'hied',
                })
                setTimeout(() => {
                    this.setState({
                        amendSex: {display: 'none'},
                    })
                    warn = '信息更新成功';
                    this.setState({
                        modl: 'block',
                        status: warn
                    })
                    setTimeout(function(){
                        this.setState({
                            modl: 'none',
                            status: ''
                        })
                    }.bind(this),2000)
                },100);
                this.getUser()
            } else {
                warn = '网络异常，请稍后重试';
                this.setState({
                    modl: 'block',
                    status: warn
                })
                setTimeout(function(){
                    this.setState({
                        modl: 'none',
                        status: ''
                    })
                }.bind(this),2000)
                return
            }
        })
    }

    updateUser(ele, cd){
        http.post('updateUser', ele).then((res) => {
            let result = JSON.parse(res.text)
            if(result.status){
                cd(true);
            } else {
                cd(false);
            }
        })
    }

    out(){
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('username');
        this.props.router.push('/')
    }

    render(){
        return(
            <div className="personal">
                <h3>个人信息</h3>
                <Link className="return" to="/user"><i className="fas fa-chevron-left"></i></Link>
                <ul>
                    <li>
                        <Link to="">
                            <div>头像</div>
                            <div>
                                <img src="src/img/bag1a.jpg"/>
                                <i className="fas fa-angle-right"></i>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link onClick={this.amendNickname.bind(this)}>
                            <div>昵称</div>
                            <div>
                                <span className="nike">{this.state.data.nickname}</span>
                                <i className="fas fa-angle-right"></i>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link >
                            <div>用户ID</div>
                            <div>Mls{this.state.data.id}</div>
                        </Link>
                    </li>
                    <li>
                        <Link onClick={this.amendSex.bind(this)}>
                            <div>性别</div>
                            <div>{this.state.data.sex}</div>
                        </Link>
                    </li>
                    <li>
                        <Link onClick={this.amendPerExplain.bind(this)}>
                            <div>个人说明</div>
                            <div>
                                <i className="fas fa-angle-right"></i>
                            </div>
                        </Link>
                    </li>
                    {/* <li>
                        <Link to="/birthday">
                            <div>生日设置</div>
                            <div>
                                <span className="birthday">填写生日 可享生日好礼</span>
                                <i className="fas fa-angle-right"></i>
                            </div>
                        </Link>
                    </li> */}
                    <li>
                        <Link onClick={this.amendSite.bind(this)}>
                            <div>收货地址</div>
                            <div>
                                <i className="fas fa-angle-right"></i>
                            </div>
                        </Link>
                    </li>
                    {/* <li>
                        <Link to="">
                            <div>账号与安全</div>
                            <div>
                                <i className="fas fa-angle-right"></i>
                            </div>
                        </Link>
                    </li> */}
                </ul>
                <div className="out" onClick={this.out.bind(this)}>退出当前账号</div>
                <div className="amendSex" style={this.state.amendSex}>
                    <ul onClick={this.saveSex.bind(this)} className={this.state.sex == 'show' ? 'show' : 'hide'}>
                        <li>女</li>
                        <li>男</li>
                        <li>取消</li>
                    </ul>
                </div>
                <div className="spmodl" style={{display:this.state.modl}}>{this.state.status}</div>
            </div>
        )
    }
}

export default Personal;