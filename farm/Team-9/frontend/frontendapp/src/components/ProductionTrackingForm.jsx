import React, { useState } from 'react';
import { 
  Form, 
  Input, 
  Select, 
  DatePicker, 
  Button, 
  Card, 
  Row, 
  Col, 
  message, 
  Divider,
  InputNumber,
  Table,
  Tag
} from 'antd';
import { TrophyOutlined, DollarOutlined, CalendarOutlined, UserOutlined } from '@ant-design/icons';
import { farmers, cropTypes, livestockTypes } from '../data/dummyData';
import dayjs from 'dayjs';

const { Option } = Select;
const { TextArea } = Input;

const ProductionTrackingForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [selectedFarmer, setSelectedFarmer] = useState(null);
  const [productionHistory, setProductionHistory] = useState([
    {
      id: 1,
      farmerName: "Rajesh Kumar",
      date: "2024-06-15",
      production: 150,
      sales: 6000,
      notes: "Good quality tomatoes"
    },
    {
      id: 2,
      farmerName: "Priya Devi",
      date: "2024-06-14",
      production: 80,
      sales: 3200,
      notes: "Dairy products"
    }
  ]);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      // Simulate API call - replace with actual backend integration later
      console.log('Production tracking values:', values);
      
      const newProductionRecord = {
        id: Date.now(),
        farmerName: selectedFarmer?.name || values.farmerName,
        date: values.date.format('YYYY-MM-DD'),
        production: values.production,
        sales: values.sales,
        notes: values.notes || '',
        farmerId: selectedFarmer?.id
      };

      console.log('New production record:', newProductionRecord);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Add to local state (replace with backend call later)
      setProductionHistory(prev => [newProductionRecord, ...prev]);
      
      message.success('Production data recorded successfully!');
      form.resetFields();
      setSelectedFarmer(null);
      
    } catch (error) {
      console.error('Production tracking error:', error);
      message.error('Failed to record production data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    message.error('Please check the form and try again.');
  };

  const handleFarmerSelect = (farmerId) => {
    const farmer = farmers.find(f => f.id === parseInt(farmerId));
    setSelectedFarmer(farmer);
  };

  const productionHistoryColumns = [
    {
      title: 'Farmer Name',
      dataIndex: 'farmerName',
      key: 'farmerName',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Production (kg)',
      dataIndex: 'production',
      key: 'production',
    },
    {
      title: 'Sales (₹)',
      dataIndex: 'sales',
      key: 'sales',
      render: (value) => `₹${value.toLocaleString()}`,
    },
    {
      title: 'Notes',
      dataIndex: 'notes',
      key: 'notes',
      ellipsis: true,
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <Card 
          title={
            <div className="flex items-center">
              <TrophyOutlined className="mr-2 text-green-500" />
              <span className="text-xl font-semibold">Production Tracking Form</span>
            </div>
          }
          className="shadow-lg mb-6"
        >
          <Form
            form={form}
            name="productionTracking"
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            {/* Farmer Selection */}
            <Divider orientation="left">Farmer Information</Divider>
            <Row gutter={16}>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="farmerId"
                  label="Select Farmer"
                  rules={[{ required: true, message: 'Please select a farmer!' }]}
                >
                  <Select 
                    placeholder="Search and select farmer"
                    size="large"
                    showSearch
                    filterOption={(input, option) =>
                      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                    onChange={handleFarmerSelect}
                  >
                    {farmers.map(farmer => (
                      <Option key={farmer.id} value={farmer.id}>
                        {farmer.name} - {farmer.village} ({farmer.projectType})
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="date"
                  label="Production Date"
                  rules={[{ required: true, message: 'Please select production date!' }]}
                >
                  <DatePicker 
                    placeholder="Select production date"
                    size="large"
                    style={{ width: '100%' }}
                    disabledDate={(current) => current && current > dayjs().endOf('day')}
                  />
                </Form.Item>
              </Col>
            </Row>

            {/* Selected Farmer Info */}
            {selectedFarmer && (
              <Row gutter={16} className="mb-4">
                <Col span={24}>
                  <Card size="small" className="bg-blue-50">
                    <Row gutter={16}>
                      <Col xs={24} sm={6}>
                        <strong>Name:</strong> {selectedFarmer.name}
                      </Col>
                      <Col xs={24} sm={6}>
                        <strong>Village:</strong> {selectedFarmer.village}
                      </Col>
                      <Col xs={24} sm={6}>
                        <strong>Project:</strong> 
                        <Tag color={selectedFarmer.projectType === 'Horticulture' ? 'green' : 'blue'} className="ml-1">
                          {selectedFarmer.projectType}
                        </Tag>
                      </Col>
                      <Col xs={24} sm={6}>
                        <strong>Type:</strong> {selectedFarmer.cropType}
                      </Col>
                    </Row>
                  </Card>
                </Col>
              </Row>
            )}

            {/* Production Data */}
            <Divider orientation="left">Production Data</Divider>
            <Row gutter={16}>
              <Col xs={24} sm={8}>
                <Form.Item
                  name="production"
                  label="Production Quantity (kg)"
                  rules={[{ required: true, message: 'Please enter production quantity!' }]}
                >
                  <InputNumber
                    min={0.1}
                    max={10000}
                    step={0.1}
                    placeholder="150.5"
                    size="large"
                    style={{ width: '100%' }}
                    prefix={<TrophyOutlined />}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={8}>
                <Form.Item
                  name="sales"
                  label="Sales Amount (₹)"
                  rules={[{ required: true, message: 'Please enter sales amount!' }]}
                >
                  <InputNumber
                    min={0}
                    max={1000000}
                    step={100}
                    placeholder="6000"
                    size="large"
                    style={{ width: '100%' }}
                    prefix={<DollarOutlined />}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={8}>
                <Form.Item
                  name="quality"
                  label="Quality Grade"
                >
                  <Select placeholder="Select quality grade" size="large">
                    <Option value="A">Grade A (Excellent)</Option>
                    <Option value="B">Grade B (Good)</Option>
                    <Option value="C">Grade C (Average)</Option>
                    <Option value="D">Grade D (Below Average)</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col xs={24}>
                <Form.Item
                  name="notes"
                  label="Additional Notes"
                >
                  <TextArea 
                    rows={3}
                    placeholder="Any notes about production quality, market conditions, challenges faced..."
                  />
                </Form.Item>
              </Col>
            </Row>

            {/* Form Actions */}
            <Divider />
            <Row gutter={16} justify="center">
              <Col>
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  size="large"
                  loading={loading}
                  icon={<TrophyOutlined />}
                >
                  Record Production
                </Button>
              </Col>
              <Col>
                <Button 
                  size="large"
                  onClick={() => {
                    form.resetFields();
                    setSelectedFarmer(null);
                  }}
                >
                  Reset Form
                </Button>
              </Col>
            </Row>
          </Form>
        </Card>

        {/* Production History */}
        <Card 
          title={
            <div className="flex items-center">
              <CalendarOutlined className="mr-2 text-blue-500" />
              <span className="text-lg font-semibold">Recent Production Records</span>
            </div>
          }
          className="shadow-lg"
        >
          <Table
            columns={productionHistoryColumns}
            dataSource={productionHistory}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} records`,
            }}
            rowKey="id"
            size="middle"
          />
        </Card>
      </div>
    </div>
  );
};

export default ProductionTrackingForm; 