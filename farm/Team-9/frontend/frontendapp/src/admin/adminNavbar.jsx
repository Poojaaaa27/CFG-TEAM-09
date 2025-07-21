// AdminNavbar.jsx
import { Link, useLocation } from "react-router-dom"
import PropTypes from 'prop-types'

const adminLinks = [
  { to: "/admin/home", label: "Home" },
  { to: "/admin/dashboard", label: "Dashboard" },
  { to: "/admin/users", label: "User Management" },
  { to: "/admin/view-users", label: "View Users" },
  { to: "/admin/analytics", label: "Analytics" },
  { to: "/admin/view-reports", label: "View Reports" },
  { to: "/admin/projects", label: "Projects" },
  { to: "/admin/settings", label: "Settings" }
]

const AdminNavbar = ({ onLogout }) => {
  const location = useLocation()
  
  return (
    <nav className="bg-gray-800 px-6 py-4 flex items-center justify-between shadow-md">
      <div className="text-white font-bold text-2xl">
        Admin Panel
      </div>
      <div className="flex items-center space-x-8">
        {adminLinks.map(link => {
          const isActive = location.pathname === link.to
          return (
            <Link
              key={link.to}
              to={link.to}
              className={`${
                isActive
                  ? "text-blue-400 font-semibold border-b-2 border-blue-400"
                  : "text-gray-300 hover:text-white font-medium"
              } pb-1 transition-all duration-200 no-underline text-lg`}
            >
              {link.label}
            </Link>
          )
        })}
        <button
          onClick={onLogout}
          className="ml-4 px-4 py-2 bg-gray-700 text-white rounded-md font-medium hover:bg-gray-600 transition-colors duration-200"
        >
          Logout
        </button>
      </div>
    </nav>
  )
}

AdminNavbar.propTypes = {
  onLogout: PropTypes.func.isRequired
}

export default AdminNavbar