import { mainSection, chooseLevelHandler } from '../../index.js';
import highScoresSectionHandler from '../scripts/highScoreSection.js';

// ===================== Initial Section ==================
// show PLAY GAME and HIGH SCORE button on load

const showHomeSection = () => {
  const initialSection = document.createElement('div');
  const playGameButton = document.createElement('button');
  const highScoresButton = document.createElement('button');
  initialSection.classList.add('section');
  playGameButton.classList.add('button');
  highScoresButton.classList.add('button');
  playGameButton.innerText = 'Play Game';
  highScoresButton.innerText = 'High scores';
  initialSection.appendChild(playGameButton);
  initialSection.appendChild(highScoresButton);
  mainSection.appendChild(initialSection);
  console.log(mainSection);
  playGameButton.addEventListener('click', () => {
    mainSection.removeChild(initialSection);
    chooseLevelHandler();
  });
  highScoresButton.addEventListener('click', () => {
    mainSection.removeChild(initialSection);
    highScoresSectionHandler();
  });
};

export default showHomeSection;
