# CML Livelihood Tracker

A comprehensive system for managing farmer data and agricultural projects. This application provides tools for farmer registration, production tracking, and agricultural advice.

## Features

- **User Management**: Registration and authentication for admin and CML staff
- **Farmer Registration**: Comprehensive farmer data collection and management
- **Production Tracking**: Monitor agricultural production and sales
- **Analytics Dashboard**: View system statistics and reports
- **Agricultural Advice**: Provide guidance to farmers
- **Training Management**: Track farmer training attendance

## Tech Stack

### Frontend
- React 18
- Vite
- Ant Design
- Tailwind CSS
- React Router

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- bcrypt (password hashing)
- JWT (authentication)

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Team-9
   ```

2. **Install all dependencies**
   ```bash
   npm run install-all
   ```

3. **Set up environment variables**
   
   Create a `config.env` file in the `backend` directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/cml_livelihood_tracker
   PORT=3000
   NODE_ENV=development
   JWT_SECRET=your_jwt_secret_key_here
   ```

4. **Start MongoDB**
   
   Make sure MongoDB is running on your system. If using MongoDB Atlas, update the `MONGODB_URI` in the config file.

## Running the Application

### Development Mode
```bash
# Start both frontend and backend
npm run dev

# Or start them separately
npm run backend    # Backend on http://localhost:3000
npm run frontend   # Frontend on http://localhost:5173
```

### Production Mode
```bash
npm start
```

## API Endpoints

### Authentication
- `POST /register` - User registration
- `POST /login` - User login
- `GET /users` - Get all users

### Farmers
- `POST /api/farmers/add` - Add new farmer
- `GET /api/farmers/all` - Get all farmers
- `GET /api/farmers/:id` - Get farmer by ID
- `PUT /api/farmers/:id` - Update farmer
- `DELETE /api/farmers/:id` - Delete farmer

### Cultivations
- `POST /api/cultivations/add/:farmerId` - Add cultivation for farmer
- `GET /api/cultivations/:farmerId` - Get cultivations by farmer
- `GET /api/cultivations/get/all` - Get all cultivations

## Usage

### 1. User Registration
- Navigate to `/register` to create a new account
- Choose between "CML Staff" or "Administrator" role
- After registration, login with your credentials

### 2. Farmer Management
- Login as CML Staff
- Navigate to "Farmers" section
- Click "Add New Farmer" to register a farmer
- View and manage existing farmers

### 3. Admin Dashboard
- Login as Administrator
- Access comprehensive system analytics
- Manage users and view reports

## Database Schema

### User Model
```javascript
{
  name: String,
  email: String,
  password: String (hashed),
  role: String (admin/user),
  phoneNumber: String
}
```

### Farmer Model
```javascript
{
  id: String (custom generated),
  name: String,
  phone: String,
  village: String,
  district: String,
  state: String,
  landSize: Number,
  landOwnership: String,
  irrigationMethod: String,
  projectType: String,
  cropType: String,
  joinDate: Date,
  notes: String,
  status: String,
  totalProduction: Number,
  totalSales: Number,
  trainingAttendance: Number
}
```

## Project Structure

```
Team-9/
├── backend/
│   ├── controller/     # API controllers
│   ├── models/         # Database models
│   ├── routes/         # API routes
│   ├── middleware/     # Custom middleware
│   ├── utils/          # Utility functions
│   ├── app.js          # Express app setup
│   └── server.js       # Server entry point
├── frontend/
│   └── frontendapp/
│       ├── src/
│       │   ├── admin/          # Admin components
│       │   ├── components/     # Shared components
│       │   ├── pages/          # Page components
│       │   ├── api/            # API utilities
│       │   └── data/           # Static data
│       └── package.json
└── README.md
```

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check the connection string in `config.env`
   - Verify network connectivity if using MongoDB Atlas

2. **Port Already in Use**
   - Change the port in `config.env`
   - Kill processes using the ports

3. **CORS Errors**
   - Check that the frontend URL is correctly configured in `backend/app.js`
   - Ensure both frontend and backend are running

4. **Module Not Found Errors**
   - Run `npm install` in the respective directories
   - Clear node_modules and reinstall if necessary

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please contact the development team.