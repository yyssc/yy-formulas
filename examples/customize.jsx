import React from 'react'
import ReactDOM from 'react-dom'
import {Formulas} from '../src/index'
import '../assets/index.less'
import DocumentTreeData from './DocumentTreeData.json'
import SubjectData from './SubjectData.json'
import Description from './Description.json'
import FunctionData from './FunctionData.json'
import CustomComponents from './CustomComponents'

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
          {
            id:6,
            name: '函数',
            type: 'custom',
            component: CustomComponents,
            disabled: false,
            notFoundContent: '暂无数据',
            positionName: '定位:',
            okName: '确定',
            dataList: {
              name: '我自己在组件里需要的数据，访问方式是this.props.item.dataList.name',
              data: [{id:1, code: 1, name: 1},{id:2, code: 2, name: 2}]
            }
          }
        ]}
        activeKey="6"
      />
    )
  }
}

ReactDOM.render(<Demo />, document.getElementById('__react-content'))