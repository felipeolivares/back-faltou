import { getAllSubjectsModelById, insertSubject, updateSubject, deleteSubjectByIdModel, deleteAllByIdUserModel } from "../subjectModel.js"
import { db } from "../../db.js"

jest.mock('../../db.js', () => ({
    db: {
        query: jest.fn(),
    },
}));

describe("Subject Model", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("getAllSubjectsModelById", () => {
        it("should return data when query is successful", async () => {
            const mockData = [{ id: 1, subjectName: "Math" }];
            const mockQuery = jest.fn().mockImplementation((query, values, callback) => {
                callback(null, mockData);
            });
            db.query.mockImplementation(mockQuery);

            const result = await getAllSubjectsModelById(1);

            expect(mockQuery).toHaveBeenCalled();
            expect(result).toEqual(mockData);
        });

        it("should reject when query is unsuccessful", async () => {
            const mockError = new Error("Database error");
            const mockQuery = jest.fn().mockImplementation((query, values, callback) => {
                callback(mockError, null);
            });
            db.query.mockImplementation(mockQuery);

            await expect(getAllSubjectsModelById(1)).rejects.toThrow(mockError);
            expect(mockQuery).toHaveBeenCalled();
        });
    });

    describe("insertSubject", () => {
        it("should return success message when insert is successful", async () => {
            const mockCalculationResponse = {
                totalClasses: 10,
                totalAbsence: 2,
                totalAbsenceStudent: 1,
            };
            const mockQuery = jest.fn().mockImplementation((query, values, callback) => {
                callback(null, { insertId: 1 });
            });
            db.query.mockImplementation(mockQuery);

            const result = await insertSubject(
                {
                    subjectName: "Math",
                    startClasses: "2022-01-01",
                    finishClasses: "2022-01-30",
                    amountDaysClasses: 30,
                    amountAbsence: 2,
                    radioholiday: false,
                    holiday: 0,
                    radioPct: true,
                    percentage: 25,
                    idusers: 1,
                },
                mockCalculationResponse
            );

            expect(mockQuery).toHaveBeenCalled();
            expect(result).toEqual({ msg: "Cálculo feito com sucesso!" });
        });

        it("should throw error when insert fails", async () => {
            const mockCalculationResponse = {
                totalClasses: 10,
                totalAbsence: 2,
                totalAbsenceStudent: 1,
            };
            const mockQuery = jest.fn().mockImplementation((query, values, callback) => {
                callback(new Error("falha na inserção"));
            });
            db.query.mockImplementation(mockQuery);

            await expect(
                insertSubject(
                    {
                        subjectName: "Math",
                        startClasses: "2022-01-01",
                        finishClasses: "2022-01-30",
                        amountDaysClasses: 30,
                        amountAbsence: 2,
                        radioholiday: false,
                        holiday: 0,
                        radioPct: true,
                        percentage: 25,
                        idusers: 1,
                    },
                    mockCalculationResponse
                )
            ).rejects.toThrow("falha na inserção");

            expect(mockQuery).toHaveBeenCalled();
        });
    });

    describe("updateSubject function", () => {

        it("should reject with an error if db.query returns an error", async () => {
            const body = {
                subjectName: "Math",
                startClasses: "2022-01-01",
                finishClasses: "2022-06-30",
                amountDaysClasses: 120,
                amountAbsence: 20,
                radioholiday: "yes",
                holiday: "2022-04-15",
                radioPct: "no",
                percentage: null,
                idusers: 1,
                idsubjects: 1,
            };

            const calculationResponse = {
                totalClasses: 120,
                totalAbsence: 20,
                totalAbsenceStudent: 16,
            };

            const expectedError = new Error("Database error");

            db.query = jest.fn().mockImplementation((query, values, callback) => {
                callback(expectedError);
            });

            await expect(updateSubject(body, calculationResponse)).rejects.toThrow(
                expectedError
            );
        });
    });

    describe("deleteSubjectByIdModel", () => {
        test("should resolve with data when the query is successful", async () => {
            const mockData = { affectedRows: 1 };
            db.query.mockImplementation((query, values, callback) => {
                callback(null, mockData);
            });

            const result = await deleteSubjectByIdModel(1);

            expect(result).toEqual(mockData);
            expect(db.query).toHaveBeenCalledWith(
                "DELETE FROM subjects WHERE idsubjects = ?",
                [1],
                expect.any(Function)
            );
        });

        test("should reject with an error when the query fails", async () => {
            const mockError = new Error("Query failed");
            db.query.mockImplementation((query, values, callback) => {
                callback(mockError, null);
            });

            await expect(deleteSubjectByIdModel(1)).rejects.toThrow(mockError);
            expect(db.query).toHaveBeenCalledWith(
                "DELETE FROM subjects WHERE idsubjects = ?",
                [1],
                expect.any(Function)
            );
        });
    });

    describe("deleteAllByIdUserModel", () => {
        test("should resolve with data when the query is successful", async () => {
            const mockData = { affectedRows: 2 };
            db.query.mockImplementation((query, values, callback) => {
                callback(null, mockData);
            });

            const result = await deleteAllByIdUserModel(1);

            expect(result).toEqual(mockData);
            expect(db.query).toHaveBeenCalledWith(
                "DELETE FROM subjects WHERE idusers = ?",
                [1],
                expect.any(Function)
            );
        });

        test("should reject with an error when the query fails", async () => {
            const mockError = new Error("Query failed");
            db.query.mockImplementation((query, values, callback) => {
                callback(mockError, null);
            });

            await expect(deleteAllByIdUserModel(1)).rejects.toThrow(mockError);
            expect(db.query).toHaveBeenCalledWith(
                "DELETE FROM subjects WHERE idusers = ?",
                [1],
                expect.any(Function)
            );
        });
    });
})