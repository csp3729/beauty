import React from 'react';
import {Link} from 'react-router';

import http from '../../../../utils/httpclient';
import Ganged from '../ganged/ganged';
import './site.scss';

class Site extends React.Component{
    state = {
        username: '',
        amendSite: {display:'none'},
        status:'',
        modl:''
    }

    componentDidMount(){
        this.setState({
            username: this.props.location.state.username
        })
    }

    amendSite(){
        this.setState({
            amendSite: {display: 'block'},
            // sex:'show'
        })
    }

    save(){
        console.log(6)
    }

    render(){
        return(
            <div className="perExplain">
                <h3>收货地址</h3>
                <Link className="return" to="/personal"><i className="fas fa-chevron-left"></i></Link>
                <span onClick={this.save.bind(this)}>保存</span>
                <label htmlFor="consignee">　收货人：<input type="text" id="consignee" ref="consignee"/></label>
                <label htmlFor="phone">　手机号：<input type="text" id="phone" ref="phone"/></label>
                <label htmlFor="site">　省市区：<input type="text" id="site" ref="site" onClick={this.amendSite.bind(this)}/></label>
                <label htmlFor="detailed">详细地址：<input type="text" id="detailed" ref="detailed"/></label>
                {/* <p></p> */}
                <Ganged />
                <div className="spmodl" style={{display:this.state.modl}}>{this.state.status}</div>
            </div>
        )
    }
}

export default Site;