import Tetris from '../Class/Tetris.js';
import Tetromino from '../Class/Tetromino.js';
import { state } from './_main.js';
import BLOCKS from './blocks.js';

const nextBlockBox = document.querySelector('.next-block > ul');

class NextBlock {
  static renderNextBoard() {
    for (let j = 0; j < 4; j++) {
      const row = document.createElement('li');
      const ul = document.createElement('ul');
      for (let i = 0; i < 4; i++) {
        const cell = document.createElement('li');
        ul.appendChild(cell);
        row.appendChild(ul);
      }
      nextBlockBox.prepend(row);
    }
  }
  static renderNextBlock() {
    nextBlockBox.querySelectorAll('li').forEach(el => {
      el.className = '';
      el.style.border = '';
    });
    const nextBlock = new Tetromino(state.blockStack[0], 0, 0, 0);
    const { type, direction } = nextBlock;
    BLOCKS[type][direction].forEach(el => {
      const x = type === 'bar' || type === 'square' ? el[0] + 1 : el[0];
      const y = el[1];
      const target = nextBlockBox.childNodes[y].childNodes[0].childNodes[x];
      target.classList.add(type);
      target.style.border = '1px solid white';
    });
  }
}

export default NextBlock;
