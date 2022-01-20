import showTask from "./task.js";

const player = document.querySelector('.player');
const video = player.querySelector('.player__video');
const controlsPlayBtn = player.querySelector('.controls__play');
const volume = player.querySelector('.controls__volume');
const currTimeElement = player.querySelector('.time__current');
const durationTimeElement = player.querySelector('.time__duration');

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
const volumeHandler = (event) => {
   video.volume = event.target.value;
}

//Current time and duration
const currentTime = () => {
   let currentMinutes = Math.floor(video.currentTime / 60);
   let currentSeconds = Math.floor(video.currentTime - currentMinutes * 60);
   let durationMinutes = Math.floor(video.duration / 60);
   let durationSeconds = Math.floor(video.duration - durationMinutes * 60);
   
   currTimeElement.innerHTML = `${currentMinutes}:${currentSeconds < 10 ? '0' + currentSeconds : currentSeconds}`;
   durationTimeElement.innerHTML = `${durationMinutes}:${durationSeconds < 10 ? '0' + durationSeconds : durationSeconds}`;
}

controlsPlayBtn.addEventListener('click', togglePlay);
volume.addEventListener('mousemove', volumeHandler);
video.addEventListener('timeupdate', currentTime);

showTask();