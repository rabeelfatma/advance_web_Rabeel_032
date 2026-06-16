Video Link:

https://drive.google.com/file/d/1hq1B16LGDoSFykg9nbvW6mToiWu6GBBn/view?usp=drive_link
Documentation:
Executive Summary
Expense Manager is a full-stack MERN web application developed as part of the Advance Web Technologies (CSC336) course at COMSATS University Islamabad, Vehari Campus. The application enables users to track their daily income and expenses, set budgets, monitor financial health, and receive AI-powered personalized financial advice through Google Gemini AI integration.
The system is built using React.js on the frontend and Node.js with Express.js on the backend, with MongoDB as the primary database managed through the Mongoose ODM. User authentication is handled securely using JWT (JSON Web Tokens) with bcrypt-hashed passwords. Password validation enforces a minimum security policy requiring at least 2 alphabets, 2 numbers, and 1 special character.
The application provides more than 30 distinct features across six pages: Landing Page, Signup, Login, Forgot Password, Dashboard, and Analytics. Key features include real-time transaction management with full CRUD operations, a smart notification system, a financial health score widget, budget progress tracking, top expense categories analysis, dark/light mode toggle, PDF report export using jsPDF, and interactive charts (Line, Pie, Bar) powered by Recharts.
The RESTful API exposes nine endpoints across four resource groups (Auth, Transaction, AI Advisor, Contact), all secured with JWT middleware. The AI Financial Advisor integrates with Google Gemini AI to provide personalized financial tips based on the user’s spending patterns.
 
Abbreviations


Abbreviation	Full Form

MERN	MongoDB, Express.js, React.js, Node.js
API	Application Programming Interface
REST	Representational State Transfer
JWT	JSON Web Token
CRUD	Create, Read, Update, Delete
HTTP	HyperText Transfer Protocol
JSON	JavaScript Object Notation
ODM	Object Document Mapper
UI	User Interface
PDF	Portable Document Format
AI	Artificial Intelligence
URL	Uniform Resource Locator
SRS	Software Requirements Specification
BSE	Bachelor of Science in Software Engineering
CUI	COMSATS University Islamabad
TC	Test Case
FR	Functional Requirement

 
Contents
 
Executive Summary	1
Abbreviations	2
1	Introduction	4
1.1	Introduction	4
1.2	Student Information	4
1.3	Tools and Technologies	4
1.4	Pages and Routes	5
1.5	Project Features	5
1.6	Project Flow	7
1.7	Folder Structure	7
1.7.1	Backend Structure	7
1.7.2	Frontend Structure	8
1.8	System Architecture	8
1.9	Objectives of the Proposed System	8
1.10	Module Descriptions	9
1.10.1	Module 1: Authentication Module	9
1.10.2	Module 2: Transaction Management Module	9
1.10.3	Module 3: Analytics and Insights Module	9
1.10.4	Module 4: AI Financial Advisor Module	10
1.10.5	Module 5: Widgets and Dashboard Module	10
1.10.6	Module 6: Contact and Landing Page Module	10
2	Implementation	11
2.1	Development Environment	11
2.2	Backend Implementation	11
2.2.1	Database Models	11
2.2.2	Controllers	11
2.3	External APIs and SDKs	12
2.4	RESTful API – Complete Reference	12
2.4.1	HTTP Methods Used	13
2.4.2	HTTP Status Codes	13
2.4.3	Authentication Header	14
2.5	Installation Commands	14
2.5.1	Backend Setup	14
2.5.2	Frontend Setup	14
2.6	Frontend – Page by Page Implementation	15
2.6.1	Landing Page (LandingPage.jsx)	15
2.6.2	Signup Page (Signup.jsx)	15
COMSATS University Islamabad, Vehari Campus	Expense Manager — SP23-BSE-032
2.6.3	Login Page (Login.jsx)	15
2.6.4	Forgot Password Page (ForgotPassword.jsx)	15
2.6.5	Dashboard (Dashboard.jsx)	15
2.6.6	Analytics Page (AnalysisPage.jsx)	16
2.7	Database (MongoDB)	16
2.8	Deployment	16
3	Testing	17
4	Project Screenshots	20
4.1	Landing Page	20
4.2	Authentication Pages	23
4.3	Dashboard	25
4.4	Analytics Page	29
4.5	Database (MongoDB)	34
4.6	Testing Screenshots	37
Bibliography	42
 





	

























Page 4
 
Chapter 1 Introduction
1.1	Introduction
Expense Manager is a full-stack MERN web application that enables users to track their daily income and expenses, set budgets, monitor financial health, and receive AI-powered personalized financial advice. The project integrates a React.js frontend, Node.js + Express.js backend, MongoDB database, and Google Gemini AI. Authentication is handled via JWT tokens with bcrypt password hashing. Password validation enforces a security policy requiring at least 2 alphabets, 2 numbers, and 1 special character.

1.2	Student Information

Field	Details

Student Name	Rabeel Fatima
Registration #	SP23-BSE-032
Subject	Advance Web Technologies (CSC336)
Instructor	Ma’am Yasmeen Jana
University	COMSATS University Islamabad — Vehari Cam-
pus
Semester	7th Semester — BS Software Engineering
GitHub		https://github.com/rabeelfatma/advance_ web_Rabeel_032


1.3	Tools and Technologies

Tool / Technol- Version	Purpose ogy

React.js	Latest	Frontend UI – pages, components, routing,
state management
React  Router	Latest	Client-side routing between pages
Axios	Latest	HTTP client for REST API calls from fron-
tend to backend
Recharts	Latest	Chart library for Line, Pie, and Bar charts 5
 

 
Tool / Technol- Version	Purpose ogy

Node.js	Latest	 JavaScript runtime for backend server Express.js	Latest	Web framework for building RESTful APIs MongoDB	Latest	NoSQL database for storing users, trans-
actions, and contacts
Mongoose	Latest	ODM for defining schemas and interacting
with MongoDB
bcryptjs	Latest	Password hashing for secure storage
jsonwebtoken	Latest	JWT generation and verification for state-
less authentication
Google	Gemini	API	AI-powered financial advice based on user
AI	transaction data
jsPDF	CDN	Client-side PDF generation for transaction reports
Vite	Latest	Frontend build tool and development server
dotenv	Latest	Environment variable management (.env
file)
nodemon	Latest	Auto-restart backend server during devel-opment
cors	Latest	Enable Cross-Origin Resource Sharing
Visual	Studio	Latest	IDE used for development
Code


1.4	Pages and Routes

Route	Page	Description
/	LandingPage.jsx	Marketing page with hero, fea-
		tures, stats, contact form, footer
/signup	Signup.jsx	User registration with validation
		and password strength policy
/login	Login.jsx	Email/password authentication –
		returns JWT token
/forgot-password	ForgotPassword.jsx	Direct password reset without
		OTP
/dashboard	Dashboard.jsx	Main transaction manager with
		widgets, AI advisor, and PDF ex-
		port
/analytics	AnalysisPage.jsx	Financial analytics with Line, Pie,
		Bar charts and time filters

1.5	Project Features
 

 
#	Feature	Description	File
 
1	User Signup	New user registration with validation and password policy
2	User Login	Email/password login – returns JWT token
 
Signup.jsx Login.jsx
 
3	Password Reset	Reset password directly without OTP	ForgotPassword.jsx
 
4	Password Validation	Min 2 alphabets, 2 numbers, 1 special
character
5	Show/Hide Password	Toggle password visibility on all auth pages
 
Signup.jsx Login.jsx
 
6	Landing Page	Full marketing page with all sections	LandingPage.jsx
 
7	Smooth Scroll	Navbar links scroll to sections without reload
8	Contact Form	Send message via API with status feed-back
9	Add Transaction	Title, Amount, Type, Category, Date form
 
LandingPage.jsx LandingPage.jsx Dashboard.jsx
 
10	Edit Transaction	Pre-fill form – update via PUT API	Dashboard.jsx
11	Delete Transaction	Confirm dialog – DELETE API call	Dashboard.jsx
12	Real-time Search	Case-insensitive title search	Dashboard.jsx
13	Category Filter	Filter by transaction category	Dashboard.jsx
14	Date Range Filter	Start & end date custom range filter	Dashboard.jsx
 
15	Quick Time Filters	ALL	/	DAILY	/	MONTHLY	/
YEARLY tabs
 
Dashboard.jsx
 
16	Live Summary Bar	Income, Expense, Balance (real-time)	Dashboard.jsx
 
17	Smart Notifications	Auto-generated bell notifications (3 types)
 
Dashboard.jsx
 
18	Dark Mode	Full app dark/light theme toggle	Dashboard.jsx
19	Largest Expense Widget	Auto-finds the biggest single expense	Dashboard.jsx
20	Financial Health Score	0–100 score based on savings rate	Dashboard.jsx
 
21	Budget Progress Bar	Green <80%, Orange <100%, Red =
exceeded
22	Top Categories Widget	Top 4 expense categories with progress bars
 
Dashboard.jsx Dashboard.jsx
 
23	AI Financial Advisor	Gemini AI personalized financial tips	Dashboard.jsx
 
24	Budget Limit Setting	User sets custom budget – live updates
all widgets
25	PDF Export	Full transaction report download via jsPDF
26	Logout	Confirm dialog – clear JWT – redirect to login
 
Dashboard.jsx Dashboard.jsx Dashboard.jsx
 
27	Line Chart	Income vs Expense trend over time	AnalysisPage.jsx
28	Pie Chart	Budget distribution donut chart	AnalysisPage.jsx
29	Bar Chart	Income vs Expense bar comparison	AnalysisPage.jsx
30	Analytics Filters	Daily/Monthly/Yearly on all 3 charts	AnalysisPage.jsx

 

1.6	Project Flow
Step 1. User opens the Landing Page – reads features, can contact via the contact form.
Step 2. User clicks Sign Up – fills form with validation (password: min 2 alphabets, 2 numbers, 1 special character) – account created.
Step 3. User logs in with email and password – JWT token stored in localStorage – Dashboard opens.
Step 4. User adds transactions (income/expense) – saved in MongoDB via backend.
Step 5. Dashboard shows live summary: Balance, Income, Expense.
Step 6. User can search, filter by category and date range, edit, and delete transactions.
Step 7. Smart notifications auto-generated based on budget usage.
Step 8. AI Advisor button – Gemini AI analyzes data – gives personalized financial tips.
Step 9. Export PDF – full transaction report downloaded via jsPDF.
Step 10. Analytics page – Line, Pie, Bar charts with time filters (Daily/Monthly/Yearly).
Step 11. User logs out – token cleared – redirected to login.

1.7	Folder Structure
1.7.1	Backend Structure

Path	Description

backend/models/User.js	MongoDB schema for user accounts (name,
email, hashed password) backend/models/Transaction.js	MongoDB schema for transactions (title,
amount, type, category, date, userId) backend/controllers/authControllseirg.njusp(), login(), forgotPassword() – auth
logic
backend/controllers/transactionCgoenttTrroalnlseacrt.ijosns(), addTransaction(), update-
Transaction(), deleteTransaction() backend/routes/authRoutes.js	POST /api/auth/signup, /api/auth/login,
/api/auth/forgot-password
backend/routes/transactionRoutesG.jEsT/POST	/api/transactions,
PUT/DELETE /api/transactions/:id backend/routes/contactRoutes.js POST /api/contact/send backend/routes/aiAdvisor.js	POST /api/ai-advice – Gemini AI integration backend/.env	MONGO URI,	JWT SECRET,	OPEN-
ROUTER API KEY, PORT
backend/server.js	Main Express app entry point – middleware, routes, MongoDB connection
backend/package.json	Backend dependencies (express, mongoose,
cors, dotenv, bcryptjs, jsonwebtoken)

 

1.7.2	Frontend Structure

Path	Description

frontend/src/pages/LandingPage.jMsxarketing landing page frontend/src/pages/Login.jsx	Login page with JWT authentication frontend/src/pages/Signup.jsx	Registration with password validation frontend/src/pages/ForgotPassworDd.irjescxt password reset page frontend/src/pages/Dashboard.jsxMain dashboard – transactions, widgets, AI
advisor frontend/src/pages/AnalysisPage.Fjsinxancial analytics with charts frontend/src/api.js	Axios instance – base URL + JWT Autho-
rization header interceptor frontend/src/App.jsx	React Router – all route definitions frontend/src/App.css	Global application styles frontend/vite.config.js	Vite configuration file frontend/package.json	Frontend dependencies (react, react-router-
dom, axios, recharts)

1.8	System Architecture
The Expense Manager follows a three-tier client-server architecture:
 Presentation Layer: React.js frontend with React Router for client-side navigation. All API calls are made through Axios with a centralized JWT interceptor in api.js.
 Application Layer: Node.js + Express.js backend exposing RESTful APIs. JWT token verification protects all transaction and AI endpoints. Controllers handle business logic for auth, transactions, AI advice, and contact.
 Data Layer: MongoDB database with Mongoose schemas. Separate collections for users, transactions, and contacts. Each transaction is linked to a user via userId to ensure data isolation.

1.9	Objectives of the Proposed System
  BO-1: Provide users with a comprehensive personal finance tracking system covering income, expenses, budgets, and savings.
  BO-2: Integrate Google Gemini AI to deliver context-aware, personalized financial advice based on actual user spending patterns.
  BO-3: Implement a secure JWT-based authentication system with bcrypt password hashing and enforced password validation policy.
  BO-4: Deliver a rich analytics dashboard with interactive charts (Line, Pie, Bar) and real-time financial widgets.
  BO-5: Enable users to export transaction reports as PDF documents for offline record-keeping.
 

1.10	Module Descriptions
1.10.1	Module 1: Authentication Module
The Authentication module handles user registration, login, and password reset. During signup, the system validates credentials and enforces a password policy requiring at least 2 alphabets, 2 numbers, and 1 special character. Passwords are hashed using bcryptjs before storage. On login, the system verifies the email and password, then issues a JWT token stored in the browser’s localStorage.
Functional Requirements:
  FR-1: The system shall allow users to register with validated credentials and password strength enforcement.
  FR-2: The system shall authenticate users via email and password and issue a JWT token.
  FR-3: The system shall allow users to reset their password directly without OTP verification.

1.10.2	Module 2:  Transaction Management Module
The core module allowing authenticated users to add, edit, delete, and view financial transactions. Each transaction contains a title, amount, type (income or expense), category, and date. The dashboard provides real-time summary widgets, search, filter by category and date range, and quick time tabs (ALL/DAILY/MONTHLY/YEARLY).
Functional Requirements:
  FR-1: The system shall allow authenticated users to create, read, update, and delete transactions.
  FR-2: The system shall display real-time balance, total income, and total expense summaries.
  FR-3: The system shall support filtering transactions by title search, category, date range, and time period.

1.10.3	Module 3: Analytics and Insights Module
Provides visual representation of financial data through three chart types: a Line Chart showing income vs expense trends over time, a Pie Chart showing budget distribution, and a Bar Chart comparing total income and expense. Charts support Daily, Monthly, and Yearly time filters.
Functional Requirements:
  FR-1: The system shall render Line, Pie, and Bar charts from transaction data using Recharts.
  FR-2: The system shall support time-based filtering (Daily/Monthly/Yearly) for all charts.
   FR-3: The system shall calculate and display total savings, savings rate, and top
 

expense category.

1.10.4	Module 4: AI Financial Advisor Module
Integrates Google Gemini AI (via OpenRouter) to provide users with personalized financial tips. When the user clicks “Get AI Advice”, the system sends the user’s financial summary to the AI endpoint. The response returns structured cards with icons, titles, and actionable tips.
Functional Requirements:
  FR-1: The system shall send user financial data to the Gemini AI endpoint and return structured advice cards.
  FR-2: The system shall display a skeleton loading animation during AI response processing.
  FR-3: The AI endpoint shall be protected by JWT token verification.

1.10.5	Module 5: Widgets and Dashboard Module
Provides five real-time financial widgets: Largest Expense, Financial Health Score (0–100), Budget Progress Bar (color-coded), Top 4 Expense Categories, and Smart Notifications (bell icon with badge count).
Functional Requirements:
  FR-1: The system shall compute and display real-time financial health metrics from transaction data.
  FR-2: The system shall generate smart notifications when budget thresholds are reached.
  FR-3: The system shall allow users to set and update a custom budget limit.

1.10.6	Module 6: Contact and Landing Page Module
A full marketing page featuring a sticky navbar with smooth scroll, hero section with CTA buttons, stats bar, features grid with 6 cards, About section, and a contact form. The contact form posts to /api/contact/send with status feedback.
Functional Requirements:
  FR-1: The system shall provide a marketing landing page accessible without authen-tication.
  FR-2: The system shall allow visitors to submit a contact message via a form with real-time status feedback.
  FR-3: The navbar shall support smooth scrolling to all page sections.
 
Chapter 2 Implementation
2.1	Development Environment
The Expense Manager was developed using Visual Studio Code as the primary IDE. The backend runs on Node.js with Express.js and connects to a local MongoDB instance. The frontend is built with Vite + React.js and runs on port 5173.
Environment Variables (.env):
    MONGO URI=mongodb://127.0.0.1:27017/expense tracker
   JWT SECRET=secret123
  OPENROUTER API KEY=sk-or-v1-... (Gemini AI via OpenRouter)
 PORT=5000

2.2	Backend Implementation
2.2.1	Database Models
User Model (User.js): Fields: name, email (unique), password (bcrypt hashed), create-dAt. Validation enforces email format, unique email, and bcrypt hashing before save.
Transaction Model (Transaction.js): Fields: title, amount, type (income/expense), category, date, userId (ref: User). The userId field links each transaction to the authenti-cated user ensuring per-user data isolation.

2.2.2	Controllers
authController.js
  signup(): Validates fields, checks for duplicate email, hashes password with bcryptjs, saves User to MongoDB, returns success.
  login(): Finds user by email, compares password with bcryptjs, generates JWT token with jsonwebtoken, returns token.
   forgotPassword(): Finds user by email, hashes new password, updates document in DB, returns success.
transactionController.js


12
 

  getTransactions(): Finds all transactions where userId matches logged-in user – returns array.
   addTransaction(): Validates fields, creates Transaction with userId from JWT, saves and returns new document.
  updateTransaction(): Finds by id + userId, updates fields, saves and returns updated document.
  deleteTransaction(): Finds by id + userId, removes from DB, returns success message.

2.3	External APIs and SDKs

API / SDK	Purpose	Module
 
Express.js	Builds RESTful APIs for com-munication between frontend and backend
bcryptjs SDK	Hashes user passwords before
storage and compares hashes during login
jsonwebtoken SDK	Generates and verifies JWT to-
kens for stateless authentica-tion
Google Gemini AI	Provides personalized financial
advice based on user spending data
jsPDF (CDN)	Client-side PDF generation for
transaction reports
Recharts	React chart library for Line, Pie, and Bar charts
 
Auth, Transaction, AI, Contact
Authentication Module Authentication Module AI Financial Advisor
Dashboard – PDF Export Analytics Module
 

 

2.4	RESTful API – Complete Reference
The Expense Manager exposes 9 REST API endpoints across 4 resource groups. All endpoints return JSON. Transaction and AI endpoints require a valid JWT token in the Authorization:  Bearer <token> header.

#	MethodEndpoint	Description

1	POST	/api/auth/signup	Register new user.	Body:  {name,
			email, password}. Returns 201 Cre-
			ated.
2	POST	/api/auth/login	Login – returns JWT token. Body:
			{email, password}. Returns 200 OK
			with token.
 

 
#	MethodEndpoint	Description

3   POST  /api/auth/forgot-password	Reset  password  directly.   Body:
			{email, newPassword}. Returns 200
OK.
4	GET	/api/transactions	Get all transactions for logged-in
			user.  JWT required.  Returns 200
			OK with array.
5	POST	/api/transactions	Create new transaction.	JWT  re-
			quired. Body: {title, amount, type,
			category, date}. Returns 201.
6	PUT	/api/transactions/:id	Update existing transaction. JWT
			required. Body: {title, amount, type,
			category, date}.
7	DELETE/api/transactions/:id	Delete a transaction by ID. JWT +
:id param. Returns 200 OK.
8	POST  /api/ai-advice		Get Gemini AI financial advice. JWT required. Body: financial sum-mary object.
9	POST   /api/contact/send	Send contact form message. Body:
{name, email, subject, message}. Re-turns 200 OK.


2.4.1	HTTP Methods Used

Method	Usage in Expense Manager

GET	Retrieve data – no request body – used for fetching all user transactions (/api/transactions)
POST	Send data to create a new resource – used for signup, login, add transaction, AI advice, contact
PUT		Update an existing resource – used for editing a transaction (/api/transactions/:id)
DELETE		Remove a resource – used for deleting a transaction (/api/transactions/:id)


2.4.2	HTTP Status Codes

Status Code	Meaning

200 OK	Request successful. Data returned or operation completed.
201 Created	New resource created successfully (signup, add transaction).
 
400 Bad Re-quest
401	Unau-thorized
 
Missing or invalid fields in request body. JWT token missing, invalid, or expired.
 

 
Status Code	Meaning

404	Not	Resource (user/transaction) not found in database.
Found
409 Conflict	Duplicate email – user already registered.
500 Internal	Server/database error – unexpected failure.
Error


2.4.3	Authentication Header

Field	Value

Header Name	Authorization
Header Value	Bearer <token>
Token Storage	localStorage.getItem(’token’) on frontend (set via api.js Axios interceptor)
On Failure	401 Unauthorized returned if token missing or expired


2.5	Installation Commands
2.5.1	Backend Setup

Step	Command

Initialize project	npm init -y
Install	dependen-  npm install express mongoose cors dotenv
cies	bcryptjs  jsonwebtoken
Install dev tools	npm install -D nodemon
Run	development	npm run dev or node server.js
server


2.5.2	Frontend Setup

Step	Command

Create Vite project	npm create vite@latest expense-manager
---template react
 
Install	base	pack-ages
Install	dependen-cies
Run	development server
Build for produc-tion
 
npm install
npm install react-router-dom axios recharts npm run dev
npm run build
 

 
 

2.6	Frontend – Page by Page Implementation
2.6.1	Landing Page (LandingPage.jsx)
The Landing Page is the public-facing marketing page. It features a sticky navbar with smooth-scroll links (Home, Features, About, Contact) and Login/Sign Up buttons. The hero section displays the headline “Take Control of Your Finances” with a custom SVG illustration. A stats bar shows 10K+ Users, 500K+ Transactions, 99% Uptime, and 100% Secure. The features grid presents 6 cards. The contact form POSTs to /api/contact/send with real-time status feedback.

2.6.2	Signup Page (Signup.jsx)
The Signup page provides a registration form with Name, Email, Password, and Confirm Password fields. Password validation enforces the security policy: minimum 2 alphabets, 2 numbers, and 1 special character. Both password fields include a Show/Hide toggle. The form POSTs to /api/auth/signup.

2.6.3	Login Page (Login.jsx)
The Login page provides email and password fields with a Show/Hide password toggle. The form POSTs to /api/auth/login. On success, the JWT token is stored in localStorage and the user is navigated to /dashboard. Navigation links go to Forgot Password (/forgot-password) and Signup (/signup).

2.6.4	Forgot Password Page (ForgotPassword.jsx)
The Forgot Password page allows direct password reset without OTP. Fields include Email, New Password, and Confirm Password. One eye icon toggle controls visibility for both password fields. A client-side match check alerts the user if passwords do not match. The form POSTs to /api/auth/forgot-password with {email, newPassword}.

2.6.5	Dashboard (Dashboard.jsx)
The Dashboard is the main application page and the most feature-rich component. It contains:
    Summary Bar: Live Balance (Income minus Expense), Total Income, Total Expense
  Widget Cards: Largest Expense (reduce() finds max), Financial Health Score (0–100: Excellent/Good/Fair/Poor), Budget Progress Bar (Green <80%, Orange
<100%, Red = exceeded)
 Top Categories Widget: Top 4 expense categories with proportional progress bars
 AI Financial Advisor: Gemini AI button sends financial context and returns advice cards with icons, titles, and tips. Skeleton loading animation shown during processing.
  Transaction Form: Add (POST) and Edit (PUT) modes with fields: Title, Amount, Type, Category, Date
 

  Filter System: Real-time title search, category dropdown, date range pickers, quick tabs  (ALL/DAILY/MONTHLY/YEARLY)
  Smart Notifications: Bell icon with red badge count; alerts for budget exceeded, 80% warning, and last entry
  Dark Mode: Sun/Moon toggle covers page background, cards, inputs, widgets, and AI advisor
   Budget Limit Setting: User enters custom budget – all widgets update live
  PDF Export: jsPDF generates transactions report.pdf with full history
 Logout: Confirm dialog clears JWT from localStorage and redirects to login

2.6.6	Analytics Page (AnalysisPage.jsx)
The Analytics page provides three interactive charts built with Recharts:
  Line Chart: Income vs Expense trend over time – green line for income, red line for expense. X-axis shows HH:MM for daily, date for monthly/yearly.
  Pie Chart (Donut): Budget distribution showing Income vs Expense proportions.
   Bar Chart: Side-by-side Income vs Expense bar comparison.
Stats cards show: Total Savings (income minus expense) with savings rate %, Top Expense Category (highest spend), and Total Transactions count. Time filter tabs (ALL/DAILY/MONTHLY/YEARLY) apply to all charts simultaneously.

2.7	Database (MongoDB)
The Expense Manager uses MongoDB with the database name expense tracker. Three collections are maintained:
   users: Stores user accounts with name, email, and bcrypt-hashed password.
  transactions: Stores financial records with title, amount, type, category, date, userId, createdAt, and updatedAt.
  contacts: Stores contact form submissions with name, email, subject, message, and createdAt.

2.8	Deployment

Component	Platform	URL / Details	
Backend	Local / Node.js	http://localhost:5000	– server	Express.js
Frontend	Local / Vite	http://localhost:5173 – React.js dev
server
Database	Local / MongoDB	mongodb://127.0.0.1:27017/expense tracker
GitHub	GitHub	https://github.com/rabeelfatma/advance web Rabeel 032

 
Chapter 3 Testing
This chapter presents the testing strategies applied to the Expense Manager application. Testing ensures that all functional requirements defined in earlier chapters are satisfied across all modules.

 
 
Module TC ID	FR	Description	Input / Action	Expected
Result
 
Status
 

M1	TC-1.1a	FR-1.1	Successful Signup	Valid name, email,	Account	Pass
				password	(meets	created;	
				policy)	user	redi-	
					rected	to	
					/login	
M1	TC-1.1b	FR-1.1	Weak	Password	Password	without	System	Pass
			Signup	special character	shows	
					validation	
					error	
M1	TC-1.1c	FR-1.1	Duplicate Email	Register	with	al-	System re-	Pass
				ready used email	turns	409	
					Conflict	
M1	TC-1.2a	FR-1.2	Successful Login	Valid email + valid	JWT token	Pass
				password	stored;	
user	redi-rected
to	/dash-
	board	
M1	TC-1.2b	FR-1.2	Invalid Login	Valid	email	+	Error	Pass
				wrong password	message	
					“Invalid cre-	
					dentials”	
M1	TC-1.2c	FR-1.2	Empty Field Valida-	Leave email or pass-	System	Pass
			tion	word blank	prompts	
					“Please	
					fill in this	
					field”	
M1	TC-1.3a	FR-1.3	Forgot	Password	View login page	Reset link	Pass
			Link		visible and	
					clickable	


18
 

 
 
Module TC ID	FR	Description	Input / Action	Expected
Result
 
Status
 

M1	TC-1.3b	FR-1.3	Password Reset	Submit email + new	Password	Pass
				password	updated;	
					redirected	
					to /login	
M1	TC-1.3c	FR-1.3	Password Mismatch	New password ̸=	Alert:	Pass
				confirm password	“Passwords	
do	not match” shown
M1	TC-1.4a	FR-1.4	Password Hashing	Check users collec-	Password	Pass
				tion in MongoDB	field shows	
					bcrypt	
					hash	
M2	TC-2.1a	FR-2.1	Add Transaction	Fill form with valid	Transaction	Pass
				data	saved; sum-	
					mary	
					updated	
M2	TC-2.2a	FR-2.2	Edit Transaction	Click Edit on exist-	Form	Pass
				ing transaction	pre-filled;	
					update	
					successful	
M2	TC-2.3a	FR-2.3	Delete Transaction	Click Del on exist-	Transaction	Pass
				ing transaction	removed	
					from	list
and DB	
M3	TC-3.1a	FR-3.1	Line Chart	View	Analytics	Income vs	Pass
				page		Expense	
						line	chart	
						rendered	
M3	TC-3.1b	FR-3.1	Pie Chart	View	Analytics	Budget dis-	Pass
				page		tribution	
						pie	chart	
						rendered	
M3	TC-3.1c	FR-3.1	Bar Chart	View	Analytics	Income vs	Pass
				page		Expense	
						bar	chart	
						rendered	
M4	TC-4.1a	FR-4.1	AI Advice	Click	“Get AI Ad-	Gemini	Pass
				vice”		AI  returns	
						Structured	
						Advice	
						Cards	
 

 
 
Module TC ID	FR	Description	Input / Action	Expected
Result
 
Status
 

M5	TC-5.1b	FR-5.1	Budget Progress	Set budget limit	Budget bar	Pass
					updates;	
					color	
					changes at	
					thresholds	
M5	TC-5.1c	FR-5.2	Smart Notifications	Exceed budget	Bell	icon	Pass
					shows	
					badge;	
					alert	
shown	in pane


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
<img width="953" height="464" alt="ai response" src="https://github.com/user-attachments/assets/100d6e27-966b-4114-8bfa-189316690f8c" />

<img width="975" height="477" alt="image" src="https://github.com/user-attachments/assets/cc686aaf-5461-4d1d-9d86-d583509dccf0" />
<img width="470" height="185" alt="image" src="https://github.com/user-attachments/assets/dfcae933-91c3-4b02-b134-c6474ed65dfe" />
<img width="974" height="595" alt="image" src="https://github.com/user-attachments/assets/4d750ecd-2c74-4c74-b0ad-4075844158a0" />
<img width="976" height="583" alt="image" src="https://github.com/user-attachments/assets/8c391449-c838-4975-a1e0-fb447a6c5474" />
<img width="975" height="614" alt="image" src="https://github.com/user-attachments/assets/cc3fa3ed-bc45-47fa-8fcf-dcc418930c52" />
<img width="975" height="556" alt="image" src="https://github.com/user-attachments/assets/f41056cc-7db3-4e60-8260-0c6d4c52ea85" />
<img width="975" height="394" alt="image" src="https://github.com/user-attachments/assets/3556b1a8-30f4-4939-b18d-9839b163d939" />


































