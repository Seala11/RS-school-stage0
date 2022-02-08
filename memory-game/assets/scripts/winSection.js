import {startGame, saveScoreToLocalStorage} from '../../index.js';

const gameRestartSection = document.querySelector('.game__restart');
const gameSection = document.getElementById('grid');

// ================ WIN SECTION ======================
const showWinMessage = () => {
    const restartBtn = gameRestartSection.querySelector('.button--restart');
    winSectionStyleToggle();
    restartBtn.addEventListener('click', () => {
      winSectionStyleToggle();
      saveScoreToLocalStorage();
      startGame();
    });
  };
  
  const winSectionStyleToggle = () => {
    gameSection.innerHTML = '';
    gameSection.classList = '';
    gameSection.classList.toggle('hidden');
    gameRestartSection.classList.toggle('hidden');
  };

export default showWinMessage;