const Cultivation = require('../models/cultivationModel');
const Farmer = require('../models/farmerModel');

const addCultivation = async (req, res) => {
  try {
    const farmerId = req.params.farmerId; // this is the farmer's `_id` (e.g., "Ramesh3686")
    const cultivationData = req.body;

    const newCultivation = new Cultivation(cultivationData);
    const savedCultivation = await newCultivation.save();

    // Link to farmer
    const farmer = await Farmer.findById(farmerId);
    if (!farmer) {
      return res.status(404).json({ message: 'Farmer not found' });
    }

    farmer.cultivation.push(savedCultivation._id);
    await farmer.save();

    res.status(201).json({ message: "Cultivation added", cultivation: savedCultivation });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCultivationsByFarmer = async (req, res) => {
  try {
    const farmerId = req.params.farmerId;

    const farmer = await Farmer.findOne({ id: farmerId }).populate('cultivation');

    if (!farmer) {
      return res.status(404).json({ message: 'Farmer not found' });
    }

    res.status(200).json({ cultivations: farmer.cultivation });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllCultivations = async (req, res) => {
  try {
    const cultivations = await Cultivation.find();
    res.status(200).json(cultivations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addCultivation,
  getCultivationsByFarmer,
  getAllCultivations
};