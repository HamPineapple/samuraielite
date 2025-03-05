$(document).ready(function() {
	// Set the default chat text
	$("#chat-text").text("Will you be in Aberdeen on the 21st?");


// Define the two Pokemon objects
var charmander = {
	name: "Charmander", // will be replaced by user's name
	health: 100,
	lvl: 12
  };
  
  var pikachu = {
	name: "Pikachu",
	health: 100,
	lvl: 12,
	moves: [{
	  name: "Thunder Shock",
	  type: "Attack",
	  power: 30,
	  accuracy: 0.80
	},
	{
	  name: "Thunder Wave",
	  type: "Attack",
	  power: 10,
	  accuracy: 0.90
	}]
  };
  
  // Set the userPokemon as charmander (the player's Pokemon)
  var userPokemon = charmander;
  // CPU's Pokemon remains pikachu
  var cpuPokemon = pikachu;
  
  // Prompt the user for their name and update userPokemon accordingly
  var userName = prompt("Enter your name:");
  if (userName && userName.trim() !== "") {
	userPokemon.name = userName.trim();
  }
  $("#user-name").text(userPokemon.name);
  $("#user-lvl").text("lvl " + userPokemon.lvl);
  $("#cpu-name").text(cpuPokemon.name);
  $("#cpu-lvl").text("lvl " + cpuPokemon.lvl);
  
  // Remove the "hide" class so that the image-based buttons are visible.
  // (Ensure that the "move.png" file is in your img folder)
  $("#user-buttons").removeClass("hide");
  
// Replace YOUR_WEB_APP_URL with the URL you got from deploying the web app.
var attendanceURL = "https://script.google.com/macros/s/AKfycbxYAP0g5goYcFOH-6KvLubUH8yE5S8xlt6R6oM4efe8LXEdW_G9oY9SWenQH1zzanQ/exec";

// Function to record attendance by sending the name to your Google Apps Script
function storeAttendance(name) {
  $.post(attendanceURL, { name: name })
    .done(function(response) {
      console.log("Attendance recorded:", response);
    })
    .fail(function(error) {
      console.error("Error recording attendance:", error);
    });
}

// Function for handling the Yes button press
function handleYes() {
	storeAttendance(userPokemon.name);
	
	// Show the attack image on Pikachu
	$("#attack-img")
	  .removeClass("hide")
	  .addClass("cpu-attack-img")
	  .fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100);
	
	$("#chat-text").text("YOU'VE THROWN A BRICK!");
	
	setTimeout(function() {
	  $("#chat-text").text("CRITICAL HIT!!!! PIKACHU DIED");
	  
	  // Set Pikachu's health to 0 and update its health bar
	  cpuPokemon.health = 0;
	  $("#cpu-health-bar").css("width", cpuPokemon.health + "%");
	  
	  // Hide the attack image after the animation
	  $("#attack-img").addClass("hide").removeClass("cpu-attack-img");
	  
	  setTimeout(function() {
		$("#chat-text").text("CONGRATULATIONS!!! YOU'VE EVOLVED INTO MEGA TAISH!! See you then!");
		// Hide the buttons so they can't be clicked again
		$("#user-buttons").addClass("hide");
	  }, 1500);
	}, 1500);
  }
	
  // Function for handling the No button press
  function handleNo() {
	// Show the attack image on Charmander (the user's Pokemon)
	$("#attack-img")
	  .removeClass("hide")
	  .addClass("cpu-attack-img")
	  .fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100);
	
	// First, display Pikachu's move
	$("#chat-text").text("Pikachu casted Thunderbolt");
	
	// After 1.5 seconds, update with lost HP message and subtract 50 HP
	setTimeout(function() {
	  $("#chat-text").text("You've lost 50HP!!!");
	  userPokemon.health -= 50;
	  if (userPokemon.health < 0) userPokemon.health = 0;
	  $("#user-health-bar").css("width", userPokemon.health + "%");
	  
	  // Hide the attack image after the animation
	  $("#attack-img").addClass("hide").removeClass("cpu-attack-img");
	  
	  // After another 1.5 seconds, display the next message based on remaining HP
	  setTimeout(function() {
		if (userPokemon.health === 50) {
		  $("#chat-text").text("Damn!! So you won't be in Aberdeen on the 21st?!");
		} else if (userPokemon.health === 0) {
		  $("#chat-text").text("GAME OVER!!! DAMN THATS TOO BAD!");
		  $("#user-buttons").addClass("hide");
		}
	  }, 1500);
	}, 1500);
  }
  
  // Bind the Yes and No button clicks
  $("#move1-button").unbind().click(function() {
	handleYes();
  });
  $("#move2-button").unbind().click(function() {
	handleNo();
  });
});