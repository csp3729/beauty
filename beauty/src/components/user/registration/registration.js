import React from 'react';
import {Link} from 'react-router';

import http from '../../../utils/httpclient';

import './registration.scss';

let code;

class Registration extends React.Component{
    state = {
        code: '',
        modl: 'none',
        status: '',
        active: ''
    }

    componentDidMount(){
        var code = parseInt(Math.random()*(999999-100000+1))+100000;
        this.setState({
            code: code
        })
    }

    reg(){
        let warn;
        if(this.refs.phone.value && this.refs.password.value && this.refs.code.value){
            var username = this.refs.phone.value;
            var password = this.refs.password.value;
            var code = this.refs.code.value;
            if(!(code == this.state.code)){
                warn = '短信检验失败，请重试';
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
                http.post('register', {username, password}).then((res) => {
                    if(res.body.status){
                        http.post('login',  {username, password}).then((res) => {
                            if(res.body.status){
                                window.localStorage.setItem('token', res.body.data);
                                let message = JSON.stringify(res.body.message)
                                window.localStorage.setItem('message', message);
                                this.props.router.push('user')
                            }
                        })
                    } else {
                        warn = '该手机号码已经注册';
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
        } else {
            warn = '请输入信息再提交注册';
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

    code(){
        let re = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/
        if(!(re.test(this.refs.phone.value))){
            let phone = '请输入正确的手机号码'
            this.setState({
                modl: 'block',
                status: phone
            })
            setTimeout(function(){
                this.setState({
                    modl: 'none',
                    status: ''
                })
            }.bind(this),2000)
            return
        }
        code = parseInt(Math.random()*(999999-100000+1))+100000;
        alert('您的随机验证码为：' + code)
        this.setState({
            code: code
        })
    }

    change(){
        if(this.refs.phone.value && this.refs.password.value && this.refs.code.value){
            this.setState({
                active: 'user'
            })
        } else {
            this.setState({
                active: ''
            })
        }
    }

    render(){
        return(
            <div className="reg">
                <h2>注册</h2>
                <Link className="return" to="/login"><i className="fas fa-chevron-left"></i></Link>
                <ul>
                    <li>
                        <h4>国家和地区</h4>
                        <h3>中国 <span>+86</span></h3>
                        <Link className="area"><i className="fas fa-chevron-right"></i></Link>
                    </li>
                    <li>
                        <h4>你的手机号码是?</h4>
                        <input type="text" placeholder="输入手机号码" onChange={this.change.bind(this)} ref="phone"/>
                    </li>
                    <li>
                        <h4>设置密码</h4>
                        <input type="password" placeholder="设置你的密码" onChange={this.change.bind(this)} ref="password"/>
                    </li>
                    <li>
                        <h4>验证码</h4>
                        <input type="text" placeholder="输入验证码" onChange={this.change.bind(this)} ref="code"/>
                        <span onClick={this.code.bind(this)}>获取验证码</span>
                    </li>
                </ul>
                <input type="button" value="注册" id="next" className={`next ${this.state.active ? 'active' : null}`} onClick={this.reg.bind(this)}/>
                <div className="spmodl" style={{display:this.state.modl}}>{this.state.status}</div>
            </div>
        )
    }
}

export default Registration;