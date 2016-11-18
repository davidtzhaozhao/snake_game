import React , { Component } from 'react';
import Ran from './random.js';

class Snake extends Component {
  constructor() {
    super();
    this.state = {
      direction : 'left',
      paused: true,
    }
    this.body = [];
    this.action = null;

  }
  componentDidMount() {
    this.initHead();
    document.onkeydown = (e) => {
      if(!e) e = window.event;
      e.preventDefault();
      let { direction, paused } = this.state;
      switch(e.keyCode) {
        case 13: {
          if(!paused) {
            this.pause()
            this.setState({ paused: true})
          } else {
            this.move();
            this.setState({ paused: false})
          }
          break;
        }
        case 37: {
          if(direction === 'right') {
            break;
          }
          this.setState({direction:'left'})
          break;
        }
        case 38: {
          if(direction === 'down') {
            break;
          }
          this.setState({direction: 'up'})
          break;
        }

        case 39: {
          if(direction === 'left') {
            break;
          }
          this.setState({direction: 'right'})
          break;
        }
        case 40: {
          if(direction === 'up') {
            break;
          }
          this.setState({direction: 'down'})
          break;
        }
      }
    }
  }
  initHead() {
    const { row, col, getColor, hasColor } = this.props;
    while(true) {
      let x,y;
      x = Ran(row);
      y = Ran(col);
      if(!hasColor(x,y)) {
      this.body.push({x: x, y:y});
      getColor(x,y, 'black');
      break;
  }
    }
  }

  move() {
   this.action = setInterval( () => {
     this.erase();
     this.nextBody();
     this.drawBody();
   }, 500)
  }
  pause() {
    clearInterval(this.action);
  }
  erase() {
    const { erase } = this.props;
    for( let i =0; i < this.body.length; i++) {
      erase(this.body[i].x, this.body[i].y);
    }
  }
  nextBody() {
    let point = this.nextPos();
    let x,y;
    x = point.x;
    y = point.y;
    if(this.situation() === 'out') {
      clearInterval(this.action);
      alert('out');
      return;
    }
    if(this.situation() === 'same') {
      clearInterval(this.action);
      alert('same');
      return;
    }
    if(this.situation() === 'food') {
      this.body.unshift({x: x, y: y});
      return;
    }
    if(this.situation() === 'empty') {
      this.body.pop();
      this.body.unshift({x: x, y: y});
      return;
    }
  }
  situation() {
    const { row, col, hasColor} = this.props;
    let point = this.nextPos();
    let x,y;
    x = point.x;
    y = point.y;
    if(x < 0 || x >=row || y < 0 || y >= col) {
      return 'out'
    }
    for(let i =0; i < this.body.length; i++) {
      if(x === this.body[i].x && y === this.body[i].y) {
        return 'same'
      }
    }

    if(hasColor(x,y)) {
      return 'food'
    }
return 'empty'
  }
  drawBody() {
    const { getColor } = this.props;
    for( let i =0; i < this.body.length; i++) {
      getColor(this.body[i].x, this.body[i].y, 'black');
    }
  }
  nextPos() {
    let { x,y } = this.body[0];
    let { direction } = this.state;
    if(direction === 'left') {
      x--
    }
    if(direction === 'up') {
      y--
    }
    if(direction === 'right') {
      x++
    }
    if(direction === 'down') {
      y++
    }
    return { x: x, y: y};
  }
  render() {
    return (
      <div>
      </div>
    )
  }
};

export default Snake;
