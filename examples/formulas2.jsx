import React from 'react';
import ReactDOM from 'react-dom';
import {Formulas} from '../src/index'

class Demo extends React.Component {
  constructor(props) {
    super(props);
    // console.log(Button)
  }

  render() {
    // return (<div>222</div>);
    return (<div>$22222<Formulas />$2222</div>);
  }
}

ReactDOM.render(<Demo />, document.getElementById('__react-content'));