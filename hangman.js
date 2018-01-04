
var inquirer = require("inquirer");
var isLetter = require('is-letter');

var Word = require("./word.js");
var Words = require("./words.js");
//var Word = require("./letter.js");

var hangman = {
    wordBank: Words.newWord.wordList,
    guessesLeft: 10,
    lettersGuessed: [],
    // display: Game.newWord.hangman;
    currentWord: null,

    startGame: function () {
        // WHY DO I NEED THIS?
        var game = this;

        // Clearing guesses from previous word
        if (this.lettersGuessed.length > 0) {
            this.lettersGuessed = [];
        }

        // Asking user if they would like to play
        // Begins game if accepted
        inquirer.prompt([{
            name: "play",
            type: "confirm",
            message: "Ready to play?"
        }]).then(function (answer) {
            if (answer.play) {
                game.newGame();
            } else {
                console.log("Okay, see you next time!");
            }
        })
    },

    newGame: function () { // BROKEN
        //console.log("game started");
        //var game = this;
        if (this.guessesLeft === 10) {  // DOESNT NEED CHECK HERE
            console.log("I bet you can't guess this delicious piece of nature!");
            console.log("####################");

            var randNum = Math.floor(Math.random() * (this.wordBank.length - 1));
            this.currentWord = new Word(this.wordBank[randNum]);





            // FOR TEST PURPOSES ONLY
            var test = new Word(this.wordBank[randNum]); // making letters, not words?
            console.log(test);

            console.log(test.checkIfWordFound()); // BROKEN




            // GETTING LETTERS CONSTRUCTORS FOR WORD CONSTRUCTOR
            this.currentWord.getLetters();

            // Logging first display
            console.log(this.currentWord.renderWord());

            // Begins the cycle of prompts until guessesLeft = 0
            this.keepPromptingUser();
        } else {
            this.guessesLeft = 10; // NEEDS TO BE MOVED
            this.newGame();
        }
    },

    keepPromptingUser: function () {
        var game = this;

        inquirer.prompt([{
            name: "letterGuess",
            type: "input",
            message: "choose a letter:",
            validate: function (value) {
                if (isLetter(value)) {
                    return true;
                } else {
                    return false;
                }
            }
        }]).then(function (lttr) {
            var letterGuessed = (lttr.letterGuess).toUpperCase(); // Change to uppercase later
            var guessedAlready = false;

            // Checks if letter has been guessed already
            for (var i = 0; i < game.lettersGuessed.length; i++) {
                if (letterGuessed === game.lettersGuessed[i]) {
                    guessedAlready = true;
                }
            }

            if (guessedAlready === false) {
                game.lettersGuessed.push(letterGuessed);

                var isFound = game.currentWord.checkIfLetterFound(letterGuessed);

                if (isFound === false) {
                    console.log("\nWrong answer");
                    game.guessesLeft--;
                    console.log("Guesses left: " + game.guessesLeft);

                    console.log("####################");
                    console.log(game.currentWord.renderWord());
                    console.log("####################");

                    console.log("Letters guessed so far: " + game.lettersGuessed + "\n");
                } else {
                    console.log("\nNice guess!");
                    if (game.currentWord.checkIfWordFound()) {
                        console.log(game.currentWord.renderWord()); // or just this.currentWord?
                        console.log("\nCongrats, you win!\n");
                        // game.startGame(); ?
                    } else {
                        console.log("Guesses left: " + game.guessesLeft);

                        console.log("####################");
                        console.log(game.currentWord.renderWord());
                        console.log("####################");

                        console.log("Letters guessed so far: " + game.lettersGuessed + "\n");
                    }
                }

                if(game.guessesLeft > 0 && game.currentWord.checkIfWordFound() === false) { // ITS RETURNING TRUE?
                    game.keepPromptingUser();
                } else {
                    console.log("\nGame over, you lose\n");
                    console.log("The word was: " + game.currentWord);
                }
            } else {
                console.log("\nYou already guessed that letter.\n");
                game.keepPromptingUser();
            }
        });
    }
}

// Initializing game
hangman.startGame();


// How come changing this variables doesn't always seem to work?