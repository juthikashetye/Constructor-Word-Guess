var inquirer = require("inquirer");
//created this global variable to access user's name
var survivorName;

function Human(nam, hp) {
   this.name = nam;
   this.health = hp;
}

function Survivor(nam, hp) {
   var lucky = Math.floor(Math.random() * 30) + 1;
   this.luckyNum = lucky;
   Human.call(this, nam, hp);
}

function Monster(att, nam, hp) {
   this.attack = att;
   Human.call(this, nam, hp);
}

Survivor.prototype = Object.create(Human.prototype);

Survivor.prototype.escape = function() {
   var luckyNumber = this.luckyNum;
   return inquirer
      .prompt([{
         type: "input",
         message: "Hey " + survivorName +", enter a number between 1 and 30.",
         name: "lucky_number"
      }])
      .then(function(inquirerResponse) {

         if (parseInt(inquirerResponse.lucky_number) == luckyNumber) {
            console.log("\n" + "Correct guess.");
            return true;
         } else {
            console.log("\n" + "Wrong guess.");
            return false;
         }
      });
}

Monster.prototype = Object.create(Human.prototype);

Monster.prototype.ranAttack = function() {

   var attackNum = Math.floor(Math.random() * 5) + 1;
   //if the random no. is 3 then the attacked is dodged
   if (attackNum == 3) {
      return false;
   } else {
      return true;
   }
}

var monster = new Monster(5, "devil", 10); 

inquirer
   .prompt([{
      type: "input",
      message: "What is your name?",
      name: "username"
   }])
   .then(function(inquirerResponse) {
      survivorName = inquirerResponse.username;
      //create new survivor here to access username
      var survivor = new Survivor(survivorName, 20);

      console.log("\n" + survivor.luckyNum + " --> Logging this lucky number for testing purpose." + "\n");

      var hasWon = false;

      function playGame() {
         survivor.escape().then(function(result) {
            if (result) {
               hasWon = true;
               console.log("Congratulations! You win the game." + "\n");
            } else {
               var hit = monster.__proto__.ranAttack();
               //this also works
               // var hit = monster.ranAttack();
               if (hit) {
                  survivor.health -= monster.attack;
                  console.log("You lost " + monster.attack + " health. Your total health is now: " + survivor.health + "\n");
                  if (survivor.health <= 0) {
                     console.log("\n" + "----xx----GAME OVER!----xx----" + "\n");
                  }
               } else {
                  console.log("You've dodged the monster's attack!" + "\n");
               }
            }
         }).then(function(result) {
            if (survivor.health > 0 && hasWon == false) playGame();
         });

      };
      playGame();

   });