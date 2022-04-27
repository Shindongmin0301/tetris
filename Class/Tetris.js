const playground = document.querySelector('.playground > ul');
import Tetromino from './Tetromino.js';
import BLOCKS from '../js/blocks.js';
import { state } from '../js/_main.js';
import NextBlock from '../js/_nextBlock.js';

let tetromino = new Tetromino('tree', 0, 0, 5);

let downInterval;

class Tetris {
  constructor() {
    this.tetromino = state.setTetromino();
  }
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
    if (state.gameStatus === 'stop') return;
    playground.querySelectorAll('.moving').forEach(el => (el.className = ''));
    const { type, location } = tetromino.getBlockCoordination();
    location.some(([x, y]) => {
      const target = playground.childNodes[y].childNodes[0].childNodes[x];
      target.classList.add(type, 'moving');

      if (target.classList.contains('stucked', 'moving')) {
        clearInterval(downInterval);
        this.showGameover();
        return true;
      }
    });
  }

  showGameover() {
    document.querySelector('.best-score > span').innerHTML = state.score;
    document.querySelector('.gameover').classList.remove('hide');
    document.querySelector('.gameover button').addEventListener('click', () => {
      document.querySelector('.gameover').classList.add('hide');
      document.querySelectorAll('li').forEach(li => li.remove());
      this.renderBoard(24);
      this.setNextBlock();
    });
  }

  setNextBlock() {
    clearInterval(downInterval);
    downInterval = setInterval(() => {
      this.moveBlock('top', 1);
    }, state.speed);
    if (state.speed <= 150) state.speed = 150;
    tetromino = new Tetromino(state.blockStack[0], 0, 0, 5);
    state.blockStack.shift();
    state.setNextBlock();
    console.log(state.blockStack);
    this.renderBlock();
    NextBlock.renderNextBlock();
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
    } else if (move === 'top') this.stuckBlock();
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
        this.renderBoard();
        state.score += 1;
        document.querySelector('.score').innerHTML = state.score;
      }
    });
  }

  dropBlock() {
    clearInterval(downInterval);
    downInterval = setInterval(() => {
      this.moveBlock('top', 1);
    }, 1);
  }

  controllBlock() {
    document.addEventListener('keydown', e => {
      switch (e.code) {
        case 'ArrowUp':
        case 'KeyI':
          return this.moveBlock('direction', 1);
        case 'ArrowLeft':
        case 'KeyJ':
          return this.moveBlock('left', -1);
        case 'ArrowRight':
        case 'KeyL':
          return this.moveBlock('left', +1);
        case 'ArrowDown':
        case 'KeyK':
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
