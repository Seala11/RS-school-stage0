import showTask from './task.js';

const player = document.querySelector('.player');
const video = player.querySelector('.player__video');
const controlsPlayBtn = player.querySelector('.controls__play');
const volume = player.querySelector('.volume');
const volumeIcon = player.querySelector('.volume__icon');
const currTimeElement = player.querySelector('.time__current');
const durationTimeElement = player.querySelector('.time__duration');
const progressElement = player.querySelector('.controls__progress');
const progressBar = player.querySelector('.progress__filled');

let currentVolume = 0.15;
let videoIsMuted = false;

const togglePlay = (event) => {
  console.log(videoIsMuted);
  if (video.paused) {
    video.play();
    setVideoVolume();
  } else {
    video.pause();
  }
  playBtnToggle();
};

//Play and Pause Btn
const playBtnToggle = () => {
  if (controlsPlayBtn.classList.contains('play-btn')) {
    controlsPlayBtn.classList.remove('play-btn');
    controlsPlayBtn.classList.add('pause-btn');
    setVideoVolume();
  } else {
    controlsPlayBtn.classList.remove('pause-btn');
    controlsPlayBtn.classList.add('play-btn');
  }
};

//Volume
const setVideoVolume = () => {
  videoIsMuted === 'true' ? (video.volume = 0) : (video.volume = currentVolume);
};

const volumeHandler = (event) => {
  console.log(event.target.value);
  video.volume = event.target.value;
  if (video.volume === 0) {
    videoIsMuted = true;
    volumeMuteHandler();
  }
  currentVolume = video.volume;
};

// TODO: doesnt change after unmuted
const volumeMuteHandler = () => {
  if (volumeIcon.classList.contains('volume-on-btn')) {
    volumeIcon.classList.remove('volume-on-btn');
    volumeIcon.classList.add('volume-mute-btn');
    video.volume = 0;
    videoIsMuted = 'true';
  } else {
    volumeIcon.classList.remove('volume-mute-btn');
    volumeIcon.classList.add('volume-on-btn');
    video.volume = currentVolume;
    videoIsMuted = 'false';
  }
};

//Current time and duration
const currentTime = () => {
  let currentMinutes = Math.floor(video.currentTime / 60);
  let currentSeconds = Math.floor(video.currentTime - currentMinutes * 60);
  let durationMinutes = Math.floor(video.duration / 60);
  let durationSeconds = Math.floor(video.duration - durationMinutes * 60);

  currTimeElement.innerHTML = `${currentMinutes}:${
    currentSeconds < 10 ? '0' + currentSeconds : currentSeconds
  }`;
  durationTimeElement.innerHTML = `${durationMinutes}:${
    durationSeconds < 10 ? '0' + durationSeconds : durationSeconds
  }`;
};

// Progress Bar

const progressBarHandler = () => {
  const currentProgress = (video.currentTime / video.duration) * 100;
  progressBar.style.width = `${currentProgress}%`;
  if (currentProgress === 100) playBtnToggle();
};

const progressBarUpdate = (event) => {
  const progressTime =
    (event.offsetX / progressElement.offsetWidth) * video.duration;
  video.currentTime = progressTime;
};

video.addEventListener('click', togglePlay);
controlsPlayBtn.addEventListener('click', togglePlay);
video.addEventListener('timeupdate', currentTime);
video.addEventListener('timeupdate', progressBarHandler);

// volume events
let volumeMousedown = false;
volume.addEventListener('change', volumeHandler);
volumeIcon.addEventListener('click', volumeMuteHandler);
volume.addEventListener('mousemove', (e) => volumeMousedown && volumeHandler(e));
volume.addEventListener('mousedown', () => {
   volumeMousedown = true;
 });
 volume.addEventListener('mouseup', () => {
   volumeMousedown = false;
 });

// progress events
let progressMousedown = false;
progressElement.addEventListener('click', progressBarUpdate);
progressElement.addEventListener('mousemove', (e) => {
  progressMousedown && progressBarUpdate(e);
});
progressElement.addEventListener('mousedown', () => {
  progressMousedown = true;
});
progressElement.addEventListener('mouseup', () => {
  progressMousedown = false;
});
// showTask();
