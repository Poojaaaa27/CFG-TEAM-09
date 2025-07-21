import React from 'react';
import { Card, Row, Col, Typography, Button, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { 
  UserOutlined, 
  TeamOutlined, 
  TrophyOutlined, 
  BarChartOutlined,
  SettingOutlined,
  EyeOutlined,
  FileTextOutlined
} from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate('/admin/view-reports');
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <Title level={2}>Admin Dashboard</Title>
        <Paragraph className="text-gray-600">
          Comprehensive system administration and monitoring dashboard.
        </Paragraph>
      </div>

      {/* Quick Stats */}
      <Row gutter={[16, 16]} className="mb-8">
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <div className="flex items-center">
              <div className="text-3xl text-blue-600 mr-4">
                <UserOutlined />
              </div>
              <div>
                <div className="text-2xl font-bold">156</div>
                <div className="text-gray-600">Total Users</div>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <div className="flex items-center">
              <div className="text-3xl text-green-600 mr-4">
                <TeamOutlined />
              </div>
              <div>
                <div className="text-2xl font-bold">12</div>
                <div className="text-gray-600">Active Projects</div>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <div className="flex items-center">
              <div className="text-3xl text-orange-600 mr-4">
                <TrophyOutlined />
              </div>
              <div>
                <div className="text-2xl font-bold">2,847</div>
                <div className="text-gray-600">Total Farmers</div>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <div className="flex items-center">
              <div className="text-3xl text-purple-600 mr-4">
                <BarChartOutlined />
              </div>
              <div>
                <div className="text-2xl font-bold">98.5%</div>
                <div className="text-gray-600">System Health</div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Management Sections */}
      <Row gutter={[16, 16]} className="mb-8">
        <Col xs={24} lg={12}>
          <Card title="User Management" className="h-full">
            <Paragraph>
              Manage system users, roles, and permissions. Monitor user activity and access controls.
            </Paragraph>
            <Space>
              <Button 
                type="primary" 
                icon={<EyeOutlined />}
                onClick={() => handleNavigation('/admin/view-users')}
              >
                View Users
              </Button>
              <Button 
                icon={<UserOutlined />}
                onClick={() => handleNavigation('/admin/users')}
              >
                Manage Users
              </Button>
              <Button icon={<SettingOutlined />}>
                Manage Roles
              </Button>
            </Space>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="System Analytics" className="h-full">
            <Paragraph>
              View comprehensive system reports, performance metrics, and data analytics.
            </Paragraph>
            <Space>
              <Button 
                type="primary" 
                icon={<FileTextOutlined />}
                onClick={() => handleNavigation('/admin/view-reports')}
              >
                View Reports
              </Button>
              <Button 
                icon={<BarChartOutlined />}
                onClick={() => handleNavigation('/admin/analytics')}
              >
                Analytics
              </Button>
              <Button icon={<TrophyOutlined />}>
                Performance Metrics
              </Button>
            </Space>
          </Card>
        </Col>
      </Row>

      {/* System Status */}
      <Card title="System Status">
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12}>
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
          </Col>
          <Col xs={24} sm={12}>
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
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default AdminDashboard; 