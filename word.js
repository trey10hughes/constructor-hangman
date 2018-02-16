var Letter = require("./letter.js");

function Word (chosenWord) {
	var newWord = this;
	this.word = chosenWord;

	this.chars = [];
	this.wordGuessed = false; 

	this.getChars = function () {
		//fill the chars array
		for(var i = 0; i < newWord.word.length; i++){
			var newChar = new Letter(newWord.word[i]);
			this.chars.push(newChar);
		}
	};

	this.checkGuess = function(guess) {
		var whatToReturn = 0;
		//checks each letter to see if any match what the user has guessed
		this.chars.forEach(function(ltr) {
			if (ltr.char === guess) {
				ltr.show = true;
				whatToReturn++;
			}
		});
		return whatToReturn;
	};

	//checks if the user has won
	this.winCheck = function () {
		//checks every character to see if ".show" is true for each letter in the array, 
		//if it is, it'll set the wordGuessed to true, meaning the user has won
		if (this.chars.every(function(ltr) {
			return ltr.show === true;
		})){
			this.wordGuessed = true;
			return true;
		}
	};

	this.showWord = function() {
		var wordDisplay = " ";
		//shows parts of the word depending on if the letters have been guessed or not
		newWord.chars.forEach(function(ltr) {
			var charDisplay = ltr.showLetter();
			wordDisplay += charDisplay;
		});

		return wordDisplay;
	};

}

module.exports = Word;