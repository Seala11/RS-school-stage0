import showTask from './assets/scripts/componenets/task.js';
import { showHomeSection } from './assets/scripts/sections/homeSection.js';

// ===================== App starts ======================
const startGame = () => {
  // show play game and high score buttons
  showHomeSection();
  showTask();
};

startGame();