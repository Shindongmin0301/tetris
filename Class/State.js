import BLOCKS from '../js/blocks.js';
import Tetromino from './Tetromino.js';

const blockArr = Object.keys(BLOCKS);

class State {
  constructor() {
    for (let i = 0; i < 4; i++) {
      let random = Math.floor(Math.random() * blockArr.length);
      this.blockStack.push(blockArr[random]);
    }
  }

  score = 0;
  gameStatus = 'stop';
  blockStack = [];
  downInterval;
  speed = 500 - this.score * 20;

  setTetromino() {
    return new Tetromino(this.blockStack[0], 0, 0, 5);
  }

  setNextBlock() {
    let random = Math.floor(Math.random() * blockArr.length);
    this.blockStack.push(blockArr[random]);
  }
}

export default State;
