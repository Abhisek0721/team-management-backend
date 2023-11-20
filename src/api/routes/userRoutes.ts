import express from "express";
import userController from "../controllers/userController";
const router = express.Router();

router.route("/").post(userController.createUser);

router.route("/:id").get(userController.getUser);

router.route("/").get(userController.getAllUsers);

router.route("/search-user/:username").get(userController.searchUser);

router.route("/filter-users/:pageNumber").get(userController.filterUsers);

router.route("/:id").put(userController.updateUser);

router.route("/:id").delete(userController.deleteUser);


export default router;