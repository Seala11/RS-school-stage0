import highScoresSectionHandler from '../sections/highScoreSection.js';
import chooseLevelHandler from '../sections/chooseLevelSection.js';

const mainSection = document.querySelector('.main');

// ===================== Initial Section ==================
// show PLAY GAME and HIGH SCORE button
const showHomeSection = () => {
  const homeSection = document.createElement('div');
  homeSection.classList.add('section');
  homeSection.innerHTML = `
  <button class="button button--play">Play Game</button>
  <button class="button button--scores">High scores</button>
  `
  mainSection.appendChild(homeSection);

  // Play game button
  const playGameButton = homeSection.querySelector('.button--play');
  playGameButton.addEventListener('click', () => {
    mainSection.removeChild(homeSection);
    chooseLevelHandler();
  });

  // Score button
  const highScoresButton = homeSection.querySelector('.button--scores');
  highScoresButton.addEventListener('click', () => {
    mainSection.removeChild(homeSection);
    highScoresSectionHandler();
  });
};

export {showHomeSection, mainSection};
