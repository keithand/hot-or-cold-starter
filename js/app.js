var randomNumber;
var numberGuess; // how many guesses the user has tried
var answers = []; // list of answers the user has already guessed

$(document).ready(function(){
	
  newGame();

  	 /---DISPLAY INFORMATION MODAL BOX---/
   	$(".what").click(function(){
      	$(".overlay").fadeIn(1000);
    	});

    	/---HIDE INFORMATION MODAL BOX---/
    	$("a.close").click(function(){
    		$(".overlay").fadeOut(1000);
    	});

      $("a.next").click(function(){
        $(".won").fadeOut(1000);
        newGame();
      });

      /------ACTIVATE THE NEW GAME-------/
      $('.new').on('click', newGame);

      /------ACTIVATE GUESS BUTTON-------/
      $('#guessButton').on('click', guessing);

      /------FUNCTION FOR STARTING A NEW GAME------/
  	function newGame () {
  		randomNumber = Math.floor((Math.random()* 100) + 1);
      numberGuess = 0;
      answers.length = 0;
  	 
     $('#feedback').text('Make a guess');
     $('#count').text(numberGuess);
     $('#userGuess').removeAttr('disabled');
     $('#guessButton').removeAttr('disabled');
     $('.game h2').css('background-color', '#cc324b');
     $('ul#guessList > li').remove();
    
     };

     /-------FUNCTION FOR GUESSING THE randomNumber-----/
     function guessing (){
      event.preventDefault();
      var value = +$('#userGuess').val();
      var response;

      /----DIRECTIONS FOR WHAT SHOULD HAPPEN IF ENTRY IS OTHER THAN EXPECTED-----/
      if(isNaN(value) || value === 0){
         $('#feedback').text('Make a guess');
         $('#userGuess').val('');
 
      } else if (answers.indexOf(value) > -1){
        $('#feedback').text('You already guessed this number.');
        $("#userGuess").val('');
      } else {
        response = evaluateGuess(value);
        numberGuess++;

        $('#feedback').text(response);
        $("#count").text(numberGuess);
        $('#userGuess').val('');
        $('#guessList').append('<li>' + value + '</li>' );

        answers.push(value);
      }

     };


     /-----FUNCTION THAT EVALUATES THE GUESS-----/
     function evaluateGuess(guess){
        var difference = Math.abs(randomNumber - guess);
        if (difference > 60) {
          $('h2#feedback').css("background-color" , "#A7DBD8");
          return 'freezing'
        } else if (difference > 30){
          $('h2#feedback').css("background-color", "#30C4C9");
          return 'cool';
        } else if (difference > 10){
           $('h2#feedback').css("background-color", "#CC333F");
          return 'warm'
        } else if (difference > 5){
           $('h2#feedback').css("background-color", "#EB6841");
          return 'hot!'
        } else if (difference > 0){
          $('h2#feedback').css("background-color", "#FF4E50");       
          return 'very hot!'
        } else if (difference === 0){
          $('h2#feedback').css("background-color", "#C7F464");
          $('.won').fadeIn(1000)
          return ' You got it!';
        };

     }
    


});
