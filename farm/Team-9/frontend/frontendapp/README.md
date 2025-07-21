# CML Livelihood Tracker

A comprehensive React-based web application for tracking and managing livelihood projects in Northeast India. Built with modern technologies including Vite, Ant Design, and Tailwind CSS.

## Features

- **Farmer Management**: Register and track farmer details, land ownership, and socio-economic data
- **Production Tracking**: Monitor production data, sales, and training attendance
- **Real-time Analytics**: Comprehensive dashboards for decision-making and reporting
- **Agricultural Advice**: Seasonal guidance and best practices for improved productivity
- **Role-based Access**: Different interfaces for CML Staff, Supervisors, Managers, and Program Teams
- **Responsive Design**: Mobile-first design that works perfectly on all devices

## Technology Stack

- **Frontend**: React 18 with Vite
- **UI Framework**: Ant Design + Tailwind CSS
- **Routing**: React Router v6
- **State Management**: React Hooks (useState, useEffect)
- **Build Tool**: Vite
- **Package Manager**: npm

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm (comes with Node.js)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd cml-livelihood-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── CMLDashboard.jsx
│   ├── CMLNavbar.jsx
│   ├── FarmerList.jsx
│   ├── FarmerRegistrationForm.jsx
│   ├── ProductionTrackingForm.jsx
│   ├── AgriculturalAdvice.jsx
│   └── Navbar.jsx
├── pages/              # Page components
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Dashboard.jsx
│   └── NotFound.jsx
├── admin/              # Admin-specific components
│   ├── adminNavbar.jsx
│   ├── adminHome.jsx
│   └── adminDashboard.jsx
├── data/               # Mock data and constants
│   └── dummyData.js
└── App.jsx             # Main application component
```

## User Roles

### Administrator
- Full system access and user management
- Data oversight and administrative controls
- System configuration and analytics

### CML Staff
- Farmer registration and management
- Production data tracking and monitoring
- Agricultural advice provision
- Field operations and reporting

### Supervisor
- Monitor field activities and CML staff
- Generate reports and manage training sessions
- Oversee multiple field operations

### Manager
- Strategic oversight and program management
- Donor reporting and analytics
- High-level decision making

### Program Team
- System administration and optimization
- Advanced analytics and reporting
- Program strategy and development

## Demo Credentials

### Administrator
- Username: `admin`
- Password: `admin123`

### CML Staff
- Username: `cml`
- Password: `cml123`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built for Centre for Microfinance and Livelihood (CML)
- Part of Tata Trusts initiative for Northeast India
- Designed to support livelihood projects in horticulture and livestock
