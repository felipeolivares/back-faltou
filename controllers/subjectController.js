import { createSubjectService, deleteAllByIdUserService, deleteSubjectByIdService, getAllSubjectsService } from "../services/subjectService.js";

export const getAllSubjectsController = async (req, res) => {
    const data = await getAllSubjectsService(req.query.idusers);
    return res.status(data.status).json(data.data);
};

export const createSubjectController = async (req, res) => {
    const data = await createSubjectService(req.body, false);
    return res.status(data.status).json(data.data);
};

export const updateCalculationController = async (req, res) => {
    const data = await createSubjectService(req.body, true);
    return res.status(data.status).json(data.data);
};

export const deleteSubjectByIdController = async (req, res) => {
    const data = await deleteSubjectByIdService(req.query.idsubjects);
    return res.status(data.status).json(data.data);
};

export const deleteAllByIdUserController = async (req, res) => {
    const data = await deleteAllByIdUserService(req.query.idusers);
    return res.status(data.status).json(data.data);
};