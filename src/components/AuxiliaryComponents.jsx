import React from 'react'
import PropTypes from 'prop-types'
import { polyfill } from 'react-lifecycles-compat'
import ReferComponents from './ReferComponents'

class AuxiliaryComponents extends React.Component {
  constructor(props){
    super(props)
    this.onChange = this.onChange.bind(this)
    this.state = {
      record: {}
    }
  }

  onChange(value){
    // console.log([type,value])
    this.setState({
      record: value
    },()=>{
      let str = ''
      if(value.id){
        str = ' getID("'+this.state.record.code+'","'+value.title+'","'+value.id+'") '
        this.props.onInsertValue(str)
        this.props.onDesc('getID')
      }
      if(this.props.item.onChange){
        this.props.item.onChange(str, value)
      }
    })
  }

  render() {
    let { ReferDataUrl, fixedData } = this.props
    return (
      <div className="yy-tab-content">
        <form className="form-horizontal">
          <div className="form-group">
            <label className="col-sm-2 control-label">{this.props.item.showName}</label>
            <div className="col-sm-10">
              <ReferComponents
                url={ReferDataUrl}
                fixedData={fixedData}
                value={this.state.record}
                placeholder={this.props.item.placeholder}
                notFoundContent={this.props.item.notFoundContent}
                onChange={this.onChange}
              />
            </div>
          </div>
        </form>
      </div>
    )
  }
}
AuxiliaryComponents.propTypes = {
  item: PropTypes.object,
  ReferDataUrl: PropTypes.string,
  fixedData: PropTypes.object
}

AuxiliaryComponents.defaultProps = {
  item: {},
  ReferDataUrl: '',
  fixedData: {}
}

polyfill(AuxiliaryComponents)

export default AuxiliaryComponents