import React from 'react'
import PropTypes from 'prop-types'
import { polyfill } from 'react-lifecycles-compat'
import TabsComponents from './components/TabsComponents'

class Formulas extends React.Component {
  constructor(props){
    super(props)
    this.onChange = this.onChange.bind(this)
    this.onClick = this.onClick.bind(this)
    this.onCancel = this.onCancel.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onValidate = this.onValidate.bind(this)
    this.onValueSelected = this.onValueSelected.bind(this)
    this.onClear = this.onClear.bind(this)
    this.onInsertValue = this.onInsertValue.bind(this)
    this.onDesc = this.onDesc.bind(this)
    this.onTextDesc = this.onTextDesc.bind(this)
    this.state = {
      value: this.props.textareaValue,
      tabs: this.props.tabs,
      tabsJSON: JSON.stringify(this.props.tabs),
      activeKey: this.props.activeKey,
      DocumentTreeData: this.props.DocumentTreeData,
      DocumentTreeDataJSON: JSON.stringify(this.props.DocumentTreeData),
      textDescription: '',
      id: '1'
    }
    // this.yyFormulasTextareaRef = React.createRef()
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.textareaValue!=this.state.value){
      this.setState({value: nextProps.textareaValue})
    }
    if(JSON.stringify(nextProps.tabs)!=this.state.tabsJSON){
      this.setState({tabs: nextProps.tabs, tabsJSON: JSON.stringify(nextProps.tabs)})
    }
    if(nextProps.activeKey!=this.state.activeKey){
      let activeKey = nextProps.activeKey
      this.setState({activeKey})
    }
    if(JSON.stringify(nextProps.DocumentTreeData)!=this.state.DocumentTreeData){
      this.setState({DocumentTreeData: nextProps.DocumentTreeData, DocumentTreeDataJSON: JSON.stringify(nextProps.DocumentTreeData)})
    }
  }

  onChange(event){
    let { value } = event.target
    this.setState({ value },()=>{
      this.props.onChange(value)
    })
  }

  onClick(item){
    if(this[item.event]){
      this[item.event]()
    }else if(this.props[item.event]){
      this.props[item.event](this.state.value)
    }
  }

  onCancel() {
    this.props.onCancel(this.state.value)
    this.setState({id: Math.random()})
  }

  onSubmit(){
    this.props.onSubmit(this.state.value)
    this.setState({id: Math.random()})
  }

  onValidate() {
    this.props.onValidate(this.state.value)
  }

  onValueSelected() {
    // this.yyFormulasTextareaRef.current.select()
    this.yyFormulasTextareaRef.select()
  }

  onClear(){
    this.setState({ value: ''},()=>{
      this.props.onChange('')
    })
  }

  onInsertValue(val){
    // console.log([this,this.yyFormulasTextareaRef])
    let yyFormulasTextareaRef = this.yyFormulasTextareaRef // this.yyFormulasTextareaRef.current
    if(document.selection){
      var sel = document.selection.createRange()
      sel.text = val
    }else if(typeof yyFormulasTextareaRef.selectionStart === 'number' && typeof yyFormulasTextareaRef.selectionEnd === 'number'){
      const startPos = yyFormulasTextareaRef.selectionStart
      const endPos = yyFormulasTextareaRef.selectionEnd
      const tmpStr = this.state.value
      let value = tmpStr.substring(0, startPos) + val + tmpStr.substring(endPos, tmpStr.length)
      this.setState({
        value
      },()=>{
        yyFormulasTextareaRef.selectionStart = this.state.value.length
        yyFormulasTextareaRef.selectionEnd = this.state.value.length
      })
    }else{
      this.setState({
        value: val
      },()=>{
        yyFormulasTextareaRef.selectionStart = this.state.value.length
        yyFormulasTextareaRef.selectionEnd = this.state.value.length
      })
    }
    yyFormulasTextareaRef.focus()
  }

  onDesc(key){
    let textDescription = key ? key.toUpperCase() + '：' + this.props.Description[''+key.toUpperCase()] : ''
    this.setState({
      textDescription
    })
  }

  onTextDesc(textDescription){
    this.setState({
      textDescription
    })
  }

  render() {
    let { prefixCls, textareaPlaceholder, buttonList, tabsPrefixCls, ReferDataUrl, fixedData, SubjectData, FunctionData,Description } = this.props
    return (
      <div className={prefixCls}>
        <div className="row">
          <div className={prefixCls + '-textarea-warp col-xs-10 col-md-10 col-sm-10'}>
            <textarea
              className={prefixCls + '-textarea form-control'}
              onChange={this.onChange}
              placeholder={textareaPlaceholder}
              ref={(ref)=>this.yyFormulasTextareaRef=ref}
              value={this.state.value}
            />
          </div>
          <div className={prefixCls + '-button-warp col-xs-2 col-md-2 col-sm-2'}>
            {buttonList.map((item, index)=>{
              return (
                <button
                  key={index}
                  className={prefixCls + '-button ' + item.className}
                  onClick={this.onClick.bind(this,item)}
                >
                  {item.name}
                </button>
              )
            })}
          </div>
        </div>
        <div className="row">
          <TabsComponents
            prefixCls={tabsPrefixCls}
            tabs={this.state.tabs}
            activeKey={this.state.activeKey}
            DocumentTreeData={this.state.DocumentTreeData}
            onInsertValue={this.onInsertValue}
            ReferDataUrl={ReferDataUrl}
            fixedData={fixedData}
            SubjectData={SubjectData}
            onDesc={this.onDesc}
            onTextDesc={this.onTextDesc}
            FunctionData={FunctionData}
            Description={Description}
            onClear={this.onClear}
            id={this.state.id}
          />
        </div>
        <p className="formulas-desc">{this.state.textDescription}</p>
      </div>
    )
  }
}

const noop = () => null

Formulas.propTypes = {
  prefixCls: PropTypes.string,
  textareaPlaceholder: PropTypes.string,
  textareaValue: PropTypes.string,
  buttonList: PropTypes.array,
  onCancel: PropTypes.func,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  onValidate: PropTypes.func,
  tabsPrefixCls: PropTypes.string,
  tabs: PropTypes.array,
  activeKey: PropTypes.string,//PropTypes.oneOfType([PropTypes.string,PropTypes.number]),
  DocumentTreeData: PropTypes.array,
  ReferDataUrl: PropTypes.string,
  fixedData: PropTypes.object,
  Description: PropTypes.object,
  FunctionData: PropTypes.array
}

Formulas.defaultProps = {
  prefixCls: 'yy-formulas',
  textareaPlaceholder: '请输入...',
  textareaValue: '',
  buttonList: [
    {name: '确定', className: 'btn btn-default', event: 'onSubmit'},
    {name: '取消', className: 'btn btn-default', event: 'onCancel'},
    //{name: '验证', className: 'btn btn-default', event: 'onValidate'},
    //{name: '全选', className: 'btn btn-default', event: 'onValueSelected'},
    {name: '清空', className: 'btn btn-default', event: 'onClear'}
  ],
  onCancel: noop,
  onChange: noop,
  onSubmit: noop,
  onValidate: noop,
  tabsPrefixCls: 'rc-tabs',
  tabs: [
    {id:0, name: '单据字段', type: 'sys', component: 'Document', disabled: false, placeholder: '请输入...', notFoundContent: '暂无数据', positionName: '定位:', okName: '确定'},
    {id:1, name: '固定值', type: 'sys', component: 'Fixed', disabled: false, placeholder: '请输入...', notFoundContent: '暂无数据', showName1: '档案', showName2: '档案值'},
    {id:2, name: '科目转换', type: 'sys', component: 'Subject', disabled: false, placeholder: '请输入...', notFoundContent: '暂无数据', positionName: '定位：', okName: '确定', formTitle: '影响因素', notSubject: '暂无影响因素'},
    {id:3, name: '辅助核算类型', type: 'sys', component: 'Auxiliary', disabled: false, placeholder: '请输入...', notFoundContent: '暂无数据', showName: '辅助核算类型',onChange: noop},
    {id:4, name: '辅助核算值', type: 'sys', component: 'Auxiliary', disabled: false, placeholder: '请输入...', notFoundContent: '暂无数据', showName: '辅助核算值'},
    {id:5, name: '函数', type: 'sys', component: 'Function', disabled: false, notFoundContent: '暂无数据', positionName: '定位:', okName: '确定'},
    {id:6, name: '枚举', type: 'sys', component: 'Enum', disabled: false, placeholder: '请输入...', notFoundContent: '暂无数据', showName1: '枚举类型', showName2: '枚举值', data1:{refCode:'enum',funcode:'conversion',disableshow: false},data2:{refCode:'enumbody',funcode:'conversion',disableshow: false}}
  ],
  activeKey: '0',
  DocumentTreeData: [],
  ReferDataUrl: '',
  fixedData: {},
  Description: {},
  FunctionData: []
}

polyfill(Formulas)

export default Formulas