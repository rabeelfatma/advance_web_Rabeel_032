// Step 1: Category Type
type Category = "Electronics" | "Books" | "Clothing" | "Food";

// Step 2: Interface
interface InventoryItem {
  id: number;
  name: string;
  category: Category;
  quantity: number;
  price: number;
  description?: string;
}

// Step 3: Inventory Class
class Inventory {
  private items: InventoryItem[];
  

  constructor() {
    this.items = [];
  }

  addItem(item: InventoryItem): void {
    const exists = this.items.some(i => i.id === item.id);
    if (exists) {
      console.error(`Item with ID ${item.id} already exists.`);
      return;
    }
    this.items.push(item);
  }

  getItemById(id: number): InventoryItem | undefined {
    return this.items.find(item => item.id === id);
  }

  updateItemQuantity(id: number, newQuantity: number): boolean {
    if (newQuantity < 0) return false;

    const item = this.items.find(i => i.id === id);
    if (!item) return false;

    item.quantity = newQuantity;
    return true;
  }

  removeItem(id: number): boolean {
    const index = this.items.findIndex(i => i.id === id);
    if (index === -1) return false;

    this.items.splice(index, 1);
    return true;
  }

  listAllItems(): InventoryItem[] {
    return [...this.items];
  }

  listItemsByCategory(category: Category): InventoryItem[] {
    return this.items.filter(item => item.category === category);
  }
}

// Step 4: Usage
const inventory = new Inventory();

inventory.addItem({ id: 1, name: "Laptop", category: "Electronics", quantity: 10, price: 800 });
inventory.addItem({ id: 2, name: "T-Shirt", category: "Clothing", quantity: 50, price: 20 });
inventory.addItem({ id: 3, name: "Book", category: "Books", quantity: 30, price: 15, description: "Story Book" });
inventory.addItem({ id: 4, name: "Apple", category: "Food", quantity: 100, price: 1 });
inventory.addItem({ id: 5, name: "Headphones", category: "Electronics", quantity: 15, price: 100 });

// Duplicate ID test
inventory.addItem({ id: 1, name: "Duplicate", category: "Electronics", quantity: 5, price: 500 });

// Get item
console.log(inventory.getItemById(3));

// Update quantity
inventory.updateItemQuantity(2, 60);

// Invalid update
inventory.updateItemQuantity(10, 20);
inventory.updateItemQuantity(2, -5);

// Remove item
inventory.removeItem(4);

// Remove non-existent
inventory.removeItem(99);

// List all
console.log(inventory.listAllItems());

// List by category
console.log(inventory.listItemsByCategory("Electronics"));