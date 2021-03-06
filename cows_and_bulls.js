"use strict"; //an idea more secure js code
// Generates a non-repeating, random number and stores it in a global variable known as "secret".

let numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

let secret = shuffleArray(numbers).slice(0, 4).join('');
console.log(secret);
// This is our click counter that tells you how many times you've guessed in the game.
$("#rulesForm").hide();
let clicks = 0;
$("#submit").on("click", function () {
    clicks++;
    $("#guesses").text(clicks);
    $("#history").css({"display": "block", "margin-top": "-350px"});
});
//add event of start button

$("#start").on("click", function () {
    $("#game").show();
    $("#start").hide();
    $('#guess').show();
    $("#submit").show();
    $("#guesses").text("0");
    return secret;
});
// When you click the "Hide Rules" button, it hides the Rules form and shows the "Show Rules" button.

$("#hide").on("click", function () {
    $("#rulesForm").hide();
    $("#show").show();
    $("#hide").hide();
});
// When you click the "Show Rules" button, it shows the rules form and the "Hide Rules" button and hides the "Show Rules" button.

$("#show").on("click", function () {
    $("#rulesForm").show();
    $("#show").hide();
    $("#hide").show();
});
// When you hit the "Stop playing." button, it clears the results of the game and guess input box, in addition to hiding the game functions and showing the "Start playing!" button.

$("#stop").on('click', function () {
    $("#game").hide();
    $("#start").show();
    $("#results").html("");
    $("#guess").val("");
    $("#list").html("");
    clicks = 0;
});
$("#hint").on("click", function () {
    $(this).val(secret);
});
window.game = function () {

    // Stores your guess in a variable

    let guess = $("#guess").val();
    //validateGuess(guess);

    // Makes sure the number is 4 digits
    function validateGuess(guess) {
        if (!onlyDigits(guess)) {
            alert("The number must contains digits in range 0,9 ");
            return false;
        } else if (guess.length !== 4) {
            alert("This number is too long or short to be valid.");
            return false;
        }
        // Makes sure the numbers are non-repeating if they're 4 digits.
        else if (guess.charAt(0) === guess.charAt(1) || guess.charAt(0) === guess.charAt(2) || guess.charAt(0) === guess.charAt(3) || guess.charAt(1) === guess.charAt(2) || guess.charAt(1) === guess.charAt(3) || guess.charAt(2) === guess.charAt(3)) {
            alert("This game doesn't have any repeating digits.");
            return false;
        }
        return true;
    }

    function onlyDigits(guess) {
        for (let i = guess.length - 1; i >= 0; i--) {
            const digit = guess.charCodeAt(i);
            if (digit < 48 || digit > 57) return false
        }
        return true
    }

    // This is the actual game.

    // These two variables will be updated with each guess the user inputs.

    let bulls = 0;
    let cows = 0;

    // This is where JavaScript checks the bulls and cows and adds them up accordingly.
    if (validateGuess(guess)) {
        if (guess !== secret) {
            if (guess.charAt(0) === secret.charAt(0)) {
                bulls++;
            } else if (guess.charAt(0) === secret.charAt(1) || guess.charAt(0) === secret.charAt(2) || guess.charAt(0) === secret.charAt(3)) {
                cows++;
            }
            if (guess.charAt(1) === secret.charAt(1)) {
                bulls++;
            } else if (guess.charAt(1) === secret.charAt(0) || guess.charAt(1) === secret.charAt(2) || guess.charAt(1) === secret.charAt(3)) {
                cows++;
            }
            if (guess.charAt(2) === secret.charAt(2)) {
                bulls++;
            } else if (guess.charAt(2) === secret.charAt(0) || guess.charAt(2) === secret.charAt(1) || guess.charAt(2) === secret.charAt(3)) {
                cows++;
            }
            if (guess.charAt(3) === secret.charAt(3)) {
                bulls++;
            } else if (guess.charAt(3) === secret.charAt(0) || guess.charAt(3) === secret.charAt(1) || guess.charAt(3) === secret.charAt(2)) {
                cows++;
            }
            showHistory(guess, bulls, cows);
        } else if (guess === secret) {
            playSound();
            $("#results").html("Congratulations, you won!").animate({'font-size': '40', 'margin-top': '-100'}, 2000);
            $("#submit").hide();
        }
    }
}

function playSound() {
    const rollSound = new Audio("https://upload.wikimedia.org/wikipedia/commons/4/48/Mudchute_cow_1.ogg");
    rollSound.play();
}

function showHistory(guess, bulls, cows) {
    $("#list").append('<li>:' + guess + '<p> ' + '</p> </li>');
    $("li p").text("Bulls: " + bulls + " & Cows: " + cows + "");
    $("#results").text("Bulls: " + bulls + " & Cows: " + cows + "").css("background-color", "white");
}