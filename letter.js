var Letter = function(lttr) {
    this.letter = lttr;
    this.isShowing = false;

    this.renderLetter = function() {
        
        if(this.letter === " ") {
            this.isShowing = true;
            return " ";
        } 
        
        if(this.isShowing === false) {
            return "_";
        } else {
            return this.letter;
        }
    }
};

module.exports = Letter;