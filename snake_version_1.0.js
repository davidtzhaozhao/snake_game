function $(id) {
  return document.getElementById(id)
};

function Fan(num) {
  return Math.floor(Math.random() * num)
};

let map, food, snake;
const SnakeGame = function() {
  map = new Map();
  food = new Food();
  snake = new Snake();
   
  map.show();
  food.init();
  snake.initBody();
  snake.paused = true;
  document.onkeydown = function(e) {
    if(!e) e = window.event;
    snake.getKeyCode(e.keyCode);
    console.log('boyd',snake.body.length,'situation', snake.situation())
  }
}

const btn = $('reset');
btn.onclick = function() {
  if(snake.action) {
    clearInterval(snake.action)
  };
  
  for(let i=0; i<map.rowL;i++) {
    map.table.deleteRow(0)
  };
  
  snake.body = [];
  SnakeGame();
  
}

function Map() {
  this.rowL = 10;
  this.colL = 10;
  this.table = null;
};


Map.prototype = {
  show() {
    this.table = $('main');
    for(let i =0; i< this.rowL; i++) {
      const tr = this.table.insertRow();
      for(let t =0; t < this.colL; t++) {
        tr.insertCell();
      }
      
    }
  },
  
  hasColor(x,y) {
    if(map.table.rows[y].cells[x].style.backgroundColor === '') {
      return false;
    }
    return true;
  }
}

function Food() {
  this.colors = ['red','blue','yellow','green','gray'];
};

Food.prototype = {
  init() {
    for( let i =0;i < 10; i++) {
      let x,y,colorIndex;
      x = Fan(map.rowL);
      y = Fan(map.colL);
      colorIndex = Fan(5);
      if(!map.hasColor(x,y))
      map.table.rows[y].cells[x].style.backgroundColor = this.colors[colorIndex]
    }
  }
};

function Snake() {
  this.body = [];
  this.paused = true;
  this.direction = 'left';
  this.action = null;
  
};

Snake.prototype = {
  // show head
  initBody() {
    
    // use while true ,muse create
    while(true) {
         let x,y;
      x = Fan(map.rowL);
      y = Fan(map.colL);
     if(!map.hasColor(x,y)) {
      this.body.push({x: x, y: y})
      map.table.rows[y].cells[x].style.backgroundColor = 'black';
       break;
    }
    }

  },// initbody end
  
  getKeyCode(code) {
    switch(code) {
      case 13: {
        if(!this.paused) {
          this.pause();
          this.paused = true;
        } else {
          this.move();
          this.paused = false;
        }
        break;
      }
        
       case 37: {
       if(this.direction === 'right') {
           break;
        }
         this.direction = 'left';
        break;
      }
      case 38: {
        if(this.direction === 'down') {
           break;
         }
        this.direction = 'up';
        break;
      }
        
       case 39: {
         if(this.direction === 'left') {
           break;
         }         
        this.direction = 'right';   
        break;
      }
      case 40: {
      if(this.direction === 'up') {
           break;
         }       
       this.direction = 'down';
        break;
      }
       
    }
  }, // getkeycode end
  
  move() {
    this.action = setInterval( () => {
      this.clearBody();
      this.getNextBody();
      this.drawBody();
    }, 500)
  },// end of move
  
  pause() {
    clearInterval(this.action)
  },// end of pause
  
  clearBody() {
    for(let i =0; i < this.body.length; i++) {
      map.table.rows[this.body[i].y].cells[this.body[i].x].style.backgroundColor = ''
    }
  },// endof clearbody
  
  getNextBody() {
    const point = this.nextPos();
    let x,y;
    x = point.x;
    y = point.y;
    if(this.situation() === 'out') {
        clearInterval(this.action);
      alert('out');
      return;
    };
    if(this.situation() === 'same') {
      clearInterval(this.action);
      alert('killed'); 
      return;
      
    };
    if(this.situation() === 'food') {
      this.body.unshift({x:x,y:y});
      return;
      
    };
    if(this.situation() === 'empty') {
      this.body.pop();
      this.body.unshift({x:x,y:y})
      return;
    };      
    
  },// endof next body
  
  drawBody() {
  for(let i =0; i < this.body.length; i++) {
      map.table.rows[this.body[i].y].cells[this.body[i].x].style.backgroundColor = 'black'
    }
  }, // end of draw body
  
  situation() {
    const point = this.nextPos();
    let x,y;
    x = point.x;
    y = point.y;
    
    if(x < 0 || x >= map.rowL || y < 0 || y > map.colL) {
      return 'out'
    };
    
    for(let i =0; i < this.body.length; i++) {
      if(x === this.body[i].x && y === this.body[i].y) {
        return 'same'
      }
    };
    
    if(map.hasColor(x,y)) {
      return 'food';
    };
    
    return 'empty';
    
    
    
    
    
  },// end of situation
  
  nextPos() {
    const point = this.body[0];
    let x,y;
    x = point.x;
    y = point.y;
    
    if(this.direction === 'left') {
      x--;
    };
    if(this.direction === 'up') {
      y--;
    };
    if(this.direction === 'right') {
      x++;
    };
    if(this.direction === 'down') {
      y++;
    }; 
    return {x: x, y:y};
  }, // end of nextPos 
};








