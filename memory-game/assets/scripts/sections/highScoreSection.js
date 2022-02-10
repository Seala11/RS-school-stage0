import {mainSection, showHomeSection} from '../sections/homeSection.js';
import {highScore} from "../componenets/localStorage.js"

// ==================== High Score Section =======================
// by clicking button 'HIGH SCORE" on home section
const highScoresSectionHandler = () => {
  // show high score title
  // name and score from player best 10 games
  // go home btn

  const highScoreSection = document.createElement('div');
  highScoreSection.classList.add('section');

  const highScoresTitle = document.createElement('h2');
  highScoresTitle.innerText = 'High Scores';
  highScoreSection.appendChild(highScoresTitle);

  const scores = document.createElement('ul');
  scores.classList.add('list');
  if (highScore.length === 0) {
    scores.innerHTML = `<li class="list__item">Finish a game and your score will appear here</li>`;
  } else {
    scores.innerHTML = highScore
      .map((score) => {
        return `<li class="list__item">Score: ${score.score}, Moves: ${score.moves}</li>`;
      })
      .join('');
  }

  highScoreSection.appendChild(scores);

  const goHomeBtn = document.createElement('button');
  goHomeBtn.classList.add('button');
  goHomeBtn.innerText = 'go home';
  highScoreSection.appendChild(goHomeBtn);

  mainSection.appendChild(highScoreSection);

  goHomeBtn.addEventListener('click', () => {
    mainSection.removeChild(highScoreSection);
    showHomeSection();
  });
};

export default highScoresSectionHandler;
