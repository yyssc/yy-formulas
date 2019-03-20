import React from 'react'
import PropTypes from 'prop-types'
import { polyfill } from 'react-lifecycles-compat'
import TreeSelect, {TreeNode} from 'rc-tree-select'

class SubjectComponents extends React.Component {
  constructor(props){
    super(props)
    this.onChange = this.onChange.bind(this)
    this.onClick = this.onClick.bind(this)
    this.onTreeSelectChange = this.onTreeSelectChange.bind(this)
    this.state = {
      activeItem: null,
      activeKey: '',
      treeList: [],
      value: ''
    }
  }

  onChange(event){
    this.setState({value: event.target.value})
  }

  onClick(item){
    let activeKey = item.id
    let treeList = []
    let activeItem = null
    if(item.id===this.state.activeKey){
      activeKey = ''
    }else{
      activeItem = item
      Object.keys(item).forEach((key)=>{
        let regexp = new RegExp('^classtype','igm')
        if(regexp.test(key) && item[key]){
          treeList.push(item[key])
        }
      })
    }
    // console.log(treeList)
    this.setState({
      treeList,
      activeKey,
      activeItem
    })
  }

  onTreeSelectChange(item,index,value,label,extra){
    let treeList = JSON.parse(JSON.stringify(this.state.treeList))
    treeList[index] = Object.assign(item,{value})
    this.setState({
      treeList
    },()=>{
      if(value){
        let str = ' cmapping("'+this.state.activeItem.code+'/'+this.state.activeItem.name+'","'+this.state.activeItem.id+'","'+extra.triggerNode.props.code+'") '
        this.props.onInsertValue(str)
        this.props.onDesc('cmapping')
      }
    })
  }

  render() {
    let { DocumentTreeData } = this.props
    // let value = this.state.value
    console.log(DocumentTreeData)
    const loop = (data)=>{
      // console.log(data)
      return data.map((item)=>{
        // let isflag = false
        // if(value && value.length > 0){
        //   let reg = new RegExp(value,'igm')
        //   isflag = reg.test(item.title)
        //   // console.log(isflag)
        // }else{
        //   // console.log(isflag)
        // }
        if(item.children && item.children.length > 0){
          return (
            <TreeNode
              title={item.title}
              isLeaf={false}
              key={item.key}
              code={item.code}
              disabled={item.disabled}
              value={item.title}
              // className={isflag ? 'yy-search-selected' : ''}
            >
              {loop(item.children)}
            </TreeNode>
          )
        }else{
          return (
            <TreeNode
              title={item.title}
              isLeaf
              key={item.key}
              code={item.code}
              disabled={item.disabled}
              value={item.title}
              // className={isflag ? 'yy-search-selected' : ''}
            />
          )
        }
      })
    }
    return (
      <div className="yy-tab-content">
        <form className="form-inline">
          <span>定位：</span>
          <div className="form-group">
            <input
              className="form-control"
              onChange={this.onChange}
              value={this.state.value}
            />
          </div>
        </form>
        <div>
          <ul className="nav nav-pills nav-stacked">
            {this.props.SubjectData.map((item)=>{
              let flag = false
              if(this.state.value && this.state.value.length > 0){
                let regexp = new RegExp(this.state.value,'igm')
                if(regexp.test(item.code+''+item.name)){
                  flag=true
                }
              }
              let className = this.state.activeKey == item.id ? 'active' : ''
              className = className + (flag ? ' subject-search' : '')
              return (
                <li
                  onClick={this.onClick.bind(this,item)}
                  className={className}
                  key={item.id}
                >
                  <a href="javascript:void(0)">{item.code} / {item.name}</a>
                </li>
              )
            })}
          </ul>
        </div>
        <hr />
        <form className="form-horizontal">
          {this.state.treeList.map((item,index)=>{
            return (
              <div
                key={item.id}
                className="form-group"
              >
                <label className="col-sm-2 control-label">{item.name}</label>
                <div className="col-sm-10">
                  <TreeSelect
                    showSearch
                    style={{width:'100%'}}
                    value={item.value}
                    dropdownStyle={{ maxHeight: 300, overflow: 'auto' }}
                    placeholder="Please select"
                    allowClear
                    // treeDefaultExpandAll
                    onChange={this.onTreeSelectChange.bind(this,item,index)}
                  >
                    {loop(DocumentTreeData)}
                  </TreeSelect>
                </div>
              </div>
            )
          })}
        </form>
      </div>
    )
  }
}
SubjectComponents.propTypes = {
  item: PropTypes.object
}

SubjectComponents.defaultProps = {
  item: {}
}

polyfill(SubjectComponents)

export default SubjectComponents