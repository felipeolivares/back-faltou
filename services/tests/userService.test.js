import { getUsersService, addUserService, loginUserService } from "../userService";
import { getUsersModel, getUserModel, insertUserModel } from "../../models/userModel";

// Mocks
jest.mock("../../models/userModel");
jest.mock("bcrypt");

describe("userService", () => {
    describe("getUsersService", () => {
        it("should return users data and 200 status", async () => {
            // Setup
            const mockUsersData = {
                data: [{ id: 1, name: "John" }, { id: 2, name: "Jane" }],
            };
            getUsersModel.mockResolvedValueOnce(mockUsersData);

            // Execution
            const result = await getUsersService();

            // Assertion
            expect(getUsersModel).toHaveBeenCalledTimes(1);
            expect(result).toEqual({
                data: mockUsersData.data,
                status: 200,
            });
        });

        it("should return error data and 500 status", async () => {
            // Setup
            const mockError = new Error("Database error");
            getUsersModel.mockRejectedValueOnce(mockError);

            // Execution
            const result = await getUsersService();

            // Assertion
            expect(getUsersModel).toHaveBeenCalledTimes(2);
            expect(result).toEqual({
                data: mockError,
                status: 500,
            });
        });
    });

    describe("addUserService", () => {
        const email = "test@test.com";
        const password = "test123";

        beforeEach(() => {
            getUserModel.mockReturnValue({ data: [] });
            insertUserModel.mockReturnValue({ data: "Usuário inserido com sucesso." });
        });

        afterEach(() => {
            jest.clearAllMocks();
        });

        it("should return error when email already exists", async () => {
            getUserModel.mockReturnValue({ data: [{ email }] });
            const result = await addUserService(email, password);
            expect(result).toEqual({ data: { msg: "Usuário já cadastrado." }, status: 401 });
        });

        it("should return error when email is invalid", async () => {
            getUserModel.mockRejectedValue(new Error("Invalid email"));
            const result = await addUserService("invalid-email", password);
            expect(result).toEqual({ data: new Error("Invalid email"), status: 500 });
        });
    });

    describe("loginUserService", () => {
        const mockUser = {
            data: [
                {
                    iduser: 1,
                    email: "test@test.com",
                    password: "$2b$10$Z/UlLAI26THex4c4vymaIu70oOS5pM4xS5S5.5iu5QZ0QFkqXzuiy",
                },
            ],
        };

        it("should return 500 when user is not found", async () => {
            getUserModel.mockResolvedValueOnce({ data: [] });

            const result = await loginUserService("test@test.com", "testpassword");

            expect(getUserModel).toHaveBeenCalledWith("test@test.com");
            expect(result).toEqual({ data: { msg: "Usuário ou senha incorreta." }, status: 500 });
        });

        it("should return 500 when an error occurs", async () => {
            getUserModel.mockRejectedValueOnce("error");

            const result = await loginUserService("test@test.com", "testpassword");

            expect(getUserModel).toHaveBeenCalledWith("test@test.com");
            expect(result).toEqual({ data: "error", status: 500 });
        });
    });
});