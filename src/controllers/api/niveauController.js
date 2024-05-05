import Niveau from "../../models/Niveau.js";
import APIFeatures from "../../utils/apiFeatures.js";

/**
 * @route   GET api/niveaux
 * @desc    Get all niveaux
 * @access  Public
 */
const getNiveaux = async (req, res) => {
  try {
    const features = new APIFeatures(Niveau.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const niveaux = await features.query;
    res.json(niveaux);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

/**
 * @route   POST api/niveaux
 * @desc    Create a new niveau
 * @access  Public
 */
const createNiveau = async (req, res) => {
  try {
    const newNiveau = await Niveau.create(req.body);
    res.status(201).json(newNiveau);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

/**
 * @route   GET api/niveaux/:id
 * @desc    Get a single niveau by ID
 * @access  Public
 */
const getNiveauById = async (req, res) => {
  try {
    const niveau = await Niveau.findById(req.params.id);
    if (!niveau) {
      return res.status(404).json({ msg: "Niveau not found" });
    }
    res.json(niveau);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

/**
 * @route   PUT api/niveaux/:id
 * @desc    Update a niveau
 * @access  Public
 */
const updateNiveau = async (req, res) => {
  try {
    let niveau = await Niveau.findById(req.params.id);
    if (!niveau) {
      return res.status(404).json({ msg: "Niveau not found" });
    }
    niveau = await Niveau.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(niveau);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

/**
 * @route   DELETE api/niveaux/:id
 * @desc    Delete a niveau
 * @access  Public
 */
const deleteNiveau = async (req, res) => {
  try {
    const niveau = await Niveau.findById(req.params.id);
    if (!niveau) {
      return res.status(404).json({ msg: "Niveau not found" });
    }

    // Marquer le niveau comme supprimé
    niveau.isDeleted = true;
    await niveau.save();

    res.json({ msg: "Niveau removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

export { getNiveaux, createNiveau, getNiveauById, updateNiveau, deleteNiveau };
