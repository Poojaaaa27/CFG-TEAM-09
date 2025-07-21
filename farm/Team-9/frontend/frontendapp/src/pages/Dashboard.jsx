import { useState } from 'react'

function Dashboard() {
  const [user] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    joinDate: 'January 2025'
  })

  const stats = [
    { label: 'Total Projects', value: '12', icon: '📊', color: 'bg-blue-100 text-blue-600' },
    { label: 'Active Tasks', value: '8', icon: '✅', color: 'bg-green-100 text-green-600' },
    { label: 'Completed Tasks', value: '24', icon: '🎯', color: 'bg-purple-100 text-purple-600' },
    { label: 'Team Members', value: '6', icon: '👥', color: 'bg-yellow-100 text-yellow-600' }
  ]

  const recentActivity = [
    { action: 'Completed task: Update user interface', time: '2 hours ago' },
    { action: 'Created new project: E-commerce Platform', time: '1 day ago' },
    { action: 'Joined team: Frontend Development', time: '3 days ago' },
    { action: 'Updated profile information', time: '1 week ago' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100 py-10">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-10 flex flex-col md:flex-row md:items-center md:justify-between border-b-4 border-blue-200">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-800 mb-2 tracking-tight">
              Welcome back, <span className="text-blue-600">{user.name}</span>!
            </h1>
            <p className="text-gray-500 text-lg">
              Here&apos;s what&apos;s happening with your projects today.
            </p>
          </div>
          <div className="mt-6 md:mt-0">
            <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-xl shadow-lg font-semibold hover:scale-105 transition-transform duration-200">
              + New Project
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg p-7 flex flex-col items-center hover:shadow-2xl transition-shadow duration-200 border-t-4 border-blue-100">
              <div className={`w-16 h-16 flex items-center justify-center rounded-full mb-4 text-4xl ${stat.color} shadow-inner`}>
                {stat.icon}
              </div>
              <h3 className="text-3xl font-bold text-gray-800">{stat.value}</h3>
              <p className="text-gray-500 text-base mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Recent Activity */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-blue-700 mb-6 flex items-center gap-2">
              <span className="text-blue-400">🕒</span> Recent Activity
            </h2>
            <div className="space-y-6">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-4 pb-4 border-b border-gray-100 last:border-b-0">
                  <div className="flex-shrink-0 w-3 h-3 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full mt-2 shadow"></div>
                  <div className="flex-grow">
                    <p className="text-gray-800 font-medium">{activity.action}</p>
                    <p className="text-gray-400 text-sm">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-purple-700 mb-6 flex items-center gap-2">
              <span className="text-purple-400">⚡</span> Quick Actions
            </h2>
            <div className="space-y-4">
              <button className="w-full text-left p-5 rounded-xl hover:bg-blue-50 transition-colors duration-200 border border-blue-100 flex items-center gap-4 shadow-sm hover:scale-[1.02]">
                <span className="text-2xl bg-blue-100 text-blue-600 rounded-full p-2">📝</span>
                <div>
                  <p className="font-semibold text-gray-800">Create New Task</p>
                  <p className="text-gray-500 text-sm">Add a new task to your project</p>
                </div>
              </button>
              <button className="w-full text-left p-5 rounded-xl hover:bg-yellow-50 transition-colors duration-200 border border-yellow-100 flex items-center gap-4 shadow-sm hover:scale-[1.02]">
                <span className="text-2xl bg-yellow-100 text-yellow-600 rounded-full p-2">👥</span>
                <div>
                  <p className="font-semibold text-gray-800">Invite Team Member</p>
                  <p className="text-gray-500 text-sm">Add someone to your team</p>
                </div>
              </button>
              <button className="w-full text-left p-5 rounded-xl hover:bg-purple-50 transition-colors duration-200 border border-purple-100 flex items-center gap-4 shadow-sm hover:scale-[1.02]">
                <span className="text-2xl bg-purple-100 text-purple-600 rounded-full p-2">📊</span>
                <div>
                  <p className="font-semibold text-gray-800">View Reports</p>
                  <p className="text-gray-500 text-sm">Check your project analytics</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
