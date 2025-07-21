import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Navbar from './components/Navbar'
import CMLNavbar from './components/CMLNavbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import NotFound from './pages/NotFound'
import AdminNavbar from './admin/adminNavbar'
import AdminHome from './admin/adminHome'
import AdminDashboard from './admin/adminDashboard'

// Import new admin components
import UserManagement from './admin/UserManagement'
import SystemAnalytics from './admin/SystemAnalytics'
import ProjectManagement from './admin/ProjectManagement'
import SystemSettings from './admin/SystemSettings'
import ViewUsers from './admin/ViewUsers'
import ViewReports from './admin/ViewReports'

// Import CML components
import CMLDashboard from './components/CMLDashboard.jsx'
import FarmerRegistrationForm from './components/FarmerRegistrationForm.jsx'
import ProductionTrackingForm from './components/ProductionTrackingForm.jsx'
import AgriculturalAdvice from './components/AgriculturalAdvice.jsx'
import FarmerList from './components/FarmerList.jsx'

function App() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false)
  const [isCMLLoggedIn, setIsCMLLoggedIn] = useState(false)

  useEffect(() => {
    const adminLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true'
    const cmlLoggedIn = localStorage.getItem('isCMLLoggedIn') === 'true'
    
    setIsAdminLoggedIn(adminLoggedIn)
    setIsCMLLoggedIn(cmlLoggedIn)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn')
    localStorage.removeItem('isCMLLoggedIn')
    localStorage.removeItem('adminToken')
    localStorage.removeItem('cmlToken')
    localStorage.removeItem('userRole')
    localStorage.removeItem('userData')
    
    setIsAdminLoggedIn(false)
    setIsCMLLoggedIn(false)
    
    window.location.href = '/'
  }

  // Determine which navbar to show
  let navbarToShow = <Navbar />
  
  if (isAdminLoggedIn) {
    navbarToShow = <AdminNavbar onLogout={handleLogout} />
    console.log('Showing Admin navbar')
  } else if (isCMLLoggedIn) {
    navbarToShow = <CMLNavbar onLogout={handleLogout} />
    console.log('Showing CML navbar')
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {navbarToShow}
        
        <main className="container mx-auto px-4 py-8">
          <Routes>
            {/* Public routes */}
            <Route 
              path="/" 
              element={<Home />} 
            />
            
            <Route 
              path="/login" 
              element={
                <Login 
                  setIsAdminLoggedIn={setIsAdminLoggedIn}
                  setIsCMLLoggedIn={setIsCMLLoggedIn}
                />
              } 
            />

            <Route 
              path="/register" 
              element={<Register />} 
            />

            {/* Public Admin routes (no authentication required) */}
            <Route 
              path="/admin/home"
              element={<AdminHome />}
            />
            
            <Route 
              path="/admin/dashboard"
              element={<AdminDashboard />}
            />

            {/* Public Admin Management Routes */}
            <Route 
              path="/admin/users"
              element={<UserManagement />}
            />
            
            <Route 
              path="/admin/analytics"
              element={<SystemAnalytics />}
            />
            
            <Route 
              path="/admin/projects"
              element={<ProjectManagement />}
            />
            
            <Route 
              path="/admin/settings"
              element={<SystemSettings />}
            />

            {/* Public Admin View Routes */}
            <Route 
              path="/admin/view-users"
              element={<ViewUsers />}
            />
            
            <Route 
              path="/admin/view-reports"
              element={<ViewReports />}
            />

            {/* Public CML routes (no authentication required) */}
            <Route 
              path="/cml/home"
              element={<div className="p-6"><h1>CML Home</h1><p>CML functionality coming soon...</p></div>}
            />
            
            <Route 
              path="/cml/dashboard"
              element={<div className="p-6"><h1>CML Dashboard</h1><p>CML dashboard coming soon...</p></div>}
            />

            {/* Public CML farmer routes (no authentication required) */}
            <Route 
              path="/cml/farmers" 
              element={<FarmerList />} 
            />
            <Route 
              path="/cml/farmers/register" 
              element={<FarmerRegistrationForm />} 
            />
            <Route 
              path="/cml/production" 
              element={<ProductionTrackingForm />} 
            />
            <Route 
              path="/cml/advice" 
              element={<AgriculturalAdvice />} 
            />
            <Route 
              path="/cml/reports" 
              element={<div className="p-6"><h1>Reports & Analytics</h1><p>Coming soon...</p></div>} 
            />
            <Route 
              path="/cml/training" 
              element={<div className="p-6"><h1>Training Management</h1><p>Coming soon...</p></div>} 
            />
            <Route 
              path="/cml/settings" 
              element={<div className="p-6"><h1>Settings</h1><p>Coming soon...</p></div>} 
            />

            {/* Catch all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App