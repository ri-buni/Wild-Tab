function updateClock() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  document.getElementById('clock').textContent = hours + ':' + minutes;

  const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
  document.getElementById('date').textContent = now.toLocaleDateString('en-GB', options);
}

updateClock();
setInterval(updateClock, 1000);





fetch('https://ipwho.is/')
  .then(res => res.json())
  .then(loc => {
    const url = 'https://api.open-meteo.com/v1/forecast?latitude=' + loc.latitude + '&longitude=' + loc.longitude + '&current=temperature_2m';
    return fetch(url).then(res => res.json()).then(data => {
      const temp = Math.round(data.current.temperature_2m);
      const city = loc.city;
      document.getElementById('weather').innerHTML =
      '<span class="temp">' + temp + '°C</span>' +
      '<span class="city">' + city + '</span>';
    });
  });



const layers = document.querySelectorAll('.layer');

document.addEventListener('mousemove', function(e) {
  const dx = (e.clientX / window.innerWidth  - 0.5) * 2;
  const dy = (e.clientY / window.innerHeight - 0.5) * 2;

  layers.forEach(function(img) {
    const depth = Number(img.dataset.depth);
    img.style.transform = 'translate(' + (-dx * depth) + 'px,' + (-dy * depth) + 'px)';
  });
});

const animLayers = document.querySelectorAll('.layer.anim');
let frame = 1;

setInterval(function() {
  frame = (frame === 1) ? 2 : 1;
  animLayers.forEach(function(img) {
    img.src = 'images/' + img.dataset.name + '_' + frame + '.png';
  });
}, 450);




const songs = [
  { title: "Crave You", artist: "Flight Facilities", file: "songs/crave_you.mp3", cover: "images/crave_you.jpg" }, 
  { title: "Earrings", artist: "Malcolm Todd", file: "songs/earrings.mp3", cover: "images/earrings.jpg" },
  { title: "Getting Over You", artist: "Hot Freaks", file: "songs/over_you.mp3", cover: "images/hot_freaks.jpg" },
  { title: "Something About You", artist: "Eyedress", file: "songs/eyedress.mp3", cover: "images/eyedress.jpg" },

  { title: "J’Comprends Pas", artist: "PNL", file: "songs/pnl.mp3", cover: "images/pnl.jpg" },
  { title: "Pour le pire", artist: "Orelsan", file: "songs/orelsan.mp3", cover: "images/orelsan.jpg" },

  { title: "2 Rains", artist: "Nezhnoe Eto", file: "songs/2_rains.mp3", cover: "images/2_rains.jpg" },
  { title: "August", artist: "Intelligency", file: "songs/august.mp3", cover: "images/august.jpg" },
  { title: "Blues", artist: "Ural Gaisin", file: "songs/blues.mp3", cover: "images/blues.jpg" },

  { title: "Deslocado", artist: "NAPA", file: "songs/napa.mp3", cover: "images/napa.jpg" },
 
];

const tracklist = document.getElementById('tracklist');
const pauseBtn = document.getElementById('pause-btn');
const audio = document.getElementById('audio');
const honk = new Audio('songs/honk.mp3');
let cur = 0

songs.forEach(function(song, index) {
  const li = document.createElement('li');
  li.textContent = song.title + ' - ' + song.artist;
  li.onclick = function() { playSong(index); };
  tracklist.appendChild(li);
});

function playSong(index) {
  cur = index
  const song = songs[index];
  audio.src = song.file;
  audio.play();
  document.getElementById('player').classList.add('playing');
  document.getElementById('cover').src = song.cover;
  document.getElementById('song-title').textContent = song.title; 
  document.getElementById('song-artist').textContent = song.artist;
  document.getElementById('nowplaying').textContent = '♪ ' + song.title + ' - ' + song.artist + ' ♪';
}

document.getElementById('honk').addEventListener('click', function() {
  honk.currentTime = 0; 
  honk.play()
});

document.getElementById('next').onclick = function() {
  let n  = cur + 1;
  if (n >= songs.length) n = 0;
  playSong(n);
};
document.getElementById('prev').onclick = function() {
  let n  = cur - 1;
  if (n >= songs.length ) n = 0;
  playSong(n);
};
document.getElementById('pause-btn').onclick = function() {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause(); 
  }
};
pauseBtn.onclick = function() {
  if (audio.paused) {
    audio.play();
    pauseBtn.src = 'images/pause.png';
  } else {
    audio.pause();
    pauseBtn.src = 'images/paused.png'; 
  }
};


audio.addEventListener('ended', function() {
  let next = cur + 1;
  if (next >= songs.length) next = 0; 
  playSong(next);
});

