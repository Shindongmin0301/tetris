import BLOCKS from './blocks.js';
import State from '../Class/State.js';
import Tetris from '../Class/Tetris.js';

//Variations
const gameState = new State();

//function
export const blockStack = [];
export function randomBlock() {
  const blockArr = Object.keys(BLOCKS);
  const random = Math.floor(Math.random() * blockArr.length);
  return blockArr[random];
}

function init() {
  const tetris = new Tetris();
  tetris.renderBoard(24);
  for (let i = 0; i < 2; i++) {
    blockStack.push(randomBlock());
  }
  tetris.setNextBlock();

  if (tetris.gameStatus === 'doing') {
    tetris.controllBlock();
  }
}

init();
