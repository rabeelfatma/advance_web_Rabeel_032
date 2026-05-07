"use strict";
// src/activity6.ts 
// 1. Type Assertion (`as` keyword or `<Type>` syntax) 
let someValue = "this is a string";
//let strLength: number = (someValue as string).length; 
let strLength = someValue.length;
console.log(`String length (using 'as'): ${strLength}`);
let anotherValue = 123.456;
let fixedNumber = anotherValue.toFixed(4);
console.log(`Fixed number (using '<type>'): ${fixedNumber}`);
console.log('--------------------');
function addOrConcatenate(a, b) {
    if (typeof a === 'number' && typeof b === 'number') {
        return a + b;
    }
    else if (typeof a === 'string' && typeof b === 'string') {
        return a + b;
    }
    else {
        console.error("Error: Cannot add/concatenate mixed types.");
        return null;
    }
}
console.log(`Add numbers: ${addOrConcatenate(10, 20)}`);
console.log(`Concatenate strings: ${addOrConcatenate("Hello", "World")}`);
addOrConcatenate(10, "World"); // This will log an error 
console.log('--------------------');
// instanceof Type Guard 
class Dog {
    bark() {
        console.log("Woof!");
    }
}
class Cat {
    meow() {
        console.log("Meow!");
    }
}
function makeSound(animal) {
    if (animal instanceof Dog) {
        animal.bark();
    }
    else if (animal instanceof Cat) {
        animal.meow();
    }
}
const myDog = new Dog();
const myCat = new Cat();
makeSound(myDog);
makeSound(myCat);
console.log('--------------------');
function startVehicle(vehicle) {
    if ('drive' in vehicle) {
        vehicle.drive();
    }
    else if ('sail' in vehicle) {
        vehicle.sail();
    }
}
const myCarInstance = {
    drive: () => console.log("Driving the car...")
};
const myBoatInstance = {
    sail: () => console.log("Sailing the boat...")
};
startVehicle(myCarInstance);
startVehicle(myBoatInstance);
console.log('--------------------');
//# sourceMappingURL=activity6.js.map