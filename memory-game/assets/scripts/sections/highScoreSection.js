import { mainSection, showHomeSection } from '../sections/homeSection.js';
import { highScore } from '../componenets/localStorage.js';

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

  const scores = document.createElement('table');
  if (highScore.length === 0) {
    scores.innerHTML = `<tr><td style="text-align: center">Finish the game and your score will appear here</td></tr>`;
  } else {
    scores.innerHTML = highScore
      .map((score) => {
        return `
        <tr>
        <td> Score: ${score.score}</td>
        <td> Moves: ${score.moves}</td>
        </tr>`;
      })
      .join('');
  }

  highScoreSection.appendChild(scores);

  const goHomeBtn = document.createElement('button');
  goHomeBtn.classList.add('button');
  goHomeBtn.innerText = 'Go home';
  highScoreSection.appendChild(goHomeBtn);

  mainSection.appendChild(highScoreSection);

  goHomeBtn.addEventListener('click', () => {
    mainSection.removeChild(highScoreSection);
    showHomeSection();
  });
};

export default highScoresSectionHandler;
