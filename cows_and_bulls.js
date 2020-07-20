"use strict"; //an idea more secure js code
// Generates a non-repeating, random number and stores it in a global variable known as "secret".

let numbers = [0,1,2,3,4,5,6,7,8,9];

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

let secret = shuffleArray(numbers).slice(0,4).join('');
console.log(secret);
// This is our click counter that tells you how many times you've guessed in the game.

let clicks = 0;
$("#submit").on("click",function() {
    clicks++;
    $("#guesses").text(clicks);
});
//add event of start button

$("#start").on("click",function() {
    return secret;
});
// When you click the "Hide Rules" button, it hides the Rules form and shows the "Show Rules" button.

$("#hide").on("click", function() {
    $("#rulesForm").hide();
    $("#show").show();
    $("#hide").hide();
});
// When you click the "Show Rules" button, it shows the rules form and the "Hide Rules" button and hides the "Show Rules" button.

$("#show").on("click",function() {
    $("#rulesForm").show();
    $("#show").hide();
    $("#hide").show();
});
