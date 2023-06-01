let cards = document.querySelectorAll(".memory-card");

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flip");

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;

  checkForMatch();

  clearInterval(Interval);
  Interval = setInterval(startTimer, 10);
  addNewGame();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

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

let arrCards = Object.keys(cards);
shuffleMain(arrCards);
console.log(arrCards);

cards.forEach((card, index) => {
  card.style.order = arrCards[index];
});

// (function shuffle() {
//   cards.forEach((card) => {
//     let ramdomPos = Math.floor(Math.random() * 12);
//     card.style.order = ramdomPos;
//   });
// })();

function addNewGame() {
  let counter = 0;
  cards.forEach((card) => {
    if (card.classList.contains("flip")) {
      counter += 1;
    }
    if (counter === 16) {
      document.querySelector(".new-game").style.display = "block";
      celebrate();
      setTimeout(celebrate, 1000);
      setTimeout(celebrate, 2000);
      setTimeout(celebrate, 3000);
      setTimeout(celebrate, 4000);

      text.innerHTML = "Счет: " + (5000 - seconds * 50);
      clearInterval(Interval);
    }
  });
}

cards.forEach((card) => card.addEventListener("click", flipCard));
