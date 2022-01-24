import showTask from './task.js';

const player = document.querySelector('.player');
const video = player.querySelector('.player__video');
const controlsPlayBtn = player.querySelector('.controls__play');
const volume = player.querySelector('.volume');
const volumeIcon = player.querySelector('.volume__icon');
const currTimeElement = player.querySelector('.time__current');
const durationTimeElement = player.querySelector('.time__duration');
const progressElement = player.querySelector('.progress');
// const progressBar = player.querySelector('.progress');

let currentVolume = 0.15;
let videoIsMuted = false;

//TODO: add initial button and poster to video

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

// Play and Pause Btn
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
  video.volume = event.target.value;

  if (video.volume === 0) {
    videoIsMuted = true;
  } else {
    videoIsMuted = false;
  }

  currentVolume = video.volume;
  rangeHandler(event.target, (event.target.value * 100));
  event.target.value = video.volume;
  volumeMuteByRange(event); // change volume icon if range input is 0
};

const volumeMuteByRange = (event) => {
  if (event.target.value === '0') {
    muteVideo()
  } else {
    unmuteVideo()
  }
} 

const volumeMuteHandler = () => {
  if (videoIsMuted === 'true') {
    unmuteVideo();
  } else {
    muteVideo();
  }
};

const muteVideo = () => {
  volumeIcon.classList.remove('volume-on-btn');
  volumeIcon.classList.add('volume-mute-btn');
  video.volume = 0;
  videoIsMuted = 'true';
};

const unmuteVideo = () => {
  volumeIcon.classList.remove('volume-mute-btn');
  volumeIcon.classList.add('volume-on-btn');
  video.volume = currentVolume;
  videoIsMuted = 'false';
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
const progressBarUpdating = () => {
  const currentProgress = Math.abs((video.currentTime / video.duration) * 100);
  rangeHandler(progressElement, currentProgress);
  if (currentProgress === 100) playBtnToggle();
};

const progressBarChange = (event) => {
  let currentMousePosition = parseInt(event.target.value) / 100;
  const progressTime = Math.abs(currentMousePosition * video.duration)
    // (event.offsetX / progressElement.offsetWidth) * video.duration; that works for click, not for input event
  video.currentTime = progressTime;
  rangeHandler(event.target, event.target.value);
};

const rangeHandler = (el, value) => {
   el.value = value;
   el.style.background = `linear-gradient( to right, #bdae82 0%, #bdae82 ${value}%, #c8c8c8 ${value}%, #c8c8c8 100% )`;
 };

// general video events
video.addEventListener('click', togglePlay);
controlsPlayBtn.addEventListener('click', togglePlay);
video.addEventListener('timeupdate', currentTime);

// volume events
let volumeMousedown = false;
volume.addEventListener('input', volumeHandler);
volumeIcon.addEventListener('click', volumeMuteHandler);
volume.addEventListener(
  'mousemove',
  (e) => volumeMousedown && volumeHandler(e)
);
volume.addEventListener('mousedown', () => {
  volumeMousedown = true;
});
volume.addEventListener('mouseup', () => {
  volumeMousedown = false;
});

// progress events
video.addEventListener('timeupdate', progressBarUpdating);

let progressMousedown = false;
progressElement.addEventListener('input', progressBarChange);
progressElement.addEventListener('mousemove', (e) => {
  progressMousedown && progressBarChange(e);
});
progressElement.addEventListener('mousedown', () => {
  progressMousedown = true;
});
progressElement.addEventListener('mouseup', () => {
  progressMousedown = false;
});

// showTask();
