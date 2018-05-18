import React from 'react';
import {Link, hashHistory} from 'react-router';

import http from '../../../utils/httpclient';

import './personal.scss';

class Personal extends React.Component{
    state = {
        data: {},
        amendSex: {display:'none'},
        sex:'hide'
    }

    componentDidMount(){
        return
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

    amend(){
        console.log('敲尼玛，真多东西写')
    }

    amendSex(){
        this.setState({
            amendSex: {display: 'block'},
            sex:'show'
        })
    }

    saveSex(e){
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
                },100);
                this.getUser()
            } else {
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
        console.log('已return，避免误操作');
        return
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('username');
        this.props.router.push('/')
    }

    render(){
        return(
            <div className="personal">
                <h3>个人信息</h3>
                <Link className="return" to="/user"><i className="fas fa-chevron-left"></i></Link>
                {/* <span onClick={this.amend.bind(this)}>编辑</span> */}
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
                    <li>
                        <Link to="/birthday">
                            <div>生日设置</div>
                            <div>
                                <span className="birthday">填写生日 可享生日好礼</span>
                                <i className="fas fa-angle-right"></i>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link to="/site">
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
                <input type="button" value="退出当前账号" onClick={this.out.bind(this)}/>
                <div className="amendSex" style={this.state.amendSex}>
                    <ul onClick={this.saveSex.bind(this)} className={this.state.sex == 'show' ? 'show' : 'hide'}>
                        <li>女</li>
                        <li>男</li>
                        <li>取消</li>
                    </ul>
                </div>
                {/* <div className="amend">
                    <ul>
                        <li>
                            <span>头像：</span><input type="text"/>
                        </li>
                        <li>
                            <span>昵称：</span><input type="text" value={this.state.data.nickname}/>
                        </li>
                        <li>
                            <span>性别：</span>
                            <input type="text" value={this.state.data.sex}/>
                        </li>
                        <li>
                            <span>个人说明：</span><input type="text"/>
                        </li>
                        <li>
                            <span>生日：</span><input type="text"/>
                        </li>
                        <li>
                            <span>收货地址：</span><input type="text"/>
                        </li>
                        <li id="save">
                            <span onClick={this.amend.bind(this)}>保存</span>
                        </li>
                    </ul>
                </div> */}
            </div>
        )
    }
}

export default Personal;