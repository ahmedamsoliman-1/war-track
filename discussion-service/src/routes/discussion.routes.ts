import express from "express";
import { createDiscussion, addComment, getDiscussion, getAllDiscussions } from "../controllers/discussion.controller";
import { authenticateJWT } from "../middlewares/auth.middleware";

const router = express.Router();

/**
 * @swagger
 * /api/discussions:
 *   get:
 *     summary: Get all discussions
 *     responses:
 *       200:
 *         description: A list of discussions
 */
router.get("/", getAllDiscussions);

/**
 * @swagger
 * /api/discussions/{id}:
 *   get:
 *     summary: Get a discussion by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: The discussion
 *       404:
 *         description: Not found
 */
router.get("/:id", getDiscussion);

/**
 * @swagger
 * /api/discussions:
 *   post:
 *     summary: Create a new discussion
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               warId:
 *                 type: string
 *               title:
 *                 type: string
 *             required: [warId, title]
 *     responses:
 *       201:
 *         description: Created
 */
router.post("/", authenticateJWT, createDiscussion);

/**
 * @swagger
 * /api/discussions/{id}/comments:
 *   post:
 *     summary: Add a comment
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               authorId:
 *                 type: string
 *               content:
 *                 type: string
 *             required: [authorId, content]
 *     responses:
 *       201:
 *         description: Comment added
 *       404:
 *         description: Not found
 */
router.post("/:id/comments", authenticateJWT, addComment);

export default router;
