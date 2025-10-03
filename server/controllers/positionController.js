import TeacherPosition from "../models/TeacherPosition.js";

export const getPositions = async (req, res) => {
  try {
    const positions = await TeacherPosition.find();
    res.json(positions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getPositionById = async (req, res) => {
  try {
    const position = await TeacherPosition.findById(req.params.id);
    if (!position) return res.status(404).json({ message: "Position not found" });

    res.json(position);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createPosition = async (req, res) => {
  try {
    const { name, code, des } = req.body;

    const existed = await TeacherPosition.findOne({ code });
    if (existed) {
      return res.status(400).json({ message: "Code already exists" });
    }

    const newPosition = new TeacherPosition({ name, code, des });
    await newPosition.save();

    res.status(201).json(newPosition);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updatePosition = async (req, res) => {
  try {
    const position = await TeacherPosition.findById(req.params.id);
    if (!position) return res.status(404).json({ message: "Position not found" });

    Object.assign(position, req.body);
    await position.save();

    res.json(position);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deletePosition = async (req, res) => {
  try {
    const position = await TeacherPosition.findById(req.params.id);
    if (!position) return res.status(404).json({ message: "Position not found" });

    position.isDeleted = true;
    await position.save();

    res.json({ message: "Position deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
