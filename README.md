Task Manager is a full-stack application built as part of the Backend/Frontend Developer Intern assignment for Primetrade.

The project demonstrates:
	•	Backend APIs with secure user authentication, password hashing, and role-based access (USER/ADMIN)
	•	CRUD operations for a secondary entity (Tasks)
	•	Minimal frontend built with React.js to demonstrate API functionality

Note: Admin registration is possible via the registration form. There is no separate admin panel implemented.

⸻

Features

Backend
	•	User registration & login with BCrypt password hashing
	•	Role-based access (USER / ADMIN)
	•	CRUD operations for Tasks
	•	RESTful API design with proper status codes
	•	Input validation & error handling
	•	MySQL database for Users and Tasks
	•	CORS configured for frontend integration

Frontend
	•	React.js SPA with Register, Login, and Task Dashboard
	•	Task dashboard shows task title, description, and status
	•	Displays success/error messages returned from backend
	•	Clean UI with cards and status badges

  Tech Stack

  Layer
Technology
Frontend
React.js, React Router, Axios
Backend
Java, Spring Boot
Database
MySQL
Security
JWT Authentication, BCrypt
Styling
Inline CSS, Card & Badge UI


Project Structure

frontend/
 ├─ src/
 │   ├─ pages/         # Register, Login, TaskDashboard
 │   ├─ services/      # authService.js, adminService.js
backend/
 ├─ src/main/java/com/sumit/taskmanager/
 │   ├─ controller/    # AuthController, TaskController
 │   ├─ model/         # User.java, Task.java
 │   ├─ repository/    # JPA Repositories
 │   ├─ service/       # Business logic

 Run backend:

 -cd project Folder
 mvn spring-boot:run

Frontend

cd ../frontend
npm install
npm start
 
