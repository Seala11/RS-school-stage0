import { mainSection } from '../sections/homeSection.js';

let controlsBar;
let playerScoreCounter;
let playerMovesCounter;

const addGameControlsSection = () => {
  controlsBar = document.createElement('div');
  controlsBar.classList.add('section');
  controlsBar.classList.add('controls__section')
  controlsBar.innerHTML = `
  <h2 class="controls">
    Score: <span class="controls__score-counter">0</span>
  </h2>
  <h2 class="controls">
    Moves: <span class="controls__moves-counter">0</span>
  </h2>
  `
  playerScoreCounter = controlsBar.querySelector('.controls__score-counter');
  playerMovesCounter = controlsBar.querySelector('.controls__moves-counter');

  mainSection.appendChild(controlsBar);
}

export {controlsBar, playerScoreCounter, playerMovesCounter, addGameControlsSection};