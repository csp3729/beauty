import React from 'react';
import {Link} from 'react-router';

import http from '../../../../utils/httpclient';

import './nikename.scss';

class Nickname extends React.Component{
    state = {
        username: '',
        status:'',
        modl:''
    }

    componentDidMount(){
        this.setState({
            username: this.props.location.state.username
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

    save(){
        var warn;
        let username = this.state.username;
        let nickname = this.refs.nick.value;
        if(!(nickname)){
            warn = '用户名不能为空';
            this.setState({
                modl: 'block',
                status: warn
            })
            setTimeout(() => {
                this.setState({
                    modl: 'none',
                    status: ''
                })
            },2000)
            return
        }
        this.updateUser({username, nickname},(e) => {
            if(e == true){
                warn = '用户名已保存';
                this.setState({
                    modl: 'block',
                    status: warn
                })
                setTimeout(() => {
                    this.setState({
                        modl: 'none',
                        status: ''
                    })
                },2000)
            } else {
                warn = '网络异常，请稍后重试';
                this.setState({
                    modl: 'block',
                    status: warn
                })
                setTimeout(() => {
                    this.setState({
                        modl: 'none',
                        status: ''
                    })
                },2000)
            }
        })
    }

    render(){
        return(
            <div className="nickname">
                <h3>昵称</h3>
                <Link className="return" to="/personal"><i className="fas fa-chevron-left"></i></Link>
                <span onClick={this.save.bind(this)}>保存</span>
                <input type="text" id="nick" ref="nick"/>
                <p>昵称不能超过10个汉字或者20个英文字符，支持中英文、数字、下划线</p>
                <div className="spmodl" style={{display:this.state.modl}}>{this.state.status}</div>
            </div>
        )
    }
}

export default Nickname;