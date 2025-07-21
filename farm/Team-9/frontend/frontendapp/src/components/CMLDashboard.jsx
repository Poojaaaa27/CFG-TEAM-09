import React from 'react';
import { Card, Row, Col, Statistic, Progress, Table, Tag } from 'antd';
import { 
  UserOutlined, 
  DollarOutlined, 
  TrophyOutlined, 
  RiseOutlined,
  TeamOutlined,
  CalendarOutlined
} from '@ant-design/icons';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { projectStats, monthlyData, farmers } from '../data/dummyData';

const CMLDashboard = () => {
  // Chart data for project types distribution
  const projectTypeData = [
    { name: 'Horticulture', value: projectStats.horticultureFarmers, color: '#52c41a' },
    { name: 'Livestock', value: projectStats.livestockFarmers, color: '#1890ff' }
  ];

  // Recent farmers data for table
  const recentFarmersColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Village',
      dataIndex: 'village',
      key: 'village',
    },
    {
      title: 'Project Type',
      dataIndex: 'projectType',
      key: 'projectType',
      render: (type) => (
        <Tag color={type === 'Horticulture' ? 'green' : 'blue'}>
          {type}
        </Tag>
      ),
    },
    {
      title: 'Production (kg)',
      dataIndex: 'totalProduction',
      key: 'totalProduction',
    },
    {
      title: 'Sales (₹)',
      dataIndex: 'totalSales',
      key: 'totalSales',
      render: (value) => `₹${value.toLocaleString()}`,
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          CML Livelihood Project Dashboard
        </h1>
        <p className="text-gray-600">
          Real-time tracking of farmer progress and project outcomes
        </p>
      </div>

      {/* Key Statistics Cards */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Farmers"
              value={projectStats.totalFarmers}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Active Farmers"
              value={projectStats.activeFarmers}
              prefix={<TeamOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Production (kg)"
              value={projectStats.totalProduction.toLocaleString()}
              prefix={<TrophyOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Sales (₹)"
              value={projectStats.totalSales.toLocaleString()}
              prefix={<DollarOutlined />}
              valueStyle={{ color: '#f5222d' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Progress Indicators */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} lg={12}>
          <Card title="Project Completion Rate" className="h-full">
            <div className="text-center">
              <Progress
                type="circle"
                percent={projectStats.projectCompletion}
                format={(percent) => `${percent}%`}
                size={120}
                strokeColor={{
                  '0%': '#108ee9',
                  '100%': '#87d068',
                }}
              />
              <p className="mt-4 text-gray-600">
                {projectStats.activeFarmers} out of {projectStats.totalFarmers} farmers actively participating
              </p>
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Average Training Attendance" className="h-full">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">
                {projectStats.averageTrainingAttendance}/10
              </div>
              <Progress
                percent={(projectStats.averageTrainingAttendance / 10) * 100}
                strokeColor={{
                  '0%': '#108ee9',
                  '100%': '#87d068',
                }}
              />
              <p className="mt-2 text-gray-600">
                Sessions attended per farmer
              </p>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Charts Row */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} lg={16}>
          <Card title="Monthly Progress Trends">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="production" 
                  stroke="#1890ff" 
                  strokeWidth={2}
                  name="Production (kg)"
                />
                <Line 
                  type="monotone" 
                  dataKey="sales" 
                  stroke="#52c41a" 
                  strokeWidth={2}
                  name="Sales (₹)"
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="Project Type Distribution">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={projectTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {projectTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      {/* Recent Farmers Table */}
      <Card title="Recent Farmers" className="mb-6">
        <Table
          columns={recentFarmersColumns}
          dataSource={farmers.slice(0, 5)}
          pagination={false}
          rowKey="id"
          size="middle"
        />
      </Card>

      {/* Quick Actions */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={8}>
          <Card 
            title="Add New Farmer" 
            className="text-center cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => console.log('Navigate to add farmer form')}
          >
            <UserOutlined className="text-4xl text-blue-500 mb-2" />
            <p className="text-gray-600">Register new beneficiary</p>
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card 
            title="Record Production" 
            className="text-center cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => console.log('Navigate to production form')}
          >
            <TrophyOutlined className="text-4xl text-green-500 mb-2" />
            <p className="text-gray-600">Log production data</p>
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card 
            title="Schedule Training" 
            className="text-center cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => console.log('Navigate to training form')}
          >
            <CalendarOutlined className="text-4xl text-orange-500 mb-2" />
            <p className="text-gray-600">Organize training sessions</p>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CMLDashboard; 