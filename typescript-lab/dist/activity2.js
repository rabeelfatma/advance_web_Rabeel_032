"use strict";
// ===============================
// 1. Interface for a Product
// ===============================
// Product 1 (with description)
const product1 = {
    id: 101,
    name: "Laptop Pro",
    price: 1200.0,
    description: "High-performance laptop for professionals."
};
// Product 2 (without description)
const product2 = {
    id: 102,
    name: "Wireless Mouse",
    price: 25.5
};
// --- Observe errors here (uncomment to see) ---
// const invalidProduct: Product = {
//   id: 103,
//   name: "Headphones",
//   price: "fifty" // Error: string not assignable to number
// };
console.log("Products:");
console.log(product1);
console.log(product2);
console.log("--------------------");
let currentOrder = "pending";
console.log(`Current Order Status: ${currentOrder}`);
currentOrder = "shipped";
console.log(`Updated Order Status: ${currentOrder}`);
// --- Observe errors here (uncomment to see) ---
// currentOrder = "processing"; // Error: not assignable to type OrderStatus
console.log("--------------------");
// Function 1: Uppercase
const toUppercase = (text) => {
    return text.toUpperCase();
};
// Function 2: Add Exclamation
const addExclamation = (text) => {
    return `${text}!`;
};
console.log(`Formatted String (Uppercase): ${toUppercase("hello typescript")}`);
console.log(`Formatted String (Exclamation): ${addExclamation("typescript is fun")}`);
// ===============================
// END OF ACTIVITY 2
// ===============================
//# sourceMappingURL=activity2.js.map