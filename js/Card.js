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

export { Card, AmazingCard }