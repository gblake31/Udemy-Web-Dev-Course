var tom = new Audio("Audio/tom-3.mp3");
var snare = new Audio("Audio/snare.mp3");
var kick = new Audio("Audio/kick-bass.mp3");
var crash = new Audio("Audio/crash.mp3");

var images = ["crash.png", "tom3.png", "kick.png", "snare.png"];
var sounds = [crash, tom, kick, snare];
var keys = ["w", "a", "s", "d"];
var drumsArr = document.getElementById("drums").children;

for (var i = 0; i < drumsArr.length; i++) {
    activateDrum(i);
}

function activateDrum(index) {
    drumsArr[index].addEventListener("click", function() {
        sounds[index].load();
        sounds[index].play();
    });

    document.addEventListener("keydown", function(e) {
        if (e.key == keys[index]) {
            sounds[index].load();
            sounds[index].play();
        }
        else {
            console.log(e.key + " detected.");
        }
    });
}

