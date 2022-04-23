import BLOCKS from '../js/blocks.js';
import Tetromino from './Tetromino.js';

class State {
  score = 0;
  gameStatus = 'doing';
  blockStack = [];
  downInterval;
  speed = 500;
}

export default State;
