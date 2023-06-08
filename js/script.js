import { AmazingCard } from './Card.js';
import { startTimer, interval, seconds } from './timer.js'
import { celebrate } from './celebrate.js';

const launchClock = startTimer;
const clockSeconds = seconds;
const startCelebrate = celebrate;
const memoryGameContainer = document.querySelector("#memory-game-container");
const CARD_IMAGES = [ "angular", "css", "html", "js", "nodejs", "php", "react", "vue", ];

let clockInterval = interval;
let cardsArray = [];
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard(cardElement) {
  if (lockBoard) return;

  let card = cardsArray.find((card) => card.element === cardElement);

  if (card === firstCard) return;

  card.open = true;

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = card;
    clearInterval(clockInterval);
    clockInterval = setInterval(launchClock, 10);
    return;
  }

  secondCard = card;

  checkForMatch();
  addNewGame();
}

function checkForMatch() {
  let isMatch = firstCard.cardNumber === secondCard.cardNumber;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.success = true;
  secondCard.success = true;

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.open = false;
    secondCard.open = false;

    resetBoard();
  }, 700);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function shuffleMain(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function addNewGame() {
  if (cardsArray.every((card) => card.open)) {
    document.querySelector(".new-game").style.display = "block";
    celebrate();
    setTimeout(startCelebrate, 1000);
    setTimeout(startCelebrate, 2000);
    setTimeout(startCelebrate, 3000);
    setTimeout(startCelebrate, 4000);

    text.innerHTML = "Счет: " + (5000 - clockSeconds * 50);
    clearInterval(clockInterval);
  }
}

function createCardsArray() {
  for (const cardNumber of CARD_IMAGES) {
    let card1 = new AmazingCard(cardNumber, memoryGameContainer, flipCard);
    let card2 = new AmazingCard(cardNumber, memoryGameContainer, flipCard);
    cardsArray.push(card1, card2);
  }

  return cardsArray;
}

function initializeCards(cardsArray) {
  cardsArray.forEach((card, index) => {
    card.element.style.order = index;
  });
}

createCardsArray();
shuffleMain(cardsArray);
initializeCards(cardsArray);
