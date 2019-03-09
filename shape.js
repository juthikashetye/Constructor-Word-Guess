// 1. 

// a Shape constructor has a 

//name

//    sides property

//       number of sides
// 2.

// a Rectangle is a shape

//    height

//    width

// on the Rectangle's prototype 

//    an area function

//    a perimeter function

// make sure to connect the Rectangle and the Shape

// 3. 

// a Square is a Rectangle

//    but if the height and width are different then set the width to be the height

function Shape(n, s){
   this.name = n;
   this.sides = s;
}

function Rectangle(h, w, n, s){
   this.height = h;
   this.width = w;
   Shape.call(this, n, s)
}

Rectangle.prototype = Object.create(Shape.prototype);

Rectangle.prototype.area = function(){
   return this.height * this.width;
}

Rectangle.prototype.perimeter = function(){
   return 2 * this.height + 2 * this.width;
}


function Square(h, w, n, s){
   if (h != w){
      w = h;
   }

   Rectangle.call(this, h, w, n, s);
}

Square.prototype = Object.create(Rectangle.prototype);


var s = new Square(10, 10, 'square', 4);

console.log("\n" + "Name of shape: " + s.name);
console.log("Area of square: " + s.area() + " sq m");
console.log("Perimeter of square: " + s.perimeter() + " m");
console.log("Number of sides in square: " + s.sides);



var r = new Rectangle(6, 9, 'rectangle', 4);

console.log("\n" + "Name of shape: " + r.name);
console.log("Area of rectangle: " + r.area() + " sq m");
console.log("Perimeter of rectangle: " + r.perimeter() + " m");
console.log("Number of sides in rectangle: " + r.sides + "\n");


