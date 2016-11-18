import React , { Component } from 'react';
import Ran from './random.js';

class Food extends Component {
  constructor() {
    super();
    this.colors = ['red','blue','green','yellow'];
  }
  componentDidMount() {
    this.show();
  }
  show() {
const { row, col, getColor, hasColor} = this.props;
for( let i =0; i < 10; i++) {
  let x,y,colorIndex;
  x = Ran(row);
  y = Ran(col);
  colorIndex = Ran(4);
  if(!hasColor(x,y))
  getColor(x,y,this.colors[colorIndex]);

}
  }
  render() {
    return (
     <div>
     </div>
    )
  }
};

export default Food;
