import React, {Component}from 'react';

import allAreaInfo from './area';
import './ganged.scss'

const height = 60;
class Picker extends Component{
    state = {
        list: [],
        scrollTop: {},
        selectedIndex: 0 
    }

    componentWillReceiveProps(){
        this.setState({
            list: this.props.list,
            scrollTop: this.props.scrollTop
        })
    }

    componentWillUpdate(){
        if(this.props.scrollTop.city > -1 && this.props.type == 'city'){
            this.refs.scroller.scrollTop = this.props.scrollTop.city
        }
        if(this.props.scrollTop.district > -1 && this.props.type == 'district'){
            this.refs.scroller.scrollTop = this.props.scrollTop.district
        }
    }

    onTouchStart(){
        this.isTouchStart = true;
    }

    onScroll(){ 
        // if(this.timer){
            // clearTimeout(this.timer);
        // }
        this.timer = setTimeout(this.resetPosition.bind(this), 30);
    }
    
    onTouchEnd(){
        this.isTouchStart = false;
        // if(this.timer){
            // clearTimeout(this.timer);
        // }
        this.timer = setTimeout(this.resetPosition.bind(this), 30);
    }

    resetPosition(){
        if(this.isTouchStart == true){
            return
        }
        let top = this.refs.scroller.scrollTop;
        let distance = top % height;
        let target;
        if(distance > height / 2){
            target = top + height - distance;
            this.refs.scroller.scrollTop = target;
        } else {
            target = top - distance;
            this.refs.scroller.scrollTop = target;
        }
        const selectedIndex = target / height;
        let type = this.props.type
        this.props.updateState(type, selectedIndex);
        this.setState({
            selectedIndex: selectedIndex
        })
    }

    render(){
        return(
            <ul ref="scroller" onScroll={this.onScroll.bind(this)} onTouchStart={this.onTouchStart.bind(this)} onTouchEnd={this.onTouchEnd.bind(this)}>
                <li></li>
                <li></li>
                {
                    this.props.list.map((item, index) => {
                        return(
                            <li key={index} className={`${index == this.state.selectedIndex && 'selected'}`}>
                                <span>{item}</span>
                            </li>
                        )
                    })
                }
                <li></li>
                <li></li>
            </ul>
        )
    }
}

class Ganged extends Component{
    state = {
        provinceList: [],
        cityList: [],
        districtList: [],
        provinceIndex: 0,
        cityIndex: 0,
        districtIndex: 0,
        province: '北京市',
        city: '北京市',
        district: '东城区',
        scrollTop:{},
    }
    
    componentWillMount(){
        let { provinceIndex, cityIndex, districtIndex } = this.state
        this.setState({
            provinceList: this.getList('province'),
            cityList: this.getList('city', provinceIndex),
            districtList: this.getList('district', provinceIndex, cityIndex),
            shade: this.props.style
        })
    }

    updateState(type, index){
        let { provinceIndex, cityIndex, districtIndex } = this.state
        switch (type) {
            case 'province':
                this.setState({
                    provinceIndex: index,
                    cityIndex: 0,
                    districtIndex: 0,
                    cityList: this.getList('city', index),
                    districtList: this.getList('district', index, 0),
                    scrollTop: {city: 0, district: 0},
                    province: this.state.provinceList[index],
                    city: this.state.cityList[0],
                    district: this.state.districtList[0]
                })
                break;
            case 'city':
                this.setState({
                    cityIndex: index,
                    districtIndex: 0,
                    districtList: this.getList('district', provinceIndex, index),
                    scrollTop: {district: 0},
                    city: this.state.cityList[index],
                    district: this.state.districtList[0]
                })
                break;
            case 'district':
                this.setState({
                    districtIndex: index,
                    scrollTop: {},
                    district: this.state.districtList[index]
                })
                break;
        }
        this.setState({
            scrollTop: {}
        })
        this.props.select()
    }

    save(){
        this.props.hidden()
    }

    getList(type, provinceIndex, cityIndex, districtIndex ) {
        let list = []
        switch (type) {
            case 'province':
            allAreaInfo.forEach(item => list.push(item.name))
            break
          case 'city':
            allAreaInfo[provinceIndex].city.forEach(item => list.push(item.name))
            break
          case 'district':
            list = allAreaInfo[provinceIndex].city[cityIndex].area
            break
        }
        return list
    }

    render(){
        return(
            <div className="shade">
                <div className="componentMain">
                    <div className="mainTop">
                        <span onClick={this.save.bind(this)}>取消</span><span onClick={this.save.bind(this)}>保存</span>
                    </div>
                    <div className="mainButtom">
                        <Picker type="province" list={this.state.provinceList} updateState={this.updateState.bind(this)} scrollTop={this.state.scrollTop}/>
                        <Picker type="city" list={this.state.cityList} updateState={this.updateState.bind(this)} scrollTop={this.state.scrollTop}/>
                        <Picker type="district" list={this.state.districtList} updateState={this.updateState.bind(this)} scrollTop={this.state.scrollTop}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Ganged ;






//原本一个组件写法
/*
componentDidMount(){
    this.setState({
        provinceList: this.getList('province'),
        cityList: this.getList('city'),
        districtList: this.getList('district')
    })
}

onTouchStart(){
    this.isTouchStart = true;
}

onScroll(){ 
    //滚动时候触发事情，但是点击拖动到停止时候没有松开会导致resetPosition函数判断为turn导致无法重置定位
    if(this.timer){
        clearTimeout(this.timer);
    }
    this.timer = setTimeout(this.resetPosition.bind(this), 100);
}

onTouchEnd(){
    this.isTouchStart = false;
    //因为onScroll触发resetPosition函数的不友好性，所以在这里重新让事件触发
    if(this.timer){
        clearTimeout(this.timer);
    }
    this.timer = setTimeout(this.resetPosition.bind(this), 100);
}

resetPosition(){
    if(this.isTouchStart == true){
        return
    }
    let top = this.refs.scroller.scrollTop;
    let distance = top % height;
    let target;
    if(distance > height / 2){
        target = top + height - distance;
        this.refs.scroller.scrollTop = target;
    } else {
        target = top - distance;
        this.refs.scroller.scrollTop = target;
    }
    const selectedIndex = target / height;
    this.setState({
        city: allAreaInfo[selectedIndex].city,
        area: allAreaInfo[selectedIndex].city[0].area
    })
}
*/

/* <ul onScroll={this.onScroll.bind(this)} ref="scroller" onTouchStart={this.onTouchStart.bind(this)} onTouchEnd={this.onTouchEnd.bind(this)}>
    {
        allAreaInfo.map((item, index) => {
            return(
                <li key={index}>
                    <span>{item.name}</span>
                </li>
            )
        })
    }
</ul>
<ul>
    {
        this.state.city.map((item, index) => {
            return(
                <li key={index}>
                    <span>{item.name}</span>
                </li>
            )
        })
    }
</ul>
<ul>
    {
        this.state.area.map((item, index) => {
            return(
                <li key={index}>
                    <span>{item}</span>
                </li>
            )
        })
    }
</ul> */