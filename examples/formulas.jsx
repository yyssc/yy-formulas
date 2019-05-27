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
    this.onChange = this.onChange.bind(this)
    // console.log(Button)
  }

  componentDidMount() {
    // setInterval(()=>{
    //   this.setState({textareaValue: '十秒钟后value变化：'+Math.random()})
    // },10000)
  }
  /**
    text值变化的时候会调用 onChange方法
    多数不用此方法，只要坚挺 onSubmit 方法返回的值
  */
  onChange(value) {
    console.log(value)
    console.log(value)
  }

  render() {
    // console.log(DocumentTreeData)
    // var sg = 'dd'
    // return (<div>222</div>)
    return (
      <Formulas
        onChange={this.onChange}
        textareaValue={this.state.textareaValue}
        DocumentTreeData={DocumentTreeData}
        ReferDataUrl="http://172.20.4.220/ficloud/refbase_ctr/queryRefJSON"
        fixedData={{refCode:'entity',funcode:'conversion',disableshow: false}}
        SubjectData={SubjectData}
        Description={Description}
        FunctionData={FunctionData}
        tabs={[
          {id:0, name: '单据字段', type: 'sys', component: 'Document', disabled: false, placeholder: '请输入...', notFoundContent: '暂无数据', positionName: '定位:', okName: '确定'},
          {id:1, name: '固定值', type: 'sys', component: 'Fixed', disabled: false, placeholder: '请输入...', notFoundContent: '暂无数据', showName1: '档案', showName2: '档案值', defaultCode: 'personnel'},
          {id:2, name: '科目转换', type: 'sys', component: 'Subject', disabled: false, placeholder: '请输入...', notFoundContent: '暂无数据', positionName: '定位：', okName: '确定',okName2: '插入'},
          {id:3, name: '辅助核算类型', type: 'sys', component: 'Auxiliary', disabled: false, placeholder: '请输入...', notFoundContent: '暂无数据', showName: '辅助核算类型',onChange: ()=>{}},
          {id:4, name: '辅助核算值', type: 'sys', component: 'Auxiliary', disabled: false, placeholder: '请输入...', notFoundContent: '暂无数据', showName: '辅助核算值'},
          {id:5, name: '函数', type: 'sys', component: 'Function', disabled: false, notFoundContent: '暂无数据', positionName: '定位:', okName: '确定'},
          {id:6, name: '枚举', type: 'sys', component: 'Enum', disabled: false, placeholder: '请输入...', notFoundContent: '暂无数据', showName1: '枚举类型', showName2: '枚举值', data1:{refCode:'enum',funcode:'conversion',disableshow: false},data2:{refCode:'enumbody',funcode:'conversion',disableshow: false}}
        ]}
        activeKey="0"
      />
    )
  }
}

ReactDOM.render(<Demo />, document.getElementById('__react-content'))