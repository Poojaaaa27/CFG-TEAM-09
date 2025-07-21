# Quick Startup Guide

## Prerequisites
- Node.js (v16 or higher)
- MongoDB running locally or MongoDB Atlas account

## Quick Start

1. **Install Dependencies**
   ```bash
   npm run install-all
   ```

2. **Set up Environment**
   - Create `backend/config.env` file with:
   ```env
   MONGODB_URI=mongodb://localhost:27017/cml_livelihood_tracker
   PORT=3000
   NODE_ENV=development
   JWT_SECRET=your_secret_key_here
   ```

3. **Start the Application**
   ```bash
   npm run dev
   ```

4. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000

## Test the Connection

Run the test script to verify everything is working:
```bash
node test-connection.js
```

## First Steps

1. **Register a User**
   - Go to http://localhost:5173/register
   - Create an account (choose "Administrator" or "CML Staff")

2. **Login**
   - Go to http://localhost:5173/login
   - Use your registered credentials

3. **Add a Farmer** (CML Staff)
   - Login as CML Staff
   - Navigate to "Farmers" section
   - Click "Add New Farmer"

4. **View Dashboard** (Admin)
   - Login as Administrator
   - Access the admin dashboard

## Troubleshooting

### MongoDB Issues
- Ensure MongoDB is running: `mongod`
- For MongoDB Atlas: Update connection string in `config.env`

### Port Issues
- Backend: Change PORT in `config.env`
- Frontend: Vite will automatically find an available port

### CORS Issues
- Check that frontend URL is correct in `backend/app.js`
- Ensure both servers are running

## API Testing

Test the API endpoints:
```bash
# Test user registration
curl -X POST http://localhost:3000/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"test123","role":"user","phoneNumber":"1234567890"}'

# Test farmer listing
curl http://localhost:3000/api/farmers/all
```

## Development

- Backend changes: Server auto-restarts with nodemon
- Frontend changes: Hot reload with Vite
- Database changes: Restart backend server 