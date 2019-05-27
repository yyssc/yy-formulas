import React from 'react'
import PropTypes from 'prop-types'
import { polyfill } from 'react-lifecycles-compat'
import Tree, { TreeNode } from 'rc-tree'

class DocumentComponents extends React.Component {
  constructor(props){
    super(props)
    this.onSelect = this.onSelect.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onButClick = this.onButClick.bind(this)
    this.loop = this.loop.bind(this)
    this.state = {
      selectedKeys: [],
      value: ''
    }
  }

  onSelect(selectkey) {
    // console.log([selectkey,...arr])
    let selectedKeys = []
    if(selectkey.length > 0){
      selectedKeys = selectkey
      let code = selectkey[0]
      let key = code.substr(code.indexOf('.') + 1)
      this.props.onInsertValue(' '+key+ ' ')
    }else if(this.state.selectedKeys.length > 0){
      let code = this.state.selectedKeys[0]
      let key = code.substr(code.indexOf('.') + 1)
      this.props.onInsertValue(' '+key+ ' ')
    }
    this.setState({selectedKeys})
  }

  onChange(event) {
    let value = event.target.value
    this.setState({value})
  }

  onButClick(){
    let value = this.state.value
    let selectedKeys = this.state.selectedKeys
    let selectedKeysList = []
    let { DocumentTreeData } = this.props
    const loop = (data) => {
      data.map((item)=>{
        let reg = new RegExp(value,'igm')
        if(reg.test(item.title)){
          selectedKeysList.push(item.key)
        }
        if(item.children && item.children.length > 0){
          loop(item.children)
        }
      })
    }
    if(value){
      loop(DocumentTreeData)
      if(selectedKeysList.length > 0){
        if(selectedKeys.length === 0) {
          selectedKeys.push(selectedKeysList[0])
        }else{
          if(selectedKeysList.includes(selectedKeys[0])){
            let index = selectedKeysList.indexOf(selectedKeys[0])
            if(selectedKeysList.length>index){
              selectedKeys = [selectedKeysList[index+1]]
            }else{
              selectedKeys = [selectedKeysList[0]]
            }
          }else{
            selectedKeys=[selectedKeysList[0]]
          }
        }
      }
      this.setState({selectedKeys})
    }
    // console.log([selectedKeysList,value,selectedKeys])
  }

  loop(data){
    return data.map((item)=>{
      // let isflag = false
      // if(value && value.length > 0){
      //   let reg = new RegExp(value,'igm')
      //   if(reg.test(item.title)){
      //     selectedKeys.push(item.key)
      //   }
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
            //className={isflag ? 'yy-search-selected' : ''}
          >
            {this.loop(item.children)}
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
            //className={isflag ? 'yy-search-selected' : ''}
          />
        )
      }
    })
  }

  render() {
    let { DocumentTreeData } = this.props
    let defaultExpandedKeys = DocumentTreeData.length > 0 && DocumentTreeData[0].key ? [DocumentTreeData[0].key] : []
    // let value = this.state.value
    // let selectedKeys = []
    // const loop = (data)=>{
    //   // console.log(data)
    // }
    return (
      <div className="yy-tab-content">
        <form className="form-inline">
          <span>{this.props.item.positionName}{/*定位：*/}</span>
          <div className="form-group">
            <input
              className="form-control"
              onChange={this.onChange}
              value={this.state.value}
              onKeyPress={(event)=>{
                if(event.key==='Enter'){
                  event.preventDefault()
                  event.stopPropagation()
                  return false
                }
              }}
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
        <Tree
          prefixCls="rc-tree"
          showLine
          showIcon={false}
          checkable={false}
          // defaultExpandAll
          defaultExpandedKeys={defaultExpandedKeys}
          className="myCls"
          autoExpandParent
          selectedKeys={this.state.selectedKeys}
          onSelect={this.onSelect}
        >
          {this.loop(DocumentTreeData)}
        </Tree>
      </div>
    )
  }
}
DocumentComponents.propTypes = {
  item: PropTypes.object,
  DocumentTreeData: PropTypes.array
}

DocumentComponents.defaultProps = {
  item: {},
  DocumentTreeData: []
}

polyfill(DocumentComponents)

export default DocumentComponents