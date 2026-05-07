"use strict";
// Activity 5: Generics
// 1. Generic Identity Function
function identity(arg) {
    return arg;
}
let numValue = identity(123);
let stringValue = identity("Hello Generics");
let objValue = identity({ name: "Generic Object", id: 1 });
console.log(numValue, stringValue, objValue);
console.log('--------------------');
// 2. Generic Array Function
function getFirstElement(arr) {
    return arr.length > 0 ? arr[0] : undefined;
}
console.log(getFirstElement([1, 2, 3]));
console.log(getFirstElement(["a", "b", "c"]));
console.log(getFirstElement([{ id: 1, name: "Ali" }]));
console.log(getFirstElement([]));
console.log('--------------------');
let numberBox = { value: 42 };
let stringBox = { value: "Hello TS" };
console.log(numberBox.value);
console.log(stringBox.value);
// numberBox.value = "error"; // ❌
//# sourceMappingURL=activity5.js.map