# School Management System API

This is a RESTful API for managing a School Management System, built with Node.js and MongoDB. It includes role-based access control (RBAC) and supports operations for schools, classrooms, and students.

---

## Features
- **Role-Based Access Control**:
  - `Superadmin`: Full system access to manage schools.
  - `School Administrator`: School-specific access to manage classrooms and students.
- **JWT Authentication**:
  - Secured with JSON Web Tokens (JWT).
- **CRUD Operations**:
  - Manage Schools, Classrooms, and Students.
- **Database**:
  - Uses MongoDB (via MongoDB Atlas).
- **API Documentation**:
  - Accessible via Swagger UI.

---

## Technologies Used
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (via MongoDB Atlas)
- **Authentication**: JSON Web Tokens (JWT)
- **Deployment**: Render
- **Testing**: Jest, Supertest

---

## Setup Instructions

### 1. Clone the Repository
```bash
git clone <repository-url>
cd <repository-folder>
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Create a `.env` File
Add the following environment variables:
```plaintext
MONGO_URI=mongodb://localhost:27017/school_management
JWT_SECRET=q9vS8w#X%zF!j4*B2cK&dQ@mR7T_pL^6G+Nh3$W
PORT=3000
```
Replace `<username>`, `<password>`, and `<dbname>` with your MongoDB Atlas credentials.

### 4. Start the Application
```bash
npm start
```
The application will be available at `http://localhost:3000`.

---

## API Documentation
Swagger documentation is available at:
```
http://localhost:3000/api-docs
```

### Key Endpoints
#### Schools
| Method | Endpoint         | Description              | Role Required  |
|--------|------------------|--------------------------|----------------|
| POST   | `/api/schools`   | Create a new school      | Superadmin     |
| GET    | `/api/schools`   | Get all schools          | Superadmin     |
| PUT    | `/api/schools/:id` | Update a school         | Superadmin     |
| DELETE | `/api/schools/:id` | Delete a school         | Superadmin     |

#### Classrooms
| Method | Endpoint            | Description               | Role Required       |
|--------|---------------------|---------------------------|---------------------|
| POST   | `/api/classrooms`   | Create a new classroom    | School Administrator|
| GET    | `/api/classrooms`   | Get all classrooms        | School Administrator|
| PUT    | `/api/classrooms/:id` | Update a classroom      | School Administrator|
| DELETE | `/api/classrooms/:id` | Delete a classroom      | School Administrator|

#### Students
| Method | Endpoint            | Description               | Role Required       |
|--------|---------------------|---------------------------|---------------------|
| POST   | `/api/students`     | Create a new student      | School Administrator|
| GET    | `/api/students`     | Get all students          | School Administrator|
| PUT    | `/api/students/:id` | Update a student          | School Administrator|
| DELETE | `/api/students/:id` | Delete a student          | School Administrator|

---

## Testing

### Running Tests
To run the test suite, use:
```bash
npm test
```

### Testing Tools
- **Jest**: For unit testing.
- **Supertest**: For API endpoint testing.

---

## Deployment
The application is deployed on [Render](https://render.com/).

### Steps to Redeploy
1. Push changes to your GitHub repository:
   ```bash
   git add .
   git commit -m "Your commit message"
   git push origin main
   ```
2. Render will automatically detect changes and redeploy the application.

---

## Contributing
1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Describe your changes"
   ```
4. Push to your branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

---

## License
This project is licensed under the MIT License.

