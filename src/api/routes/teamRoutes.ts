import express from "express";
import teamController from "../controllers/teamController";
const router = express.Router();

router.route("/").post(teamController.createTeam);

router.route("/:id").delete(teamController.deleteTeam);

router.route("/").get(teamController.getAllTeam);

router.route("/:id").get(teamController.getTeam);


export default router;