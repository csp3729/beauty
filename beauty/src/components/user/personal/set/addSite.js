import React from 'react';
import {Link} from 'react-router';

import http from '../../../../utils/httpclient';
import Ganged from '../ganged/ganged';
import './addSite.scss';

class AddSite extends React.Component{
    state = {
        username: '',
        amendSite: 'none',
        status:'',
        modl:'',
        select: '',
        site: ''
    }

    componentWillMount(){
        this.setState({
            username: window.localStorage.getItem('username')
        })
    }

    componentDidMount(){
        this.getUser()
    }
    
    getUser(){
        let username = this.state.username
        http.post('getUser', {username}).then((res) => {
            this.setState({
                site: res.body.data[0].address
            })
        })
    }

    select(){
        let { province, city, district } = this.refs.ganged.state;
        this.setState({
            select: `${province}-${city}-${district}`
        })
    }

    amendSiteShow(){
        this.setState({
            amendSite: 'block',
            // sex:'show'
        })
    }

    amendSiteHidden(){
        this.setState({
            amendSite: 'none',
        })
    }

    save(){
        let warn;
        let { consignee, phone, area, detailed } = this.refs;
        var reg = new RegExp('-','g');
        let Area = area.innerText.replace(reg,'');
        consignee = consignee.value;
        phone = phone.value 
        detailed = Area+detailed.value
        let address;
        if(this.state.site){
            address = this.state.site+','+consignee+' '+phone+' '+detailed
        } else {
            address = consignee+' '+phone+' '+detailed
        }
        let username = this.state.username;
        this.updateUser({username, address}, (e) =>{
            if(e == true){
                this.getUser()
                warn = '地址添加成功'
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
            } else {
                warn = "　网络异常...　请稍后重试"
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

    render(){
        let el;
        if(this.state.amendSite == 'block'){
            el =  <Ganged ref="ganged" select={this.select.bind(this)} hidden={this.amendSiteHidden.bind(this)}/>
        } else {
            el = null;
        }
        return(
            <div className="perExplain">
                <h3>收货地址</h3>
                <Link className="return" to="/site"><i className="fas fa-chevron-left"></i></Link>
                <span onClick={this.save.bind(this)}>保存</span>
                <label htmlFor="consignee">　收货人：<input type="text" ref="consignee"/></label>
                <label htmlFor="phone">　手机号：<input type="text" ref="phone"/></label>
                <p className="area" onClick={this.amendSiteShow.bind(this)}>省市区：<span ref="area">{this.state.select}</span></p>
                <label htmlFor="detailed">详细地址：<input type="text" ref="detailed"/></label>
                {el}
                <div className="spmodl" style={{display:this.state.modl}}>{this.state.status}</div>
            </div>
        )
    }
}

export default AddSite;