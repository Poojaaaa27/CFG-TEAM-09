import React, { useState } from 'react';
import { 
  Card, 
  Table, 
  Button, 
  Modal, 
  Form, 
  Input, 
  Select, 
  Space, 
  Popconfirm, 
  message, 
  Tag,
  Typography,
  Row,
  Col,
  Divider
} from 'antd';
import { 
  UserAddOutlined, 
  DeleteOutlined, 
  EditOutlined, 
  SearchOutlined,
  UserOutlined,
  TeamOutlined,
  CrownOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { Option } = Select;

const UserManagement = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@cml.com',
      role: 'admin',
      status: 'active',
      createdAt: '2024-01-15'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@cml.com',
      role: 'cml_staff',
      status: 'active',
      createdAt: '2024-01-20'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike.johnson@cml.com',
      role: 'farmer',
      status: 'inactive',
      createdAt: '2024-02-01'
    }
  ]);

  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();

  // Add User Form
  const handleAddUser = (values) => {
    const newUser = {
      id: users.length + 1,
      ...values,
      status: 'active',
      createdAt: new Date().toISOString().split('T')[0]
    };
    setUsers([...users, newUser]);
    setIsAddModalVisible(false);
    form.resetFields();
    message.success('User added successfully!');
  };

  // Edit User Form
  const handleEditUser = (values) => {
    const updatedUsers = users.map(user => 
      user.id === editingUser.id ? { ...user, ...values } : user
    );
    setUsers(updatedUsers);
    setIsEditModalVisible(false);
    setEditingUser(null);
    editForm.resetFields();
    message.success('User updated successfully!');
  };

  // Delete User
  const handleDeleteUser = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
    message.success('User deleted successfully!');
  };

  // Open Edit Modal
  const openEditModal = (user) => {
    setEditingUser(user);
    editForm.setFieldsValue(user);
    setIsEditModalVisible(true);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <Text strong>{text}</Text>
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role) => {
        const roleConfig = {
          admin: { color: 'red', icon: <CrownOutlined />, text: 'Admin' },
          cml_staff: { color: 'blue', icon: <TeamOutlined />, text: 'CML Staff' },
          farmer: { color: 'green', icon: <UserOutlined />, text: 'Farmer' }
        };
        const config = roleConfig[role];
        return (
          <Tag color={config.color} icon={config.icon}>
            {config.text}
          </Tag>
        );
      }
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'active' ? 'green' : 'red'}>
          {status === 'active' ? 'Active' : 'Inactive'}
        </Tag>
      )
    },
    {
      title: 'Created',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button 
            type="primary" 
            icon={<EditOutlined />} 
            size="small"
            onClick={() => openEditModal(record)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this user?"
            onConfirm={() => handleDeleteUser(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button 
              type="primary" 
              danger 
              icon={<DeleteOutlined />} 
              size="small"
            >
              Delete
            </Button>
          </Popconfirm>
        </Space>
      )
    }
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <Title level={2}>User Management</Title>
        <Text type="secondary">
          Manage system users, roles, and permissions
        </Text>
      </div>

      {/* Statistics */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} sm={8}>
          <Card>
            <div className="text-center">
              <Title level={3} style={{ color: '#1890ff' }}>{users.length}</Title>
              <Text>Total Users</Text>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <div className="text-center">
              <Title level={3} style={{ color: '#52c41a' }}>
                {users.filter(u => u.status === 'active').length}
              </Title>
              <Text>Active Users</Text>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <div className="text-center">
              <Title level={3} style={{ color: '#faad14' }}>
                {users.filter(u => u.role === 'admin').length}
              </Title>
              <Text>Administrators</Text>
            </div>
          </Card>
        </Col>
      </Row>

      {/* User Table */}
      <Card 
        title="User List" 
        extra={
          <Button 
            type="primary" 
            icon={<UserAddOutlined />}
            onClick={() => setIsAddModalVisible(true)}
          >
            Add User
          </Button>
        }
      >
        <Table 
          columns={columns} 
          dataSource={users} 
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </Card>

      {/* Add User Modal */}
      <Modal
        title="Add New User"
        open={isAddModalVisible}
        onCancel={() => setIsAddModalVisible(false)}
        footer={null}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleAddUser}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Full Name"
                rules={[{ required: true, message: 'Please enter full name' }]}
              >
                <Input placeholder="Enter full name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: 'Please enter email' },
                  { type: 'email', message: 'Please enter valid email' }
                ]}
              >
                <Input placeholder="Enter email address" />
              </Form.Item>
            </Col>
          </Row>
          
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="role"
                label="Role"
                rules={[{ required: true, message: 'Please select role' }]}
              >
                <Select placeholder="Select role">
                  <Option value="admin">Admin</Option>
                  <Option value="cml_staff">CML Staff</Option>
                  <Option value="farmer">Farmer</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="password"
                label="Password"
                rules={[{ required: true, message: 'Please enter password' }]}
              >
                <Input.Password placeholder="Enter password" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Add User
              </Button>
              <Button onClick={() => setIsAddModalVisible(false)}>
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* Edit User Modal */}
      <Modal
        title="Edit User"
        open={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        footer={null}
        width={600}
      >
        <Form
          form={editForm}
          layout="vertical"
          onFinish={handleEditUser}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Full Name"
                rules={[{ required: true, message: 'Please enter full name' }]}
              >
                <Input placeholder="Enter full name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: 'Please enter email' },
                  { type: 'email', message: 'Please enter valid email' }
                ]}
              >
                <Input placeholder="Enter email address" />
              </Form.Item>
            </Col>
          </Row>
          
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="role"
                label="Role"
                rules={[{ required: true, message: 'Please select role' }]}
              >
                <Select placeholder="Select role">
                  <Option value="admin">Admin</Option>
                  <Option value="cml_staff">CML Staff</Option>
                  <Option value="farmer">Farmer</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="status"
                label="Status"
                rules={[{ required: true, message: 'Please select status' }]}
              >
                <Select placeholder="Select status">
                  <Option value="active">Active</Option>
                  <Option value="inactive">Inactive</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Update User
              </Button>
              <Button onClick={() => setIsEditModalVisible(false)}>
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserManagement; 