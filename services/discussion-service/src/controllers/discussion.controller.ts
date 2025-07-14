import { Request, Response } from "express";
import Discussion from "../models/discussion.model";
import logger from "../utils/logger";

export const createDiscussion = async (req: Request, res: Response) => {
  const { warId, title } = req.body;
  const creatorId = req.user?.userId;
  if (!creatorId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const discussion = new Discussion({ warId, title, comments: [], creatorId });
  await discussion.save();
  logger.info("Created discussion (id=%s)", discussion._id);
  res.status(201).json(discussion);
};

export const addComment = async (req: Request, res: Response) => {
  const { id } = req.params;

  const { content } = req.body;
  const authorId = req.user?.userId;

  if (!authorId) {
    return res.status(401).json({ message: "Unauthorized" });
  }



  const discussion = await Discussion.findById(id);
  if (!discussion) {
    return res.status(404).json({ message: "Discussion not found" });
  }

  discussion.comments.push({ authorId, content, createdAt: new Date() });
  await discussion.save();

  logger.info("Added comment to discussionId=%s", id);
  res.status(201).json(discussion);
};

export const getDiscussion = async (req: Request, res: Response) => {
  const { id } = req.params;
  const discussion = await Discussion.findById(id);
  if (!discussion) {
    return res.status(404).json({ message: "Discussion not found" });
  }
  res.json(discussion);
};

export const getAllDiscussions = async (req: Request, res: Response) => {
  const discussions = await Discussion.find();
  res.json(discussions);
};
