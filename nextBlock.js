import BLOCKS from './blocks.js';
const nextBlockBox = document.querySelector('.next-block > ul');

export let blockStack = [];

export function nextBlockInit() {
  for (let i = 0; i < 4; i++) {
    createBox();
  }
  for (let i = 0; i < 2; i++) {
    getNextBlock();
  }
}

export function paintNextBlock() {
  const nextBlock = blockStack[0];
  nextBlockBox.querySelectorAll('.painting').forEach(el => {
    el.className = '';
    el.style.border = 'none';
  });
  BLOCKS[nextBlock][0].forEach(block => {
    let x = block[0];
    switch (nextBlock) {
      case 'bar':
        x = block[0] + 1;
      case 'square':
        x = block[0] + 1;
    }
    let y = block[1];
    const target = nextBlockBox.childNodes[y].childNodes[0].childNodes[x];
    target.classList.add(nextBlock, 'painting');
    target.style.border = '1px solid #eee';
  });
}

export function getNextBlock() {
  const blockArr = Object.keys(BLOCKS);
  const random = Math.floor(Math.random() * blockArr.length);
  blockStack.push(blockArr[random]);
}

function createBox() {
  const row = document.createElement('li');
  const ul = document.createElement('ul');
  for (let i = 0; i < 4; i++) {
    const cell = document.createElement('li');
    ul.prepend(cell);
    row.prepend(ul);
  }
  nextBlockBox.prepend(row);
  1;
}

nextBlockInit();
