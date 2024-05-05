import UniteEnseignement from "../../models/UniteEnseignement.js";
import APIFeatures from "../../utils/apiFeatures.js";

/**
 * @route   GET /api/unitesEnseignement
 * @desc    Get all unités d'enseignement
 * @access  Public
 */
const getUnitesEnseignement = async (req, res) => {
  try {
    const features = new APIFeatures(UniteEnseignement.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const unitesEnseignements = await features.query;
    res.json(unitesEnseignements);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

/**
 * @route   POST /api/unitesEnseignement
 * @desc    Create a new unité d'enseignement
 * @access  Public
 */
const createUniteEnseignement = async (req, res) => {
  try {
    const newUniteEnseignement = await UniteEnseignement.create(req.body);
    res.status(201).json(newUniteEnseignement);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

/**
 * @route   GET /api/unitesEnseignement/:id
 * @desc    Get a single unité d'enseignement by ID
 * @access  Public
 */
const getUniteEnseignementById = async (req, res) => {
  try {
    const uniteEnseignement = await UniteEnseignement.findById(req.params.id);
    if (!uniteEnseignement) {
      return res.status(404).json({ msg: "Unité d'enseignement not found" });
    }
    res.json(uniteEnseignement);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

/**
 * @route   PUT /api/unitesEnseignement/:id
 * @desc    Update an unité d'enseignement
 * @access  Public
 */
const updateUniteEnseignement = async (req, res) => {
  try {
    let uniteEnseignement = await UniteEnseignement.findById(req.params.id);
    if (!uniteEnseignement) {
      return res.status(404).json({ msg: "Unité d'enseignement not found" });
    }
    uniteEnseignement = await UniteEnseignement.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.json(uniteEnseignement);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

/**
 * @route   DELETE /api/unitesEnseignement/:id
 * @desc    Delete an unité d'enseignement
 * @access  Public
 */
const deleteUniteEnseignement = async (req, res) => {
  try {
    const uniteEnseignement = await UniteEnseignement.findById(req.params.id);
    if (!uniteEnseignement) {
      return res.status(404).json({ msg: "Unité d'enseignement not found" });
    }

    // Marquer l'unité d'enseignement comme supprimée
    uniteEnseignement.isDeleted = true;
    await uniteEnseignement.save();

    res.json({ msg: "Unité d'enseignement removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

export {
  getUnitesEnseignement,
  createUniteEnseignement,
  getUniteEnseignementById,
  updateUniteEnseignement,
  deleteUniteEnseignement,
};
