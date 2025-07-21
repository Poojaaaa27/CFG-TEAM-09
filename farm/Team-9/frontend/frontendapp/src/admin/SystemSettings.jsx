import React, { useState } from 'react';
import { 
  Card, 
  Row, 
  Col, 
  Typography, 
  Form, 
  Input, 
  Select, 
  Switch, 
  InputNumber, 
  Button, 
  Space, 
  Divider,
  Tabs,
  Upload,
  message,
  Alert,
  TimePicker,
  Checkbox,
  Radio
} from 'antd';
import { 
  SettingOutlined, 
  SecurityScanOutlined, 
  DatabaseOutlined,
  NotificationOutlined,
  UserOutlined,
  SaveOutlined,
  ReloadOutlined,
  UploadOutlined
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { TabPane } = Tabs;

const SystemSettings = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // Mock settings data
  const [settings, setSettings] = useState({
    general: {
      siteName: 'CML Livelihood Tracker',
      siteDescription: 'Comprehensive livelihood tracking system for community development',
      timezone: 'Asia/Kolkata',
      dateFormat: 'DD/MM/YYYY',
      timeFormat: '24',
      language: 'en',
      maintenanceMode: false
    },
    security: {
      sessionTimeout: 30,
      passwordMinLength: 8,
      requireStrongPassword: true,
      maxLoginAttempts: 5,
      lockoutDuration: 15,
      enableTwoFactor: false,
      sslRequired: true
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: false,
      pushNotifications: true,
      adminAlerts: true,
      userRegistrationAlerts: true,
      projectUpdates: true,
      systemMaintenance: true
    },
    database: {
      backupFrequency: 'daily',
      backupRetention: 30,
      autoBackup: true,
      backupTime: '02:00',
      compressionEnabled: true,
      encryptionEnabled: true
    },
    email: {
      smtpHost: 'smtp.gmail.com',
      smtpPort: 587,
      smtpUsername: 'admin@cml.com',
      smtpPassword: '********',
      fromEmail: 'noreply@cml.com',
      fromName: 'CML System',
      enableSSL: true
    }
  });

  const handleSaveSettings = async (values) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSettings({ ...settings, ...values });
      message.success('Settings saved successfully!');
    } catch (error) {
      message.error('Failed to save settings');
    } finally {
      setLoading(false);
    }
  };

  const handleResetSettings = () => {
    form.resetFields();
    message.info('Settings reset to default values');
  };

  const handleTestEmail = () => {
    message.success('Test email sent successfully!');
  };

  const handleBackupNow = () => {
    message.success('Database backup initiated successfully!');
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <Title level={2}>System Settings</Title>
        <Text type="secondary">
          Configure system parameters and preferences
        </Text>
      </div>

      <Tabs defaultActiveKey="general" size="large">
        {/* General Settings */}
        <TabPane 
          tab={
            <span>
              <SettingOutlined />
              General
            </span>
          } 
          key="general"
        >
          <Card>
            <Form
              form={form}
              layout="vertical"
              initialValues={settings.general}
              onFinish={handleSaveSettings}
            >
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="siteName"
                    label="Site Name"
                    rules={[{ required: true, message: 'Please enter site name' }]}
                  >
                    <Input placeholder="Enter site name" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="timezone"
                    label="Timezone"
                    rules={[{ required: true, message: 'Please select timezone' }]}
                  >
                    <Select placeholder="Select timezone">
                      <Option value="Asia/Kolkata">Asia/Kolkata (IST)</Option>
                      <Option value="UTC">UTC</Option>
                      <Option value="America/New_York">America/New_York (EST)</Option>
                      <Option value="Europe/London">Europe/London (GMT)</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="dateFormat"
                    label="Date Format"
                    rules={[{ required: true, message: 'Please select date format' }]}
                  >
                    <Select placeholder="Select date format">
                      <Option value="DD/MM/YYYY">DD/MM/YYYY</Option>
                      <Option value="MM/DD/YYYY">MM/DD/YYYY</Option>
                      <Option value="YYYY-MM-DD">YYYY-MM-DD</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="timeFormat"
                    label="Time Format"
                    rules={[{ required: true, message: 'Please select time format' }]}
                  >
                    <Radio.Group>
                      <Radio value="12">12-hour</Radio>
                      <Radio value="24">24-hour</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="language"
                    label="Default Language"
                    rules={[{ required: true, message: 'Please select language' }]}
                  >
                    <Select placeholder="Select language">
                      <Option value="en">English</Option>
                      <Option value="hi">Hindi</Option>
                      <Option value="es">Spanish</Option>
                      <Option value="fr">French</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="maintenanceMode"
                    label="Maintenance Mode"
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                </Col>
                <Col xs={24}>
                  <Form.Item
                    name="siteDescription"
                    label="Site Description"
                  >
                    <Input.TextArea rows={3} placeholder="Enter site description" />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Card>
        </TabPane>

        {/* Security Settings */}
        <TabPane 
          tab={
            <span>
              <SecurityScanOutlined />
              Security
            </span>
          } 
          key="security"
        >
          <Card>
            <Form
              layout="vertical"
              initialValues={settings.security}
              onFinish={handleSaveSettings}
            >
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="sessionTimeout"
                    label="Session Timeout (minutes)"
                    rules={[{ required: true, message: 'Please enter session timeout' }]}
                  >
                    <InputNumber min={5} max={480} style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="passwordMinLength"
                    label="Minimum Password Length"
                    rules={[{ required: true, message: 'Please enter minimum password length' }]}
                  >
                    <InputNumber min={6} max={20} style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="maxLoginAttempts"
                    label="Maximum Login Attempts"
                    rules={[{ required: true, message: 'Please enter maximum login attempts' }]}
                  >
                    <InputNumber min={3} max={10} style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="lockoutDuration"
                    label="Lockout Duration (minutes)"
                    rules={[{ required: true, message: 'Please enter lockout duration' }]}
                  >
                    <InputNumber min={5} max={60} style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="requireStrongPassword"
                    label="Require Strong Password"
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="enableTwoFactor"
                    label="Enable Two-Factor Authentication"
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="sslRequired"
                    label="Require SSL Connection"
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Card>
        </TabPane>

        {/* Notification Settings */}
        <TabPane 
          tab={
            <span>
              <NotificationOutlined />
              Notifications
            </span>
          } 
          key="notifications"
        >
          <Card>
            <Form
              layout="vertical"
              initialValues={settings.notifications}
              onFinish={handleSaveSettings}
            >
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="emailNotifications"
                    label="Email Notifications"
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="smsNotifications"
                    label="SMS Notifications"
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="pushNotifications"
                    label="Push Notifications"
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="adminAlerts"
                    label="Admin Alerts"
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="userRegistrationAlerts"
                    label="User Registration Alerts"
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="projectUpdates"
                    label="Project Updates"
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="systemMaintenance"
                    label="System Maintenance Notifications"
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Card>
        </TabPane>

        {/* Database Settings */}
        <TabPane 
          tab={
            <span>
              <DatabaseOutlined />
              Database
            </span>
          } 
          key="database"
        >
          <Card>
            <Form
              layout="vertical"
              initialValues={settings.database}
              onFinish={handleSaveSettings}
            >
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="backupFrequency"
                    label="Backup Frequency"
                    rules={[{ required: true, message: 'Please select backup frequency' }]}
                  >
                    <Select placeholder="Select backup frequency">
                      <Option value="hourly">Hourly</Option>
                      <Option value="daily">Daily</Option>
                      <Option value="weekly">Weekly</Option>
                      <Option value="monthly">Monthly</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="backupRetention"
                    label="Backup Retention (days)"
                    rules={[{ required: true, message: 'Please enter backup retention period' }]}
                  >
                    <InputNumber min={1} max={365} style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="backupTime"
                    label="Backup Time"
                    rules={[{ required: true, message: 'Please select backup time' }]}
                  >
                    <TimePicker format="HH:mm" style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="autoBackup"
                    label="Automatic Backup"
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="compressionEnabled"
                    label="Enable Compression"
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="encryptionEnabled"
                    label="Enable Encryption"
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                </Col>
              </Row>
              
              <Divider />
              
              <Space>
                <Button 
                  type="primary" 
                  icon={<UploadOutlined />}
                  onClick={handleBackupNow}
                >
                  Backup Now
                </Button>
                <Button icon={<ReloadOutlined />}>
                  Restore from Backup
                </Button>
              </Space>
            </Form>
          </Card>
        </TabPane>

        {/* Email Settings */}
        <TabPane 
          tab={
            <span>
              <UserOutlined />
              Email Configuration
            </span>
          } 
          key="email"
        >
          <Card>
            <Form
              layout="vertical"
              initialValues={settings.email}
              onFinish={handleSaveSettings}
            >
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="smtpHost"
                    label="SMTP Host"
                    rules={[{ required: true, message: 'Please enter SMTP host' }]}
                  >
                    <Input placeholder="Enter SMTP host" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="smtpPort"
                    label="SMTP Port"
                    rules={[{ required: true, message: 'Please enter SMTP port' }]}
                  >
                    <InputNumber min={1} max={65535} style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="smtpUsername"
                    label="SMTP Username"
                    rules={[{ required: true, message: 'Please enter SMTP username' }]}
                  >
                    <Input placeholder="Enter SMTP username" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="smtpPassword"
                    label="SMTP Password"
                    rules={[{ required: true, message: 'Please enter SMTP password' }]}
                  >
                    <Input.Password placeholder="Enter SMTP password" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="fromEmail"
                    label="From Email"
                    rules={[
                      { required: true, message: 'Please enter from email' },
                      { type: 'email', message: 'Please enter valid email' }
                    ]}
                  >
                    <Input placeholder="Enter from email" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="fromName"
                    label="From Name"
                    rules={[{ required: true, message: 'Please enter from name' }]}
                  >
                    <Input placeholder="Enter from name" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="enableSSL"
                    label="Enable SSL"
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                </Col>
              </Row>
              
              <Divider />
              
              <Space>
                <Button 
                  type="primary" 
                  icon={<SaveOutlined />}
                  onClick={handleTestEmail}
                >
                  Test Email Configuration
                </Button>
              </Space>
            </Form>
          </Card>
        </TabPane>
      </Tabs>

      {/* Action Buttons */}
      <div style={{ marginTop: 24, textAlign: 'center' }}>
        <Space size="large">
          <Button 
            type="primary" 
            size="large" 
            icon={<SaveOutlined />}
            loading={loading}
            onClick={() => form.submit()}
          >
            Save All Settings
          </Button>
          <Button 
            size="large" 
            icon={<ReloadOutlined />}
            onClick={handleResetSettings}
          >
            Reset to Default
          </Button>
        </Space>
      </div>

      {/* Information Alert */}
      <Alert
        message="Settings Information"
        description="Changes to system settings will take effect immediately. Some settings may require a system restart to fully apply."
        type="info"
        showIcon
        style={{ marginTop: 24 }}
      />
    </div>
  );
};

export default SystemSettings; 