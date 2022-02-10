import { mainSection, showHomeSection } from './homeSection.js';
import loadRandomData from '../componenets/loadLevelsData.js';
import { addGameControlsSection, controlsBar } from '../componenets/gameControls.js';
import { chosenLevel as level } from '../sections/chooseLevelSection.js';
import { cardHandler } from "../componenets/cardLogic.js";

let winningScore;
let gameSection;
let cardEvent;
let goHomeButtom;

// ============= GAME SECTION ================
// show cards by choosen level TODO: add go home or restart button
const cardGenerator = (level) => {
  const cards = loadRandomData(level);
  winningScore = (cards.length / 2) * 10;
  addGameControlsSection();

  gameSection = document.createElement('div');
  gameSection.classList.add('grid');
  gameSection.classList.add(`grid--${level}`);
  cards.forEach((card, index) => {
    // create a card element with face and back;
    const cardEl = document.createElement('div');
    const cardFace = document.createElement('div');
    const cardBack = document.createElement('div');
    cardEl.classList = 'card';
    cardFace.classList = 'card-face';
    cardBack.classList = 'card-back';

    // add img to the card face
    cardFace.style.backgroundImage = `url(${card.src})`;
    cardEl.setAttribute('id', index); // not to match the same card
    cardEl.setAttribute('name', card.name); // to match names

    // add card element to the main section
    gameSection.appendChild(cardEl);
    cardEl.appendChild(cardFace);
    cardEl.appendChild(cardBack);

    // add events to the card
    cardEl.addEventListener('click', (event) => {
      card = event;
      cardHandler()});
  });
  
  goHomeButtom = document.createElement('button')
  goHomeButtom.classList.add('button', 'home-button');
  // goHomeButtom.style.margin = '0'
  goHomeButtom.innerText = 'Go Home';

  mainSection.appendChild(gameSection);
  mainSection.appendChild(goHomeButtom);

  goHomeButtom.addEventListener('click', () => {
    mainSection.removeChild(gameSection);
    mainSection.removeChild(goHomeButtom);
    mainSection.removeChild(controlsBar);
    showHomeSection()
  })
};

export { winningScore, gameSection, cardEvent, goHomeButtom, cardGenerator };