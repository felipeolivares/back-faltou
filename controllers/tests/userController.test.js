import { addUserController, getUsersController, loginUserController } from "../userController";
import { addUserService, getUsersService, loginUserService } from "../../services/userService";

jest.mock("../../services/userService"); // mock do módulo userService

describe("User Controller", () => {
    describe("getUsersController", () => {
        test("should return a list of users", async () => {
            const mockUsers = [{ id: 1, name: "John Doe", email: "john.doe@example.com" }, { id: 2, name: "Jane Doe", email: "jane.doe@example.com" }];
            const mockData = { status: 200, data: mockUsers };
            getUsersService.mockResolvedValueOnce(mockData); // mock da função getUsersService

            const mockReq = {};
            const mockRes = {
                status: jest.fn(() => mockRes),
                json: jest.fn()
            };

            await getUsersController(mockReq, mockRes);

            expect(getUsersService).toHaveBeenCalledTimes(1);
            expect(mockRes.status).toHaveBeenCalledWith(mockData.status);
            expect(mockRes.json).toHaveBeenCalledWith(mockData.data);
        });
    });

    describe("addUserController", () => {
        test("should add a new user and return the user's data", async () => {
            const mockUser = { id: 1, name: "John Doe", email: "john.doe@example.com" };
            const mockData = { status: 200, data: mockUser };
            addUserService.mockResolvedValueOnce(mockData); // mock da função addUserService

            const mockReq = {
                body: {
                    email: "john.doe@example.com",
                    password: "password"
                }
            };
            const mockRes = {
                status: jest.fn(() => mockRes),
                json: jest.fn()
            };

            await addUserController(mockReq, mockRes);

            expect(addUserService).toHaveBeenCalledTimes(1);
            expect(addUserService).toHaveBeenCalledWith(mockReq.body.email, mockReq.body.password);
            expect(mockRes.status).toHaveBeenCalledWith(mockData.status);
            expect(mockRes.json).toHaveBeenCalledWith(mockData.data);
        });
    });

    describe("loginUserController", () => {
        test("should authenticate a user and return the user's data", async () => {
            const mockUser = { id: 1, name: "John Doe", email: "john.doe@example.com" };
            const mockData = { status: 200, data: mockUser };
            loginUserService.mockResolvedValueOnce(mockData); // mock da função loginUserService

            const mockReq = {
                body: {
                    email: "john.doe@example.com",
                    password: "password"
                }
            };
            const mockRes = {
                status: jest.fn(() => mockRes),
                json: jest.fn()
            };

            await loginUserController(mockReq, mockRes);

            expect(loginUserService).toHaveBeenCalledTimes(1);
            expect(loginUserService).toHaveBeenCalledWith(mockReq.body.email, mockReq.body.password);
            expect(mockRes.status).toHaveBeenCalledWith(mockData.status);
            expect(mockRes.json).toHaveBeenCalledWith(mockData.data);
        });
    });
});