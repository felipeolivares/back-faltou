import { addUserService, getUsersService, loginUserService } from "../services/userService.js";

export const getUsersController = async (_, res) => {
    const data = await getUsersService();
    return res.status(data.status).json(data.data);
};

export const addUserController = async (req, res) => {
    const data = await addUserService(req.body.email, req.body.password)
    return res.status(data.status).json(data.data);
}

export const loginUserController = async (req, res) => {
    const data = await loginUserService(req.body.email, req.body.password)
    return res.status(data.status).json(data.data);

}