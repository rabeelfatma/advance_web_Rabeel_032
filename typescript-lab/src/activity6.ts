// src/activity6.ts 
 
// 1. Type Assertion (`as` keyword or `<Type>` syntax) 
let someValue: any = "this is a string"; 
//let strLength: number = (someValue as string).length; 
let strLength: number = (<string> someValue).length; 
console.log(`String length (using 'as'): ${strLength}`); 
 
let anotherValue: any = 123.456; 
let fixedNumber: string = (<number>anotherValue).toFixed(4); 
console.log(`Fixed number (using '<type>'): ${fixedNumber}`); 
console.log('--------------------'); 
// 2. Type Guards 
 
// typeof Type Guard 
type Combinable = string | number; 
 
function addOrConcatenate(a: Combinable, b: Combinable): Combinable | null { 
  if (typeof a === 'number' && typeof b === 'number') { 
    return a + b; 
  } else if (typeof a === 'string' && typeof b === 'string') { 
    return a + b; 
  } else { 
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
  bark(): void { 
    console.log("Woof!"); 
  } 
} 
 
class Cat { 
  meow(): void { 
    console.log("Meow!"); 
  } 
} 
 
function makeSound(animal: Dog | Cat): void { 
  if (animal instanceof Dog) { 
    animal.bark(); 
  } else if (animal instanceof Cat) { 
    animal.meow(); 
  } 
} 
 
const myDog = new Dog(); 
const myCat = new Cat(); 
 
makeSound(myDog); 
makeSound(myCat); 
console.log('--------------------');  
 
// 'in' Operator Type Guard 
interface Car { 
  drive(): void; 
} 
 
interface Boat { 
  sail(): void; 
} 
 
function startVehicle(vehicle: Car | Boat): void { 
  if ('drive' in vehicle) { 
    vehicle.drive(); 
  } else if ('sail' in vehicle) { 
    vehicle.sail(); 
  } 
} 
 
const myCarInstance: Car = { 
  drive: () => console.log("Driving the car...") 
}; 
 
const myBoatInstance: Boat = { 
  sail: () => console.log("Sailing the boat...") 
}; 
 
startVehicle(myCarInstance); 
startVehicle(myBoatInstance); 
console.log('--------------------');