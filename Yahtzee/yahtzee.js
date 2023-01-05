// Make sure each die can be clicked on independently.
var dice = document.getElementsByClassName("dice");
var tableElements = document.getElementById("table").children;
var locked = [false, false, false, false, false];
var rolls = [0, 0, 0, 0, 0];
var numRolls = 0;
var score = 0;

for (var i = 0; i < tableElements.length; i++) {
    tableElements[i].addEventListener("click", function() {
        var done = false;
        if (this.innerHTML == "3 of a Kind") {
            // check if we have a 3 of a kind.
            if (has3OfAKind() && !this.classList.contains("strikethrough")) {
                score += sumOfDice();
                this.classList.add("strikethrough");
                done = true;
            }
        }
        else if (this.innerHTML == "4 of a Kind") {
            // check if we have a 4 of a kind.
            if (has4OfAKind() && !this.classList.contains("strikethrough")) {
                score += sumOfDice();
                this.classList.add("strikethrough");
                done = true;
            }
        }

        else if (this.innerHTML == "5 of a Kind") {
            // check if we have a 5 of a kind.
            if (has5OfAKind() && !this.classList.contains("strikethrough")) {
                score += 50;
                this.classList.add("strikethrough");
                done = true;
            }
        }

        else if (this.innerHTML == "Full House") {
            // check if we have a Full House.
            if (hasFullHouse() && !this.classList.contains("strikethrough")) {
                score += 25;
                this.classList.add("strikethrough");
                done = true;
            }
        }

        else if (this.innerHTML == "Large Straight") {
            // check if we have a Large Straight.
            if (hasLargeStraight() && !this.classList.contains("strikethrough")) {
                score += 40;
                this.classList.add("strikethrough");
                done = true;
            }
        }

        else if (this.innerHTML == "Nothing") {
            done = true;
        }

        if (done) {
            var scoreObj = document.getElementById("score");
            scoreObj.textContent = "Score = " + score;
            reset();
        }
    })
}

for (var i = 0; i < dice.length; i++) {
    addEvent(i);
}

function has3OfAKind(){
    for (var i = 1; i <= 6; i++) {
        var count = 0;
        for (var j = 0; j < rolls.length; j++) {
            if (rolls[j] == i) {
                count++;
            }
        }
        if (count >= 3) {
            return true;
        }
    }
    return false;
}

function has4OfAKind(){
    for (var i = 1; i <= 6; i++) {
        var count = 0;
        for (var j = 0; j < rolls.length; j++) {
            if (rolls[j] == i) {
                count++;
            }
        }
        if (count >= 4) {
            return true;
        }
    }
    return false;
}

function has5OfAKind() {
    for (var i = 0; i < rolls.length; i++) {
        if (rolls[i] != rolls[0]) {
            return false;
        }
    }
    return true;
}

function hasFullHouse(){
    var freq = [0, 0, 0, 0, 0, 0];
    for (var i = 0; i < rolls.length; i++) {
        freq[rolls[i] - 1]++;
    }

    freq.sort();
    return freq[freq.length - 1] == 3 && freq[freq.length - 2] == 2;
}

function hasLargeStraight(){
    var sortedCopy = [];
    for (var i = 0; i < rolls.length; i++) {
        sortedCopy[i] = rolls[i];
    }
    sortedCopy.sort();

    return sortedCopy.toString() == [1, 2, 3, 4, 5].toString() ||
        sortedCopy.toString() == [2, 3, 4, 5, 6].toString();
}

function addEvent(i) {
    dice[i].addEventListener("click", function() {
        lockDie(i);
    });
}

function reset() {
    // make the rolls null.
    rolls = [0, 0, 0, 0, 0];
    numRolls = 0;
    document.querySelector("p").textContent = "# of Rolls: " + numRolls;


    // unlock all the dice and reset their images.
    for (var i = 0; i < dice.length; i++) {
        dice[i].setAttribute("src", "dice0.png");
        dice[i].classList.remove("locked");
        locked[i] = false;
    }

    // figure out who won and display the verdict
    var h1 = document.querySelector("h1");
    h1.textContent = "Resetting Dice.";
}

function roll() {
    var num = Math.floor(Math.random() * 6) + 1;
    return num;
}

function lockDie(die) {
    dice[die].classList.toggle("locked");
    locked[die] = !locked[die];
}

function sumOfDice() {
    var sum = 0;
    for (var i = 0; i < rolls.length; i++) {
        sum += rolls[i];
    }
    return sum;
}

function rollTheDice(){
    if (numRolls >= 3) return;
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

    if (numRolls == 3) {
        h1.textContent = "Time to score your roll.";

        for (var i = 0; i < tableElements.length; i++) {
            tableElements[i].classList.remove("invisible");
        }
    }
    else {
        h1.textContent = "Yahtzee";
    }
}

