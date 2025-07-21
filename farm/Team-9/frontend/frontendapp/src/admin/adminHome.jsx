import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Statistic, Typography, Space, Button, Alert, Spin, Modal, Form, Input, Select, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { 
  UserOutlined, 
  TeamOutlined, 
  TrophyOutlined, 
  BookOutlined,
  SettingOutlined,
  BarChartOutlined,
  CloudOutlined,
  ThunderboltOutlined,
  SunOutlined,
  MessageOutlined,
  BellOutlined,
  EnvironmentOutlined,
  PhoneOutlined
} from '@ant-design/icons';
import { alertAPI } from '../api/api';

const { Title, Paragraph, Text } = Typography;
const { Option } = Select;

const AdminHome = () => {
  const navigate = useNavigate();
  const [weather, setWeather] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(true);
  const [alertModalVisible, setAlertModalVisible] = useState(false);
  const [alertLoading, setAlertLoading] = useState(false);
  const [alertForm] = Form.useForm();

  // Mock data - replace with actual data from API
  const stats = {
    totalUsers: 156,
    activeProjects: 12,
    totalFarmers: 2847,
    systemHealth: 98.5
  };

  const quickActions = [
    {
      title: 'User Management',
      icon: <UserOutlined />,
      description: 'Manage system users and permissions',
      color: '#1890ff',
      route: '/admin/users'
    },
    {
      title: 'System Analytics',
      icon: <BarChartOutlined />,
      description: 'View comprehensive system reports',
      color: '#52c41a',
      route: '/admin/analytics'
    },
    {
      title: 'Project Overview',
      icon: <TeamOutlined />,
      description: 'Monitor all livelihood projects',
      color: '#faad14',
      route: '/admin/projects'
    },
    {
      title: 'System Settings',
      icon: <SettingOutlined />,
      description: 'Configure system parameters',
      color: '#722ed1',
      route: '/admin/settings'
    }
  ];

  // Weather API integration
  const fetchWeather = async () => {
    setWeatherLoading(true);
    try {
      // Using OpenWeatherMap API (you'll need to get a free API key)
      const API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY'; // Replace with actual API key
      const city = 'Guwahati'; // Default city - can be made configurable
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      
      if (response.ok) {
        const data = await response.json();
        setWeather(data);
      } else {
        // Fallback to mock weather data if API fails
        setWeather({
          name: 'Guwahati',
          main: { temp: 28, humidity: 75, feels_like: 30 },
          weather: [{ main: 'Clouds', description: 'scattered clouds', icon: '03d' }],
          wind: { speed: 3.5 }
        });
      }
    } catch (error) {
      console.error('Weather API error:', error);
      // Fallback weather data
      setWeather({
        name: 'Guwahati',
        main: { temp: 28, humidity: 75, feels_like: 30 },
        weather: [{ main: 'Clouds', description: 'scattered clouds', icon: '03d' }],
        wind: { speed: 3.5 }
      });
    } finally {
      setWeatherLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const handleQuickAction = (route) => {
    navigate(route);
  };

  const getWeatherIcon = (weatherMain) => {
    switch (weatherMain.toLowerCase()) {
      case 'clear':
        return <SunOutlined style={{ color: '#faad14', fontSize: '24px' }} />;
      case 'clouds':
        return <CloudOutlined style={{ color: '#8c8c8c', fontSize: '24px' }} />;
      case 'rain':
        return <ThunderboltOutlined style={{ color: '#1890ff', fontSize: '24px' }} />;
      default:
        return <CloudOutlined style={{ color: '#8c8c8c', fontSize: '24px' }} />;
    }
  };

  const handleSendAlert = async (values) => {
    setAlertLoading(true);
    try {
      console.log('Sending SMS alert:', values);

      // Send alert via backend API (no authentication required)
      const response = await alertAPI.sendAlert(values);
      
      console.log('SMS alert response:', response);

      message.success(`SMS alert sent successfully! ${response.data.sentCount} messages delivered, ${response.data.failedCount} failed.`);
      setAlertModalVisible(false);
      alertForm.resetFields();
    } catch (error) {
      console.error('SMS alert sending error:', error);
      message.error('Failed to send SMS alert. Please try again.');
    } finally {
      setAlertLoading(false);
    }
  };

  const showWeatherAlert = () => {
    if (weather && weather.main.temp > 35) {
      return (
        <Alert
          message="High Temperature Alert"
          description={`Temperature is ${weather.main.temp}°C. Consider sending weather alerts to farmers.`}
          type="warning"
          showIcon
          action={
            <Button size="small" type="primary" onClick={() => setAlertModalVisible(true)}>
              Send SMS Alert
            </Button>
          }
        />
      );
    }
    return null;
  };

  return (
    <div className="p-6">
      {/* Weather Widget */}
      <Card className="mb-6" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={8}>
            <div className="flex items-center">
              {weatherLoading ? (
                <Spin size="large" />
              ) : weather ? (
                <>
                  {getWeatherIcon(weather.weather[0].main)}
                  <div className="ml-3">
                    <Title level={3} style={{ color: 'white', margin: 0 }}>
                      {weather.main.temp}°C
                    </Title>
                    <Text style={{ color: 'rgba(255,255,255,0.8)' }}>
                      {weather.weather[0].description}
                    </Text>
                  </div>
                </>
              ) : (
                <Text style={{ color: 'white' }}>Weather data unavailable</Text>
              )}
            </div>
          </Col>
          <Col xs={24} sm={8}>
            <div className="text-center">
              <Title level={4} style={{ color: 'white', margin: 0 }}>
                <EnvironmentOutlined /> {weather?.name || 'Location'}
              </Title>
              <Text style={{ color: 'rgba(255,255,255,0.8)' }}>
                Humidity: {weather?.main.humidity}% | Wind: {weather?.wind.speed} m/s
              </Text>
            </div>
          </Col>
          <Col xs={24} sm={8}>
            <div className="text-right">
              <Space>
                <Button 
                  type="primary" 
                  icon={<MessageOutlined />}
                  onClick={() => setAlertModalVisible(true)}
                  style={{ background: '#25D366', borderColor: '#25D366' }}
                >
                  Send SMS Alert
                </Button>
                <Button 
                  icon={<BellOutlined />}
                  onClick={() => setAlertModalVisible(true)}
                  style={{ background: 'rgba(255,255,255,0.2)', borderColor: 'rgba(255,255,255,0.3)', color: 'white' }}
                >
                  General Alert
                </Button>
              </Space>
            </div>
          </Col>
        </Row>
      </Card>

      {/* Weather Alert */}
      {showWeatherAlert()}

      <div className="mb-8">
        <Title level={2}>Admin Dashboard</Title>
        <Paragraph className="text-gray-600">
          Welcome to the CML Livelihood Tracker administration panel. 
          Monitor system performance and manage user access.
        </Paragraph>
      </div>

      {/* Statistics Cards */}
      <Row gutter={[16, 16]} className="mb-8">
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Users"
              value={stats.totalUsers}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Active Projects"
              value={stats.activeProjects}
              prefix={<TeamOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Farmers"
              value={stats.totalFarmers}
              prefix={<TrophyOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="System Health"
              value={stats.systemHealth}
              suffix="%"
              prefix={<BookOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Quick Actions */}
      <div className="mb-8">
        <Title level={3} className="mb-4">Quick Actions</Title>
        <Row gutter={[16, 16]}>
          {quickActions.map((action, index) => (
            <Col xs={24} sm={12} lg={6} key={index}>
              <Card 
                hoverable 
                className="text-center h-full"
                bodyStyle={{ padding: '24px 16px' }}
              >
                <div 
                  className="text-4xl mb-4 flex justify-center"
                  style={{ color: action.color }}
                >
                  {action.icon}
                </div>
                <Title level={4} className="mb-2">{action.title}</Title>
                <Paragraph className="text-gray-600 mb-4">
                  {action.description}
                </Paragraph>
                <Button 
                  type="primary" 
                  style={{ backgroundColor: action.color, borderColor: action.color }}
                  onClick={() => handleQuickAction(action.route)}
                >
                  Access
                </Button>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* Recent Activity */}
      <Card title="Recent System Activity" className="mb-8">
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
            <div>
              <div className="font-medium">New user registered</div>
              <div className="text-sm text-gray-600">CML Staff member added to system</div>
            </div>
            <div className="text-sm text-gray-500">2 hours ago</div>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
            <div>
              <div className="font-medium">System backup completed</div>
              <div className="text-sm text-gray-600">Daily backup successful</div>
            </div>
            <div className="text-sm text-gray-500">6 hours ago</div>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
            <div>
              <div className="font-medium">New farmer registered</div>
              <div className="text-sm text-gray-600">Farmer ID: F2847 added to database</div>
            </div>
            <div className="text-sm text-gray-500">1 day ago</div>
          </div>
        </div>
      </Card>

      {/* System Status */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card title="System Status" className="h-full">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>Database Connection</span>
                <span className="text-green-600 font-medium">✓ Online</span>
              </div>
              <div className="flex justify-between items-center">
                <span>API Services</span>
                <span className="text-green-600 font-medium">✓ Operational</span>
              </div>
              <div className="flex justify-between items-center">
                <span>File Storage</span>
                <span className="text-green-600 font-medium">✓ Available</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Backup System</span>
                <span className="text-green-600 font-medium">✓ Active</span>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Performance Metrics" className="h-full">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>Response Time</span>
                <span className="font-medium">245ms</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Uptime</span>
                <span className="font-medium">99.8%</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Active Sessions</span>
                <span className="font-medium">23</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Data Usage</span>
                <span className="font-medium">2.4 GB</span>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* SMS Alert Modal */}
      <Modal
        title={
          <div className="flex items-center">
            <MessageOutlined className="mr-2 text-green-500" />
            <span>Send SMS Alert</span>
          </div>
        }
        open={alertModalVisible}
        onCancel={() => setAlertModalVisible(false)}
        footer={null}
        width={600}
      >
        <Form
          form={alertForm}
          layout="vertical"
          onFinish={handleSendAlert}
        >
          <Form.Item
            name="alertType"
            label="Alert Type"
            rules={[{ required: true, message: 'Please select alert type' }]}
          >
            <Select placeholder="Select alert type">
              <Option value="weather">Weather Alert</Option>
              <Option value="emergency">Emergency Alert</Option>
              <Option value="maintenance">System Maintenance</Option>
              <Option value="general">General Information</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="recipients"
            label="Recipients"
            rules={[{ required: true, message: 'Please select recipients' }]}
          >
            <Select mode="multiple" placeholder="Select recipients">
              <Option value="all_farmers">All Farmers</Option>
              <Option value="cml_staff">CML Staff</Option>
              <Option value="admins">Administrators</Option>
              <Option value="specific">Specific Numbers</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="phoneNumbers"
            label="Phone Numbers (if specific)"
            dependencies={['recipients']}
            rules={[
              ({ getFieldValue }) => ({
                validator(_, value) {
                  const recipients = getFieldValue('recipients');
                  if (recipients && recipients.includes('specific') && (!value || value.length === 0)) {
                    return Promise.reject(new Error('Please enter at least one phone number'));
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <Select
              mode="tags"
              placeholder="Enter phone numbers (e.g., +919876543210)"
              style={{ width: '100%' }}
            />
          </Form.Item>

          <Form.Item
            name="priority"
            label="Priority"
            rules={[{ required: true, message: 'Please select priority' }]}
          >
            <Select placeholder="Select priority">
              <Option value="low">Low</Option>
              <Option value="medium">Medium</Option>
              <Option value="high">High</Option>
              <Option value="urgent">Urgent</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="message"
            label="Message"
            rules={[{ required: true, message: 'Please enter message' }]}
          >
            <Input.TextArea 
              rows={4} 
              placeholder="Enter your SMS message..."
              maxLength={160}
              showCount
            />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button 
                type="primary" 
                htmlType="submit" 
                loading={alertLoading}
                icon={<MessageOutlined />}
                style={{ background: '#25D366', borderColor: '#25D366' }}
              >
                Send via SMS
              </Button>
              <Button onClick={() => setAlertModalVisible(false)}>
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminHome; 