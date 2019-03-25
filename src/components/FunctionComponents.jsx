import React from 'react'
import PropTypes from 'prop-types'
import { polyfill } from 'react-lifecycles-compat'

class FunctionComponents extends React.Component {
  constructor(props){
    super(props)
    this.onChange = this.onChange.bind(this)
    this.onClick = this.onClick.bind(this)
    this.onDoubleClick = this.onDoubleClick.bind(this)
    this.onButClick = this.onButClick.bind(this)
    this.state = {
      value: '',
      activeIndex: 0,
      data: this.props.FunctionData.length > 0 ? Object.assign([],this.props.FunctionData[0].formulas) : []
    }
  }

  onChange(event){
    this.setState({value: event.target.value})
  }

  onClick(type,item, index){
    if(type==='big'){
      this.setState({activeIndex:index,data: Object.assign([],item.formulas)})
    }
    if(type==='small'){
      this.props.onDesc(item.code)
    }
  }

  onDoubleClick(item){
    this.props.onInsertValue(' '+item.value+' ')
    this.props.onDesc(item.code)
  }

  onButClick(){
    if(!this.state.value) return false
    let searchIndex = []
    this.props.FunctionData.forEach((item,index)=>{
      let regexp = new RegExp(this.state.value,'igm')
      if(regexp.test(item.name)){
        searchIndex.push(index)
      }
    })
    if(searchIndex.length===0) return false
    let activeIndex = this.state.activeIndex
    let index2 = searchIndex.indexOf(this.state.activeIndex)
    if(index2==-1){
      activeIndex=searchIndex[0]
    }else{
      if(searchIndex[index2+1]){
        activeIndex=searchIndex[index2+1]
      }else{
        activeIndex=searchIndex[0]
      }
    }
    this.setState({
      activeIndex,
      data: Object.assign([],this.props.FunctionData[activeIndex].formulas)
    })
  }

  render() {
    let { FunctionData } = this.props
    return (
      <div className="yy-tab-content">
        <div className="function-warp">
          <div className="row">
            <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5 function-left">
              <form className="form-inline">
                <span>{this.props.item.positionName}{/*定位：*/}</span>
                <div className="form-group">
                  <input
                    className="form-control"
                    onChange={this.onChange}
                    value={this.state.value}
                  />
                </div>
                <button
                  style={{marginLeft: '10px'}}
                  className="btn btn-default"
                  onClick={this.onButClick}
                  type="button"
                >
                  {this.props.item.okName}{/*确定*/}
                </button>
              </form>
              <ul
                className="nav nav-pills nav-stacked"
                style={{padding: '15px'}}
              >
                {FunctionData.map((item, index)=>{
                  return (
                    <li
                      key={item.code}
                      onClick={this.onClick.bind(this,'big',item,index)}
                      className={index===this.state.activeIndex ? 'active' : ''}
                    >
                      <a href="javascript:void(0)">{item.name}</a>
                    </li>
                  )
                })}
              </ul>
            </div>
            <div className="col-xs-7 col-sm-7 col-md-7 col-lg-7 function-right">
              <div className="list-group">
                {this.state.data.map((item)=>{
                  return (
                    <li
                      key={item.code}
                      className={item.disabled ? 'list-group-item disabled' : 'list-group-item'}
                      onClick={this.onClick.bind(this,'small',item)}
                      onDoubleClick={this.onDoubleClick.bind(this,item)}
                    >
                      <a href="javascript:void(0)">{item.code}</a>
                    </li>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

FunctionComponents.propTypes = {
  item: PropTypes.object,
  FunctionData: PropTypes.array
}

FunctionComponents.defaultProps = {
  item: {},
  FunctionData: []
}

polyfill(FunctionComponents)

export default FunctionComponents