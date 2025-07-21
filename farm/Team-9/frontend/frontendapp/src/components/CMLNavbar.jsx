import React, { useState } from 'react';
import { 
  Menu, 
  Button, 
  Avatar, 
  Dropdown, 
  Space, 
  Badge,
  Typography,
  Divider
} from 'antd';
import { 
  DashboardOutlined,
  UserOutlined,
  TrophyOutlined,
  BookOutlined,
  TeamOutlined,
  CalendarOutlined,
  SettingOutlined,
  LogoutOutlined,
  BellOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

const { Title } = Typography;

const CMLNavbar = ({ onLogout }) => {
  const [userRole, setUserRole] = useState('CML Staff'); // CML Staff, Supervisor, Manager, Program Team
  const navigate = useNavigate();
  const location = useLocation();

  // Mock user data - replace with actual user context later
  const currentUser = {
    name: 'Rajesh Kumar',
    role: userRole,
    avatar: null,
    notifications: 3
  };

  const getMenuItems = () => {
    const baseItems = [
      {
        key: '/cml/dashboard',
        icon: <DashboardOutlined />,
        label: 'Dashboard',
      },
      {
        key: '/cml/farmers',
        icon: <UserOutlined />,
        label: 'Farmers',
      },
      {
        key: '/cml/production',
        icon: <TrophyOutlined />,
        label: 'Production Tracking',
      },
      {
        key: '/cml/advice',
        icon: <BookOutlined />,
        label: 'Agricultural Advice',
      },
    ];

    // Add role-specific items
    if (['Supervisor', 'Manager', 'Program Team'].includes(userRole)) {
      baseItems.push(
        {
          key: '/cml/reports',
          icon: <TeamOutlined />,
          label: 'Reports & Analytics',
        },
        {
          key: '/cml/training',
          icon: <CalendarOutlined />,
          label: 'Training Management',
        }
      );
    }

    if (['Manager', 'Program Team'].includes(userRole)) {
      baseItems.push(
        {
          key: '/cml/settings',
          icon: <SettingOutlined />,
          label: 'Settings',
        }
      );
    }

    return baseItems;
  };

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Profile',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Settings',
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      onClick: () => {
        if (onLogout) {
          onLogout();
        } else {
          // Fallback logout logic
          localStorage.removeItem('isCMLLoggedIn');
          navigate('/');
        }
      },
    },
  ];

  const roleMenuItems = [
    {
      key: 'CML Staff',
      label: 'CML Staff',
    },
    {
      key: 'Supervisor',
      label: 'Supervisor',
    },
    {
      key: 'Manager',
      label: 'Manager',
    },
    {
      key: 'Program Team',
      label: 'Program Team',
    },
  ];

  const handleMenuClick = ({ key }) => {
    if (key === 'logout') {
      return;
    }
    navigate(key);
  };

  const handleRoleChange = ({ key }) => {
    setUserRole(key);
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Title level={4} className="text-blue-600 mb-0">
                CML Livelihood Tracker
              </Title>
            </div>
          </div>

          {/* Navigation Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {getMenuItems().map((item) => (
                <button
                  key={item.key}
                  onClick={() => navigate(item.key)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === item.key
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  <span className="flex items-center">
                    {item.icon}
                    <span className="ml-2">{item.label}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Right side - User controls */}
          <div className="flex items-center space-x-4">
            {/* Role Selector */}
            <Dropdown
              menu={{
                items: roleMenuItems,
                onClick: handleRoleChange,
                selectedKeys: [userRole],
              }}
              placement="bottomRight"
            >
              <Button type="text" className="flex items-center">
                <UserOutlined className="mr-1" />
                {userRole}
              </Button>
            </Dropdown>

            {/* Notifications */}
            <Badge count={currentUser.notifications} size="small">
              <Button 
                type="text" 
                icon={<BellOutlined />} 
                size="large"
                onClick={() => console.log('Notifications clicked')}
              />
            </Badge>

            {/* User Menu */}
            <Dropdown
              menu={{
                items: userMenuItems,
                onClick: handleMenuClick,
              }}
              placement="bottomRight"
            >
              <Space className="cursor-pointer">
                <Avatar 
                  icon={<UserOutlined />} 
                  size="large"
                  style={{ backgroundColor: '#1890ff' }}
                />
                <div className="text-left">
                  <div className="font-medium">{currentUser.name}</div>
                  <div className="text-xs text-gray-500">{currentUser.role}</div>
                </div>
              </Space>
            </Dropdown>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {getMenuItems().map((item) => (
            <button
              key={item.key}
              onClick={() => navigate(item.key)}
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                location.pathname === item.key
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              <span className="flex items-center">
                {item.icon}
                <span className="ml-2">{item.label}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

CMLNavbar.propTypes = {
  onLogout: PropTypes.func
};

export default CMLNavbar; 