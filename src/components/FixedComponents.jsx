import React from 'react'
import PropTypes from 'prop-types'
import { polyfill } from 'react-lifecycles-compat'
import ReferComponents from './ReferComponents'

class FixedComponents extends React.Component {
  constructor(props){
    super(props)
    this.onChange = this.onChange.bind(this)
    this.state = {
      record: {},
      record2: {},
      recordValue: {}
    }
  }

  onChange(type,value){
    // console.log([type,value])
    this.setState({
      [type]: value
    },()=>{
      if(type==='record'){
        this.setState({record2: {}, recordValue: {}})
      }
      if(type==='record2'){
        this.setState({recordValue: {}})
      }
      if(type==='recordValue' && value.id){
        this.props.onInsertValue(' getID("'+this.state.record.code+'","'+value.title+'","'+value.id+'") ')
        this.props.onDesc('getID')
      }
    })
  }

  render() {
    let { ReferDataUrl, fixedData } = this.props
    return (
      <div className="yy-tab-content">
        <form className="form-horizontal">
          <div className="form-group">
            <label className="col-sm-2 control-label">档案</label>
            <div className="col-sm-10">
              <ReferComponents
                url={ReferDataUrl}
                fixedData={fixedData}
                value={this.state.record}
                onChange={this.onChange.bind(this,'record')}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-2 control-label">档案值</label>
            <div className="col-sm-10">
              {this.state.record.code === 'accsubject' ? (
                <div>
                  <ReferComponents
                    url={ReferDataUrl}
                    isCode
                    fixedData={Object.assign({},fixedData,{refCode: 'accsubjectchart',refType: 'table',fields: ['id', 'code', 'name'],orderby: 'code asc',displayFields: ['id', 'code', 'name']})}
                    disabled={!this.state.record.code}
                    value={this.state.record2}
                    onChange={this.onChange.bind(this,'record2')}
                  />
                  <ReferComponents
                    url={ReferDataUrl}
                    isCode
                    fixedData={Object.assign({},fixedData,{refCode: this.state.record.code,filterCondition: '{"accsubjectchart":"'+this.state.record2.id+'"}',refType: 'table',fields: ['id', 'code', 'name'],orderby: 'code asc',displayFields: ['id', 'code', 'name']})}
                    disabled={!this.state.record2.code}
                    value={this.state.recordValue}
                    onChange={this.onChange.bind(this,'recordValue')}
                  />
                </div>
              ) : (
                <ReferComponents
                  url={ReferDataUrl}
                  fixedData={Object.assign({},fixedData,{refCode:this.state.record.code})}
                  disabled={!this.state.record.code}
                  value={this.state.recordValue}
                  onChange={this.onChange.bind(this,'recordValue')}
                />
              )}
            </div>
          </div>
        </form>
      </div>
    )
  }
}
FixedComponents.propTypes = {
  item: PropTypes.object,
  ReferDataUrl: PropTypes.string,
  fixedData: PropTypes.object
}

FixedComponents.defaultProps = {
  item: {},
  ReferDataUrl: '',
  fixedData: {}
}

polyfill(FixedComponents)

export default FixedComponents