// store the href for each dice image
const images = ["nothing", "dice1.png", "dice2.png", "dice3.png", "dice4.png", "dice5.png", "dice6.png"]

function roll() {
    var num = Math.floor(Math.random() * 6) + 1;
    return num;
}

function rollBothDice(){

    // generate two random numbers [1, 6]
    var first = roll();
    var second = roll();

    // Change the dice images according the roll
    var dice = document.getElementsByClassName("dice");
    dice[0].setAttribute("src", images[first]);
    dice[1].setAttribute("src", images[second]);

    // figure out who won and display the verdict
    var h1 = document.querySelector("h1");
    if (first > second) {
        h1.textContent = "Player 1 Wins!"
    }
    else if (second > first) {
        h1.textContent = "Player 2 Wins!"
    }
    else {
        h1.textContent = "It's a tie! Try again."
    }
}

