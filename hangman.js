
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

    newGame: function () {
        var game = this;
        //console.log("game started");
        if (game.guessesLeft === 10) {  // DOESNT NEED CHECK HERE
            console.log("I bet you can't guess this delicious piece of nature!");
            console.log("####################");

            var randNum = Math.floor(Math.random() * (game.wordBank.length - 1));
            game.currentWord = new Word(game.wordBank[randNum]);

            // GETTING LETTERS CONSTRUCTORS FOR WORD CONSTRUCTOR
            console.log(currentWord);
            game.currentWord.getLetters();

            // Logging first display
            console.log(game.currentWord.renderWord());

            // Begins the cycle of prompts until guessesLeft = 0
            game.keepPromptingUser();
        } else {
            game.guessesLeft = 10; // NEEDS TO BE MOVED
            game.newGame();
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
            var letterGuessed = (lttr.letterGuess).toLowerCase(); // Change to uppercase later
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
                    console.log("Wrong answer");
                    game.guessesLeft--;
                    console.log("Guesses left: " + guessesLeft);

                    console.log("####################");
                    console.log(game.currentWord.renderWord());
                    console.log("####################");

                    console.log("Letters guessed so far: " + game.lettersGuessed);
                } else {
                    console.log("Nice guess!");
                    if (game.currentWord.checkIfWordFound()) {
                        console.log(game.currentWord.renderWord()); // or just this.currentWord?
                        console.log("Congrats, you win!");
                        // this.startGame(); ?
                    } else {
                        console.log("Guesses left: " + guessesLeft);

                        console.log("####################");
                        console.log(game.currentWord.renderWord());
                        console.log("####################");

                        console.log("Letters guessed so far: " + game.lettersGuessed);
                    }
                }

                if(game.guessesLeft > 0 && game.currentWord.checkIfWordFound === false) { // checkIfWordFound()?
                    game.keepPromptingUser;
                } else {
                    console.log("Game over, you lose");
                    console.log("The word was: " + game.currentWord);
                }
            } else {
                console.log("You already guessed that letter.");
                game.keepPromptingUser();
            }
        });
    }
}

// Initializing game
hangman.startGame();