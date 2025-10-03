import Teacher from "../models/Teacher.js";
import User from "../models/User.js";
import { generateTeacherCode } from "../utils/generateCode.js";

export const getTeachers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const teachers = await Teacher.find()
      .populate("userId", "name email phoneNumber address")
      .populate("teacherPositionsId", "name code des")
      .skip(skip)
      .limit(limit);

    const total = await Teacher.countDocuments();

    res.json({
      page,
      totalPages: Math.ceil(total / limit),
      total,
      teachers,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getTeacherById = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id)
      .populate("userId", "name email phoneNumber address")
      .populate("teacherPositionsId", "name code des");

    if (!teacher) return res.status(404).json({ message: "Teacher not found" });

    res.json(teacher);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createTeacher = async (req, res) => {
  try {
    const { 
      name, 
      email, 
      phoneNumber, 
      address, 
      identity, 
      dob, 
      role, 
      startDate, 
      endDate, 
      degrees, 
      teacherPositionsId 
    } = req.body;

    const existedUser = await User.findOne({ email });
    if (existedUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const newUser = new User({ 
      name, 
      email, 
      phoneNumber, 
      address, 
      identity, 
      dob, 
      role: role || "TEACHER" 
    });
    await newUser.save();

    const teacher = new Teacher({
      userId: newUser._id,
      code: generateTeacherCode(),
      startDate,
      endDate,
      degrees,
      teacherPositionsId,
    });

    await teacher.save();
    res.status(201).json(teacher);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) return res.status(404).json({ message: "Teacher not found" });

    Object.assign(teacher, req.body);
    await teacher.save();

    res.json(teacher);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) return res.status(404).json({ message: "Teacher not found" });

    teacher.isDeleted = true;
    await teacher.save();

    res.json({ message: "Teacher deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
