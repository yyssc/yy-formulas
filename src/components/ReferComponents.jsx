import React from 'react'
import PropTypes from 'prop-types'
import { polyfill } from 'react-lifecycles-compat'
import jQuery from 'jquery'
import Select, {Option} from 'rc-select'
// import Select from 'react-select'

class ReferComponents extends React.Component {
  constructor(props){
    super(props)
    this.onFocus = this.onFocus.bind(this)
    this.onSearch = this.onSearch.bind(this)
    this.onSelect = this.onSelect.bind(this)
    this.onChange = this.onChange.bind(this)
    this.state = {
      options: [],
      searchValue: '',
      value: this.props.value && this.props.value.text
    }
  }

  componentWillReceiveProps(nextProps){
    if(JSON.stringify(nextProps.value)!=JSON.stringify(this.state.value)){
      console.log(nextProps.value)
      this.setState({
        value: nextProps.value.text
      })
    }
  }

  onSearch(searchValue) {
    this.setState({
      searchValue
    })
    // console.log(['search',...arr])
  }

  onFocus(){
    let that = this
    jQuery.ajax({
      url: that.props.url,
      data: JSON.stringify(Object.assign(that.props.sendData,that.props.fixedData)),
      method: 'POST',
      beforeSend:(xhr,settings)=>{
        // console.log([xhr,settings])
        that.props.beforeSend(xhr, settings)
        return true
      },
      contentType: that.props.contentType,
      dataType: that.props.dataType,
      cache:false,
      crossDomain: true,
      success(data){
        if(data.success){
          that.setState({
            options: data.data.map((item)=>Object.assign(item,{value:item.code,label: item.name}))
          })
        }
        // console.log(data)
      },
      error(err){
        console.error(err)
      }
    })
  }

  onSelect(...arr) {
    let key = arr[1].key
    let { id, value, code, text } = arr[1].props
    // console.log([{key, id, value, code }])
    // this.setState({
    //   value: arr[0]
    // })
    this.setState({
      value
    },()=>{
      this.props.onChange({id, value, code, key, text})
    })
    console.log(['select',...arr])
  }

  onChange(value) {
    if(value){
      this.setState({value})
    }else{
      this.props.onChange({})
    }
    // console.log(arr)
  }

  render() {
    // return (
    //   <Select
    //     options={this.state.options}
    //     onFocus={this.onFocus}
    //     styles={{option:(styles)=>{return Object.assign(styles,{zIndex:9999})}}}
    //   />
    // )
    let { disabled,isCode } = this.props
    // let options = JSON.parse(JSON.stringify(this.state.options))
    // let optionsList = []
    // if(this.state.searchValue && this.state.searchValue.length > 0){
    //   options.forEach((item)=>{
    //     let regexp = new RegExp(this.state.searchValue,'img')
    //     if(regexp.test(item.name)){
    //       optionsList.push(item)
    //     }
    //   })
    // }else{
    //   optionsList = options
    // }
    // console.log(this.state.searchValue,optionsList.length)
    // console.log(this.state.value && this.state.value.value)
    return (
      <Select
        showSearch
        allowClear
        combobox
        // backfill
        // disabled
        // multiple
        // filterOption
        disabled={disabled}
        onFocus={this.onFocus}
        // onSearch={this.onSearch}
        notFoundContent="暂无数据"
        onChange={this.onChange}
        onSelect={this.onSelect}
        value={this.state.value}
      >
        {this.state.options.map((item)=>{
          return (
            <Option
              value={item.code+' '+item.name}
              text={item.name}
              id={item.id}
              code={item.code}
              key={item.id}
              disabled={item.disabled}
            >
              {isCode ? item.code + ' ' + item.name : item.name}
            </Option>
          )
        })}
      </Select>
    )
  }
}

const noop = () => null

ReferComponents.propTypes = {
  url: PropTypes.string,
  method: PropTypes.string,
  contentType: PropTypes.string,
  dataType: PropTypes.string,
  sendData: PropTypes.object,
  fixedData: PropTypes.object,
  beforeSend: PropTypes.func,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  value: PropTypes.array,
  isCode: PropTypes.bool
}

ReferComponents.defaultProps = {
  url: '',
  method: 'POST',
  contentType: 'application/json; charset=utf-8',
  dataType: 'json',
  sendData: {
    refCode: '',
    refType: 'list',
    funcode: '',
    displayFields: ['id','code','name']
  },
  fixedData: {},
  beforeSend: noop,
  onChange: noop,
  disabled: false,
  value: [],
  isCode: false
}

polyfill(ReferComponents)

export default ReferComponents


