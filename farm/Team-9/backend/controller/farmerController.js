const Farmer = require('../models/farmerModel');

const generateCustomId = async (farmerName) => {
  let customId;
  let exists = true;

  while (exists) {
    const randomNum = Math.floor(1000 + Math.random() * 9000); // 4-digit number
    customId = `${farmerName.replace(/\s+/g, '')}${randomNum}`;
    exists = await Farmer.findOne({ id: customId });
  }

  return customId;
};

const addFarmer = async (req, res) => {
  try {
    const {
      name,
      phone,
      village,
      district,
      state,
      landSize,
      landOwnership,
      irrigationMethod,
      projectType,
      cropType,
      joinDate,
      notes
    } = req.body;

    // Validate required fields
    if (!name || !phone || !village || !district || !state || !landSize || !landOwnership || !irrigationMethod || !projectType || !cropType || !joinDate) {
      return res.status(400).json({ 
        success: false,
        message: "All required fields must be provided" 
      });
    }

    const customId = await generateCustomId(name);

    const farmer = new Farmer({
      id: customId,
      name,
      phone,
      village,
      district,
      state,
      landSize,
      landOwnership,
      irrigationMethod,
      projectType,
      cropType,
      joinDate: new Date(joinDate),
      notes,
      status: 'Active'
    });

    const savedFarmer = await farmer.save();
    
    res.status(201).json({
      success: true,
      message: "Farmer registered successfully",
      data: savedFarmer
    });
  } catch (error) {
    console.error('Farmer registration error:', error);
    res.status(500).json({ 
      success: false,
      message: "Failed to register farmer",
      error: error.message 
    });
  }
};

const getFarmers = async (req, res) => {
  try {
    const farmers = await Farmer.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      data: farmers
    });
  } catch (error) {
    console.error('Error fetching farmers:', error);
    res.status(500).json({ 
      success: false,
      message: "Failed to fetch farmers",
      error: error.message 
    });
  }
};

const getFarmerById = async (req, res) => {
  try {
    const { id } = req.params;
    const farmer = await Farmer.findById(id);
    
    if (!farmer) {
      return res.status(404).json({
        success: false,
        message: "Farmer not found"
      });
    }

    res.json({
      success: true,
      data: farmer
    });
  } catch (error) {
    console.error('Error fetching farmer:', error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch farmer",
      error: error.message
    });
  }
};

const updateFarmer = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const farmer = await Farmer.findByIdAndUpdate(
      id,
      { ...updateData, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    if (!farmer) {
      return res.status(404).json({
        success: false,
        message: "Farmer not found"
      });
    }

    res.json({
      success: true,
      message: "Farmer updated successfully",
      data: farmer
    });
  } catch (error) {
    console.error('Error updating farmer:', error);
    res.status(500).json({
      success: false,
      message: "Failed to update farmer",
      error: error.message
    });
  }
};

const deleteFarmer = async (req, res) => {
  try {
    const { id } = req.params;
    const farmer = await Farmer.findByIdAndDelete(id);

    if (!farmer) {
      return res.status(404).json({
        success: false,
        message: "Farmer not found"
      });
    }

    res.json({
      success: true,
      message: "Farmer deleted successfully"
    });
  } catch (error) {
    console.error('Error deleting farmer:', error);
    res.status(500).json({
      success: false,
      message: "Failed to delete farmer",
      error: error.message
    });
  }
};

module.exports = {
  addFarmer,
  getFarmers,
  getFarmerById,
  updateFarmer,
  deleteFarmer
};