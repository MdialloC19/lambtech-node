import Formation from "../../models/Formation.js";

/**
 * @route   GET /api/formations
 * @desc    Get all formations
 * @access  Public
 */
const getFormations = async (req, res) => {
  try {
    const formations = await Formation.find();
    res.json(formations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

/**
 * @route   POST /api/formations
 * @desc    Create a new formation
 * @access  Public
 */
const createFormation = async (req, res) => {
  try {
    const newFormation = await Formation.create(req.body);
    res.status(201).json(newFormation);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

/**
 * @route   GET /api/formations/:id
 * @desc    Get a single formation by ID
 * @access  Public
 */
const getFormationById = async (req, res) => {
  try {
    const formation = await Formation.findById(req.params.id);
    if (!formation) {
      return res.status(404).json({ msg: "Formation not found" });
    }
    res.json(formation);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

/**
 * @route   PUT /api/formations/:id
 * @desc    Update a formation
 * @access  Public
 */
const updateFormation = async (req, res) => {
  try {
    let formation = await Formation.findById(req.params.id);
    if (!formation) {
      return res.status(404).json({ msg: "Formation not found" });
    }
    formation = await Formation.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(formation);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

/**
 * @route   DELETE /api/formations/:id
 * @desc    Delete a formation
 * @access  Public
 */
const deleteFormation = async (req, res) => {
  try {
    const formation = await Formation.findById(req.params.id);
    if (!formation) {
      return res.status(404).json({ msg: "Formation not found" });
    }

    // Marquer la formation comme supprimée
    formation.isDeleted = true;
    await formation.save();

    res.json({ msg: "Formation removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

export {
  getFormations,
  createFormation,
  getFormationById,
  updateFormation,
  deleteFormation,
};
