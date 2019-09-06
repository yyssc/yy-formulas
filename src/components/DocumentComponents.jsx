import React from 'react'
import PropTypes from 'prop-types'
import { polyfill } from 'react-lifecycles-compat'
import Tree, { TreeNode } from 'rc-tree'
// import jQuery from 'jquery'

class DocumentComponents extends React.Component {
  constructor(props){
    super(props)
    this.onSelect = this.onSelect.bind(this)
    this.onDoubleClick = this.onDoubleClick.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onButClick = this.onButClick.bind(this)
    this.loop = this.loop.bind(this)
    this.setFname = this.setFname.bind(this)
    let { DocumentTreeData } = this.props
    this.state = {
      selectedKeys: [],
      value: '',
      expandedKeys: DocumentTreeData.length > 0 && DocumentTreeData[0].key ? [DocumentTreeData[0].key] : [],
      selectedKeysList: []
    }
  }

  onDoubleClick(item){
    let {code} = item
    let key = code.substr(code.indexOf('.') + 1)
    this.props.onInsertValue(' '+key+ ' ')
  }

  onSelect(selectkey,...arr) {
    // console.log(selectkey,...arr);
    // console.log([selectkey,...arr])
    // let selectedKeys = []
    // if(selectkey.length > 0){
    //   selectedKeys = selectkey
    //   let code = selectkey[0]
    //   let key = code.substr(code.indexOf('.') + 1)
    //   this.props.onInsertValue(' '+key+ ' ')
    // }else if(this.state.selectedKeys.length > 0){
    //   let code = this.state.selectedKeys[0]
    //   let key = code.substr(code.indexOf('.') + 1)
    //   this.props.onInsertValue(' '+key+ ' ')
    // }
    // this.setState({selectedKeys})
    let selectedKeys = []
    if(selectkey.length > 0){
      selectedKeys = selectkey
    }
    this.setState({selectedKeys})
  }

  onChange(event) {
    let value = event.target.value
    this.setState({value,selectedKeysList:[]})
  }

  onButClick(){
    let selectedKeysList = []
    let value = this.state.value
    let { DocumentTreeData } = this.props
    const loop = (data) => {
      data.map((item)=>{
        let reg = new RegExp(value,'igm')
        if(reg.test(item.title)){
          selectedKeysList.push(item)
        }
        if(item.children && item.children.length > 0){
          loop(item.children)
        }
      })
    }
    if(value){
      loop(DocumentTreeData)
    }
    this.setState({
      selectedKeysList
    })
    /*
    let selectedKeys = this.state.selectedKeys
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
      this.setState({selectedKeys},()=>{
        let expandedKeys = []
        if(selectedKeys && selectedKeys.length>0 && selectedKeys[0]){
          let selectedKeysArr = selectedKeys[0].split('.')
          selectedKeysArr.pop()
          selectedKeysArr.forEach((k)=>{
            if(expandedKeys.length>0){
              expandedKeys.push(expandedKeys[expandedKeys.length-1]+'.'+k)
            }else{
              expandedKeys.push(k)
            }
          })
        }
        if(expandedKeys.length===0){
          expandedKeys = DocumentTreeData.length > 0 && DocumentTreeData[0].key ? [DocumentTreeData[0].key] : []
        }
        this.setState({expandedKeys},()=>{
          // console.log(this.heightcount,jQuery('.rc-tree.myCls.rc-tree-show-line'),jQuery('.rc-tree-treenode-selected'))
          // jQuery('.rc-tree-treenode-selected').focus()
          // $(selectedKeys[0]).focus()
          // if(jQuery('.rc-tree-treenode-selected') && jQuery('.rc-tree-treenode-selected').length>0){
          //   jQuery('.rc-tree-treenode-selected').focus()
          // }
          // document.getElementById(selectedKeys[0]).focus()
          // console.log(document.getElementById('mygundongtiao'))
          // if(jQuery('.rc-tree.myCls.rc-tree-show-line') && jQuery('.rc-tree.myCls.rc-tree-show-line').length>0 && jQuery('.rc-tree-treenode-selected') && jQuery('.rc-tree-treenode-selected').length){
          //   jQuery('.rc-tree.myCls.rc-tree-show-line').scrollTop = jQuery('.rc-tree-treenode-selected').offsetTop-100
          // }
          // console.log(document.getElementByclassName('yy-tab-content'), document.getElementByclassName('rc-tree-node-selected')) // $('. .rc-tree-node-selected')
          // setTimeout(()=>{
          //   console.log(document.getElementByclassName('yy-tab-content'), document.getElementByclassName('rc-tree-node-selected'))
          // },0)
        })
        // console.log(selectedKeys)
      })
    }
    // console.log([selectedKeysList,value,selectedKeys])
    */
  }

  loop(data){
    let selectedKeysList = this.state.selectedKeysList
    let value = this.state.value
    if(value && selectedKeysList.length>0){
      // console.log(selectedKeysList)
      return selectedKeysList.map((item)=>{
        return (
          <TreeNode
            title={item.fname}
            isLeaf
            key={item.key}
            code={item.code}
            disabled={item.disabled}
            //className={isflag ? 'yy-search-selected' : ''}
          />
        )
      })
    }
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
            //title={item.title}
            title={(<span onDoubleClick={this.onDoubleClick.bind(this,item)}>{item.title}</span>)}
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
            title={(<span onDoubleClick={this.onDoubleClick.bind(this,item)}>{item.title}</span>)}
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
  setFname(data,name){
    return data.map((item)=>{
      let {title, children}=item
      let fname = name ? name.trim()+'/'+title : title
      item.fname = fname
      // console.log(JSON.stringify(children));
      if(children && children.length>0){
        item.children = this.setFname(children,fname)
      }
      return item
      // console.log()
    })
  }
  render() {
    let { DocumentTreeData } = this.props
    DocumentTreeData = this.setFname(DocumentTreeData)
    // console.log(DocumentTreeData)
    // let defaultExpandedKeys = DocumentTreeData.length > 0 && DocumentTreeData[0].key ? [DocumentTreeData[0].key] : []
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
          id="mygundongtiao"
          prefixCls="rc-tree"
          showLine
          showIcon={false}
          checkable={false}
          // defaultExpandAll
          // defaultExpandedKeys={defaultExpandedKeys}
          expandedKeys={this.state.expandedKeys}
          onExpand={(expandedKeys)=>{
            // console.log(expandedKeys)
            this.setState({expandedKeys})
          }}
          className="myCls"
          // autoExpandParent
          // checkStrictly
          selectedKeys={this.state.selectedKeys}
          onSelect={this.onSelect}
          //expandAction='doubleClick'
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