import { mainSection, showHomeSection} from './homeSection.js';
import chooseLevelHandler from './chooseLevelSection.js';
import { gameSection, goHomeButtom } from './gameSection.js';
import { controlsBar } from '../componenets/gameControls.js';
import { saveScoreToLocalStorage } from '../componenets/localStorage.js';
import { currentScore } from '../componenets/cardLogic.js';

// ================ WIN SECTION ======================
const showWinMessage = () => {
  mainSection.removeChild(controlsBar);
  mainSection.removeChild(gameSection);
  mainSection.removeChild(goHomeButtom);

  const winSection = document.createElement('div');
  winSection.classList.add('game__restart');
  winSection.innerHTML = `
   <h2 class="header__title title--restart">You won!</h2>
   <h3>Your score is ${currentScore}.</h3>
   <button class="button button--restart">Play again</button>
   <button class="button button--home">Go home</button>
  `;
  mainSection.appendChild(winSection);

  // Play again Button
  const playAgainBtn = winSection.querySelector('.button--restart');
  playAgainBtn.addEventListener('click', () => {
    mainSection.removeChild(winSection);
    saveScoreToLocalStorage();
    chooseLevelHandler();
  });

  // Home Button
  const homeBtn = winSection.querySelector('.button--home');
  homeBtn.addEventListener('click', () => {
    mainSection.removeChild(winSection);
    saveScoreToLocalStorage();
    showHomeSection();
  });
};

export default showWinMessage;
