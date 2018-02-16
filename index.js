var inquirer = require("inquirer");
var isLetter = require("is-letter");

var Word = require("./word.js");
var Wordbank = require("./wordbank.js");

var game = {
	words: Wordbank,
	guessesLeft: 6,
	//characters guessed by the user go here
	lettersGuessed: [],
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
			this.wordToGuess = new Word(this.words[randNum]);
			this.wordToGuess.getChars();

			console.log(this.wordToGuess.showWord());
			this.guess();
		} else {
			console.log("setting guesses left to 6...")
			this.guessesLeft = 6;
			this.new();
		}
	},//end of new function

	guess: function() {
		var currentGame = this;
		console.log("you have " + currentGame.guessesLeft + " guesses remaining.");
		//prompts the user to input a letter
		inquirer.prompt([{
			name: "guessedLetter",
			type: "input",
			message: "guess a letter",
			validate: function(input) {
				if(isLetter(input)){
					return true;
				} else {
					return false;
				}
			}
		}]).then(function(ltr) {
			
			var letter = (ltr.guessedLetter).toUpperCase();
			console.log("you guessed: " + letter);

			var guessedBefore = false;
			for (var i = 0; i < currentGame.lettersGuessed.length; i++){
				if (letter === currentGame.lettersGuessed[i]){
					guessedBefore = true;
				}
			}

			if(guessedBefore === false){
				currentGame.lettersGuessed.push(letter);

				var result = currentGame.wordToGuess.checkGuess(letter);
				console.log("result: " + result);

				if(result === 0){
					console.log("wrong");
					currentGame.guessesLeft--;
					console.log("you have " + currentGame.guessesLeft + " remaining.");

					console.log(currentGame.wordToGuess.showWord());
					console.log("=================================")
					console.log("letters guessed so far: " + currentGame.lettersGuessed);

				}
			} 
			if(result > 0) {
				console.log("correct!");
				//first check that the user won
				if (currentGame.wordToGuess.winCheck() === true){
					console.log(currentGame.wordToGuess.showWord());
					console.log("You win!");
					currentGame.start();
				} else {
					console.log("you have " + currentGame.guessesLeft + " remaining.");

					console.log(currentGame.wordToGuess.showWord());
					console.log("=================================");
					console.log("letters guessed so far: " + currentGame.lettersGuessed);
				}

			}

			if(currentGame.guessesLeft > 0 && currentGame.wordToGuess.wordGuessed === false) {
				currentGame.guess();
			} else if(currentGame.guessesLeft === 0) {
				console.log("you lose... the word you were looking for was " + currentGame.wordToGuess.word);
				currentGame.start();
			}

		});
	}


}//end of game

game.start();

