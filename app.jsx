import React, { Component } from 'react';
import Helmet from 'react-helmet';

import Food from './food.jsx';
import Snake from './snake.jsx';

class App extends Component {
  constructor() {
    super()
this.rowL = 10;
this.colL= 10;
this.back = 'black';
this.table = null;
this.getColor = this.getColor.bind(this);
this.hasColor = this.hasColor.bind(this);
this.erase = this.erase.bind(this);
this.drawBody = this.drawBody.bind(this);
  }
  show() {
    this.table = document.createElement('table');
    for(let i =0; i< this.rowL; i++) {
      const tr = this.table.insertRow();
      for(let t =0; t < this.colL; t++) {
        tr.insertCell();
      }
    };
    document.getElementsByTagName('body')[0].appendChild(this.table)
  }
  getColor(x,y,color) {
    this.table.rows[y].cells[x].style.backgroundColor = color;
  }
  hasColor(x,y) {
    if(this.table.rows[y].cells[x].style.backgroundColor == '') {
      return false;
    }
    return true;
  }
  erase(x,y) {
    this.table.rows[y].cells[x].style.backgroundColor = ''
  }
  drawBody(x,y) {
    this.table.rows[y].cells[x].style.backgroundColor = 'black'
  }
  render() {
    return (
<div>
  <div className="pencil-effect">
    {this.show()}
    <Food row={this.rowL} col={this.colL} getColor={this.getColor} hasColor={this.hasColor}/>
    <Snake
      row={this.rowL}
      col={this.colL}
      getColor={this.getColor}
      hasColor={this.hasColor}
      erase={this.erase}
      />
</div>
  test
</div>
    );
  }
}
// App.propTypes = {
//   children: PropTypes.any,
//   className: PropTypes.string,
//   paused: PropTypes.bool,
// };

export default App;
