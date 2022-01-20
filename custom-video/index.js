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
  } else {
    videoIsMuted = false;
  }

  currentVolume = video.volume;
  volumeMuteHandler();
};

const volumeMuteHandler = () => {
  console.log('1. video is muted (start point): ' + videoIsMuted);
  console.log('1. volume:' + video.volume);
  if (videoIsMuted === 'true') {
    unmuteVideo();
  } else {
    muteVideo();
  }
  console.log('2. video is muted (end point): ' + videoIsMuted);
  console.log('2. volume:' + video.volume);
  console.log('___________________');
};

const muteVideo = () => {
  console.log(
    '3. icon volume on: ' + !volumeIcon.classList.contains('volume-on-btn')
  );
  console.log('(muteVideo - change to mute btn)');
  console.log('3. volume:' + video.volume);
  //   if (volumeIcon.classList.contains('volume-on-btn')) {
  volumeIcon.classList.remove('volume-on-btn');
  volumeIcon.classList.add('volume-mute-btn');
  video.volume = 0;
  videoIsMuted = 'true';
  //   }
  console.log('3.end volume:' + video.volume);
};

const unmuteVideo = () => {
  console.log(
    '4. icon volume on: ' + !volumeIcon.classList.contains('volume-on-btn')
  );
  console.log('(unmuteVideo - change to volume btn)');
  console.log('4. volume:' + video.volume);
  //   if (!volumeIcon.classList.contains('volume-on-btn')) {
  volumeIcon.classList.remove('volume-mute-btn');
  volumeIcon.classList.add('volume-on-btn');
  video.volume = currentVolume;
  videoIsMuted = 'false';

  console.log('4.end volume:' + video.volume);
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
  progressBarHandler(progressElement, currentProgress);
  console.log(progressElement, currentProgress);
  if (currentProgress === 100) playBtnToggle();
};

const progressBarChange = (event) => {
  const progressTime =
    (event.offsetX / progressElement.offsetWidth) * video.duration;
  video.currentTime = progressTime;
  progressBarHandler(event.target, event.target.value);
};

const progressBarHandler = (el, value) => {
   console.log(el);
   el.value = value;
   el.style.background = `linear-gradient( to right, #bdae82 0%, #bdae82 ${value}%, #c8c8c8 ${value}%, #c8c8c8 100% )`;
 };

// general video events
video.addEventListener('click', togglePlay);
controlsPlayBtn.addEventListener('click', togglePlay);
video.addEventListener('timeupdate', currentTime);

// volume events
let volumeMousedown = false;
volume.addEventListener('change', volumeHandler);
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
progressElement.addEventListener('click', progressBarChange);
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
