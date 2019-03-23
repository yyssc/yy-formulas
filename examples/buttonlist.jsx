import React from 'react'
import ReactDOM from 'react-dom'
import {Formulas} from '../src/index'
import '../assets/index.less'
import DocumentTreeData from './DocumentTreeData.json'
import SubjectData from './SubjectData.json'
import Description from './Description.json'
import FunctionData from './FunctionData.json'
class Demo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      extareaValue: '11'
    }
    this.onCancel = this.onCancel.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onValidate = this.onValidate.bind(this)
    this.onZiDingYi = this.onZiDingYi.bind(this)
  }

  onCancel(value) {
    console.log(['onCancel', value])
  }

  onSubmit(value) {
    console.log(['onSubmit', value])
  }

  onValidate(value) {
    console.log(['onValidate', value])
  }

  onZiDingYi(value) {
    console.log(['onZiDingYi', value])
  }

  render() {
    return (
      <Formulas
        onChange={this.onChange}
        textareaValue={this.state.textareaValue}
        DocumentTreeData={DocumentTreeData}
        FunctionData={FunctionData}
        ReferDataUrl="http://172.20.4.220/ficloud/refbase_ctr/queryRefJSON"
        fixedData={{refCode:'entity',funcode:'conversion',disableshow: false}}
        SubjectData={SubjectData}
        Description={Description}
        onCancel={this.onCancel}
        onSubmit={this.onSubmit}
        onValidate={this.onValidate}
        onZiDingYi={this.onZiDingYi}
        buttonList={[
          {name: '确定', className: 'btn btn-default', event: 'onSubmit'},/*默认 事件可以自定义*/
          {name: '取消', className: 'btn btn-default', event: 'onCancel'},/*默认 事件可以自定义*/
          {name: '验证', className: 'btn btn-default', event: 'onValidate'},/*默认 事件可以自定义*/
          {name: '全选', className: 'btn btn-default', event: 'onValueSelected'},/*默认 内部事件*/
          {name: '清空', className: 'btn btn-default', event: 'onClear'},/*默认 内部事件*/
          {name: '自己定义', className: 'btn btn-default', event: 'onZiDingYi'}/*自定义 事件自定义*/
        ]}
      />
    )
  }
}

ReactDOM.render(<Demo />, document.getElementById('__react-content'))