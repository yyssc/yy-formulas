import React from 'react'
import PropTypes from 'prop-types'
import { polyfill } from 'react-lifecycles-compat'
class CustomComponents extends React.Component {
  constructor(props){
    super(props)
    this.onClick = this.onClick.bind(this)
    this.onClear = this.onClear.bind(this)
  }

  onClick(){
    this.props.onInsertValue('插入文本框:'+Math.random())
    this.props.onDesc('ZEROIFNULL') // 设置说明 在this.props.Description
  }

  onClear(){
    this.props.onClear()
    this.props.onDesc()
  }

  render(){
    console.log(this.props)
    return (
      <div className="yy-tab-content">
        <h2>CustomComponents</h2>
        <hr />
        <div className="row">
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
            <button
              className="btn btn-default"
              onClick={this.onClick}
              type="button"
            >
              插入值和显示说明
            </button>
            <button
              className="btn btn-default"
              onClick={this.onClear}
              type="button"
            >
              清楚
            </button>
            <pre>
              {this.props.item.dataList.name}
            </pre>
          </div>
          <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
            {JSON.stringify(this.props.item.dataList.data)}
          </div>
        </div>
      </div>
    )
  }
}

const noop = () => null
CustomComponents.propTypes = {
  item: PropTypes.object,
  onDesc: PropTypes.func,
  onInsertValue: PropTypes.func,
  onClear: PropTypes.func
}

CustomComponents.defaultProps = {
  item: {},
  onDesc: noop,
  DocumentTreeData: noop,
  onClear: noop
}

polyfill(CustomComponents)

export default CustomComponents