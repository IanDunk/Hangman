var Letter = require("./letter.js");

function Word(wrd) {  // format?
    var game = this;

    this.word = wrd;
    this.letters = [];
    this.wordFound = false;

    // Populate letters array with letter objects
    this.getLetters = function() {
        for(var i = 0; i < game.word.length; i++) {
            var newLetter = new Letter(game.word[i]);
            this.letters.push(newLetter);
        }
    };

    // Checks if letterGuessed is in the letters array, returns boolean
    this.checkIfLetterFound = function(letterGuessed) {
        var letterFound = false;

        this.letters.forEach(function(lttr) {
            if(lttr.letter === letterGuessed) {
                lttr.isShowing = true;
                letterFound = true;
            }
        }) // ;?

        return letterFound;
    };

    // Checks if all letters have been revealed, returns boolean
    this.checkIfWordFound = function() {
        var allFound = true;
        for(var i = 0; i < this.letters.length; i++) {
            if(this.letters[i].isShowing === false) {
                allFound = false;
            }  // USE CHECKIFLETTER FOUND HERE INSTEAD TO SAVE SPACE
        }
        return allFound;
    };

    // Adds all characters together to form a single string
    this.renderWord = function() {
        var display = "";
        
        game.letters.forEach(function(lttr) {
            var currentCharacter = lttr.renderLetter();  // FIX END GAME "THE WORD WAS"
            display += currentCharacter;
        }) // ;? game?

        return display;
    };
}

module.exports = Word;