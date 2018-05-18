import React from 'react';
import {Link} from 'react-router';

import http from '../../../utils/httpclient';

import './login.scss';


//旋转图片验证方式，功能未完成
// const requireContext = require.context("../../../img/desc",true, /^\.\/.*\.png$/); 
// const projectImgs = requireContext.keys().map(requireContext);  
// let num = parseInt(Math.random()*4)+1;
// var setBackImg = {
//     backgroundImage: `url(${projectImgs[num]})`,
//     backgroundSize: 'auto 2.093333rem',
//     transform: 'rotate(0deg)'
// }
// let list =[]
// for(var i=0;i<projectImgs.length;i++){
//     list.push(<li style={setBackImg} key={i}></li>)
// }

class Login extends React.Component{
    state = {
        code: '',
        active: '',
        modl:''
    }

    componentDidMount(){
        this.randomCode()
    }

    changeCode(){
        this.randomCode()
    }

    change(){
        if(this.refs.username.value && this.refs.password.value && this.refs.code.value){
            this.setState({
                active: 'user'
            })
        } else {
            this.setState({
                active: ''
            })
        }
    }

    randomCode(){//随机4位数验证码
        var num = parseInt(Math.random()*(9999-1000+1))+1000;
        this.setState({
            code: num
        })
    }

    login(){
        let warn;
        if(this.refs.username.value && this.refs.password.value && this.refs.code.value){
            var username = this.refs.username.value;
            var password = this.refs.password.value;
            var code = this.refs.code.value;
            if(!(code == this.state.code)){
                warn = '请输入正确的验证码';
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
            } else {
                http.post('login',  {username, password}).then((res) => {
                    if(res.body.status){
                        window.localStorage.setItem('token', res.body.data);
                        // let message = JSON.stringify(res.body.message)
                        window.localStorage.setItem('username', username);
                        this.props.router.push('user')
                    } else {
                        warn = '用户名或密码不正确';
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
                    }
                })
            }
        } else {
            warn = '登录信息不能为空';
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
    }

    render(){
        return(
            <div className="login">
                <h2>登录</h2>
                <Link className="return" to="/"><i className="fas fa-chevron-left"></i></Link>
                {/* <Link className="test" to="/login"><i className="fas fa-ellipsis-h"></i></Link> */}
                <span className="fas fa-ellipsis-h"></span>
                <div></div>{/* 点击span显示该div,未写 */}
                <ul>
                    <li>
                        <h4>你的帐号</h4>
                        <input type="text" placeholder="昵称/邮箱/手机" onChange={this.change.bind(this)} ref="username"/>
                    </li>
                    <li>
                        <h4>密码</h4>
                        <input type="password" placeholder="输入密码" onChange={this.change.bind(this)} ref="password"/>
                    </li>
                    <li>
                        <h4>{this.state.code}</h4>
                        <input type="text" placeholder="输入验证码" onChange={this.change.bind(this)} ref="code"/>
                        <span onClick={this.changeCode.bind(this)}>更换验证码</span>
                    </li>
                </ul>
                {/* 旋转图片验证，未想到验证方式 */}
                {/* <div className="desc">
                    <span>请点击图片旋转至正向朝上</span>
                    <span className="change">换一组</span>
                </div>
                <ul className="img-list">
                   {list}
                </ul> */}
                <input type="button" value="登录" id="next" className={`next ${this.state.active ? 'active' : null}`} onClick={this.login.bind(this)}/>
                <div className="select">
                    <span>海外手机</span>
                    <span>免密登录</span>
                    <span className="sign"><Link to="/reg">注册帐号</Link></span>
                </div>
                <div className="spmodl" style={{display:this.state.modl}}>{this.state.status}</div>
            </div>
        )
    }
}

export default Login;