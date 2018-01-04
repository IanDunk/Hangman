var Letter = function(lttr) {
    this.letter = lttr;
    this.isShowing = false;

    this.renderLetter = function() {
        
        // Displays separation of words
        if(this.letter === " ") {
            this.isShowing = true;
            return " ";
        } 
        
        // What character is returned depending if it has been guessed
        if(this.isShowing === false) {
            return "_";
        } else {
            return this.letter;
        }
    }
};

module.exports = Letter;