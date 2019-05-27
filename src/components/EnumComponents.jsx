import React from 'react'
import PropTypes from 'prop-types'
import { polyfill } from 'react-lifecycles-compat'
import ReferComponents from './ReferComponents'

class EnumComponents extends React.Component {
  constructor(props){
    super(props)
    this.onChange = this.onChange.bind(this)
    this.state = {
      record: {},
      record2: {}
    }
  }

  onChange(type,value){
    // console.log([type,value])
    this.setState({
      [type]: value
    },()=>{
      if(type==='record2'){
        let str = ''
        if(value.id){
          str = ' getCode("'+this.state.record.code+'","'+value.title+'") '
          this.props.onInsertValue(str)
          this.props.onDesc('GetCode')
        }
        if(this.props.item.onChange){
          this.props.item.onChange(str, value)
        }
      }
    })
  }

  render() {
    let { ReferDataUrl } = this.props
    let fixedData = JSON.parse(JSON.stringify(this.props.item.data1))
    // fixedData.refCode='entity'
    let fixedData2 = JSON.parse(JSON.stringify(this.props.item.data2))
    if(this.state.record && this.state.record.id){
      Object.assign(fixedData2,{filterCondition:JSON.stringify({header: this.state.record.id})})
    }
    return (
      <div className="yy-tab-content">
        <form className="form-horizontal">
          <div className="form-group">
            <label className="col-sm-2 control-label">{this.props.item.showName1}</label>
            <div className="col-sm-10">
              <ReferComponents
                url={ReferDataUrl}
                fixedData={fixedData}
                value={this.state.record}
                placeholder={this.props.item.placeholder}
                notFoundContent={this.props.item.notFoundContent}
                onChange={this.onChange.bind(this,'record')}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-2 control-label">{this.props.item.showName2}</label>
            <div className="col-sm-10">
              <ReferComponents
                url={ReferDataUrl}
                fixedData={fixedData2}
                value={this.state.record2}
                disabled={!this.state.record.id}
                placeholder={this.props.item.placeholder}
                notFoundContent={this.props.item.notFoundContent}
                onChange={this.onChange.bind(this,'record2')}
              />
            </div>
          </div>
        </form>
      </div>
    )
  }
}
EnumComponents.propTypes = {
  item: PropTypes.object,
  ReferDataUrl: PropTypes.string,
  fixedData: PropTypes.object
}

EnumComponents.defaultProps = {
  item: {},
  ReferDataUrl: '',
  fixedData: {}
}

polyfill(EnumComponents)

export default EnumComponents