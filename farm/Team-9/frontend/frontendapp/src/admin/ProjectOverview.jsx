import React, { useState } from 'react';
import { 
  Card, 
  Row, 
  Col, 
  Statistic, 
  Typography, 
  Table, 
  Button, 
  Modal, 
  Form, 
  Input, 
  Select, 
  DatePicker, 
  Space, 
  Tag, 
  Progress, 
  Tabs,
  Descriptions,
  Timeline,
  message
} from 'antd';
import { 
  TeamOutlined, 
  TrophyOutlined, 
  CalendarOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TabPane } = Tabs;

const ProjectOverview = () => {
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: 'Rice Cultivation Program',
      type: 'agriculture',
      status: 'active',
      startDate: '2024-01-15',
      endDate: '2024-12-31',
      participants: 156,
      budget: 50000,
      progress: 65,
      coordinator: 'John Smith',
      description: 'Sustainable rice cultivation program for local farmers',
      milestones: [
        { title: 'Project Planning', completed: true, date: '2024-01-20' },
        { title: 'Farmer Registration', completed: true, date: '2024-02-15' },
        { title: 'Training Sessions', completed: true, date: '2024-03-10' },
        { title: 'Planting Phase', completed: false, date: '2024-04-01' },
        { title: 'Harvest Phase', completed: false, date: '2024-11-15' }
      ]
    },
    {
      id: 2,
      name: 'Vegetable Farming Initiative',
      type: 'horticulture',
      status: 'active',
      startDate: '2024-02-01',
      endDate: '2024-08-31',
      participants: 134,
      budget: 35000,
      progress: 45,
      coordinator: 'Jane Doe',
      description: 'Organic vegetable farming project for sustainable income',
      milestones: [
        { title: 'Site Selection', completed: true, date: '2024-02-10' },
        { title: 'Soil Preparation', completed: true, date: '2024-02-25' },
        { title: 'Seed Distribution', completed: false, date: '2024-03-15' },
        { title: 'Harvest & Marketing', completed: false, date: '2024-07-30' }
      ]
    },
    {
      id: 3,
      name: 'Poultry Farming Project',
      type: 'livestock',
      status: 'completed',
      startDate: '2023-06-01',
      endDate: '2024-01-31',
      participants: 98,
      budget: 25000,
      progress: 100,
      coordinator: 'Mike Johnson',
      description: 'Small-scale poultry farming for income generation',
      milestones: [
        { title: 'Infrastructure Setup', completed: true, date: '2023-06-15' },
        { title: 'Bird Procurement', completed: true, date: '2023-07-01' },
        { title: 'Training & Care', completed: true, date: '2023-08-15' },
        { title: 'Marketing & Sales', completed: true, date: '2024-01-15' }
      ]
    }
  ]);

  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [viewingProject, setViewingProject] = useState(null);
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();

  const projectTypes = [
    { value: 'agriculture', label: 'Agriculture', color: 'green' },
    { value: 'horticulture', label: 'Horticulture', color: 'blue' },
    { value: 'livestock', label: 'Livestock', color: 'orange' },
    { value: 'fishery', label: 'Fishery', color: 'cyan' },
    { value: 'dairy', label: 'Dairy', color: 'purple' }
  ];

  const projectStatuses = [
    { value: 'planning', label: 'Planning', color: 'default' },
    { value: 'active', label: 'Active', color: 'processing' },
    { value: 'completed', label: 'Completed', color: 'success' },
    { value: 'on_hold', label: 'On Hold', color: 'warning' },
    { value: 'cancelled', label: 'Cancelled', color: 'error' }
  ];

  const columns = [
    {
      title: 'Project Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <Text strong>{text}</Text>
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type) => {
        const typeConfig = projectTypes.find(t => t.value === type);
        return <Tag color={typeConfig.color}>{typeConfig.label}</Tag>;
      }
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const statusConfig = projectStatuses.find(s => s.value === status);
        return <Tag color={statusConfig.color}>{statusConfig.label}</Tag>;
      }
    },
    {
      title: 'Progress',
      dataIndex: 'progress',
      key: 'progress',
      render: (progress) => <Progress percent={progress} size="small" />
    },
    {
      title: 'Participants',
      dataIndex: 'participants',
      key: 'participants',
      render: (participants) => (
        <Space>
          <TeamOutlined />
          <Text>{participants}</Text>
        </Space>
      )
    },
    {
      title: 'Budget',
      dataIndex: 'budget',
      key: 'budget',
      render: (budget) => <Text>${budget.toLocaleString()}</Text>
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button 
            type="primary" 
            icon={<EyeOutlined />} 
            size="small"
            onClick={() => handleViewProject(record)}
          >
            View
          </Button>
          <Button 
            icon={<EditOutlined />} 
            size="small"
            onClick={() => handleEditProject(record)}
          >
            Edit
          </Button>
          <Button 
            type="primary" 
            danger 
            icon={<DeleteOutlined />} 
            size="small"
            onClick={() => handleDeleteProject(record.id)}
          >
            Delete
          </Button>
        </Space>
      )
    }
  ];

  const handleAddProject = (values) => {
    const newProject = {
      id: projects.length + 1,
      ...values,
      progress: 0,
      milestones: []
    };
    setProjects([...projects, newProject]);
    setIsAddModalVisible(false);
    form.resetFields();
    message.success('Project added successfully!');
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
    editForm.setFieldsValue(project);
    setIsEditModalVisible(true);
  };

  const handleUpdateProject = (values) => {
    const updatedProjects = projects.map(project => 
      project.id === editingProject.id ? { ...project, ...values } : project
    );
    setProjects(updatedProjects);
    setIsEditModalVisible(false);
    setEditingProject(null);
    editForm.resetFields();
    message.success('Project updated successfully!');
  };

  const handleViewProject = (project) => {
    setViewingProject(project);
    setIsViewModalVisible(true);
  };

  const handleDeleteProject = (projectId) => {
    setProjects(projects.filter(project => project.id !== projectId));
    message.success('Project deleted successfully!');
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircleOutlined style={{ color: '#52c41a' }} />;
      case 'active':
        return <ClockCircleOutlined style={{ color: '#1890ff' }} />;
      case 'on_hold':
        return <ExclamationCircleOutlined style={{ color: '#faad14' }} />;
      default:
        return <ClockCircleOutlined />;
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <Title level={2}>Project Overview</Title>
        <Text type="secondary">
          Monitor and manage all livelihood projects
        </Text>
      </div>

      {/* Statistics */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Projects"
              value={projects.length}
              prefix={<TeamOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Active Projects"
              value={projects.filter(p => p.status === 'active').length}
              prefix={<TrophyOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Participants"
              value={projects.reduce((sum, p) => sum + p.participants, 0)}
              prefix={<TeamOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Budget"
              value={projects.reduce((sum, p) => sum + p.budget, 0)}
              prefix="$"
              valueStyle={{ color: '#722ed1' }}
              formatter={(value) => value.toLocaleString()}
            />
          </Card>
        </Col>
      </Row>

      {/* Project Table */}
      <Card 
        title="All Projects" 
        extra={
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            onClick={() => setIsAddModalVisible(true)}
          >
            Add Project
          </Button>
        }
      >
        <Table 
          columns={columns} 
          dataSource={projects} 
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </Card>

      {/* Add Project Modal */}
      <Modal
        title="Add New Project"
        open={isAddModalVisible}
        onCancel={() => setIsAddModalVisible(false)}
        footer={null}
        width={800}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleAddProject}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Project Name"
                rules={[{ required: true, message: 'Please enter project name' }]}
              >
                <Input placeholder="Enter project name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="type"
                label="Project Type"
                rules={[{ required: true, message: 'Please select project type' }]}
              >
                <Select placeholder="Select project type">
                  {projectTypes.map(type => (
                    <Option key={type.value} value={type.value}>{type.label}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="startDate"
                label="Start Date"
                rules={[{ required: true, message: 'Please select start date' }]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="endDate"
                label="End Date"
                rules={[{ required: true, message: 'Please select end date' }]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="participants"
                label="Expected Participants"
                rules={[{ required: true, message: 'Please enter number of participants' }]}
              >
                <Input type="number" placeholder="Enter number of participants" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="budget"
                label="Project Budget ($)"
                rules={[{ required: true, message: 'Please enter project budget' }]}
              >
                <Input type="number" placeholder="Enter budget amount" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="description"
            label="Project Description"
            rules={[{ required: true, message: 'Please enter project description' }]}
          >
            <Input.TextArea rows={4} placeholder="Enter project description" />
          </Form.Item>

          <Form.Item
            name="coordinator"
            label="Project Coordinator"
            rules={[{ required: true, message: 'Please enter coordinator name' }]}
          >
            <Input placeholder="Enter coordinator name" />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Add Project
              </Button>
              <Button onClick={() => setIsAddModalVisible(false)}>
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* Edit Project Modal */}
      <Modal
        title="Edit Project"
        open={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        footer={null}
        width={800}
      >
        <Form
          form={editForm}
          layout="vertical"
          onFinish={handleUpdateProject}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Project Name"
                rules={[{ required: true, message: 'Please enter project name' }]}
              >
                <Input placeholder="Enter project name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="type"
                label="Project Type"
                rules={[{ required: true, message: 'Please select project type' }]}
              >
                <Select placeholder="Select project type">
                  {projectTypes.map(type => (
                    <Option key={type.value} value={type.value}>{type.label}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="startDate"
                label="Start Date"
                rules={[{ required: true, message: 'Please select start date' }]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="endDate"
                label="End Date"
                rules={[{ required: true, message: 'Please select end date' }]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="participants"
                label="Expected Participants"
                rules={[{ required: true, message: 'Please enter number of participants' }]}
              >
                <Input type="number" placeholder="Enter number of participants" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="budget"
                label="Project Budget ($)"
                rules={[{ required: true, message: 'Please enter project budget' }]}
              >
                <Input type="number" placeholder="Enter budget amount" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="description"
            label="Project Description"
            rules={[{ required: true, message: 'Please enter project description' }]}
          >
            <Input.TextArea rows={4} placeholder="Enter project description" />
          </Form.Item>

          <Form.Item
            name="coordinator"
            label="Project Coordinator"
            rules={[{ required: true, message: 'Please enter coordinator name' }]}
          >
            <Input placeholder="Enter coordinator name" />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Update Project
              </Button>
              <Button onClick={() => setIsEditModalVisible(false)}>
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* View Project Modal */}
      <Modal
        title="Project Details"
        open={isViewModalVisible}
        onCancel={() => setIsViewModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setIsViewModalVisible(false)}>
            Close
          </Button>
        ]}
        width={800}
      >
        {viewingProject && (
          <div>
            <Descriptions title="" bordered column={2}>
              <Descriptions.Item label="Project Name" span={2}>
                <Text strong>{viewingProject.name}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="Type">
                <Tag color={projectTypes.find(t => t.value === viewingProject.type)?.color}>
                  {projectTypes.find(t => t.value === viewingProject.type)?.label}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Status">
                <Space>
                  {getStatusIcon(viewingProject.status)}
                  <Tag color={projectStatuses.find(s => s.value === viewingProject.status)?.color}>
                    {projectStatuses.find(s => s.value === viewingProject.status)?.label}
                  </Tag>
                </Space>
              </Descriptions.Item>
              <Descriptions.Item label="Start Date">{viewingProject.startDate}</Descriptions.Item>
              <Descriptions.Item label="End Date">{viewingProject.endDate}</Descriptions.Item>
              <Descriptions.Item label="Participants">{viewingProject.participants}</Descriptions.Item>
              <Descriptions.Item label="Budget">${viewingProject.budget.toLocaleString()}</Descriptions.Item>
              <Descriptions.Item label="Progress" span={2}>
                <Progress percent={viewingProject.progress} />
              </Descriptions.Item>
              <Descriptions.Item label="Coordinator">{viewingProject.coordinator}</Descriptions.Item>
              <Descriptions.Item label="Description" span={2}>
                {viewingProject.description}
              </Descriptions.Item>
            </Descriptions>

            <Divider />

            <Title level={4}>Project Milestones</Title>
            <Timeline>
              {viewingProject.milestones.map((milestone, index) => (
                <Timeline.Item 
                  key={index}
                  color={milestone.completed ? 'green' : 'blue'}
                  dot={milestone.completed ? <CheckCircleOutlined /> : <ClockCircleOutlined />}
                >
                  <Text strong>{milestone.title}</Text>
                  <br />
                  <Text type="secondary">{milestone.date}</Text>
                  {milestone.completed && (
                    <Tag color="green" style={{ marginLeft: 8 }}>Completed</Tag>
                  )}
                </Timeline.Item>
              ))}
            </Timeline>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ProjectOverview; 