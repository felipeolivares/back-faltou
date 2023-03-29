import express from "express";
import { createSubjectController, deleteAllByIdUserController, deleteSubjectByIdController, getAllSubjectsController, updateCalculationController } from "../controllers/subjectController.js";

const router = express.Router();

router.get("/calculate/getSubjects", getAllSubjectsController);

router.post("/calculate", createSubjectController);

router.put("/calculate", updateCalculationController);

router.delete("/calculate/deleteSubject", deleteSubjectByIdController);

router.delete("/calculate/deleteSubjects", deleteAllByIdUserController);


export default router;