import BLOCKS from '../js/blocks.js';
// const playground = document.querySelector('.playground > ul');

class Tetromino {
  constructor(type, direction, top, left) {
    this.type = type;
    this.direction = direction;
    this.top = top;
    this.left = left;
  }

  getBlockCoordination() {
    const { type, direction, top, left } = this;
    let location = [];
    BLOCKS[type][direction].map(block => {
      const x = block[0] + left;
      const y = block[1] + top;
      location.push([x, y]);
    });
    return { type, location };
  }
}

export default Tetromino;
