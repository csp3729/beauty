import React from 'react';
import {Link} from 'react-router';

import './setup.scss';

class Setup extends React.Component{
    render(){
        return(
            <div className="setup">
                <div className="head">
                    <h2>系统设置</h2>
                    <Link className="return" to="/user"><i className="fas fa-chevron-left"></i></Link>
                </div>
            </div>
        )
    }
}

export default Setup;