// import BLOCKS from './blocks.js';
import { blockStack, getNextBlock, nextBlockInit, paintNextBlock } from './nextBlock.js';

// DOM
const playground = document.querySelector('.playground > ul');
const btn_start = document.querySelector('.gamestart > button');
const btn_restart = document.querySelector('.gameover button');
const message_gameover = document.querySelector('.gameover');
const bestScore = document.querySelector('.best-score');

// Variations
const GAME_ROWS = 24;
const GAME_COLUMNS = 12;

let gameStart = false;
let gameOver = false;
let score = 0;
let downInterval;

let tetromino = {
  type: 'elLeft',
  direction: 0,
  top: 0,
  left: 0,
};
let tempTetromino;

function init() {
  btn_start.addEventListener('click', () => {
    gameStart = true;
    init();
    console.log(gameStart);
  });
  if (gameStart) {
    nextBlockInit();
    for (let i = 0; i < GAME_ROWS; i++) {
      createBoard();
    }
    document.querySelector('.gamestart').classList.add('hide');
    tempTetromino = { ...tetromino };
    setNextBlock();
  }
}

// 4개의 블럭중 보드를 벗어나는 블럭이 있는지 검사.
const resultArr = () => {
  const { type, direction, top, left } = tempTetromino;
  return BLOCKS[type][direction].map(block => {
    const x = block[0] + left;
    const y = block[1] + top;
    let target = playground.childNodes[y] ? playground.childNodes[y].childNodes[0].childNodes[x] : null;
    // true or false 반환
    return checkCoordinate(target);
  });
};

function paintTetromino(which = '') {
  const { type, direction, top, left } = tempTetromino;
  // false가 있는지(보드를 벗어나는 블럭) 검사
  const result = resultArr().find(el => el === false);
  if (result === undefined) {
    // 보드판 초기화
    playground.querySelectorAll('.moving').forEach(el => (el.className = ''));
    BLOCKS[type][direction].forEach(block => {
      const x = block[0] + left;
      const y = block[1] + top;
      let target = playground.childNodes[y] ? playground.childNodes[y].childNodes[0].childNodes[x] : null;
      target.classList.add(type, 'moving');
      // 블럭이 움직였다면 블럭의 새로운 위치 업데이트.
      tetromino.direction = direction;
      tetromino.left = left;
      tetromino.top = top;
    });
  } else {
    if (which === 'over') return showGameOver();
    // 보드를 벗어나는 블럭이 있다면 이전 상태를 저장
    tempTetromino = { ...tetromino };
    if (which === 'top') {
      stuckBlock();
      setNextBlock();
    }
  }
}

function restart() {
  gameStart = true;
  message_gameover.classList.add('hide');
  document.querySelectorAll('li').forEach(li => li.remove());
  init();
}

function showGameOver() {
  clearInterval(downInterval);
  gameStart = false;
  bestScore.innerHTML = score;
  message_gameover.classList.remove('hide');
  btn_restart.addEventListener('click', restart);
}

function stuckBlock() {
  playground.querySelectorAll('.moving').forEach(el => {
    el.classList.remove('moving');
    el.classList.add('stucked');
  });
  checkFilled();
}

function checkFilled() {
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
      createBoard();
      score += 1;
      document.querySelector('.score').innerHTML = score;
    }
  });
}

function setNextBlock() {
  clearInterval(downInterval);
  downInterval = setInterval(() => {
    moveBlock('top', 1);
  }, 500);
  let nextBlock = blockStack[0];
  tetromino.type = nextBlock;
  tetromino.direction = 0;
  tetromino.top = 0;
  tetromino.left = 4;
  tempTetromino = { ...tetromino };
  paintTetromino('over');

  blockStack.shift();
  getNextBlock();
  console.log(blockStack);
  paintNextBlock();
}

function checkCoordinate(target) {
  if (!target || target.classList.contains('stucked')) return false;
  else return true;
}

function createBoard() {
  const row = document.createElement('li');
  const ul = document.createElement('ul');
  for (let i = 0; i < GAME_COLUMNS; i++) {
    const cell = document.createElement('li');
    ul.appendChild(cell);
    row.appendChild(ul);
  }
  playground.prepend(row);
}

function moveBlock(which = '', dist = '') {
  tempTetromino[which] += dist;
  paintTetromino(which);
}

function rotateBlock() {
  tempTetromino.direction += 1;
  if (tempTetromino.direction > 3) {
    tempTetromino.direction = 0;
  }
  paintTetromino();
}

function dropBlock() {
  clearInterval(downInterval);
  downInterval = setInterval(() => {
    moveBlock('top', 1);
  }, 10);
}

document.addEventListener('keydown', e => {
  if (!gameStart) return;
  switch (e.code) {
    case 'ArrowUp':
      return rotateBlock();
    case 'ArrowLeft':
      return moveBlock('left', -1);
    case 'ArrowRight':
      return moveBlock('left', 1);
    case 'ArrowDown':
      return moveBlock('top', 1);
    case 'Space':
      return dropBlock();
  }
});

init();
