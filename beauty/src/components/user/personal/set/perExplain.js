import React from 'react';
import {Link} from 'react-router';

import http from '../../../../utils/httpclient';

import './perExplain.scss';

class PerExplain extends React.Component{
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
        let personal = this.refs.explain.value;
        // if(!(explain)){
        //     warn = '用户名不能为空';
        //     this.setState({
        //         modl: 'block',
        //         status: warn
        //     })
        //     setTimeout(() => {
        //         this.setState({
        //             modl: 'none',
        //             status: ''
        //         })
        //     },2000)
        //     return
        // }
        this.updateUser({username, personal},(e) => {
            if(e == true){
                console.log(666)
                warn = '个人说明更新成功';
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
            <div className="perExplain">
                <h3>个人说明</h3>
                <Link className="return" to="/personal"><i className="fas fa-chevron-left"></i></Link>
                <span onClick={this.save.bind(this)}>保存</span>
                {/* <input type="text" id="nick" ref="nick"/> */}
                <textarea rows="3" cols="30" ref="explain"></textarea> 
                <p>个人说明不能超过40个汉字或者80个英文字符</p>
                <div className="spmodl" style={{display:this.state.modl}}>{this.state.status}</div>
            </div>
        )
    }
}

export default PerExplain;