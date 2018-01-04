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

    this.checkIfLetterFound = function(letterGuessed) {
        var letterFound = false;

        this.letters.forEach(function(lttr) {
            if(lttr.letter === letterGuessed) { // make toLowerCase()
                lttr.isShowing = true;
                letterFound = true;
            }
        }) // ;?

        return letterFound;
    };

    this.checkIfWordFound = function() {
        if(this.letters.every(function(lttr) {
            return lttr.appear === true;
        })) {
            this.wordFound = true;
            return true;
        }
    };

    this.renderWord = function() {
        var display = "";
        
        game.letters.forEach(function(lttr) {
            var currentCharacter = lttr.renderLetter();
            display += currentCharacter;
        })

        return display;
    };
}

module.exports = Word;