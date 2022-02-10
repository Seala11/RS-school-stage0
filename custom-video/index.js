import showTask from './task.js';

const player = document.querySelector('.player');
const playBtn = player.querySelector('.player__play-btn');
const poster = player.querySelector('.player__poster');
const video = player.querySelector('.player__video');
const controlsPlayBtn = player.querySelector('.controls__play');
const volume = player.querySelector('.volume');
const volumeIcon = player.querySelector('.volume__icon');
const currTimeElement = player.querySelector('.time__current');
const durationTimeElement = player.querySelector('.time__duration');
const progressElement = player.querySelector('.progress');

let currentVolume = 0.15; // (initial volume 0,15) than saved each time if volume changed, to set after in case mute btn clicked
let videoIsMuted = false; 
let progressMousedown = false;
let volumeMousedown = false;

const togglePlay = (event) => {
  if (video.paused) {
    video.play();
    setVideoVolume();
    removePlayBtn();
    if (poster.classList.contains('visible')) removePoster();
  } else {
    video.pause();
    addPlayBtn();
  }
  playBtnToggle();
};

// Initial play button
const removePoster = () => {
  poster.classList.remove('visible');
  poster.classList.add('hidden');
}

const removePlayBtn = () => {
  playBtn.classList.remove('visible');
  playBtn.classList.add('hidden');
}

const addPlayBtn = () => {
  playBtn.classList.remove('hidden');
  playBtn.classList.add('visible');
  if (!playBtn.classList.contains('play-btn--centered')) playBtn.classList.add('play-btn--centered');
}

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

// Volume
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
  volumeMuteByRange(event); // toggle volume icon if range input is 0 (mute and unmute)
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
const progressBarUpdating = () => { // updates automatically if video is played
  const currentProgress = Math.abs((video.currentTime / video.duration) * 100);
  rangeHandler(progressElement, currentProgress);
  if (currentProgress === 100) playBtnToggle();
};

const progressBarChange = (event) => { // changed in case thumb is moved
  let currentMousePosition = parseInt(event.target.value) / 100; // gives % of the bar progress
  const progressTime = Math.abs(currentMousePosition * video.duration) // convert the % amount to time
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
playBtn.addEventListener('click', togglePlay);
controlsPlayBtn.addEventListener('click', togglePlay);
video.addEventListener('timeupdate', currentTime);

// volume events
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

showTask();
