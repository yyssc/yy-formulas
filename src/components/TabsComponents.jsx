import React from 'react'
import PropTypes from 'prop-types'
import { polyfill } from 'react-lifecycles-compat'
import Tabs, { TabPane } from 'rc-tabs'
import TabContent from 'rc-tabs/lib/TabContent'
import ScrollableInkTabBar from 'rc-tabs/lib/ScrollableInkTabBar'
import DocumentComponents from './DocumentComponents'
import FixedComponents from './FixedComponents'
import SubjectComponents from './SubjectComponents'
import AuxiliaryComponents from './AuxiliaryComponents'
import FunctionComponents from './FunctionComponents'

class TabsComponents extends React.Component {
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
    this.state = {
      activeKey: this.props.activeKey
    }
  }

  // componentWillReceiveProps(nextProps){
  //   if(nextProps.activeKey!=this.state.activeKey){
  //     let activeKey = nextProps.activeKey
  //     this.setState({activeKey})
  //   }
  // }

  onChange(activeKey) {
    this.setState({activeKey})
    this.props.onDesc()
  }

  render() {
    let { prefixCls, tabs, DocumentTreeData, ReferDataUrl, fixedData, SubjectData,onDesc,onTextDesc, FunctionData,Description,onClear } =  this.props
    // console.log(this.props)
    return (
      <Tabs
        prefixCls={prefixCls}
        defaultActiveKey={this.state.activeKey}
        activeKey={this.state.activeKey}
        onChange={this.onChange}
        renderTabBar={()=><ScrollableInkTabBar />}
        renderTabContent={()=><TabContent />}
      >
        {tabs.map((item)=>{
          let Component = item.component
          let props = {
            onInsertValue: this.props.onInsertValue,
            ReferDataUrl,
            fixedData,
            onDesc,
            onTextDesc,
            DocumentTreeData,
            SubjectData,
            FunctionData,
            Description,
            onClear
          }
          if(typeof item.component==='string'){
            if(item.component==='Document'){
              Component = DocumentComponents
            } else if(item.component==='Fixed'){
              Component = FixedComponents
            } else if(item.component==='Subject'){
              Component = SubjectComponents
            } else if(item.component === 'Auxiliary') {
              Component = AuxiliaryComponents
            } else if (item.component === 'Function') {
              Component = FunctionComponents
            }
          }
          return (
            <TabPane
              key={item.id}
              tab={item.name}
              disabled={item.disabled}
            >
              <Component
                {...props}
                item={item}
              />
            </TabPane>
          )
        })}
      </Tabs>
    )
  }
}

TabsComponents.propTypes = {
  prefixCls: PropTypes.string,
  tabs: PropTypes.array,
  activeKey: PropTypes.string,
  ReferDataUrl: PropTypes.string
}

TabsComponents.defaultProps = {
  prefixCls: 'rc-tabs',
  tabs: [],
  activeKey: '0',
  ReferDataUrl: ''
}

polyfill(TabsComponents)

export default TabsComponents