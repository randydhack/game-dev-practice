const readline = require("readline");
const { start } = require("repl");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

/*
- You can have inputs in that function accept a string and each guess outputs characters
  within an array that match that selection. Then you can return the filled in spots by having
  a global string initialized ‘___ _ ’ type of things and  splice out the index of the ’’_'
  where you want to replace it with the users input. Then you can return that string.
  You can create an array of possible words/sentences to randomize through so that it can always
  create a different word to guess from.
*/

let secretWord = 'app academy';
let fillTheWord = secretWord.replace(/./g, '_');

console.log(fillTheWord)
rl.question('Would you like to play hangman?\nYes or Enter any key to stop: ', startHangman);

function hangman(input) {

    for (let i = 0; i < secretWord.length; i++) {

        if (input === secretWord[i]) {

            console.log('Current word is: ' + fillTheWord, secretWord)
            return
        }
    }

    return;
}

function guessLetters(letter) {

    if (secretWord.includes(letter)) {
        hangman(letter)
    }

    rl.question('Choose a different letter: ', guessLetters);
}

function askWord() {

    rl.question('Enter a 5 letter word: ', (answer1) => {
        rl.question('Guess a letter: ', (letter) => {
            secretWord = answer1;

            guessLetters(letter);
        });
    });
}


function startHangman(answer) {

    if (answer.toLowerCase() !== 'yes') {
        console.log('Please come again!')
        rl.close();
    }

    askWord();
}
