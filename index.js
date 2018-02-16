var inquirer = require("inquirer");
var isLetter = require("is-letter");

var Word = require("./word.js");
var Wordbank = require("./wordbank.js");

var game = {
	words: Wordbank,
	guessesLeft: 6,
	//characters guessed by the user go here
	lettersGuessed: [],
	display: 0,
	wordToGuess: null,

	//function to start the game
	start: function() {
		var currentGame = this
		//clears lettersGuessed
		if (this.lettersGuessed.length > 0) {
			this.lettersGuessed = [];
		}

		inquirer.prompt([{
			name: "play",
			type: "confirm",
			message: "Want to play hangman?"
		}]).then(function(answer) {
			if(answer.play){
				currentGame.newGame();
			} else {
				console.log("You decided not to play. Have a nice day!");
			}
		})
	},//end of start function
}//end of game

game.start();

