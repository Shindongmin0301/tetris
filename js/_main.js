import BLOCKS from './blocks.js';
import Tetromino from '../Class/Tetromino.js';
import Tetris from '../Class/Tetris.js';

//DOM
const playground = document.querySelector('.playground > ul');

//Variations

let gameStart = true;

function init() {
  const tetris = new Tetris();
  tetris.renderBoard(24);
  tetris.setNextBlock();

  if (gameStart) {
    tetris.controllBlock();
  }
}

init();
