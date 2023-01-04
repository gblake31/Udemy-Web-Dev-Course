// Make sure each die can be clicked on independently.
var dice = document.getElementsByClassName("dice");
var locked = [false, false, false, false, false];
var rolls = [1, 1, 1, 1, 1];
var numRolls = 0;

for (var i = 0; i < dice.length; i++) {
    addEvent(i);
}

function addEvent(i) {
    dice[i].addEventListener("click", function() {
        lockDie(i);
    });
}

function roll() {
    var num = Math.floor(Math.random() * 6) + 1;
    return num;
}

function lockDie(die) {
    dice[die].classList.toggle("locked");
    locked[die] = !locked[die];
}

function rollTheDice(){
    numRolls++;
    document.querySelector("p").textContent = "# of Rolls: " + numRolls;
    // generate two random numbers [1, 6]
    for (var i = 0; i < 5; i++) {
        if (!locked[i]) {
            rolls[i] = roll();
        }   
    }

    // Change the dice images according the roll
    var dice = document.getElementsByClassName("dice");
    for (var i = 0; i < dice.length; i++) {
        dice[i].setAttribute("src", "dice" + rolls[i] + ".png");
    }

    // figure out who won and display the verdict
    var h1 = document.querySelector("h1");
}

