import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Radio
} from 'antd';
import { UserOutlined, PhoneOutlined, HomeOutlined, CalendarOutlined } from '@ant-design/icons';
import { districts, projectTypes, cropTypes, livestockTypes } from '../data/dummyData';
import { farmerAPI } from '../api/api';
import dayjs from 'dayjs';

const { Option } = Select;
const { TextArea } = Input;

const FarmerRegistrationForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [projectType, setProjectType] = useState('Horticulture');
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      // Format the date
      const formattedValues = {
        ...values,
        joinDate: values.joinDate ? values.joinDate.format('YYYY-MM-DD') : null,
      };

      console.log('Farmer data to be saved:', formattedValues);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Store in localStorage for demo purposes
      const existingFarmers = JSON.parse(localStorage.getItem('farmers') || '[]');
      const newFarmer = {
        id: `FARMER${Date.now()}`,
        ...formattedValues,
        status: 'Active',
        totalProduction: 0,
        totalSales: 0,
        trainingAttendance: 0,
        createdAt: new Date().toISOString()
      };
      
      existingFarmers.push(newFarmer);
      localStorage.setItem('farmers', JSON.stringify(existingFarmers));
      
      message.success('Farmer registered successfully!');
      form.resetFields();
      
      // Navigate to farmer list
      navigate('/cml/farmers');
      
    } catch (error) {
      console.error('Registration error:', error);
      message.error('Failed to register farmer. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    message.error('Please check the form and try again.');
  };

  const handleCancel = () => {
    navigate('/cml/farmers');
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <Card 
          title={
            <div className="flex items-center">
              <UserOutlined className="mr-2 text-blue-500" />
              <span className="text-xl font-semibold">Farmer Registration Form</span>
            </div>
          }
          className="shadow-lg"
        >
          <Form
            form={form}
            name="farmerRegistration"
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            initialValues={{
              state: 'Assam',
              landOwnership: 'Owned',
              irrigationMethod: 'Tube Well'
            }}
          >
            {/* Personal Information */}
            <Divider orientation="left">Personal Information</Divider>
            <Row gutter={16}>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="name"
                  label="Full Name"
                  rules={[
                    { required: true, message: 'Please enter the farmer\'s name!' },
                    { min: 2, message: 'Name must be at least 2 characters!' }
                  ]}
                >
                  <Input 
                    prefix={<UserOutlined />} 
                    placeholder="Enter full name"
                    size="large"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="phone"
                  label="Phone Number"
                  rules={[
                    { required: true, message: 'Please enter phone number!' },
                    { pattern: /^[0-9+\-\s()]+$/, message: 'Please enter a valid phone number!' }
                  ]}
                >
                  <Input 
                    prefix={<PhoneOutlined />} 
                    placeholder="+91-9876543210"
                    size="large"
                  />
                </Form.Item>
              </Col>
            </Row>

            {/* Location Information */}
            <Divider orientation="left">Location Information</Divider>
            <Row gutter={16}>
              <Col xs={24} sm={8}>
                <Form.Item
                  name="village"
                  label="Village"
                  rules={[{ required: true, message: 'Please enter village name!' }]}
                >
                  <Input 
                    prefix={<HomeOutlined />} 
                    placeholder="Enter village name"
                    size="large"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={8}>
                <Form.Item
                  name="district"
                  label="District"
                  rules={[{ required: true, message: 'Please select district!' }]}
                >
                  <Select placeholder="Select district" size="large">
                    {districts.map(district => (
                      <Option key={district} value={district}>{district}</Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} sm={8}>
                <Form.Item
                  name="state"
                  label="State"
                  rules={[{ required: true, message: 'Please select state!' }]}
                >
                  <Select placeholder="Select state" size="large">
                    <Option value="Assam">Assam</Option>
                    <Option value="Arunachal Pradesh">Arunachal Pradesh</Option>
                    <Option value="Manipur">Manipur</Option>
                    <Option value="Meghalaya">Meghalaya</Option>
                    <Option value="Mizoram">Mizoram</Option>
                    <Option value="Nagaland">Nagaland</Option>
                    <Option value="Tripura">Tripura</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            {/* Land Information */}
            <Divider orientation="left">Land Information</Divider>
            <Row gutter={16}>
              <Col xs={24} sm={8}>
                <Form.Item
                  name="landSize"
                  label="Land Size (Acres)"
                  rules={[{ required: true, message: 'Please enter land size!' }]}
                >
                  <InputNumber
                    min={0.1}
                    max={100}
                    step={0.1}
                    placeholder="2.5"
                    size="large"
                    style={{ width: '100%' }}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={8}>
                <Form.Item
                  name="landOwnership"
                  label="Land Ownership"
                  rules={[{ required: true, message: 'Please select land ownership!' }]}
                >
                  <Radio.Group size="large">
                    <Radio.Button value="Owned">Owned</Radio.Button>
                    <Radio.Button value="Leased">Leased</Radio.Button>
                    <Radio.Button value="Rented">Rented</Radio.Button>
                  </Radio.Group>
                </Form.Item>
              </Col>
              <Col xs={24} sm={8}>
                <Form.Item
                  name="irrigationMethod"
                  label="Irrigation Method"
                  rules={[{ required: true, message: 'Please select irrigation method!' }]}
                >
                  <Select placeholder="Select irrigation method" size="large">
                    <Option value="Tube Well">Tube Well</Option>
                    <Option value="Canal">Canal</Option>
                    <Option value="Drip Irrigation">Drip Irrigation</Option>
                    <Option value="Sprinkler">Sprinkler</Option>
                    <Option value="Rainfed">Rainfed</Option>
                    <Option value="Pond">Pond</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            {/* Project Information */}
            <Divider orientation="left">Project Information</Divider>
            <Row gutter={16}>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="projectType"
                  label="Project Type"
                  rules={[{ required: true, message: 'Please select project type!' }]}
                >
                  <Select 
                    placeholder="Select project type" 
                    size="large"
                    onChange={(value) => setProjectType(value)}
                  >
                    {projectTypes.map(type => (
                      <Option key={type} value={type}>{type}</Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="cropType"
                  label={projectType === 'Horticulture' ? 'Crop Type' : 'Livestock Type'}
                  rules={[{ required: true, message: 'Please select type!' }]}
                >
                  <Select placeholder={`Select ${projectType === 'Horticulture' ? 'crop' : 'livestock'} type`} size="large">
                    {projectType === 'Horticulture' 
                      ? cropTypes.map(crop => (
                          <Option key={crop} value={crop}>{crop}</Option>
                        ))
                      : livestockTypes.map(livestock => (
                          <Option key={livestock} value={livestock}>{livestock}</Option>
                        ))
                    }
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="joinDate"
                  label="Project Join Date"
                  rules={[{ required: true, message: 'Please select join date!' }]}
                >
                  <DatePicker 
                    placeholder="Select join date"
                    size="large"
                    style={{ width: '100%' }}
                    disabledDate={(current) => current && current > dayjs().endOf('day')}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="notes"
                  label="Additional Notes"
                >
                  <TextArea 
                    rows={3}
                    placeholder="Any additional information about the farmer or project..."
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
                  icon={<UserOutlined />}
                >
                  Register Farmer
                </Button>
              </Col>
              <Col>
                <Button 
                  size="large"
                  onClick={() => form.resetFields()}
                >
                  Reset Form
                </Button>
              </Col>
              <Col>
                <Button 
                  size="large"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </Col>
            </Row>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default FarmerRegistrationForm; 