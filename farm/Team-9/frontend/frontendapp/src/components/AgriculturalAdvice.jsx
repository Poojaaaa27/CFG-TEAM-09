import React, { useState } from 'react';
import { 
  Card, 
  Row, 
  Col, 
  Tag, 
  Button, 
  Input, 
  Select, 
  List, 
  Avatar, 
  Divider,
  Typography,
  Space,
  Badge
} from 'antd';
import { 
  BookOutlined, 
  SearchOutlined, 
  CalendarOutlined, 
  TagOutlined,
  BulbOutlined,
  EnvironmentOutlined
} from '@ant-design/icons';
import { agriculturalAdvice, cropTypes, livestockTypes } from '../data/dummyData';

const { Title, Paragraph } = Typography;
const { Option } = Select;
const { Search } = Input;

const AgriculturalAdvice = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCrop, setSelectedCrop] = useState('All');

  const categories = ['All', 'Seasonal', 'Crop Specific', 'Livestock', 'Pest Management', 'Irrigation'];

  const filteredAdvice = agriculturalAdvice.filter(advice => {
    const matchesSearch = advice.title.toLowerCase().includes(searchText.toLowerCase()) ||
                         advice.content.toLowerCase().includes(searchText.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || advice.category === selectedCategory;
    const matchesCrop = selectedCrop === 'All' || advice.applicableCrops.includes(selectedCrop);
    
    return matchesSearch && matchesCategory && matchesCrop;
  });

  const getCategoryColor = (category) => {
    const colors = {
      'Seasonal': 'blue',
      'Crop Specific': 'green',
      'Livestock': 'orange',
      'Pest Management': 'red',
      'Irrigation': 'cyan'
    };
    return colors[category] || 'default';
  };

  const getAdviceIcon = (category) => {
    const icons = {
      'Seasonal': <CalendarOutlined />,
      'Crop Specific': <EnvironmentOutlined />,
      'Livestock': <TagOutlined />,
      'Pest Management': <BulbOutlined />,
      'Irrigation': <EnvironmentOutlined />
    };
    return icons[category] || <BookOutlined />;
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Title level={2} className="text-gray-800 mb-2">
            <BookOutlined className="mr-2 text-green-500" />
            Agricultural Advice & Guidance
          </Title>
          <Paragraph className="text-gray-600">
            Expert farming tips, seasonal guidance, and best practices for improved agricultural productivity
          </Paragraph>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6 shadow-sm">
          <Row gutter={[16, 16]} align="middle">
            <Col xs={24} sm={8}>
              <Search
                placeholder="Search for farming advice..."
                allowClear
                size="large"
                prefix={<SearchOutlined />}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </Col>
            <Col xs={24} sm={8}>
              <Select
                placeholder="Filter by category"
                size="large"
                style={{ width: '100%' }}
                value={selectedCategory}
                onChange={setSelectedCategory}
              >
                {categories.map(category => (
                  <Option key={category} value={category}>{category}</Option>
                ))}
              </Select>
            </Col>
            <Col xs={24} sm={8}>
              <Select
                placeholder="Filter by crop/livestock"
                size="large"
                style={{ width: '100%' }}
                value={selectedCrop}
                onChange={setSelectedCrop}
              >
                <Option value="All">All Crops & Livestock</Option>
                <Option value="Rice">Rice</Option>
                <Option value="Tomato">Tomato</Option>
                <Option value="Vegetables">Vegetables</Option>
                <Option value="Dairy">Dairy</Option>
              </Select>
            </Col>
          </Row>
        </Card>

        {/* Featured Advice */}
        <Row gutter={[16, 16]} className="mb-6">
          <Col xs={24} lg={12}>
            <Card 
              title={
                <div className="flex items-center">
                  <CalendarOutlined className="mr-2 text-blue-500" />
                  <span>Current Season Tips</span>
                </div>
              }
              className="h-full shadow-sm"
            >
              <div className="text-center py-8">
                <Badge.Ribbon text="Monsoon Season" color="blue">
                  <Card className="bg-blue-50">
                    <Title level={4} className="text-blue-800 mb-3">
                      Monsoon Farming Preparation
                    </Title>
                    <Paragraph className="text-blue-700">
                      Prepare your fields for the upcoming monsoon season. 
                      Ensure proper drainage systems and use organic fertilizers 
                      to improve soil health.
                    </Paragraph>
                    <Button type="primary" size="small">
                      Read More
                    </Button>
                  </Card>
                </Badge.Ribbon>
              </div>
            </Card>
          </Col>
          <Col xs={24} lg={12}>
            <Card 
              title={
                <div className="flex items-center">
                  <BulbOutlined className="mr-2 text-orange-500" />
                  <span>Quick Tips</span>
                </div>
              }
              className="h-full shadow-sm"
            >
              <List
                size="small"
                dataSource={[
                  "Water your plants early morning or evening",
                  "Use organic pesticides when possible",
                  "Maintain proper crop rotation",
                  "Monitor soil pH regularly",
                  "Keep farm records updated"
                ]}
                renderItem={(item, index) => (
                  <List.Item>
                    <Space>
                      <Badge count={index + 1} style={{ backgroundColor: '#52c41a' }} />
                      <span>{item}</span>
                    </Space>
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        </Row>

        {/* Advice List */}
        <Card title="All Agricultural Advice" className="shadow-sm">
          <List
            itemLayout="vertical"
            size="large"
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} advice articles`,
            }}
            dataSource={filteredAdvice}
            renderItem={(advice) => (
              <List.Item
                key={advice.id}
                actions={[
                  <Button type="link" size="small">
                    <CalendarOutlined /> {advice.date}
                  </Button>,
                  <Button type="link" size="small">
                    <TagOutlined /> {advice.category}
                  </Button>
                ]}
                extra={
                  <div className="text-right">
                    <Tag color={getCategoryColor(advice.category)}>
                      {advice.category}
                    </Tag>
                    <div className="mt-2">
                      <small className="text-gray-500">
                        Applicable to: {advice.applicableCrops.join(', ')}
                      </small>
                    </div>
                  </div>
                }
              >
                <List.Item.Meta
                  avatar={
                    <Avatar 
                      icon={getAdviceIcon(advice.category)} 
                      style={{ backgroundColor: getCategoryColor(advice.category) }}
                    />
                  }
                  title={
                    <div className="flex items-center">
                      <span className="font-semibold text-lg">{advice.title}</span>
                    </div>
                  }
                  description={
                    <div>
                      <Paragraph className="text-gray-600 mb-2">
                        {advice.content}
                      </Paragraph>
                      <div className="flex flex-wrap gap-1">
                        {advice.applicableCrops.map(crop => (
                          <Tag key={crop} color="blue" size="small">
                            {crop}
                          </Tag>
                        ))}
                      </div>
                    </div>
                  }
                />
              </List.Item>
            )}
          />
        </Card>

        {/* Quick Actions */}
        <Row gutter={[16, 16]} className="mt-6">
          <Col xs={24} sm={8}>
            <Card 
              className="text-center cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => console.log('Navigate to seasonal calendar')}
            >
              <CalendarOutlined className="text-4xl text-blue-500 mb-2" />
              <Title level={4}>Seasonal Calendar</Title>
              <Paragraph>View farming activities by season</Paragraph>
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card 
              className="text-center cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => console.log('Navigate to pest guide')}
            >
              <BulbOutlined className="text-4xl text-red-500 mb-2" />
              <Title level={4}>Pest Management</Title>
              <Paragraph>Identify and control common pests</Paragraph>
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card 
              className="text-center cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => console.log('Navigate to soil health')}
            >
              <EnvironmentOutlined className="text-4xl text-green-500 mb-2" />
              <Title level={4}>Soil Health</Title>
              <Paragraph>Improve soil quality and fertility</Paragraph>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default AgriculturalAdvice; 