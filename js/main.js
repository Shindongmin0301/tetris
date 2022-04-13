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
    [],
    [],
    [],
  ],
};

let tempMovingItem;
// 블럭의 타입과 좌표 정보
const movingItem = {
  type: 'tree',
  direction: 0,
  top: 0,
  left: 3,
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

function renderBlocks() {
  const { type, direction, top, left } = tempMovingItem;
  const movingBlocks = document.querySelectorAll('.moving');
  movingBlocks.forEach(moving => {
    moving.classList.remove(type, 'moving');
  });
  BLOCKS[type][direction].forEach(block => {
    const x = block[0] + left;
    const y = block[1] + top;
    const target = playground.childNodes[y].childNodes[0].childNodes[x];
    target.classList.add(type, 'moving');
  });
}

function moveBlock(moveType, amount) {
  tempMovingItem[moveType] += amount;
  renderBlocks();
}

//event handleling
document.addEventListener('keydown', e => {
  switch (e.keyCode) {
    case 37:
      return moveBlock('left', -1);
    case 38:
      return moveBlock('top', -1);
    case 39:
      return moveBlock('left', 1);
    case 40:
      return moveBlock('top', 1);
  }
});
