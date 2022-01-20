import showTask from "./task.js";

const player = document.querySelector('.player');
const video = player.querySelector('.player__video');
const controlsPlayBtn = player.querySelector('.controls__play')

const togglePlay = (event) => {
   if (video.paused) {
      video.play();
   } else {
      video.pause();
   }
   playBtnToggle();
}

//Play and Pause Btn
const playBtnToggle = () => {
   if (controlsPlayBtn.classList.contains('play-btn')) {
      controlsPlayBtn.classList.remove('play-btn');
      controlsPlayBtn.classList.add('pause-btn');
   } else {
      controlsPlayBtn.classList.remove('pause-btn');
      controlsPlayBtn.classList.add('play-btn');
   }
}

//Volume

controlsPlayBtn.addEventListener('click', togglePlay);

showTask();