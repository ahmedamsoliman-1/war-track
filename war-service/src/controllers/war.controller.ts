import { Request, Response } from "express";
import War from "../models/war.model";
import logger from "../utils/logger";

export const getAllWars = async (_: Request, res: Response) => {
  const wars = await War.find();
  logger.info("Fetched all wars (count=%d)", wars.length);
  res.json(wars);
};

export const getWarById = async (req: Request, res: Response) => {
  const war = await War.findById(req.params.id);
  if (!war) {
    logger.warn("War not found (id=%s)", req.params.id);
    return res.status(404).json({ message: "War not found" });
  }
  logger.info("Fetched war (id=%s)", req.params.id);
  res.json(war);
};

export const createWar = async (req: Request, res: Response) => {
  const war = new War(req.body);
  await war.save();
  logger.info("Created war (id=%s)", war._id);
  res.status(201).json(war);
};

export const updateWar = async (req: Request, res: Response) => {
  const war = await War.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!war) {
    logger.warn("Update failed - war not found (id=%s)", req.params.id);
    return res.status(404).json({ message: "War not found" });
  }
  logger.info("Updated war (id=%s)", req.params.id);
  res.json(war);
};

export const deleteWar = async (req: Request, res: Response) => {
  const war = await War.findByIdAndDelete(req.params.id);
  if (!war) {
    logger.warn("Delete failed - war not found (id=%s)", req.params.id);
    return res.status(404).json({ message: "War not found" });
  }
  logger.info("Deleted war (id=%s)", req.params.id);
  res.json({ message: "War deleted" });
};
