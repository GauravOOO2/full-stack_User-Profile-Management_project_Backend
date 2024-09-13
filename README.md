# Full-Stack Two Endpoints Project Backend

## Description

This project is the backend component of a full-stack application, built using the NestJS framework. It provides two main endpoints for managing users and their profiles. The backend is designed to be efficient, scalable, and easy to maintain.

## Tech Stack

- **Framework**: [NestJS](https://nestjs.com/)
- **Language**: TypeScript
- **Database**: PostgreSQL (with Prisma ORM)
- **API**: RESTful
- **Testing**: Jest

### What This Project Does

1. **User Management**:
   - Allows creation of new user accounts with basic information (username, phone number).
   - Provides endpoints to retrieve individual users or a list of all users.
   - Enables updating of user information.
   - Supports deletion of user accounts.

2. **Profile Management**:
   - Each user can have an associated profile with more detailed information.
   - Profiles include fields such as email, gender, address, pincode, city, state, and country.
   - Offers endpoints to create, retrieve, update, and delete user profiles.
   - Links profiles directly to user accounts for seamless data management.

3. **Data Validation and Error Handling**:
   - Implements robust input validation to ensure data integrity.
   - Provides meaningful error messages for invalid requests or server issues.

4. **Database Integration**:
   - Uses PostgreSQL for persistent data storage.
   - Employs Prisma ORM for efficient and type-safe database operations.

5. **RESTful API Design**:
   - Follows RESTful principles for intuitive and standardized API endpoints.
   - Supports JSON data format for request and response payloads.

This backend is designed to be the foundation for various applications that require user management functionality, such as:
- Social networking platforms
- E-commerce websites with user accounts
- Content management systems
- Any application requiring user registration and profile management

By providing a solid backend infrastructure for user and profile management, this project allows frontend developers to focus on creating engaging user interfaces and experiences, while ensuring that user data is handled securely and efficiently on the server side.


## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14 or later)
- npm (v6 or later)
- PostgreSQL database

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/GauravOOO2/full-stack_two_endPoints_project_Backend.git
   ```

2. Navigate to the project directory:
   ```bash
   cd full-stack_two_endPoints_project_Backend
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Set up your environment variables:
   - Create a `.env` file in the root directory
   - Add your database connection string and other necessary variables

5. Run Prisma migrations:
   ```bash
   npx prisma migrate dev
   ```

## Running the Application

To run the application in development mode:
```bash
npm run start
```

To run the application in production mode:
```bash
npm run build
npm run start:prod
``` 


The server will start on `http://localhost:4000` by default.

## API Endpoints

- `GET /api/users`: Fetch all users
- `POST /api/users`: Create a new user
- `GET /api/users/:id`: Fetch a specific user
- `PATCH /api/users/:id`: Update a user
- `DELETE /api/users/:id`: Delete a user

- `GET /api/profiles`: Fetch all profiles
- `POST /api/profiles`: Create a new profile
- `GET /api/profiles/:userId`: Fetch a specific profile
- `PATCH /api/profiles/:userId`: Update a profile
- `DELETE /api/profiles/:userId`: Delete a profile


## Contributing

Contributions to this project are welcome. Please follow these steps:

1. Fork the repository
2. Create a new branch: `git checkout -b feature-branch-name`
3. Make your changes and commit them: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-branch-name`
5. Create a pull request


## Contact

If you have any questions or feedback, please contact:

Gaurav - varmagaurav840@gmail.com

Project Link: [https://github.com/GauravOOO2/full-stack_two_endPoints_project_Backend](https://github.com/GauravOOO2/full-stack_two_endPoints_project_Backend)