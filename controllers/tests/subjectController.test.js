// Importe as funções que deseja testar e a simulação do serviço
import { createSubjectController, deleteAllByIdUserController, deleteSubjectByIdController, getAllSubjectsController, updateCalculationController } from '../subjectController';
import { createSubjectService, deleteAllByIdUserService, deleteSubjectByIdService, getAllSubjectsService } from '../../services/subjectService.js';


jest.mock("../../services/subjectService");

describe("Subject Controller", () => {
    describe("getAllSubjectsController", () => {
        it("should return all subjects", async () => {
            const mockResponse = { status: 200, data: ["subject1", "subject2"] };
            const mockRequest = { query: { idusers: 1 } };
            getAllSubjectsService.mockResolvedValue(mockResponse);

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            await getAllSubjectsController(mockRequest, res);

            expect(getAllSubjectsService).toHaveBeenCalledWith(mockRequest.query.idusers);
            expect(res.status).toHaveBeenCalledWith(mockResponse.status);
            expect(res.json).toHaveBeenCalledWith(mockResponse.data);
        });
    });

    describe("createSubjectController", () => {
        it("should create a new subject", async () => {
            const mockResponse = { status: 201, data: "newSubject" };
            const mockRequest = { body: { subjectName: "newSubject" } };
            createSubjectService.mockResolvedValue(mockResponse);

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            await createSubjectController(mockRequest, res);

            expect(createSubjectService).toHaveBeenCalledWith(mockRequest.body, false);
            expect(res.status).toHaveBeenCalledWith(mockResponse.status);
            expect(res.json).toHaveBeenCalledWith(mockResponse.data);
        });
    });

    describe("updateCalculationController", () => {
        it("should update a subject's calculation", async () => {
            const mockResponse = { status: 200, data: "updatedSubject" };
            const mockRequest = { body: { subjectId: 1 } };
            createSubjectService.mockResolvedValue(mockResponse);

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            await updateCalculationController(mockRequest, res);

            expect(createSubjectService).toHaveBeenCalledWith(mockRequest.body, true);
            expect(res.status).toHaveBeenCalledWith(mockResponse.status);
            expect(res.json).toHaveBeenCalledWith(mockResponse.data);
        });
    });

    describe("deleteSubjectByIdController", () => {
        it("should delete a subject by id", async () => {
            const mockResponse = { status: 204, data: undefined };
            const mockRequest = { query: { idsubjects: 1 } };
            deleteSubjectByIdService.mockResolvedValue(mockResponse);

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            await deleteSubjectByIdController(mockRequest, res);

            expect(deleteSubjectByIdService).toHaveBeenCalledWith(mockRequest.query.idsubjects);
            expect(res.status).toHaveBeenCalledWith(mockResponse.status);
            expect(res.json).toHaveBeenCalledWith(mockResponse.data);
        });
    });

    describe("deleteAllByIdUserController", () => {
        test("should call deleteAllByIdUserService and return response", async () => {
            const req = { query: { idusers: 1 } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            const mockData = { status: 200, data: { message: "Success" } };
            deleteAllByIdUserService.mockResolvedValue(mockData);

            await deleteAllByIdUserController(req, res);

            expect(deleteAllByIdUserService).toHaveBeenCalledWith(1);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: "Success" });
        });
    });
});