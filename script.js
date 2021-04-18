//Definindo variáveis

let audio, playBtn, title, poster, artists, muteBtn, seekSlider, volumeSlider, seeking=false, seekTo, curTimeText, durTimeText, playlistStatus, dir, playlist, ext, agent, playlistArtist, repeat, randomSong, nextBtn, prevBtn, playlistIndex;

dir = 'Music/';
playlist = ['happyrock', 'acousticbreeze', 'memories', 'slowmotion'];
title = ['Happy Rock', 'Acoustic Breeze', 'Memories', 'Slow Motion'];
artists = ['Benjamin Tissot', 'Benjamin Tissot', 'Benjamin Tissot', 'Benjamin Tissot' ];

ext = '.mp3';
agent = navigator.userAgent.toLowerCase();
if (agent.indexOf('firefox') != -1 || agent.indexOf('opera') != -1) {
    ext = '.ogg';
}

playBtn = document.getElementById('play-pause');
nextBtn = document.getElementById('next');
prevBtn = document.getElementById('prev');
muteBtn = document.getElementById('mute');
seekSlider = document.getElementById('seekslider');
volumeSlider = document.getElementById('volume-slider');
curTimeText = document.getElementById('cur-time-text');
durTimeText = document.getElementById('dur-time-text');
playlistStatus = document.getElementById('playlist-status');
playlistArtist = document.getElementById('playlist-artist');
repeat = document.getElementById('repeat');
randomSong = document.getElementById('random');

playlistIndex = 0;

audio = new Audio();
audio.src = dir + playlist[0] + ext;
audio.loop = false;

playlistStatus.innerHTML = title[playlistIndex];
playlistArtist.innerHTML = artists[playlistIndex];

playBtn.addEventListener('click', playPause);
nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', prevSong);
muteBtn.addEventListener('click', mute);
seekSlider.addEventListener('mousedown', (e) => { seeking = true; seek(e); });
seekSlider.addEventListener('mousemove', (e) => { seek(e); });
seekSlider.addEventListener('mouseup', () => { seeking = false; });
volumeSlider.addEventListener('mousemove', setVolume);
audio.addEventListener('timeupdate', () => { seekTimeUpdate(); });
audio.addEventListener('ended', () => { switchTrack(); });
repeat.addEventListener('click', loop);
audio.addEventListener('click', random);

function fetchMusicDetails() {
  $('#play-pause img').attr('src', 'images/pause-red.png');
  $('#bgImage').attr('src', 'images/poster'+[playlistIndex]+'.jpg');
  $('#image').attr('src', 'images/poster'+[playlistIndex]+'.jpg');

  playlistStatus.innerHTML = title[playlistIndex];
  playlistArtist.innerHTML = artists[playlistIndex];

  audio.src = dir + playlist[playlistIndex] + ext;
  audio.play();
}

function playPause() {
  if (audio.paused) {
    audio.play();
    $('#play-pause img').attr('src', 'images/pause-red.png');
  } else {
    audio.pause();
    $('#play-pause img').attr('src', 'images/play-red.png');
  }
}

function nextSong() {
  playlistIndex++;
  if (playlistIndex > playlist.length - 1) {
    playlistIndex = 0;    
  }
  fetchMusicDetails();
}

function prevSong() {
  playlistIndex--;
  if (playlistIndex < 0) {
    playlistIndex = playlist.length - 1;
  }
  fetchMusicDetails();
}

function mute() {
    if (audio.muted) {
      audio.muted = false;
      $('#mute img').attr('src', 'images/speaker.png');
    } else {
      audio.muted = true;
      $('#mute img').attr('src', 'images/mute.png');
    }
  }

function seek(e) {
  if(audio.duration == 0) {
    null
  } else {
    if (seeking) {
      seekSlider.value = e.clientX - seekSlider.offSetLeft;
      seekTo = audio.duration * (seekSlider.value / 100);
      audio.currentTime = seekTo;
    }
  }
}

function setVolume() {
  audio.volume = volumeSlider.value / 100;
}

function seekTimeUpdate() {
  if (audio.duration) {
    let nt = audio.currentTime * (100 / audio.duration);
    seekslider.value = nt;
    let curMins = Math.floor(audio.currentTime / 60);
    let curSecs = Math.floor(audio.currentTime - curMins * 60);
    let durMins = Math.floor(audio.duration / 60);
    let durSecs = Math.floor(audio.duration - durMins * 60);
    if (curSecs < 10) { curSecs = '0' + curSecs }
    if (durSecs < 10) { durSecs = '0' + durSecs }
    if (curMins < 10) { curMins = '0' + curMins }
    if (durSecs < 10) { durSecs = '0' + durSecs }
    curTimeText.innerHTML = curMins + ':' + curSecs;
    durTimeText.innerHTML = durMins + ':' + durSecs;
  } else {
    curTimeText.innerHTML = '00' + ':' + '00';
  }
}

function switchTrack() {
  if (playlistIndex == (playlist.length - 1)) {
    playlistIndex = 0;
  } else {
    playlistIndex++;
  }
  fetchMusicDetails();
}

function loop() {
  if (audio.loop) {
    audio.loop = false;
    $('#repeat img').attr('src', 'images/rep.png');
  } else {
    audio.loop = true;
    $('#repeat img').attr('src', 'images/rep1.png');
  }
}

function getRandomNumber(min, max) {
  let step1 = max-min+1;
  let step2 = Math.random() * step1;
  let result = Math.floor(step2) + min;
  return result;
}

function random() {
  let randomIndex = getRandomNumber(0, playlist.length - 1);
  playlistIndex = randomIndex;
  fetchMusicDetails();
}