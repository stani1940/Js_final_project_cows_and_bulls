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