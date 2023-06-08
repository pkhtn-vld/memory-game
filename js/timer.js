const appendTens = document.getElementById("tens");
const appendSeconds = document.getElementById("seconds");
let tens = 0;
let seconds = 0;
let interval;

function startTimer() {
    tens++;

    if (tens <= 9) {
        appendTens.innerHTML = "0" + tens;
    } else {
        appendTens.innerHTML = tens;
    }

    if (tens > 99) {
        seconds++;
        appendSeconds.innerHTML = seconds <= 9 ? "0" + seconds : seconds;
        tens = 0;
        appendTens.innerHTML = "00";
    }
}
