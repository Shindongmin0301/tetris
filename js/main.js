import BLOCKS from './blocks.js';

const playground = document.querySelector('.playground > ul');

// Settings
const GAME_ROWS = 20;
const GAME_COLS = 10;

// vars
let score = 0;
let duration = 500;
let downInterval;

let tempMovingItem;
// 블럭의 타입과 좌표 정보
const movingItem = {
  type: 'tree',
  direction: 0,
  top: 0,
  left: 0,
};

init();
// functions
function init() {
  tempMovingItem = { ...movingItem };

  for (let i = 0; i < GAME_ROWS; i++) {
    createMatrix();
  }
  document.querySelector('.btn__start').addEventListener('click', () => {
    document.querySelector('.gamestart').classList.add('none');
    generateNewBlock();
  });
}

function createMatrix() {
  const li = document.createElement('li');
  const ul = document.createElement('ul');
  for (let j = 0; j < GAME_COLS; j++) {
    const matrix = document.createElement('li');
    ul.prepend(matrix);
  }
  li.prepend(ul);
  playground.prepend(li);
}

function renderBlocks(moveType) {
  const { type, direction, top, left } = tempMovingItem;
  const movingBlocks = document.querySelectorAll('.moving');
  movingBlocks.forEach(moving => {
    moving.classList.remove(type, 'moving');
  });
  BLOCKS[type][direction].some(block => {
    const x = block[0] + left;
    const y = block[1] + top;
    const target = playground.childNodes[y] ? playground.childNodes[y].childNodes[0].childNodes[x] : null;
    const isAvailable = checkEmpty(target);
    if (isAvailable) {
      target.classList.add(type, 'moving');
    } else {
      if (moveType === 'retry') {
        showGameover();
        clearInterval(downInterval);
      }
      tempMovingItem = { ...movingItem };
      // 재귀함수 콜스택에러 방지
      setTimeout(() => {
        renderBlocks('retry');
        if (moveType === 'top') {
          seizeBlock();
        }
      }, 0);
      return true;
    }
  });
  movingItem.top = top;
  movingItem.left = left;
  movingItem.direction = direction;
}

function showGameover() {
  document.querySelector('.gameover').classList.add('show');
  document.querySelector('.gameover__score').innerHTML = score;
  document.querySelector('.btn__restart').addEventListener('click', () => {
    score = 0;
    document.querySelectorAll('li').forEach(li => {
      li.className = '';
    });
    generateNewBlock();
    document.querySelector('.gameover').classList.remove('show');
  });
}

function seizeBlock() {
  const movingBlocks = document.querySelectorAll('.moving');
  movingBlocks.forEach(moving => {
    moving.classList.remove('moving');
    moving.classList.add('seized');
  });
  checkMatch();
}
function checkMatch() {
  const childNodes = playground.childNodes;
  childNodes.forEach(child => {
    let matched = true;
    child.children[0].childNodes.forEach(li => {
      if (!li.classList.contains('seized')) {
        matched = false;
      }
    });
    if (matched) {
      child.remove();
      createMatrix();
      score += 1;
      document.querySelector('.score').innerHTML = score;
    }
  });

  generateNewBlock();
}

function generateNewBlock() {
  console.log(movingItem);
  clearInterval(downInterval);
  downInterval = setInterval(() => {
    moveBlock('top', 1);
  }, 500);

  const blockArr = Object.keys(BLOCKS);
  const randomIndex = Math.floor(Math.random() * blockArr.length);
  const nextBlock = blockArr[randomIndex];
  movingItem.type = nextBlock;
  movingItem.top = 0;
  movingItem.left = 3;
  movingItem.direction = 0;
  tempMovingItem = { ...movingItem };
  renderBlocks();
}

function checkEmpty(target) {
  if (!target || target.classList.contains('seized')) return false;
  return true;
}

function moveBlock(moveType, amount) {
  tempMovingItem[moveType] += amount;
  renderBlocks(moveType);
}
function rotateBlock() {
  tempMovingItem.direction += 1;
  if (tempMovingItem.direction === 4) {
    tempMovingItem.direction = 0;
  }
  renderBlocks();
}

function dropBlock() {
  clearInterval(downInterval);
  downInterval = setInterval(() => {
    moveBlock('top', 1);
  }, 20);
}

//event handleling
document.addEventListener('keydown', e => {
  switch (e.keyCode) {
    case 37:
      return moveBlock('left', -1);
    case 38:
      return rotateBlock();
    case 39:
      return moveBlock('left', 1);
    case 40:
      return moveBlock('top', 1);
    case 32:
      return dropBlock();
  }
});

document.addEventListener('touchstart', e => {
  console.log(e.target.classList[1]);
  switch (e.target.classList[1]) {
    case 'left':
      return moveBlock('left', -1);
    case 'right':
      return moveBlock('left', 1);
    case 'top':
      return rotateBlock();
    case 'bottom':
      return moveBlock('top', 1);
    case 'drop':
      return dropBlock();
  }
});
