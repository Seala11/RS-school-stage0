import { mainSection } from './homeSection.js';
import { cardGenerator } from '../sections/gameSection.js';

// =================== CHOOSE LEVEL SECTION ====================
export let chosenLevel;

const chooseLevelHandler = () => {
  const levelSection = document.createElement('div');
  levelSection.classList.add('section');
  levelSection.innerHTML = `
    <h2 class="section__title">Select level</h2>
    <div class="section__buttons">
    <button class="button button__level" id="easy">Easy</button>
    <button class="button button__level" id="medium">Medium</button>
    <button class="button button__level" id="hard">Hard</button>
    </div>
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
