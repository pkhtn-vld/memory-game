class Card {
  constructor(element, cardNumber) {
    this.element = element;
    this.cardNumber = cardNumber;
    this.open = false;
    this.success = false;
  }

  set cardNumber(value) {
    this._cardNumber = value;
  }

  get cardNumber() {
    return this._cardNumber;
  }

  set open(value) {
    if (value) {
      this.element.classList.add("flip");
      this._open = true;
    } else {
      this.element.classList.remove("flip");
      this._open = false;
    }
  }

  get open() {
    return this._open;
  }

  set success(value) {
    if (value) {
      this.element.removeEventListener("click", flipCard);
      this._success = true;
    } else {
      this.element.addEventListener("click", flipCard);
      this._success = false;
    }
  }

  get success() {
    return this._success;
  }
}

const cards = document.querySelectorAll(".memory-card");
let cardsArray = [];
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard(card) {
  if (lockBoard) return;

  card = cardsArray.find((card) => card.element === this);

  if (card === firstCard) return;

  card.open = true;

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = card;
    clearInterval(interval);
    interval = setInterval(startTimer, 10);
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
  
  if (cardsArray.every(card => card.open)) {
    document.querySelector(".new-game").style.display = "block";
    celebrate();
    setTimeout(celebrate, 1000);
    setTimeout(celebrate, 2000);
    setTimeout(celebrate, 3000);
    setTimeout(celebrate, 4000);

    text.innerHTML = "Счет: " + (5000 - seconds * 50);
    clearInterval(interval);
  }
}

function createCardsArray() {
  for (const cardElement of cards) {
    let cardNumber = cardElement.dataset.framework;
    let card = new Card(cardElement, cardNumber);
    cardsArray.push(card);
  }

  return cardsArray;
}

function initializeCards(cardsArray) {
  cardsArray.forEach((card, index) => {
    card.element.style.order = index;
    card.element.addEventListener("click", flipCard(card));
  });
}

createCardsArray();
shuffleMain(cardsArray);
initializeCards(cardsArray);
