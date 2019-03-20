import React from 'react'
import PropTypes from 'prop-types'
import { polyfill } from 'react-lifecycles-compat'
import TabsComponents from './components/TabsComponents'

class Formulas extends React.Component {
  constructor(props){
    super(props)
    this.onCancel = this.onCancel.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onValidate = this.onValidate.bind(this)
    this.onValueSelected = this.onValueSelected.bind(this)
    this.onClear = this.onClear.bind(this)
    this.onInsertValue = this.onInsertValue.bind(this)
    this.onDesc = this.onDesc.bind(this)
    this.state = {
      value: this.props.textareaValue,
      tabs: this.props.tabs,
      tabsJSON: JSON.stringify(this.props.tabs),
      activeKey: this.props.activeKey,
      DocumentTreeData: this.props.DocumentTreeData,
      DocumentTreeDataJSON: JSON.stringify(this.props.DocumentTreeData),
      textDescription: ''
    }
    this.yyFormulasTextareaRef = React.createRef()
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

  onCancel() {
    this.props.onCancel(this.state.value)
  }

  onChange(event){
    let { value } = event.target
    this.setState({ value },()=>{
      this.props.onChange(value)
    })
  }

  onSubmit(){
    this.props.onSubmit(this.state.value)
  }

  onValidate() {
    this.props.onValidate(this.state.value)
  }

  onValueSelected() {
    // console.log(this)
    // console.log(this.yyFormulasTextareaRef)
    this.yyFormulasTextareaRef.current.select()
    // this.yyFormulasTextarea.select()
  }

  onClear(){
    this.setState({ value: ''},()=>{
      this.props.onChange('')
    })
  }

  onInsertValue(val){
    // console.log(this.yyFormulasTextareaRef)
    // console.log(val)
    if(document.selection){
      var sel = document.selection.createRange()
      sel.text = val
    }else if(typeof this.yyFormulasTextareaRef.current.selectionStart === 'number' && typeof this.yyFormulasTextareaRef.current.selectionEnd === 'number'){
      const startPos = this.yyFormulasTextareaRef.current.selectionStart
      const endPos = this.yyFormulasTextareaRef.current.selectionEnd
      const tmpStr = this.state.value
      let value = tmpStr.substring(0, startPos) + val + tmpStr.substring(endPos, tmpStr.length)
      this.setState({
        value
      },()=>{
        this.yyFormulasTextareaRef.current.selectionStart = this.state.value.length
        this.yyFormulasTextareaRef.current.selectionEnd = this.state.value.length
      })
      // cursorPos += str.length
      // textarea.selectionStart = cursorPos
      // textarea.selectionEnd = cursorPos
    }else{
      this.setState({
        value: val
      },()=>{
        this.yyFormulasTextareaRef.current.selectionStart = this.state.value.length
        this.yyFormulasTextareaRef.current.selectionEnd = this.state.value.length
      })
    }
    // this.yyFormulasTextareaRef.current.insertText(val)
  }

  onDesc(key){
    let textDescription = key ? key.toUpperCase() + '：' + this.props.Description[''+key.toUpperCase()] : ''
    this.setState({
      textDescription
    })
  }

  render() {
    let { prefixCls, textareaPlaceholder, elementButtons, tabsPrefixCls, ReferDataUrl, fixedData, SubjectData } = this.props
    return (
      <div className={prefixCls}>
        <div className="row">
          <div className={prefixCls + '-textarea-warp col-xs-10 col-md-10 col-sm-10'}>
            <textarea
              className={prefixCls + '-textarea form-control'}
              onChange={this.onChange}
              placeholder={textareaPlaceholder}
              ref={this.yyFormulasTextareaRef}
              value={this.state.value}
            />
          </div>
          <div className={prefixCls + '-button-warp col-xs-2 col-md-2 col-sm-2'}>
            {elementButtons ? elementButtons : (
              <React.Fragment>
                <button
                  className={prefixCls + '-button btn btn-default'}
                  onClick={this.onSubmit}
                  type="button"
                >
                  确定
                </button>
                <button
                  className={prefixCls + '-button btn btn-default'}
                  onClick={this.onCancel}
                  type="button"
                >
                  取消
                </button>
                <button
                  className={prefixCls + '-button btn btn-default'}
                  onClick={this.onValidate}
                  type="button"
                >
                  验证
                </button>
                <button
                  className={prefixCls + '-button btn btn-default'}
                  onClick={this.onValueSelected}
                  type="button"
                >
                  全选
                </button>
                <button
                  className={prefixCls + '-button btn btn-default'}
                  onClick={this.onClear}
                  type="button"
                >
                  清空
                </button>
              </React.Fragment>
            )}
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
  elementButtons: PropTypes.node,
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
  name: PropTypes.string
}

Formulas.defaultProps = {
  prefixCls: 'yy-formulas',
  textareaPlaceholder: '请输入...',
  textareaValue: '',
  elementButtons: null,
  onCancel: noop,
  onChange: noop,
  onSubmit: noop,
  onValidate: noop,
  tabsPrefixCls: 'rc-tabs',
  tabs: [
    {id:10, name: '单据字段', type: 'sys', component: 'Document', disabled: false},
    {id:11, name: '固定值', type: 'sys', component: 'Fixed', disabled: false},
    {id:12, name: '科目转换', type: 'sys', component: 'Subject', disabled: false}
  ],
  activeKey: '10',
  DocumentTreeData: [],
  ReferDataUrl: '',
  fixedData: {},
  name: '1211'
}

polyfill(Formulas)

export default Formulas