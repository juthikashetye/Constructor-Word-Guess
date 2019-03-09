// you'll design a game where a user has to fend off monsters 

// this will be a node file where you use inquirer

// make a Human constructor function

// 	a human has

// 		name 
// 			a string

// 		health
// 			a number

// make a Survivor constructor function
	
// 	lucky_number

// 		set it to a random number from 1 to 30
	
// 	add a function named escape

// 		ask the user to input a number from 1 to 30

// 			if it equals the lucky_number

// 				return true

// 			if it does not equal the lucky_number

// 				return false

// 	connect the survivor constructor to the Human constructor


// make a Monster constructor function
	
// 	a monster has

// 		attack
// 			a number

// 	a monster has an attack function

// 		it returns a random number from 1 to 5

// 		if the number is a 3 then return false

// 		if the number is not a 3, then return the monster's attack number

// 	connect the monster constructor to the Human constructor


// ask the user their name

// 	use it to make a survivor object using the Survivor constructor function


// while the survivor's health is greater than 0, run the escape function on the survivor object, 		
// 	if the escape function returns true 
// 		then console log that the user has won the game, 
// 	if the escape function returns false 
// 		then call the attack function on the monster object 

// 			and if the attack function returns a number 

// 				then subtract that number from the survivor object's health 
// 					and console log that that you've lost ___ health and now you have a total of this much health: ______.

// 			if the attack function returns false then

// 				console log you've dodged the monster's attack!


var inquirer = require("inquirer");

function Human(nam, hp) {
   this.name = nam;
   this.health = hp;
}

function Survivor(lucky, nam, hp) {

   var lucky = Math.floor(Math.random() * 30) + 1;

   this.luckyNum = lucky;

   Human.call(this, nam, hp);
}

Survivor.prototype.escape = function() {
   inquirer
      .prompt([{
         type: "input",
         message: "What is your Lucky Number?",
         name: "lucky_number"
      }])
      .then(function(inquirerResponse) {

         if ((inquirerResponse.input) && (!isNaN(inquirerResponse.input))) {
            if (parseInt(inquirerResponse.lucky_number) == this.luckyNum) {
               return true;
            } else {
               return false;
            }
         } else {
            console.log("Please enter a number");
         }
      });

}

Survivor.prototype = Object.create(Human.prototype);

function Monster(att, nam, hp) {
   this.attack = att;
   Human.call(this, nam, hp);
}

Monster.prototype = Object.create(Human.prototype);

Monster.prototype.ranAttack = function() {

   var attackNum = Math.floor(Math.random() * 5) + 1;
   if (attackNum == 3) {
      return true;
   } else {
      return false;
   }
}

var survivorName;

inquirer
   .prompt([{
         type: "input",
         message: "What is your name?",
         name: "username"
      },
      {
         type: "confirm",
         message: "Are you sure:",
         name: "confirm",
         default: true
      }
   ])
   .then(function(inquirerResponse) {

      if (inquirerResponse.confirm) {
         console.log("\nWelcome " + inquirerResponse.username);
         survivorName = inquirerResponse.username;
      } else {
         console.log("Type your name");
      }
   });

var monster = new Monster(5, "devil", 10);
var survivor = new Survivor(survivorName, 10);

monster.ranAttack();
surivor.escape();

console.log("Survivor lucky number: " + survivor.luckyNum);
console.log("Survivor name: " + survivor.name);
console.log("Survivor health: " + survivor.health);
console.log("Monster attack: " + monster.attack);
console.log("Monster name: " + monster.name);
console.log("Monster health: " + monster.health);





