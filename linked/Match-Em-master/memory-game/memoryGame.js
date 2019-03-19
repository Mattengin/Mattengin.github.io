$(document).ready(function() {
	var playGame = {
		cards: $('li.card').map(function() {return $(this).html()}),
		moveCount: 0,
		init: function() {
			// This sets the number of moves to 0.
			$('.moves').html(playGame.moveCount);
			playGame.shuffle(playGame.cards);

			$('#repeat-button').on('click', function() {
				playGame.repeatGame();
			});

			playGame.setupCardClicks();

			$('#restart-button').on('click', function() {
				$('.win-stars').empty();
				playGame.repeatGame();
			});
		},

		 setupCardClicks: function() {
			$('li.card').on('click', function() {
				console.log("handle click");
				if(!$(this).hasClass('open')) {
					setTimeout(()=>{
						$(this).addClass('open show');
						playGame.movesCount();
						playGame.starsCount();
						playGame.checkMatch();
					}, 100);
				}
			});
		},

		startTimer: function() {
			playGame.startTime = new Date().getTime();
			playGame.timer = setInterval(function() {
				var seconds = Math.round((new Date().getTime() - playGame.startTime) / 1000);
				$('#timer').html(seconds + "s")
			}, 1000);
		},

		stopTimer: function() {
			if(playGame.timer) {
				clearInterval(playGame.timer);
			}
		},

		/*
		* Display the cards on the page
		*   - shuffle the list of cards using the provided "shuffle" method below
		*   - loop through each card and create its HTML
		*   - add each card's HTML to the page
		*/

	 /*
     shuffles cards
     */
		shuffle: function(array) {
			var currentIndex = array.length, temporaryValue, randomIndex;

			while (currentIndex !== 0) {
				randomIndex = Math.floor(Math.random() * currentIndex);
				currentIndex -= 1;
				temporaryValue = array[currentIndex];
				array[currentIndex] = array[randomIndex];
				array[randomIndex] = temporaryValue;
			}
			playGame.matchCards();
		},

		    /*
		     * set up the event listener for a card. If a card is clicked:
		     *  - display the card's symbol (put this functionality in another function that you call from this one)
		     *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
		     *  - if the list already has another card, check to see if the two cards match
		     *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
		     *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
		     *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
		     *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
		     */

		// Displays the card's symbol
		matchCards: function() {
			$('li.card').each(function(index) {
				$(this).html(playGame.cards[index]);
			})
		},


		// Locks cards shownards in open position.
		checkMatch: function() {
			if ($('li.open').length === 2) {
				if (($('li.open').first().html()) === ($('li.open').last().html())) {
					$('li.open').addClass('match').removeClass('open show');
					playGame.win();
				} else {
					setTimeout(function() {
						$('li.open').removeClass('open show');
					}, 300);
				}
			}
		},

		// checks if you really won the game.
		win: function() {
			if ($('li.match').length === 16) {
				playGame.openWindow();
				playGame.stopTimer();
			}
		},

		// Opens victory Window/ had to get help from fourms for this
		openWindow: function() {
			e = document.getElementById('window');
			playGame.stopTimer();
			var starsAchieved = $('ul.stars').html();
			var timeHTML = document.getElementsByClassName('time')[0];
			var seconds = Math.round((new Date().getTime() - playGame.startTime) / 1000);

			$('#playerWins').html('Triumph with '+playGame.moveCount+' moves in '+ seconds +' on the clock!');
			$('<div class="win-stars">You got <ul class=\'stars\'>'+starsAchieved+'</ul> stars!</div>').insertBefore('#restart-button');
			e.style.visibility = 'visible'
		},

		// Counts the stars.
		starsCount: function() {
			if (playGame.moveCount === 30) {
				$('#first-star').removeClass('fa-star').addClass('fa-star-o');
			} else if (playGame.moveCount === 35) {
				$('#second-star').removeClass('fa-star').addClass('fa-star-o');
			}
		},

		// Increases the Move Counter.
		movesCount: function() {
			if(playGame.moveCount == 0) {
				playGame.startTimer();
			}
			playGame.moveCount += 1
			$('.moves').html(Math.floor((playGame.moveCount) / 2));
			console.log('Made a Move');
		},

		// starts new game when you win.
		repeatGame: function() {
			e = document.getElementById('window');
			$('li.card').attr('class', 'card');
			$('#first-star, #second-star, #third-star').attr('class', 'fa fa-star');

			if (e.style.visibility == 'visible') {
				e.style.visibility = 'hidden';
			}
			playGame.stopTimer();
			playGame.shuffle(playGame.cards);
			$('#timer').html("0s");
			$('.moves').html(playGame.moveCount = 0);
		}
	};
	playGame.init();
});
