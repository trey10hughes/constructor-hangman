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
				console.log("Okay let's play!")
				currentGame.new();
			} else {
				console.log("You decided not to play. Have a nice day!");
			}
		})
	},//end of start function

	new: function() {
		console.log("starting new game...")
		if (this.guessesLeft === 6) {
			console.log("============================");
			console.log("============================");

			//creates a random number that will be used to select a word from the word bank array
			var randNum = Math.floor(Math.random()*this.words.length);
			console.log("random number is: " + randNum);
		} else {
			console.log("setting guesses left to 6...")
			this.guessesLeft = 6;
			this.new();
		}
	}
}//end of game

game.start();

