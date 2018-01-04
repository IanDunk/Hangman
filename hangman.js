var inquirer = require("inquirer");
var Word = require("./word.js");
var Game = require("./words.js");
var Word = require("./letter.js");

var hangman = {
    wordBank: Game.newWord.wordList,
    guessesLeft: 10,
    lettersGuessed: [],
    // display: Game.newWord.hangman;
    currentWord: null,

    startGame: function() {

        // Clearing guesses from previous word
        if(this.guessLetters.length > 0) {
            this.guessLetters = [];
        }

        // Asking user if they would like to play
        // Begins game if accepted
        inquirer.prompt([{
            name: "play",
            type: "confirm",
            message: "Ready to play?"
        }]).then(function(answer) {
            if(answer.play) {
                this.newGame();
            } else {
                console.log("Okay, see you next time!");
            }
        })
    },

    newGame: function() {
        if(this.guessesLeft === 10) {
            console.log("I bet you can't guess this delicious piece of nature!");
            console.log("####################");

            var randNum = Math.floor(Math.random() * (this.wordBank.length - 1));
            this.currentWord = new Word(this.wordBank[randNum]);

            // GETTING CURRENT WORD LETTERS
            this.currentWord.getLetters();
        }
    }

}

// Initializing game
hangman.startGame();













// function Player() {
//     this.score = 0;
//     this.guessesLeft = 6;

//     this.wrongChoice = function() {
//         this.guessesLeft--;
//     }
//     this.win = function() {
//         score++;
//         guessesLeft = 6;
//     }
// }

// var player = null;

// var playGame = function() {

// }





// game.js
// letter.js
// word.js
// words.js

// index.js
// game.play();


// module.exports = [
//     "apple",
//     "banana",
//     "cherry"
// ];