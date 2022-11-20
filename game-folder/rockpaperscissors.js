const readline = require("readline");
const { start } = require("repl");
// ----------------------- Global Variables ----------------------------

const options = ['rock', 'paper', 'scissors'];
let playerPoints = 0,
    computerPoints = 0;

// ---------------------------------------------------------------------

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// ------------------------- Game Function Below -----------------------------
function rps(playerMove, computerMove) {

    if (playerMove === computerMove) {
        console.log('It was a tie!')
        return 'It was a tie!';
    }

    if (playerMove === 'rock') {
        if (computerMove === 'paper') {
            console.log('You Lose')
            return 'You lose!';
        }
    } else if (computerMove === 'scissors') {
        console.log('You Win!')
        return 'You Win!'
    }

    if (playerMove === 'paper') {
        if (computerMove === 'scissors') {
            console.log('You Lose')
            return 'You lose!';
        } else if (computerMove === 'rock') {
            console.log('You Win!')
            return 'You Win!';
        }
    }

    if (playerMove === 'scissors') {
        if (computerMove === 'rock') {
            console.log('You Lose')
            return 'You lose!'
        } else if (computerMove === 'paper') {
            console.log('You Win!')
            return 'You Win!'
        }
    }
}


// ----------------------- Count Scores ----------------------
function countScores() {

}
// ----------------------- Generator Random Move -------------------------
function randomMoveGenerator() {
    let max = options.length
    let min = 0
    let index = Math.floor(Math.random() * (max - min) + min)
    return options[index]
}

// ------------------------ Main Function --------------------------------
function mainFunc() {

    rl.question('\nChoose your move!\nRock, Paper, or Scissors: ', (action) => {
        let playerMove = action.toLowerCase()

        if (options.includes(playerMove)) {
            let computerMove = randomMoveGenerator();
            let result = rps(playerMove, computerMove)

            if (result === 'You Win!') {
                rl.close();

            } else if (result === 'You Lose!') {
                return mainFunc();
            } else {
                return mainFunc();
            }
        } else {
            console.log('Incorrect input! Try again!')
            return mainFunc();
        }
    });

}

mainFunc();
