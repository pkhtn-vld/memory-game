class Card {
  constructor(cardNumber, container, flip) {
    this.container = container;
    this.cardNumber = cardNumber;
    this.flip = flip;
    this.element = this.createElement();
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
      this.element.removeEventListener("click", this.handleClick);
      this._success = true;
    } else {
      this.element.addEventListener("click", this.handleClick);
      this._success = false;
    }
  }

  get success() {
    return this._success;
  }

  createElement() {
    const cardElement = document.createElement("div");
    cardElement.classList.add("memory-card");
    cardElement.setAttribute("data-framework", this.cardNumber);

    const backFace = document.createElement("img");
    backFace.classList.add("back-face");
    backFace.setAttribute("src", "img/card.jpg");
    backFace.setAttribute("alt", "Memory Card");

    cardElement.appendChild(backFace);
    cardElement.addEventListener("click", this.handleClick);

    this.container.appendChild(cardElement);
    return cardElement;
  }

  handleClick = () => {
    this.flip(this.element);
  };
}

class AmazingCard extends Card {
  constructor(cardNumber, container, flip) {
    super(cardNumber, container, flip);
    this._cardNumber = cardNumber;

    const imgElement = document.createElement("img");
    imgElement.classList.add("front-face");
    imgElement.setAttribute("src", `img/${cardNumber}.svg`);
    imgElement.setAttribute("alt", cardNumber);

    imgElement.onerror = () => {
      imgElement.setAttribute("src", "img/default.png");
      throw new Error(`Ошибка загрузки изображения`);
    };

    this.element.appendChild(imgElement);
  }
}

const memoryGameContainer = document.querySelector("#memory-game-container");
const cards = document.querySelectorAll(".memory-card");
const CARD_IMAGES = [ "angular", "css", "html", "js", "nodejs", "php", "react", "vue", ];

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
  if (cardsArray.every((card) => card.open)) {
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
