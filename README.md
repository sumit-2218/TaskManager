# Task Manager API

A Spring Boot REST API for managing tasks with user accounts.

## Features

- Create tasks
- Update tasks
- Delete tasks
- Get tasks by user
- User-task relationship

## Tech Stack

- Spring Boot
- Spring Data JPA
- MySQL
- Maven

## API Endpoints

GET /api/tasks
GET /api/tasks/{id}
GET /api/tasks/user/{userId}
POST /api/tasks
PUT /api/tasks/{id}
DELETE /api/tasks/{id}

Backend structure --

taskmanager
│
├── src
│   └── main
│       ├── java/com/sumit/taskmanager
│       └── resources
│           application.properties
│
├── pom.xml
├── README.md
└── .gitignore
