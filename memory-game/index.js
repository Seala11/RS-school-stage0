import showTask from './assets/scripts/componenets/task.js';
import { showHomeSection } from './assets/scripts/sections/homeSection.js';

// ===================== App starts ======================
export const startGame = () => {
  // show play game and high score buttons ?rules
  showHomeSection();
  // showTask();
};

startGame();

export default startGame;
