import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Table, 
  Card, 
  Input, 
  Select, 
  Button, 
  Tag, 
  Space, 
  Row, 
  Col, 
  Statistic,
  Progress,
  Modal,
  Descriptions,
  Avatar,
  Tooltip,
  message,
  Spin
} from 'antd';
import { 
  SearchOutlined, 
  FilterOutlined, 
  EyeOutlined, 
  EditOutlined,
  UserOutlined,
  PhoneOutlined,
  HomeOutlined,
  TrophyOutlined,
  DollarOutlined,
  PlusOutlined,
  ReloadOutlined
} from '@ant-design/icons';
import { districts, projectTypes } from '../data/dummyData';
import { farmerAPI } from '../api/api';

const { Option } = Select;
const { Search } = Input;

const FarmerList = () => {
  const [farmers, setFarmers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('All');
  const [selectedProjectType, setSelectedProjectType] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedFarmer, setSelectedFarmer] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();

  // Fetch farmers from API
  const fetchFarmers = async () => {
    setLoading(true);
    try {
      const response = await farmerAPI.getAllFarmers();
      console.log('Fetched farmers:', response);
      
      if (response.success) {
        setFarmers(response.data || []);
      } else {
        throw new Error(response.message || 'Failed to fetch farmers');
      }
    } catch (error) {
      console.error('Error fetching farmers:', error);
      message.error(error.message || 'Failed to fetch farmers. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFarmers();
  }, []);

  // Filter farmers based on search and filters
  const filteredFarmers = farmers.filter(farmer => {
    const matchesSearch = farmer.name.toLowerCase().includes(searchText.toLowerCase()) ||
                         farmer.village.toLowerCase().includes(searchText.toLowerCase()) ||
                         farmer.phone.includes(searchText);
    const matchesDistrict = selectedDistrict === 'All' || farmer.district === selectedDistrict;
    const matchesProjectType = selectedProjectType === 'All' || farmer.projectType === selectedProjectType;
    const matchesStatus = selectedStatus === 'All' || farmer.status === selectedStatus;
    
    return matchesSearch && matchesDistrict && matchesProjectType && matchesStatus;
  });

  // Calculate statistics
  const totalFarmers = farmers.length;
  const activeFarmers = farmers.filter(f => f.status === 'Active').length;
  const horticultureFarmers = farmers.filter(f => f.projectType === 'Horticulture').length;
  const livestockFarmers = farmers.filter(f => f.projectType === 'Livestock').length;
  const totalProduction = farmers.reduce((sum, f) => sum + (f.totalProduction || 0), 0);
  const totalSales = farmers.reduce((sum, f) => sum + (f.totalSales || 0), 0);

  const showFarmerDetails = (farmer) => {
    setSelectedFarmer(farmer);
    setIsModalVisible(true);
  };

  const handleAddNewFarmer = () => {
    navigate('/cml/farmers/register');
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <div className="flex items-center">
          <Avatar icon={<UserOutlined />} className="mr-2" />
          <div>
            <div className="font-medium">{text}</div>
            <div className="text-xs text-gray-500">{record.phone}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Location',
      key: 'location',
      render: (_, record) => (
        <div>
          <div className="font-medium">{record.village}</div>
          <div className="text-xs text-gray-500">{record.district}, {record.state}</div>
        </div>
      ),
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
      title: 'Crop/Livestock',
      dataIndex: 'cropType',
      key: 'cropType',
    },
    {
      title: 'Land Size',
      dataIndex: 'landSize',
      key: 'landSize',
      render: (size) => `${size} acres`,
    },
    {
      title: 'Production',
      key: 'production',
      render: (_, record) => (
        <div>
          <div className="font-medium">{record.totalProduction || 0} kg</div>
          <Progress 
            percent={((record.totalProduction || 0) / 2000) * 100} 
            size="small" 
            showInfo={false}
          />
        </div>
      ),
    },
    {
      title: 'Sales',
      dataIndex: 'totalSales',
      key: 'totalSales',
      render: (value) => `₹${(value || 0).toLocaleString()}`,
    },
    {
      title: 'Training',
      dataIndex: 'trainingAttendance',
      key: 'trainingAttendance',
      render: (attendance) => (
        <div className="text-center">
          <div className="font-medium">{attendance || 0}/10</div>
          <Progress 
            percent={((attendance || 0) / 10) * 100} 
            size="small" 
            showInfo={false}
            strokeColor={(attendance || 0) >= 7 ? '#52c41a' : (attendance || 0) >= 5 ? '#faad14' : '#f5222d'}
          />
        </div>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'Active' ? 'green' : 'red'}>
          {status}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="View Details">
            <Button 
              type="text" 
              icon={<EyeOutlined />} 
              onClick={() => showFarmerDetails(record)}
            />
          </Tooltip>
          <Tooltip title="Edit Farmer">
            <Button 
              type="text" 
              icon={<EditOutlined />}
              onClick={() => console.log('Edit farmer:', record.id)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              <UserOutlined className="mr-2 text-blue-500" />
              Farmer Directory
            </h1>
            <p className="text-gray-600">
              Complete list of registered farmers with detailed information and performance metrics
            </p>
          </div>
          <Space>
            <Button 
              icon={<ReloadOutlined />} 
              onClick={fetchFarmers}
              loading={loading}
            >
              Refresh
            </Button>
            <Button 
              type="primary" 
              icon={<PlusOutlined />}
              onClick={handleAddNewFarmer}
            >
              Add New Farmer
            </Button>
          </Space>
        </div>

        {/* Statistics Cards */}
        <Row gutter={[16, 16]} className="mb-6">
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Total Farmers"
                value={totalFarmers}
                prefix={<UserOutlined />}
                valueStyle={{ color: '#1890ff' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Active Farmers"
                value={activeFarmers}
                prefix={<UserOutlined />}
                valueStyle={{ color: '#52c41a' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Total Production"
                value={totalProduction.toLocaleString()}
                suffix="kg"
                prefix={<TrophyOutlined />}
                valueStyle={{ color: '#faad14' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Total Sales"
                value={totalSales.toLocaleString()}
                prefix={<DollarOutlined />}
                valueStyle={{ color: '#f5222d' }}
              />
            </Card>
          </Col>
        </Row>

        {/* Project Type Distribution */}
        <Row gutter={[16, 16]} className="mb-6">
          <Col xs={24} sm={12}>
            <Card title="Project Type Distribution">
              <Row gutter={16}>
                <Col span={12}>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{horticultureFarmers}</div>
                    <div className="text-sm text-gray-600">Horticulture</div>
                    <Progress 
                      percent={(horticultureFarmers / totalFarmers) * 100} 
                      strokeColor="#52c41a"
                      showInfo={false}
                    />
                  </div>
                </Col>
                <Col span={12}>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{livestockFarmers}</div>
                    <div className="text-sm text-gray-600">Livestock</div>
                    <Progress 
                      percent={(livestockFarmers / totalFarmers) * 100} 
                      strokeColor="#1890ff"
                      showInfo={false}
                    />
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col xs={24} sm={12}>
            <Card title="Quick Actions">
              <Space direction="vertical" style={{ width: '100%' }}>
                <Button 
                  type="primary" 
                  block 
                  icon={<PlusOutlined />}
                  onClick={handleAddNewFarmer}
                >
                  Add New Farmer
                </Button>
                <Button block icon={<TrophyOutlined />}>
                  Record Production
                </Button>
                <Button block icon={<DollarOutlined />}>
                  Generate Reports
                </Button>
              </Space>
            </Card>
          </Col>
        </Row>

        {/* Search and Filters */}
        <Card className="mb-6 shadow-sm">
          <Row gutter={[16, 16]} align="middle">
            <Col xs={24} sm={8}>
              <Search
                placeholder="Search farmers by name, village, or phone..."
                allowClear
                size="large"
                prefix={<SearchOutlined />}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </Col>
            <Col xs={24} sm={4}>
              <Select
                placeholder="District"
                size="large"
                style={{ width: '100%' }}
                value={selectedDistrict}
                onChange={setSelectedDistrict}
              >
                <Option value="All">All Districts</Option>
                {districts.map(district => (
                  <Option key={district} value={district}>{district}</Option>
                ))}
              </Select>
            </Col>
            <Col xs={24} sm={4}>
              <Select
                placeholder="Project Type"
                size="large"
                style={{ width: '100%' }}
                value={selectedProjectType}
                onChange={setSelectedProjectType}
              >
                <Option value="All">All Types</Option>
                {projectTypes.map(type => (
                  <Option key={type} value={type}>{type}</Option>
                ))}
              </Select>
            </Col>
            <Col xs={24} sm={4}>
              <Select
                placeholder="Status"
                size="large"
                style={{ width: '100%' }}
                value={selectedStatus}
                onChange={setSelectedStatus}
              >
                <Option value="All">All Status</Option>
                <Option value="Active">Active</Option>
                <Option value="Inactive">Inactive</Option>
              </Select>
            </Col>
            <Col xs={24} sm={4}>
              <Button 
                icon={<FilterOutlined />} 
                size="large"
                onClick={() => {
                  setSearchText('');
                  setSelectedDistrict('All');
                  setSelectedProjectType('All');
                  setSelectedStatus('All');
                }}
              >
                Clear Filters
              </Button>
            </Col>
          </Row>
        </Card>

        {/* Farmers Table */}
        <Card title={`Farmers (${filteredFarmers.length} results)`} className="shadow-sm">
          <Table
            columns={columns}
            dataSource={filteredFarmers}
            rowKey="id"
            loading={loading}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} farmers`,
            }}
            scroll={{ x: 1200 }}
          />
        </Card>

        {/* Farmer Details Modal */}
        <Modal
          title={
            <div className="flex items-center">
              <UserOutlined className="mr-2 text-blue-500" />
              <span>Farmer Details</span>
            </div>
          }
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={[
            <Button key="edit" type="primary" icon={<EditOutlined />}>
              Edit Farmer
            </Button>,
            <Button key="close" onClick={() => setIsModalVisible(false)}>
              Close
            </Button>
          ]}
          width={800}
        >
          {selectedFarmer && (
            <Descriptions bordered column={2}>
              <Descriptions.Item label="Name" span={2}>
                <div className="flex items-center">
                  <Avatar icon={<UserOutlined />} className="mr-2" />
                  {selectedFarmer.name}
                </div>
              </Descriptions.Item>
              <Descriptions.Item label="Phone">
                <PhoneOutlined className="mr-1" />
                {selectedFarmer.phone}
              </Descriptions.Item>
              <Descriptions.Item label="Join Date">
                <CalendarOutlined className="mr-1" />
                {selectedFarmer.joinDate}
              </Descriptions.Item>
              <Descriptions.Item label="Village">
                <HomeOutlined className="mr-1" />
                {selectedFarmer.village}
              </Descriptions.Item>
              <Descriptions.Item label="District">
                {selectedFarmer.district}, {selectedFarmer.state}
              </Descriptions.Item>
              <Descriptions.Item label="Land Size">
                {selectedFarmer.landSize} acres ({selectedFarmer.landOwnership})
              </Descriptions.Item>
              <Descriptions.Item label="Irrigation">
                {selectedFarmer.irrigationMethod}
              </Descriptions.Item>
              <Descriptions.Item label="Project Type" span={2}>
                <Tag color={selectedFarmer.projectType === 'Horticulture' ? 'green' : 'blue'}>
                  {selectedFarmer.projectType} - {selectedFarmer.cropType}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Total Production">
                <TrophyOutlined className="mr-1" />
                {selectedFarmer.totalProduction} kg
              </Descriptions.Item>
              <Descriptions.Item label="Total Sales">
                <DollarOutlined className="mr-1" />
                ₹{selectedFarmer.totalSales.toLocaleString()}
              </Descriptions.Item>
              <Descriptions.Item label="Training Attendance">
                {selectedFarmer.trainingAttendance}/10 sessions
              </Descriptions.Item>
              <Descriptions.Item label="Status">
                <Tag color={selectedFarmer.status === 'Active' ? 'green' : 'red'}>
                  {selectedFarmer.status}
                </Tag>
              </Descriptions.Item>
            </Descriptions>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default FarmerList; 