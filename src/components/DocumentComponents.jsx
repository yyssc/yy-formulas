import React from 'react'
import PropTypes from 'prop-types'
import { polyfill } from 'react-lifecycles-compat'
import Tree, { TreeNode } from 'rc-tree'

class DocumentComponents extends React.Component {
  constructor(props){
    super(props)
    this.onSelect = this.onSelect.bind(this)
    this.onChange = this.onChange.bind(this)
    this.state = {
      value: ''
    }
  }

  onSelect(selectkey) {
    if(selectkey.length > 0){
      let code = selectkey[0]
      let key = code.substr(code.indexOf('.') + 1)
      // console.log(code, key)
      this.props.onInsertValue(' '+key+ ' ')
    }
    // if(selectkey.length > 0){
    //   // let code = node.node.props
    // }
    // console.log(arr)
  }

  onChange(event) {
    let value = event.target.value
    this.setState({value})
  }

  render() {
    let { DocumentTreeData } = this.props
    let value = this.state.value
    const loop = (data)=>{
      // console.log(data)
      return data.map((item)=>{
        let isflag = false
        if(value && value.length > 0){
          let reg = new RegExp(value,'igm')
          isflag = reg.test(item.title)
          // console.log(isflag)
        }else{
          // console.log(isflag)
        }
        if(item.children && item.children.length > 0){
          return (
            <TreeNode
              title={item.title}
              isLeaf={false}
              key={item.key}
              code={item.code}
              disabled={item.disabled}
              className={isflag ? 'yy-search-selected' : ''}
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
              className={isflag ? 'yy-search-selected' : ''}
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
        <Tree
          prefixCls="rc-tree"
          showLine
          showIcon={false}
          checkable={false}
          defaultExpandAll
          className="myCls"
          autoExpandParent
          onSelect={this.onSelect}
        >
          {loop(DocumentTreeData)}
        </Tree>
      </div>
      // <div>{JSON.stringify(this.props.item)}单据字段单据字段单据字段单据字段单据字段</div>
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