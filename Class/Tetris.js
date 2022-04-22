const playground = document.querySelector('.playground > ul');
import Tetromino from './Tetromino.js';
import BLOCKS from '../js/blocks.js';

function generateNewBlock() {
  const blockArr = Object.keys(BLOCKS);
  const random = Math.floor(Math.random() * blockArr.length);
  return new Tetromino(blockArr[random], 0, 0, 5);
}
let blockStack = [];
for (let i = 0; i < 2; i++) {
  blockStack.push(generateNewBlock().type);
}
let tetromino = generateNewBlock();
let downInterval;

class Tetris {
  renderBoard(ROWS = 1) {
    const GAME_COLUMNS = 12;

    for (let j = 0; j < ROWS; j++) {
      const row = document.createElement('li');
      const ul = document.createElement('ul');
      for (let i = 0; i < GAME_COLUMNS; i++) {
        const cell = document.createElement('li');
        ul.appendChild(cell);
        row.appendChild(ul);
      }
      playground.prepend(row);
    }
  }

  renderBlock() {
    playground.querySelectorAll('.moving').forEach(el => (el.className = ''));
    const { type, location } = tetromino.getBlockCoordination();
    location.forEach(([x, y]) => {
      const target = playground.childNodes[y].childNodes[0].childNodes[x];
      target.classList.add(type, 'moving');
    });
  }

  setNextBlock() {
    clearInterval(downInterval);
    downInterval = setInterval(() => {
      this.moveBlock('top', 1);
    }, 500);
    tetromino = new Tetromino(blockStack[0], 0, 0, 5);
    this.renderBlock();
  }

  moveBlock(move, dist) {
    const temp = { ...tetromino };
    temp[move] += dist;
    if (move === 'direction' && temp.direction === 4) {
      temp.direction = 0;
    }
    // true - 게임판을 넘어감
    const overflow = this.resultArr(temp).includes(false);
    if (!overflow) {
      tetromino[move] += dist;
      if (tetromino.direction === 4) tetromino.direction = 0;
      this.renderBlock();
    } else {
      if (move === 'top') this.stuckBlock();
    }
  }

  stuckBlock() {
    playground.querySelectorAll('.moving').forEach(el => {
      el.classList.remove('moving');
      el.classList.add('stucked');
    });
    this.checkFilled();
    this.setNextBlock();
  }

  checkFilled() {
    const rowElems = playground.childNodes;
    rowElems.forEach(row => {
      let filled = true;
      row.childNodes[0].childNodes.forEach(el => {
        if (!el.classList.contains('stucked')) {
          filled = false;
          return;
        }
      });
      if (filled) {
        row.remove();
        this.renderBlock();
        // score += 1;
        // document.querySelector('.score').innerHTML = score;
      }
    });
  }

  dropBlock() {
    downInterval = setInterval(() => {
      this.moveBlock('top', 1);
    }, 10);
  }

  controllBlock() {
    document.addEventListener('keydown', e => {
      switch (e.code) {
        case 'ArrowUp':
          return this.moveBlock('direction', 1);
        case 'ArrowLeft':
          return this.moveBlock('left', -1);
        case 'ArrowRight':
          return this.moveBlock('left', +1);
        case 'ArrowDown':
          return this.moveBlock('top', +1);
        case 'Space':
          return this.dropBlock();
      }
    });
  }

  resultArr(temp) {
    const { type, direction, top, left } = temp;

    return BLOCKS[type][direction].map(block => {
      const x = block[0] + left;
      const y = block[1] + top;
      let target = playground.childNodes[y] ? playground.childNodes[y].childNodes[0].childNodes[x] : null;
      // true or false 반환
      return this.checkCoordinate(target);
    });
  }

  checkCoordinate(target) {
    if (!target || target.classList.contains('stucked')) return false;
    else return true;
  }
}

export default Tetris;
