import React, { useState } from 'react';
import { 
  Card, 
  Row, 
  Col, 
  Statistic, 
  Typography, 
  DatePicker, 
  Select, 
  Button, 
  Table,
  Progress,
  Space,
  Divider,
  Form,
  InputNumber,
  Switch,
  message
} from 'antd';
import { 
  BarChartOutlined, 
  LineChartOutlined, 
  PieChartOutlined,
  DownloadOutlined,
  FilterOutlined,
  ReloadOutlined,
  UserOutlined,
  TeamOutlined,
  TrophyOutlined,
  BookOutlined,
  ClockCircleOutlined,
  DatabaseOutlined
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

const SystemAnalytics = () => {
  const [dateRange, setDateRange] = useState(null);
  const [selectedMetric, setSelectedMetric] = useState('all');
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Mock analytics data
  const analyticsData = {
    userGrowth: [
      { month: 'Jan', users: 120, farmers: 80, staff: 40 },
      { month: 'Feb', users: 150, farmers: 100, staff: 50 },
      { month: 'Mar', users: 180, farmers: 120, staff: 60 },
      { month: 'Apr', users: 220, farmers: 150, staff: 70 },
      { month: 'May', users: 280, farmers: 200, staff: 80 },
      { month: 'Jun', users: 320, farmers: 240, staff: 80 }
    ],
    systemPerformance: {
      uptime: 99.8,
      responseTime: 245,
      activeSessions: 23,
      dataUsage: 2.4,
      cpuUsage: 45,
      memoryUsage: 62
    },
    topProjects: [
      { name: 'Rice Cultivation', participants: 156, success: 92 },
      { name: 'Vegetable Farming', participants: 134, success: 88 },
      { name: 'Poultry Farming', participants: 98, success: 85 },
      { name: 'Dairy Farming', participants: 87, success: 90 },
      { name: 'Fish Farming', participants: 76, success: 78 }
    ],
    recentActivity: [
      { action: 'New user registered', time: '2 hours ago', type: 'user' },
      { action: 'Project milestone completed', time: '4 hours ago', type: 'project' },
      { action: 'System backup completed', time: '6 hours ago', type: 'system' },
      { action: 'Farmer data updated', time: '1 day ago', type: 'data' },
      { action: 'New cultivation record added', time: '1 day ago', type: 'cultivation' }
    ]
  };

  const performanceColumns = [
    {
      title: 'Metric',
      dataIndex: 'metric',
      key: 'metric',
      render: (text) => <Text strong>{text}</Text>
    },
    {
      title: 'Current Value',
      dataIndex: 'value',
      key: 'value',
      render: (value, record) => {
        if (record.type === 'percentage') {
          return <Progress percent={value} size="small" />;
        }
        return <Text>{value}</Text>;
      }
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Text style={{ color: status === 'good' ? '#52c41a' : status === 'warning' ? '#faad14' : '#ff4d4f' }}>
          {status === 'good' ? '✓ Good' : status === 'warning' ? '⚠ Warning' : '✗ Critical'}
        </Text>
      )
    }
  ];

  const projectColumns = [
    {
      title: 'Project Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <Text strong>{text}</Text>
    },
    {
      title: 'Participants',
      dataIndex: 'participants',
      key: 'participants',
    },
    {
      title: 'Success Rate',
      dataIndex: 'success',
      key: 'success',
      render: (value) => <Progress percent={value} size="small" />
    }
  ];

  const activityColumns = [
    {
      title: 'Activity',
      dataIndex: 'action',
      key: 'action',
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type) => {
        const typeConfig = {
          user: { color: 'blue', text: 'User' },
          project: { color: 'green', text: 'Project' },
          system: { color: 'orange', text: 'System' },
          data: { color: 'purple', text: 'Data' },
          cultivation: { color: 'cyan', text: 'Cultivation' }
        };
        const config = typeConfig[type];
        return <Text style={{ color: config.color }}>{config.text}</Text>;
      }
    }
  ];

  const performanceData = [
    { metric: 'System Uptime', value: analyticsData.systemPerformance.uptime, type: 'percentage', status: 'good' },
    { metric: 'Response Time (ms)', value: analyticsData.systemPerformance.responseTime, type: 'number', status: 'good' },
    { metric: 'Active Sessions', value: analyticsData.systemPerformance.activeSessions, type: 'number', status: 'good' },
    { metric: 'CPU Usage (%)', value: analyticsData.systemPerformance.cpuUsage, type: 'percentage', status: 'good' },
    { metric: 'Memory Usage (%)', value: analyticsData.systemPerformance.memoryUsage, type: 'percentage', status: 'warning' },
    { metric: 'Data Usage (GB)', value: analyticsData.systemPerformance.dataUsage, type: 'number', status: 'good' }
  ];

  const handleExportData = () => {
    message.success('Analytics data exported successfully!');
  };

  const handleRefreshData = () => {
    message.success('Analytics data refreshed!');
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <Title level={2}>System Analytics</Title>
        <Text type="secondary">
          Comprehensive system performance and user activity analytics
        </Text>
      </div>

      {/* Filters and Controls */}
      <Card className="mb-6">
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={8}>
            <Text strong>Date Range:</Text>
            <RangePicker 
              className="ml-2" 
              onChange={setDateRange}
              placeholder={['Start Date', 'End Date']}
            />
          </Col>
          <Col xs={24} sm={6}>
            <Text strong>Metric:</Text>
            <Select 
              className="ml-2" 
              value={selectedMetric} 
              onChange={setSelectedMetric}
              style={{ width: 120 }}
            >
              <Option value="all">All Metrics</Option>
              <Option value="users">Users</Option>
              <Option value="projects">Projects</Option>
              <Option value="system">System</Option>
            </Select>
          </Col>
          <Col xs={24} sm={6}>
            <Space>
              <Text strong>Auto Refresh:</Text>
              <Switch checked={autoRefresh} onChange={setAutoRefresh} />
            </Space>
          </Col>
          <Col xs={24} sm={4}>
            <Space>
              <Button 
                icon={<DownloadOutlined />} 
                onClick={handleExportData}
              >
                Export
              </Button>
              <Button 
                icon={<ReloadOutlined />} 
                onClick={handleRefreshData}
              >
                Refresh
              </Button>
            </Space>
          </Col>
        </Row>
      </Card>

      {/* Key Metrics */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Users"
              value={analyticsData.userGrowth[analyticsData.userGrowth.length - 1].users}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Active Projects"
              value={analyticsData.topProjects.length}
              prefix={<TeamOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="System Uptime"
              value={analyticsData.systemPerformance.uptime}
              suffix="%"
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Data Usage"
              value={analyticsData.systemPerformance.dataUsage}
              suffix="GB"
              prefix={<DatabaseOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Performance Metrics */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} lg={12}>
          <Card title="System Performance Metrics">
            <Table 
              columns={performanceColumns} 
              dataSource={performanceData} 
              pagination={false}
              size="small"
            />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Top Performing Projects">
            <Table 
              columns={projectColumns} 
              dataSource={analyticsData.topProjects} 
              pagination={false}
              size="small"
            />
          </Card>
        </Col>
      </Row>

      {/* Recent Activity */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24}>
          <Card title="Recent System Activity">
            <Table 
              columns={activityColumns} 
              dataSource={analyticsData.recentActivity} 
              pagination={false}
              size="small"
            />
          </Card>
        </Col>
      </Row>

      {/* Analytics Configuration Form */}
      <Card title="Analytics Configuration">
        <Form layout="vertical">
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12}>
              <Form.Item label="Data Retention Period (days)">
                <InputNumber 
                  min={1} 
                  max={365} 
                  defaultValue={30} 
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item label="Refresh Interval (minutes)">
                <InputNumber 
                  min={1} 
                  max={60} 
                  defaultValue={5} 
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item label="Alert Threshold (%)">
                <InputNumber 
                  min={0} 
                  max={100} 
                  defaultValue={80} 
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item label="Enable Real-time Monitoring">
                <Switch defaultChecked />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Space>
              <Button type="primary">Save Configuration</Button>
              <Button>Reset to Default</Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default SystemAnalytics; 