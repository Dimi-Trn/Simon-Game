// Array to store the sequence of colors the game generates
var gamePattern = [];

// Array to store the sequence of colors the user clicks
var userClickedPattern = [];

// List of possible button colors in the game
var buttonColours = ["red", "blue", "yellow", "green"];

var level = 0;
var started = false;


$(document).ready(function () {
    // Click handler for user input
    $(".btn").click(function () {
        var userChosenColour = $(this).attr("id");  // Identify which button was clicked
        userClickedPattern.push(userChosenColour); // Add it to the user's sequence

        console.log("User clicked:", userClickedPattern); // Debug: show user's sequence

        makeSound(userChosenColour);  // Play the button's sound
        animatePress(userChosenColour); // Animate the button press
        checkAnswer(userClickedPattern.length-1); // userClickedPattern.length-1 is the current level

    });



    $(document).keydown(function () { //displays"The game has started" after pressing any key
      if(started === false) {
        $('#level-title').text("The game has started");
        nextSequence();
        started = true;
      }      
  });
});








function checkAnswer(currentLevel) {

    // if statement checks if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      // Correct sequence events
      if (userClickedPattern.length === gamePattern.length){
        $("#level-title").text("level " + level);
        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }
    
    // Wrong sequence events

    } else {
      $("body").addClass("game-over");
      console.log("wrong");

      var soundPlay = new Audio("sounds/wrong.mp3");
      soundPlay.play(); 

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 150);
      
      $("#level-title").text("level 1");


    }

}



// Function to generate the new colour in the game sequence
function nextSequence() {
    userClickedPattern = [];
    level++;            
    var randomNumber = Math.floor(Math.random() * buttonColours.length); // Pick a random index
    var randomChosenColour = buttonColours[randomNumber];    // Map to a color
               

    gamePattern.push(randomChosenColour); // Add to the game's sequence

    // Make the chosen button flash
    $("#" + randomChosenColour)
        .fadeOut(150)
        .fadeIn(150)
        .fadeOut(150)
        .fadeIn(150);

    makeSound(randomChosenColour); // Play the corresponding sound
    
    console.log("Game pattern:", gamePattern); // Debug: show game sequence

   console.log("User pattern:", userClickedPattern); // Debug: show game sequence

}

// Play sound for a given color
function makeSound(randomChosenColour) {
    var soundPlay = new Audio("sounds/" + randomChosenColour + ".mp3"); // Load sound file
    soundPlay.play();                                        // Play it
}



// Animate a button press briefly
function animatePress(userChosenColour) {
    $("#" + userChosenColour).addClass("pressed"); // Highlight button
    setTimeout(function () {
        $("#" + userChosenColour).removeClass("pressed"); // Remove highlight after short delay
    }, 100);
}






//function checkAnswer(currentLevel) {
  //if (userClickedPattern === gamePattern) {  
  //} alert("correct");
  //else("false");
//}

