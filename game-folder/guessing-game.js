const readline = require("readline");
const { start } = require("repl");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// -------------------- global variables ------------------------
let secretNum, numAttempts = 5, minNum, maxNum;

// -------------------- Initiation to Game --------------------
rl.question('Would you like to play?\nYes or Enter any key to stop: ', startGame)


// -------------------- Random Number Generator Full Game -----------------------
function checkGuess(guess) {
    // If number is lower than min or higher than max, make user try again.
    if (guess < minNum) {
        console.log(`\nPlease keep provide a number greater or equal to ${minNum}.\n`);
        return
    } else if (guess > maxNum) {
        console.log(`\nPlease keep provide a number lower or equal to ${maxNum}.\n`);
        return
    } else if (isNaN(guess)) {
        console.log('\nError! Please provide a number!')
        return;
    }

    // If number is less or higher than secret number, return and guess again. Or Win
    if (secretNum > guess) {
        console.log(`\nYour guess ${guess} was too low!`)
        minNum = guess;
        numAttempts--;
        return false;
    } else if (secretNum < guess) {
        console.log(`\nYour guess ${guess} was too high!`)
        maxNum = guess;
        numAttempts--;
        return false;
    } else {
        console.log('Winner, Winner, Chicken Dinner!!!\n')
        return true;
    }
}

// ------------------------------- Recursive step / case ---------------------------------
function askGuess(number) {
    // Numbers of attempts equals to 0, end game and ask if user wants to play again.
    if (numAttempts === 1) {
        numAttempts = 5;
        console.log(`\nYou Lose! The answer was ${secretNum}!`)
        rl.question('\nWould you like to play again?\nYes or Enter any key to stop: ', askRange);
        return
    }
    // If number guess is correct, return true and ask if user wants to play again;
    if (checkGuess(Number(number)) === true) {
        numAttempts = 5;
        rl.question('Would you like to play again?\nYes or Enter any key to stop: ', askRange);
        return
    }

    // Recursive Case. If none of the above are true, keep going.
    console.log('You have a total of ' + numAttempts + ' more chances!')
    rl.question('Enter your guess: ', askGuess);
}

// -------------------- Random Number Generator ---------------------------
function randomInRange(max, min) {

    return Math.floor(Math.random() * (max - min)) + min;
}


// ------------------------- Main function ---------------------------
function askRange() {

    rl.question("Enter max number: ", (answer1) => {
        rl.question("Enter min number: ", (answer2) => {

            if (isNaN(answer1) || isNaN(answer2)) {
                console.log('Error! Input were not numbers. Please try again!')
                askRange();
            } else {
                minNum = answer2;
                maxNum = answer1;
                secretNum = randomInRange(Number(answer1), Number(answer2));
                console.log(`I'm thinking of a number between ${answer2} and ${answer1}...\n`)
                rl.question('Enter your guess: ', askGuess);
            }
        });
    });
}

// ----------------------- Start of Game for Random Number Generator ----------------------

function startGame(answer) {
    if (answer.toLowerCase() !== 'yes') {
        console.log('Please come again!')
        rl.close()
        return;
    }
    askRange();
}
