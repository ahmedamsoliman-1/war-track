import { Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import logger from "../utils/logger";

export const register = async (req: Request, res: Response) => {
  const { email, password, role } = req.body;
  logger.info(`Registering user: ${email}, ${role}`);

  const existing = await User.findOne({ email });
  if (existing) {
    logger.warn("Registration failed: user exists (%s)", email);
    return res.status(400).json({ message: "User already exists" });
  }

  const hashed = await bcrypt.hash(password, 10);
  const user = new User({ email, password: hashed });

  await user.save();
  logger.info("User registered: %s", email);
  res.status(201).json({ message: "User registered" });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    logger.warn("Login failed: user not found (%s)", email);
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    logger.warn("Login failed: invalid password (%s)", email);
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  );

  logger.info("User logged in: %s", email);
  res.json({ token });
};

export const getProfile = async (req: any, res: Response) => {
  const user = await User.findById(req.user.userId).select("-password");
  logger.info("Profile fetched for userId=%s", req.user.userId);
  res.json(user);
};
