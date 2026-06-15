Video Link:

https://drive.google.com/file/d/1QEpuvqQbjvMVwg3h2scyD7np_c3rG5JF/view?usp=drive_link

Expense Manager - Complete Project Documentation
1.	Project Introduction
This Expense Manager is a full-stack web application developed using React for frontend, Node.js & Express for backend, and MongoDB as database. It allows users to manage their income and expenses, track financial data, and visualize analytics using charts.

2. Project Features
- User Signup & Login Authentication
- Secure Password Handling
- Add / Edit / Delete Transactions
- Filter Transactions (Daily, Monthly, Yearly)
- Search by Title
- Category Filtering
- Date Range Filtering
- Dashboard Summary (Income, Expense, Balance)
- Budget Limit Alert System
- Dark Mode Toggle
- Analytics Page (Charts)
- Highest Spending Category Detection
- Savings & Savings Rate Calculation

3. Project Flow
1. User opens Landing Page
2. User goes to Signup/Login
3. After login → Dashboard opens
4. User adds transactions
5. Data stored in MongoDB via backend API
6. Dashboard shows summary + history
7. User can filter/search data
8. Analytics page shows charts & insights

4. Folder Structure
Backend:
- models (User, Transaction)
- controllers (authController, transactionController)
- routes (authRoutes, transactionRoutes)
- middleware (authMiddleware)
- server.js

Frontend:
- src/pages (Login, Signup, Dashboard, Analysis, Landing)
- src/components
- api.js (API calls)
- App.jsx (routing)

5. Backend Explanation
Models: Define database schema (User, Transaction)

Controllers: Handle logic like signup, login, CRUD operations

Routes: Define API endpoints

Middleware: Used for authentication (JWT)

Server.js: Main backend entry point

6. Frontend Explanation
Landing Page: Navigation (Login/Signup)

Login Page: User authentication

Signup Page: Create account with validation

Dashboard: Manage transactions, filters, dark mode

Analysis Page: Charts (Line, Bar, Pie)


7. REST APIs Used
Auth APIs:
POST /api/auth/signup
POST /api/auth/login

Transaction APIs:
GET /api/transactions
POST /api/transactions
PUT /api/transactions/:id
DELETE /api/transactions/:id


8. Installation Commands (VS Code)
Backend:
npm init -y
npm install express mongoose cors dotenv

Frontend:
npm create vite@latest
npm install
npm install recharts react-router-dom


9. Conclusion
This project demonstrates full-stack development with authentication, CRUD operations, filtering, and data visualization. It helps users manage finances efficiently.

Screenshots:

<img width="556" height="344" alt="1" src="https://github.com/user-attachments/assets/96c129df-891a-41c8-9dc6-7d9601b7f2db" />
<img width="575" height="355" alt="2" src="https://github.com/user-attachments/assets/1d5bc9e1-2a9e-4cd2-b8f6-800bec6f0afd" />
<img width="610" height="376" alt="3" src="https://github.com/user-attachments/assets/ea277f13-79bc-44c2-a78e-66776c821677" />
<img width="437" height="367" alt="4" src="https://github.com/user-attachments/assets/2f9ae648-7c43-4319-aa54-b20a2f52fbd6" />
<img width="959" height="402" alt="5" src="https://github.com/user-attachments/assets/fad8ab48-108e-4572-907d-465c92c1f4aa" />
<img width="947" height="403" alt="6" src="https://github.com/user-attachments/assets/9d54add6-ab31-42f7-89c7-9c965517eb64" />
<img width="938" height="362" alt="7" src="https://github.com/user-attachments/assets/83eae980-b4a4-40d7-b22f-b2d876edbaa9" />
<img width="947" height="449" alt="8" src="https://github.com/user-attachments/assets/35d0cd4c-447a-49ce-aca1-7a5721c92069" />
<img width="938" height="410" alt="9" src="https://github.com/user-attachments/assets/2e517433-e1ca-4844-ac89-5da71a242390" />
<img width="922" height="227" alt="10" src="https://github.com/user-attachments/assets/f72afff5-cc90-4a24-a8e8-e8fd78996e29" />
<img width="938" height="340" alt="12" src="https://github.com/user-attachments/assets/e983a001-5b5a-4080-a7e3-ce217f802646" />
<img width="938" height="210" alt="13" src="https://github.com/user-attachments/assets/8984211b-6d88-459f-bd4e-1ed5638c29f2" />
<img width="927" height="359" alt="14" src="https://github.com/user-attachments/assets/d49678f7-4241-4d57-9fc5-ffc7f0a35f97" />
<img width="947" height="345" alt="15" src="https://github.com/user-attachments/assets/bd52b647-7b87-4b72-af9b-8aacbe5c7fa9" />
<img width="958" height="255" alt="16" src="https://github.com/user-attachments/assets/adea3451-629f-4d97-8af1-ceac778a2bbd" />
<img width="940" height="353" alt="17" src="https://github.com/user-attachments/assets/f838e60c-3428-495d-aade-b5f566395d7a" />
<img width="941" height="343" alt="18" src="https://github.com/user-attachments/assets/76e5b762-15f4-4ffe-b1dc-2d7d3f1b7fa6" />















