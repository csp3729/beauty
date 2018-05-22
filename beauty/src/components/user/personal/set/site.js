import React from 'react';
import {Link} from 'react-router';

import http from '../../../../utils/httpclient';
import Ganged from '../ganged/ganged';
import './site.scss';

class Site extends React.Component{
    state = {
        username: '',
        site: [],
        message: 'block',
        status: '',
        modl: ''
    }

    componentDidMount(){
        this.getUser()
    }

    getUser(){
        let username = window.localStorage.getItem('username')
        http.post('getUser', {username}).then((res) => {
            let arr = res.body.data[0].address.split(',')
            if(res.body.data[0].address){
                this.setState({
                    site: arr,
                    message: 'none'
                })
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

    addSite(){
        this.props.router.push({
            pathname: '/addSite', 
            state:{
                site:  this.state.site,
                username: this.state.username
            }
        })
    }

    del(idx, e){
        let warn;
        let username = window.localStorage.getItem('username')
        let site = this.state.site
        site.splice(idx, 1) 
        let address = site.toString()
        this.updateUser({username, address}, (e) => {
            if(e == true){
                warn = '地址已删除'
                this.setState({
                    modl: 'block',
                    status: warn
                })
                setTimeout(() => {
                    this.setState({
                        modl: '',
                        status: ''
                    })
                },2000)
                this.getUser()
            } else {
                warn = '网络异常请稍后重试'
                this.setState({
                    modl: 'block',
                    status: warn
                })
                setTimeout(() => {
                    this.setState({
                        modl: '',
                        status: ''
                    })
                },2000)
            }
        })
    }

    render(){
        return(
            <div className="perExplain">
                <h3>管理收货地址</h3>
                <Link className="return" to="/personal"><i className="fas fa-chevron-left"></i></Link>
                <span onClick={this.addSite.bind(this)}>添加</span>
                <div className="message" style={{display: this.state.message}}>
                    <div className="mapMarker"><i className="fas fa-map-marker-alt"></i></div>
                    <p>你还没收货地址哦</p>
                    <div className="add" onClick={this.addSite.bind(this)}>去添加</div>
                </div>
                <div>
                    {
                        this.state.site.map((item, index) => {
                            item = item.split(' ')
                            return(
                                <div key={index} className="site">
                                    <p>{item[0]}<span>{item[1]}</span></p>
                                    <p>{item[2]}</p>
                                    <div>
                                        {/* <label htmlFor=""><input type="checkbox" />设为默认</label> */}
                                        {/* <span>编辑</span> */}
                                        <span onClick={this.del.bind(this, index)}>删除</span>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="spmodl" style={{display:this.state.modl}}>{this.state.status}</div>
            </div>
        )
    }
}

export default Site;