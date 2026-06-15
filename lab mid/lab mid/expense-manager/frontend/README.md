Video Link:

https://drive.google.com/file/d/1hq1B16LGDoSFykg9nbvW6mToiWu6GBBn/view?usp=drive_link

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
<img width="974" height="582" alt="image" src="https://github.com/user-attachments/assets/d85655ce-ea49-4fe4-85ce-ef10ea45ff4e" />
<img width="975" height="438" alt="image" src="https://github.com/user-attachments/assets/8aadb41b-8616-458c-b9ed-70e56ae27527" />
<img width="975" height="469" alt="image" src="https://github.com/user-attachments/assets/35561349-21c2-4f09-ab5e-7e632ba99e31" />
<img width="975" height="481" alt="image" src="https://github.com/user-attachments/assets/fa234779-817b-4993-9a66-c99703193f2a" />
<img width="975" height="305" alt="image" src="https://github.com/user-attachments/assets/9b769baf-583c-4d92-ba06-f99613159bae" />
<img width="975" height="483" alt="image" src="https://github.com/user-attachments/assets/53168f5a-b2f4-436e-8a37-0049be6380b3" />
<img width="975" height="494" alt="image" src="https://github.com/user-attachments/assets/0db24fcd-ae2f-40c5-b4e7-85f138796058" />
<img width="975" height="480" alt="image" src="https://github.com/user-attachments/assets/efd21c95-e7ed-4f4e-a2c2-7b26c114850b" />
<img width="975" height="490" alt="image" src="https://github.com/user-attachments/assets/b5c445c2-2f95-4a26-83c0-b2c24681d0e2" />
<img width="975" height="484" alt="image" src="https://github.com/user-attachments/assets/c5c928fe-460b-49ff-a1a3-fba406710bf8" />
<img width="975" height="486" alt="image" src="https://github.com/user-attachments/assets/88a9fa67-40c0-44ca-aa71-7df366d38e80" />
<img width="975" height="479" alt="image" src="https://github.com/user-attachments/assets/ccf3d378-2eae-40f3-b098-5ba442602ecc" />
<img width="975" height="493" alt="image" src="https://github.com/user-attachments/assets/ecb1ca3e-e2e3-418f-ae61-7270d944cce3" />
<img width="975" height="486" alt="image" src="https://github.com/user-attachments/assets/254added-d338-4f92-b423-b98aeeb4b8f6" />
<img width="975" height="477" alt="image" src="https://github.com/user-attachments/assets/8b45623b-866c-4c7b-840c-63531afadeb3" />
<img width="975" height="286" alt="image" src="https://github.com/user-attachments/assets/867a346a-9b20-4936-b862-4cfd68ce331d" />
<img width="975" height="444" alt="image" src="https://github.com/user-attachments/assets/536e2784-fc51-43d4-bbf7-487c54a5d2cf" />
<img width="975" height="483" alt="image" src="https://github.com/user-attachments/assets/72fe23a9-5351-4a0d-b247-c7b0b55d8f6a" />
<img width="975" height="285" alt="image" src="https://github.com/user-attachments/assets/5d764f7e-026a-4268-b716-adb63b868895" />
<img width="975" height="418" alt="image" src="https://github.com/user-attachments/assets/3b6244e0-5c9f-457f-b1aa-601cee8b699e" />
<img width="975" height="496" alt="image" src="https://github.com/user-attachments/assets/429077f3-12b5-4819-961e-961710f65afc" />
<img width="975" height="284" alt="image" src="https://github.com/user-attachments/assets/e007136f-6681-444d-9d4d-541c1e8786fd" />
<img width="975" height="434" alt="image" src="https://github.com/user-attachments/assets/6219f68b-e31b-4f85-9b46-378b4bf2ebed" />
<img width="975" height="487" alt="image" src="https://github.com/user-attachments/assets/469ef4b4-5d5e-4355-8a59-cc5cee11e8ee" />
<img width="975" height="298" alt="image" src="https://github.com/user-attachments/assets/a5e4a4a7-ea84-47d8-8819-3d6c3ebe2f73" />
<img width="975" height="416" alt="image" src="https://github.com/user-attachments/assets/1eca60fc-2edc-429c-9676-898924879d26" />
<img width="975" height="477" alt="image" src="https://github.com/user-attachments/assets/cc686aaf-5461-4d1d-9d86-d583509dccf0" />
<img width="470" height="185" alt="image" src="https://github.com/user-attachments/assets/dfcae933-91c3-4b02-b134-c6474ed65dfe" />
<img width="974" height="595" alt="image" src="https://github.com/user-attachments/assets/4d750ecd-2c74-4c74-b0ad-4075844158a0" />
<img width="976" height="583" alt="image" src="https://github.com/user-attachments/assets/8c391449-c838-4975-a1e0-fb447a6c5474" />
<img width="975" height="614" alt="image" src="https://github.com/user-attachments/assets/cc3fa3ed-bc45-47fa-8fcf-dcc418930c52" />
<img width="975" height="556" alt="image" src="https://github.com/user-attachments/assets/f41056cc-7db3-4e60-8260-0c6d4c52ea85" />
<img width="975" height="394" alt="image" src="https://github.com/user-attachments/assets/3556b1a8-30f4-4939-b18d-9839b163d939" />


































