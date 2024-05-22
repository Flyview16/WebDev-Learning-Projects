// Generate random number for dice 1
var randomNumber1 = Math.floor(Math.random() * 6) + 1;
var randomDiceImage1 = "dice" + randomNumber1 + ".png";
var randomImageSrc1 = "./images/" + randomDiceImage1;
document.querySelectorAll("img")[0].setAttribute("src", randomImageSrc1);

// Generate random number for dice 2
var randomNumber2 = Math.floor(Math.random() * 6) + 1;
var randomImageSrc2 = "./images/dice" + randomNumber2 + ".png";
document.querySelectorAll("img")[1].setAttribute("src", randomImageSrc2);

// Determine winner on refresh
if (randomNumber1 > randomNumber2) {
  document.querySelector("h1").textContent = "Player 1 Wins";
} else if (randomNumber2 > randomNumber1) {
  document.querySelector("h1").textContent = "Player 2 Wins";
} else {
  document.querySelector("h1").textContent = "Draw!";
}
