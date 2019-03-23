import React from 'react'
import ReactDOM from 'react-dom'
import {Formulas} from '../src/index'
import '../assets/index.less'
import DocumentTreeData from './DocumentTreeData'
import SubjectData from './SubjectData'
import Description from './Description'
class Demo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      extareaValue: '11'
    }
    this.onChange = this.onChange.bind(this)
    this.itemChange = this.itemChange.bind(this)
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
  }

  itemChange(value){
    this.itemChange(value)
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
        tabs={[
          {id:3, name: '辅助核算类型', type: 'sys', component: 'Auxiliary', disabled: false, placeholder: '请输入...', notFoundContent: '暂无数据', showName: '辅助核算类型',onChange: this.itemChange},
          {id:4, name: '辅助核算值', type: 'sys', component: 'Auxiliary', disabled: false, placeholder: '请输入...', notFoundContent: '暂无数据', showName: '辅助核算值'}
        ]}
        activeKey="0"
      />
    )
  }
}

ReactDOM.render(<Demo />, document.getElementById('__react-content'))