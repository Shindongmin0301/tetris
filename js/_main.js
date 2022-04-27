import BLOCKS from './blocks.js';
import State from '../Class/State.js';
import Tetris from '../Class/Tetris.js';
import NextBlock from './_nextBlock.js';

//Variations
const gameStartModal = document.querySelector('.gamestart');
const btn__start = document.querySelector('.gamestart button');

export const state = new State();
// export const nextBlock = new NextBlock();

function init() {
  const tetris = new Tetris();
  tetris.renderBoard(24);
  btn__start.addEventListener('click', () => {
    NextBlock.renderNextBoard();
    NextBlock.renderNextBlock();
    gameStartModal.classList.add('hide');
    state.gameStatus = 'doing';

    // 블럭 초기화
    tetris.setNextBlock();
    tetris.controllBlock();
  });
}

init();
