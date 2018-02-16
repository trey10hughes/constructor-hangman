var Letter = function(letter) {
	//stores the letter
	this.char = letter;
	//determines whether or not the letter will be displayed (false by default in order to start with a blank)
	this.show = false;

	this.showLetter = function() {
		if (this.char === " ") {
			//this will make it so that a space in a word will not have to be guessed, and will be counted as true from the start.
			this.show = true;
			return " ";
		}

		if (this.show === false){
			//this will display an underscore for all letters that are marked false (aka letters that haven't been guessed yet)
			return "_";
		} else {
			return this.char;
		}
	};
};

module.exports = Letter;