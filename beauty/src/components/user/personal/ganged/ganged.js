import React, {Component}from 'react';

import allAreaInfo from './area';
import './ganged.scss'

class Ganged extends Component{
    state = {
        
    }

    componentDidMount(){
        
    }

    render(){
        console.log(allAreaInfo)
        return(
            <div className="shade">
                <div className="componentMain">
                    <div className="mainTop">
                        <span>取消</span><span>保存</span>
                    </div>
                    <div className="mainButtom">
                        <ul>
                            {
                                allAreaInfo.map((item) => {
                                    console.log(item)
                                    return(
                                        <li key={item.name}>
                                            <span>{item.name}</span>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                        <ul>
                            {

                            }
                        </ul>
                        <ul>
                            {

                            }
                        </ul>
                    </div>
                </div>
            </div>
        )
    }

}

export default Ganged ;