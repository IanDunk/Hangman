var inquirer = require("inquirer");
var isLetter = require('is-letter');

var Word = require("./word.js");
var Words = require("./words.js");

var hangman = {
    wordBank: Words.newWord.wordList,
    guessesLeft: 10,
    lettersGuessed: [],
    currentWord: null,
    score: 0,

    // Inquirer part
    startGame: function () {
        // WHY DO I NEED THIS?
        var game = this;

        // Clearing guesses from previous word
        if (this.lettersGuessed.length > 0) {
            this.lettersGuessed = [];
        }

        // Prompts user if they would like to play and begins the game if accepted
        inquirer.prompt([{
            name: "play",
            type: "confirm",
            message: "Ready to play?"
        }]).then(function (answer) {
            // Yes
            if (answer.play) {
                game.newGame();
            // No, also resets score
            } else {
                console.log("\nOkay, see you next time!\n");
                game.score = 0;
            }
        })
    },

    // If Inquirer was confirmed
    newGame: function () {
        if (this.guessesLeft === 10) {
            console.log("I bet you can't guess this delicious piece of nature!");
            console.log("####################");

            // Selecting random word from words in words.js and setting it to the game's current word
            var randNum = Math.floor(Math.random() * (this.wordBank.length - 1));
            this.currentWord = new Word(this.wordBank[randNum]);

 
            /*
            // FOR TEST PURPOSES ONLY, DISPLAYS THE WORD
            var test = new Word(this.wordBank[randNum]);
            console.log(test);
            console.log(test.checkIfWordFound());
            */


            // Creating letter objects and pushing them into this.currentWord.letters array via constructor function
            this.currentWord.getLetters();

            // Logging first display of the word
            console.log(this.currentWord.renderWord());

            // Begins the cycle of prompts until guessesLeft = 0
            this.keepPromptingUser();
        } else {
            // Resetting the guesses
            this.guessesLeft = 10;
            this.newGame();
        }
    },

    // Logic for each turn if game has not yet ended
    keepPromptingUser: function () {
        var game = this;

        inquirer.prompt([{
            name: "letterGuess",
            type: "input",
            message: "choose a letter:",
            // Making sure the value is a single letter, program will not progress until validate is truthy
            // simply only accepts one letter inputs
            validate: function (value) {
                if (isLetter(value)) {
                    return true;
                } else {
                    return false;
                }
            }
        }]).then(function (lttr) {
            // toUpperCase so user input's casing doesn't matter
            var letterGuessed = (lttr.letterGuess).toUpperCase();
            var guessedAlready = false;

            // Checks if letter has been guessed already
            for (var i = 0; i < game.lettersGuessed.length; i++) {
                if (letterGuessed === game.lettersGuessed[i]) {
                    guessedAlready = true;
                }
            }

            // Pushes the newly guessed letter to the array of guessed letters
            // more logic deeper...
            if (guessedAlready === false) {
                game.lettersGuessed.push(letterGuessed);

                var isFound = game.currentWord.checkIfLetterFound(letterGuessed);

                // If answer is wrong, minus a guessLeft and print the guesses left and already guessed
                if (isFound === false) {
                    console.log("\nWrong answer");
                    game.guessesLeft--;
                    console.log("Guesses left: " + game.guessesLeft);
                    console.log("####################");
                    console.log(game.currentWord.renderWord());
                    console.log("####################");
                    console.log("Letters guessed so far: " + game.lettersGuessed + "\n");
                // If the answer is correct
                } else {
                    console.log("\nNice guess!");
                    // Not printing guesses left and letters already guessed if game has been won
                    if (game.currentWord.checkIfWordFound()) {
                        console.log("####################");
                        console.log(game.currentWord.renderWord());
                        console.log("####################");
                    } else {
                        console.log("Guesses left: " + game.guessesLeft);
                        console.log("####################");
                        console.log(game.currentWord.renderWord());
                        console.log("####################");
                        console.log("Letters guessed so far: " + game.lettersGuessed + "\n");
                    }
                }

                // Checks if game is over
                if(game.guessesLeft > 0 && game.currentWord.checkIfWordFound() === false) {
                    game.keepPromptingUser();
                // If user won
                } else if(game.currentWord.checkIfWordFound()) {
                    game.score++;
                    console.log("YOU WIN!");
                    console.log("Score: " + game.score + "\n");
                    game.startGame();
                // If user failed
                } else {
                    console.log("\nGame over, you lose");
                    console.log("The word was: " + game.currentWord.renderWord() + "\n");
                    game.startGame();
                }
            // If user already guessed the letter
            } else {
                console.log("\nYou already guessed that letter.\n");
                game.keepPromptingUser();
            }
        });
    }
}

// Initializing game
hangman.startGame();


// How come changing this variables doesn't always seem to work? I needed to use game.something instead of this.something in a few circumstances.

// Project dependencies for github?
// .gitignore?