"use strict";
const product1 = {
    id: 101,
    name: "Laptop Pro",
    price: 1200.0,
    description: "High-performance laptop for professionals"
};
const product2 = {
    id: 102,
    name: "Wireless Mouse",
    price: 25.5
};
console.log("=== PRODUCTS ===");
console.log(product1);
console.log(product2);
console.log("\n====================");
let currentOrder = "pending";
console.log("Current:", currentOrder);
currentOrder = "shipped";
console.log("Updated:", currentOrder);
console.log("\n====================");
const toUppercase = (text) => {
    return text.toUpperCase();
};
const addExclamation = (text) => {
    return text + "!";
};
console.log("Uppercase:", toUppercase("hello typescript"));
console.log("Exclamation:", addExclamation("typescript is fun"));
//# sourceMappingURL=activity2.js.map