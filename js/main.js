const playground = document.querySelector('.playground > ul');

// Settings
const GAME_ROWS = 20;
const GAME_COLS = 10;

// vars
let score = 0;
let duration = 500;
let downInterval;

const BLOCKS = {
  tree: [
    [
      [2, 1],
      [0, 1],
      [1, 0],
      [1, 1],
    ],
    [
      [0, 1],
      [1, 2],
      [1, 0],
      [1, 1],
    ],
    [
      [0, 1],
      [1, 2],
      [2, 1],
      [1, 1],
    ],
    [
      [2, 1],
      [1, 2],
      [1, 0],
      [1, 1],
    ],
  ],
};

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
  renderBlocks();
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
      tempMovingItem = { ...movingItem };
      // 재귀함수 콜스택에러 방지
      setTimeout(() => {
        renderBlocks();
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

function seizeBlock() {
  console.log('sieze block');
}

function checkEmpty(target) {
  if (!target) return false;
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
  }
});
