// Dummy data for CML Livelihood Project Tracking
// This will be replaced with backend API calls later

export const farmers = [
  {
    id: 1,
    name: "Rajesh Kumar",
    village: "Dibrugarh",
    district: "Dibrugarh",
    state: "Assam",
    phone: "+91-9876543210",
    landSize: 2.5,
    landOwnership: "Owned",
    irrigationMethod: "Tube Well",
    projectType: "Horticulture",
    cropType: "Tomato",
    joinDate: "2024-01-15",
    trainingAttendance: 8,
    totalProduction: 1200,
    totalSales: 48000,
    status: "Active"
  },
  {
    id: 2,
    name: "Priya Devi",
    village: "Jorhat",
    district: "Jorhat", 
    state: "Assam",
    phone: "+91-9876543211",
    landSize: 1.8,
    landOwnership: "Leased",
    irrigationMethod: "Canal",
    projectType: "Livestock",
    cropType: "Dairy",
    joinDate: "2024-02-20",
    trainingAttendance: 6,
    totalProduction: 800,
    totalSales: 32000,
    status: "Active"
  },
  {
    id: 3,
    name: "Amit Singh",
    village: "Guwahati",
    district: "Kamrup",
    state: "Assam",
    phone: "+91-9876543212",
    landSize: 3.2,
    landOwnership: "Owned",
    irrigationMethod: "Drip Irrigation",
    projectType: "Horticulture",
    cropType: "Capsicum",
    joinDate: "2024-01-10",
    trainingAttendance: 10,
    totalProduction: 1500,
    totalSales: 60000,
    status: "Active"
  },
  {
    id: 4,
    name: "Sunita Das",
    village: "Silchar",
    district: "Cachar",
    state: "Assam",
    phone: "+91-9876543213",
    landSize: 1.5,
    landOwnership: "Owned",
    irrigationMethod: "Rainfed",
    projectType: "Horticulture",
    cropType: "Cabbage",
    joinDate: "2024-03-05",
    trainingAttendance: 4,
    totalProduction: 600,
    totalSales: 18000,
    status: "Active"
  },
  {
    id: 5,
    name: "Bikram Bora",
    village: "Tezpur",
    district: "Sonitpur",
    state: "Assam",
    phone: "+91-9876543214",
    landSize: 2.0,
    landOwnership: "Leased",
    irrigationMethod: "Sprinkler",
    projectType: "Livestock",
    cropType: "Poultry",
    joinDate: "2024-02-15",
    trainingAttendance: 7,
    totalProduction: 1000,
    totalSales: 45000,
    status: "Active"
  }
];

export const projectStats = {
  totalFarmers: 156,
  activeFarmers: 142,
  horticultureFarmers: 89,
  livestockFarmers: 67,
  totalProduction: 125000,
  totalSales: 4850000,
  averageTrainingAttendance: 7.2,
  projectCompletion: 78
};

export const monthlyData = [
  { month: 'Jan', production: 8500, sales: 340000, newFarmers: 12 },
  { month: 'Feb', production: 9200, sales: 368000, newFarmers: 15 },
  { month: 'Mar', production: 10500, sales: 420000, newFarmers: 18 },
  { month: 'Apr', production: 11800, sales: 472000, newFarmers: 22 },
  { month: 'May', production: 13200, sales: 528000, newFarmers: 25 },
  { month: 'Jun', production: 14500, sales: 580000, newFarmers: 28 }
];

export const trainingSessions = [
  {
    id: 1,
    title: "Organic Farming Techniques",
    date: "2024-06-15",
    location: "Dibrugarh",
    attendees: 45,
    trainer: "Dr. Anil Kumar",
    status: "Completed"
  },
  {
    id: 2,
    title: "Dairy Management",
    date: "2024-06-20",
    location: "Jorhat",
    attendees: 32,
    trainer: "Dr. Priya Sharma",
    status: "Scheduled"
  },
  {
    id: 3,
    title: "Pest Management",
    date: "2024-06-25",
    location: "Guwahati",
    attendees: 38,
    trainer: "Dr. Rajesh Patel",
    status: "Scheduled"
  }
];

export const agriculturalAdvice = [
  {
    id: 1,
    title: "Monsoon Season Farming Tips",
    content: "Prepare your fields for monsoon. Ensure proper drainage and use organic fertilizers. Monitor for pest outbreaks.",
    category: "Seasonal",
    applicableCrops: ["Rice", "Vegetables"],
    date: "2024-06-01"
  },
  {
    id: 2,
    title: "Tomato Cultivation Guide",
    content: "Plant tomatoes in well-drained soil. Maintain 2-3 feet spacing. Water regularly but avoid overwatering.",
    category: "Crop Specific",
    applicableCrops: ["Tomato"],
    date: "2024-06-05"
  },
  {
    id: 3,
    title: "Dairy Cow Health Management",
    content: "Ensure clean drinking water. Regular vaccination schedule. Maintain proper feeding schedule.",
    category: "Livestock",
    applicableCrops: ["Dairy"],
    date: "2024-06-10"
  }
];

export const districts = [
  "Dibrugarh", "Jorhat", "Guwahati", "Silchar", "Tezpur", "Tinsukia", "Sivasagar", "Golaghat"
];

export const projectTypes = [
  "Horticulture", "Livestock", "Poultry", "Dairy", "Fishery"
];

export const cropTypes = [
  "Tomato", "Capsicum", "Cabbage", "Cauliflower", "Potato", "Onion", "Rice", "Wheat", "Corn"
];

export const livestockTypes = [
  "Dairy", "Poultry", "Goat", "Pig", "Fish"
]; 