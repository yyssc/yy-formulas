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
    this.onButClick = this.onButClick.bind(this)
    this.onClickInster = this.onClickInster.bind(this)
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
    // treeList=[]
    this.props.onDesc('')
    this.setState({
      treeList,
      activeKey,
      activeItem
    },()=>{
      if(this.state.treeList.length===0){
        let str = ' cmapping("'+this.state.activeItem.code+'/'+this.state.activeItem.name+'","'+this.state.activeItem.id+'") '
        this.props.onInsertValue(str)
        this.props.onDesc('cmapping')
      }
    })
  }

  onTreeSelectChange(item,index,value,label,extra){
    let treeList = JSON.parse(JSON.stringify(this.state.treeList))
    // let codevalue = extra.triggerNode.props.code
    let codevalue = extra.triggerNode.props.eventKey
    codevalue = codevalue.substr(codevalue.indexOf('.') + 1)
    // console.log(codevalue);
    treeList[index] = Object.assign(item,{value,codevalue})
    this.setState({
      treeList
    },()=>{
      // console.log([this.state.treeList,item,index,value,label,extra])
      // if(value){
      //   let str = ' cmapping("'+this.state.activeItem.code+'/'+this.state.activeItem.name+'","'+this.state.activeItem.id+'","'+extra.triggerNode.props.code+'") '
      //   this.props.onInsertValue(str)
      //   this.props.onDesc('cmapping')
      // }
    })
  }

  onClickInster(){
    let codelist = []
    this.state.treeList.forEach((item)=>{
      if(item.codevalue){
        // console.log(item);
        codelist.push(item.codevalue)
      }
    })
    // let key = code.substr(code.indexOf('.') + 1)
    //   this.props.onInsertValue(' '+key+ ' ')
    // console.log(codelist,this.state.treeList,this.state.activeItem.code,this.state.activeItem)
    let str = ' cmapping("'+this.state.activeItem.code+'/'+this.state.activeItem.name+'","'+this.state.activeItem.id+'",'+ codelist.join(',') +') '
    this.props.onInsertValue(str)
    this.props.onDesc('cmapping')
  }

  onButClick(){
    if(!this.state.value) return false
    let activeKey = this.state.activeKey
    if(!this.state.value) return false
    let searchIndex = []
    this.props.SubjectData.forEach((item)=>{
      let regexp = new RegExp(this.state.value,'igm')
      if(regexp.test(item.code+''+item.name)){
        searchIndex.push(item.id)
      }
    })
    if(searchIndex.length===0) return false
    let index2 = searchIndex.indexOf(this.state.activeKey)
    if(index2==-1){
      activeKey=searchIndex[0]
    }else{
      if(searchIndex[index2+1]){
        activeKey=searchIndex[index2+1]
      }else{
        activeKey=searchIndex[0]
      }
    }
    let treeList = []
    let activeItem = null
    this.props.SubjectData.forEach((item)=>{
      if(item.id==activeKey){
        activeItem = item
        Object.keys(item).forEach((key)=>{
          let regexp = new RegExp('^classtype','igm')
          if(regexp.test(key) && item[key]){
            treeList.push(item[key])
          }
        })
      }
    })

    this.setState({
      activeKey,
      treeList,
      activeItem
    })
  }

  render() {
    let { DocumentTreeData } = this.props
    let defaultExpandedKeys = DocumentTreeData.length > 0 && DocumentTreeData[0].key ? [DocumentTreeData[0].key] : []
    // let value = this.state.value
    // console.log(DocumentTreeData)
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
          <span>{this.props.item.positionName}{/*定位：*/}</span>
          <div className="form-group">
            <input
              className="form-control"
              onChange={this.onChange}
              value={this.state.value}
            />
          </div>
          <button
            style={{marginLeft: '10px'}}
            className="btn btn-default"
            onClick={this.onButClick}
            type="button"
          >
            {this.props.item.okName}{/*确定*/}
          </button>
        </form>
        <div>
          <ul className="nav nav-pills nav-stacked">
            {this.props.SubjectData.map((item)=>{
              // let flag = false
              // if(this.state.value && this.state.value.length > 0){
              //   let regexp = new RegExp(this.state.value,'igm')
              //   if(regexp.test(item.code+''+item.name)){
              //     flag=true
              //   }
              // }
              // let className = this.state.activeKey == item.id ? 'active' : ''
              // className = className + (flag ? ' subject-search' : '')
              return (
                <li
                  onClick={this.onClick.bind(this,item)}
                  className={this.state.activeKey == item.id ? 'active' : ''}
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
          {this.state.activeItem && this.state.treeList.length === 0 && (<label>{this.props.item.notSubject}</label>)}
          {this.state.treeList.length > 0 && (<label>{this.props.item.formTitle}</label>)}
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
                    showLine
                    style={{width:'100%'}}
                    value={item.value}
                    dropdownStyle={{ maxHeight: 300, overflow: 'auto' }}
                    placeholder={this.props.item.placeholder} // "请输入..."
                    notFoundContent={this.props.item.notFoundContent} // "暂无数据"
                    allowClear
                    //treeDefaultExpandAll
                    treeDefaultExpandedKeys={defaultExpandedKeys}
                    onChange={this.onTreeSelectChange.bind(this,item,index)}
                  >
                    {loop(JSON.parse(JSON.stringify(DocumentTreeData)))}
                  </TreeSelect>
                </div>
              </div>
            )
          })}
          {this.state.treeList.length > 0 && (
            <div className="form-group">
              <label className="col-sm-2 control-label"> </label>
              <div className="col-sm-10">
                <button
                  className="btn btn-primary"
                  onClick={this.onClickInster}
                  type="button"
                >
                  {this.props.item.okName2}{/*插入*/}
                </button>
              </div>
            </div>
          )}
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