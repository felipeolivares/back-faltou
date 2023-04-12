import { db } from "../../db.js"
import { getUsersModel, getUserModel, insertUserModel } from "../userModel.js"

// mock db.query function
jest.mock("../../db.js", () => ({
    db: {
        query: jest.fn()
    }
}));

describe("getUsersModel", () => {
    it("should resolve with data when query is successful", async () => {
        const mockData = [{ id: 1, email: "user1@example.com" }, { id: 2, email: "user2@example.com" }];
        const mockQuery = jest.fn().mockImplementation((query, callback) => {
            callback(null, mockData);
        });
        db.query.mockImplementation(mockQuery);

        const result = await getUsersModel();

        expect(mockQuery).toHaveBeenCalledWith("SELECT * FROM users", expect.any(Function));
        expect(result).toEqual({ data: mockData, err: false });
    });

    it("should reject with an error when query returns an error", async () => {
        const expectedError = new Error("Database error");
        const mockQuery = jest.fn().mockImplementation((query, callback) => {
            callback(expectedError);
        });
        db.query.mockImplementation(mockQuery);

        await expect(getUsersModel()).rejects.toThrow(expectedError);
    });
});

describe("getUserModel", () => {
    it("should resolve with data when query is successful", async () => {
        const mockEmail = "user1@example.com";
        const mockData = [{ id: 1, email: mockEmail }];
        const mockQuery = jest.fn().mockImplementation((query, values, callback) => {
            callback(null, mockData);
        });
        db.query.mockImplementation(mockQuery);

        const result = await getUserModel(mockEmail);

        expect(mockQuery).toHaveBeenCalledWith("SELECT * FROM users WHERE email = ?", [mockEmail], expect.any(Function));
        expect(result).toEqual({ data: mockData, err: false });
    });

    it("should reject with an error when query returns an error", async () => {
        const mockEmail = "user1@example.com";
        const expectedError = new Error("Database error");
        const mockQuery = jest.fn().mockImplementation((query, values, callback) => {
            callback(expectedError);
        });
        db.query.mockImplementation(mockQuery);

        await expect(getUserModel(mockEmail)).rejects.toThrow(expectedError);
    });
});

describe("insertUserModel", () => {
    it("should insert user and return success message", async () => {
        const mockQuery = jest.fn().mockImplementation((query, values, callback) => {
            callback(null, { insertId: 1 });
        });
        db.query.mockImplementation(mockQuery);

        const email = "test@example.com";
        const hash = "hash123";

        const result = await insertUserModel(email, hash);

        expect(mockQuery).toHaveBeenCalled();
        expect(result).toEqual({ data: "Cadastrado com sucesso!", err: false });
    });

    it("should reject with an error if db.query returns an error", async () => {
        const expectedError = new Error("Database error");

        db.query.mockImplementation((query, values, callback) => {
            callback(expectedError);
        });

        const email = "test@example.com";
        const hash = "hash123";

        await expect(insertUserModel(email, hash)).rejects.toThrow(expectedError);
    });
});