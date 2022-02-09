import { mainSection } from './homeSection.js';
import { cardGenerator } from '../sections/gameSection.js';

// =================== CHOOSE LEVEL SECTION ====================
export let chosenLevel;

const chooseLevelHandler = () => {
  const levelSection = document.createElement('div');
  levelSection.innerHTML = `
    <h2>Choose your level</h2>
    <button class="button button__level" id="easy">Easy</button>
    <button class="button button__level" id="medium">Medium</button>
    <button class="button button__level" id="hard">Hard</button>
    `;
  mainSection.appendChild(levelSection);

  const level = document.querySelectorAll('.button__level');
  level.forEach((element) =>
    element.addEventListener('click', (event) => {
      chosenLevel = event.target.id;
      mainSection.removeChild(levelSection);
      cardGenerator(chosenLevel);
    })
  );
};

export default chooseLevelHandler;
