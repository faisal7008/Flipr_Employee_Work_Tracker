# Flipr Employee Work Tracker

The Flipr Employee Work Tracker provides a comprehensive solution for recording, organizing, and monitoring employee work activities. With this tool, you can effortlessly keep track of individual tasks, track progress, and gain valuable insights into work productivity.

## Getting Started

### Backend Setup:

1. Navigate to the backend directory.
2. Basic commands:
    - To start the backend server: `npm start`
    - For linting using ESLint: `npm run lint`
    - To automatically fix errors: `npm run lint --fix`
    - For code formatting using Prettier: `npm run format`

### Frontend Setup:

1. Navigate to the frontend directory.
2. Basic commands:
    - To start the frontend server: `npm start`
    - For linting using ESLint: `npm run lint`
    - To automatically fix errors: `npm run lint --fix`
    - For code formatting using Prettier: `npm run format`

**Note:** Husky is set up for both backend and frontend to run lint and format commands when performing a 'git commit'.

### Docker Setup:

To start the project using Docker, run the command: `docker-compose up`

## Users

### Admin:

The Admin has access to additional functionalities, including:
- Registering new employees
- Monitor employee activities
- Admin Dashboard

### Employee:

Employees have restricted access and can:
- Tracking tasks like work, break and meeting
- Employee dashboard

### Admin Login:

To log in as Admin, use the following credentials:
- Email: admin@flipr.com
- Password: Admin@123

## Technologies Used

- Node.js
- Express.js
- MongoDB
- JWT (JSON Web Tokens)
- React.js
- Redux Toolkit
- TailwindCSS
- Docker 
- AWS
- Portainer
- Nginx proxy manager
- DuckDNS

### Deployment

The site is hosted on AWS EC2 and can be accessed at https://worktrackr.duckdns.org

## Created By

Mohammed Faisal Hussain
