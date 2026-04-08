// ===============================
// 1. Interface for a Product
// ===============================

interface Product {
  id: number;
  name: string;
  price: number;
  description?: string; // optional property
}

// Product 1 (with description)
const product1: Product = {
  id: 101,
  name: "Laptop Pro",
  price: 1200.0,
  description: "High-performance laptop for professionals."
};

// Product 2 (without description)
const product2: Product = {
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


// ===============================
// 2. Type Alias for String Literals (Union Type)
// ===============================

type OrderStatus = "pending" | "shipped" | "done" | "cancelled";

let currentOrder: OrderStatus = "pending";

console.log(`Current Order Status: ${currentOrder}`);

currentOrder = "shipped";

console.log(`Updated Order Status: ${currentOrder}`);

// --- Observe errors here (uncomment to see) ---
// currentOrder = "processing"; // Error: not assignable to type OrderStatus

console.log("--------------------");


// ===============================
// 3. Interface for Function Type
// ===============================

interface StringFormatter {
  (str: string): string;
}

// Function 1: Uppercase
const toUppercase: StringFormatter = (text: string): string => {
  return text.toUpperCase();
};

// Function 2: Add Exclamation
const addExclamation: StringFormatter = (text: string): string => {
  return `${text}!`;
};

console.log(`Formatted String (Uppercase): ${toUppercase("hello typescript")}`);
console.log(`Formatted String (Exclamation): ${addExclamation("typescript is fun")}`);

// ===============================
// END OF ACTIVITY 2
// ===============================