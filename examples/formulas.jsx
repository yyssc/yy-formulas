import React from 'react';
import ReactDOM from 'react-dom';
import {Formulas} from '../src/index'

class Demo extends React.Component {
  constructor(props) {
    super(props);
    // console.log(Button)
  }

  render() {
  	// var sg = 'dd'
    // return (<div>222</div>);
    return (<div>$<Formulas />$</div>);
  }
}

ReactDOM.render(<Demo />, document.getElementById('__react-content'));