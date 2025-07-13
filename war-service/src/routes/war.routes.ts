// import express from "express";
// import {
//   getAllWars,
//   getWarById,
//   createWar,
//   updateWar,
//   deleteWar,
// } from "../controllers/war.controller";

// const router = express.Router();

// router.get("/", getAllWars);
// router.get("/:id", getWarById);
// router.post("/", createWar);
// router.put("/:id", updateWar);
// router.delete("/:id", deleteWar);

// export default router;






import express from "express";
import {
  getAllWars,
  getWarById,
  createWar,
  updateWar,
  deleteWar,
} from "../controllers/war.controller";

const router = express.Router();

/**
 * @swagger
 * /api/wars:
 *   get:
 *     summary: Get all wars
 *     responses:
 *       200:
 *         description: List of wars
 */
router.get("/", getAllWars);

/**
 * @swagger
 * /api/wars/{id}:
 *   get:
 *     summary: Get war by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: War details
 *       404:
 *         description: War not found
 */
router.get("/:id", getWarById);

/**
 * @swagger
 * /api/wars:
 *   post:
 *     summary: Create a war
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/War'
 *     responses:
 *       201:
 *         description: War created
 */
router.post("/", createWar);

/**
 * @swagger
 * /api/wars/{id}:
 *   put:
 *     summary: Update a war
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/War'
 *     responses:
 *       200:
 *         description: War updated
 *       404:
 *         description: War not found
 */
router.put("/:id", updateWar);

/**
 * @swagger
 * /api/wars/{id}:
 *   delete:
 *     summary: Delete a war
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: War deleted
 *       404:
 *         description: War not found
 */
router.delete("/:id", deleteWar);

export default router;
