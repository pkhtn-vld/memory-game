// based on https://www.kirilv.com/canvas-confetti/

const DEFAULTS = {
  origin: { x: 0.3 + Math.random() * 0.4, y: 0.7 },
  angle: Math.random() * 20 + 80,
  resize: true,
  ticks: 700,
  gravity: 0.9,
};

const FIRE_OPTIONS = [
  { spread: 26, startVelocity: 55 },
  { spread: 60 },
  { spread: 100, decay: 0.91, scalar: 0.8 },
  { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 },
  { spread: 120, startVelocity: 45 },
];

const PARTICLE_RATIOS = [0.25, 0.2, 0.35, 0.1, 0.1];

const FILES = [
  "audience-claps.mp3",
  "dudes-clap-yay.mp3",
  "gasp-yay.mp3",
  "kids-yay.mp3",
  "one-yay.mp3",
];

let soundsIndex = 0;

function realisticConfetti(count = 200) {
  FIRE_OPTIONS.forEach((options, index) => {
    confetti(
      Object.assign({}, DEFAULTS, options, {
        particleCount: Math.floor(count * PARTICLE_RATIOS[index]),
      })
    );
  });
}

function celebrate() {
  playSound();
  realisticConfetti();
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function playSound() {
  if (soundsIndex >= FILES.length) {
    shuffleArray(FILES);
    soundsIndex = 0;
  }
  const filePath = FILES[soundsIndex];
  soundsIndex++;
  let audio = new Audio("sounds/" + filePath);
  audio.playbackRate = 0.8 + Math.random() * 0.4;
  audio.preservesPitch = false;
  audio.mozPreservesPitch = false;
  audio.webkitPreservesPitch = false;
  audio.volume = 0.5;
  audio.play();
}

window.celebrate = celebrate;
