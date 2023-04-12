import { createSubjectService, deleteAllByIdUserService, deleteSubjectByIdService, getAllSubjectsService } from '../subjectService.js';
import { getAllSubjectsModelById, deleteAllByIdUserModel, deleteSubjectByIdModel } from "../../models/subjectModel.js";
import { validateFields } from "../../utils/validateFields";

jest.mock("../../models/subjectModel.js");
jest.mock("../../utils/validateFields", () => ({
    validateFields: jest.fn(),
}));

describe("getAllSubjectsService", () => {
    beforeEach(() => {
        validateFields.mockClear();
    });

    it("should return data", async () => {
        const body = { /* Campos inválidos */ };
        validateFields.mockReturnValue("Campos inválidos");
        const result = await createSubjectService(body, false);
        expect(result.status).toEqual(401);
        expect(result.data.msg).toEqual("Campos inválidos");
    });

    it("should return data", async () => {
        const body = { /* Campos válidos */ };
        const calculationResponse = { /* Resposta do cálculo de ausência */ };
        validateFields.mockReturnValue(undefined);
        jest.spyOn(global, "Date").mockImplementation(() => ({
            getTime: () => 1613386800000, // 15 de fevereiro de 2021
        }));
        const calculateAbsence = jest.fn(() => calculationResponse);
        const result = await createSubjectService(body, false);

        expect(result.status).toEqual(200);
    });

    it("should return data", async () => {

        const body = { /* Campos válidos */ };
        const calculationResponse = false;
        validateFields.mockReturnValue(undefined);
        const calculateAbsence = jest.fn(() => calculationResponse);

        const result = await createSubjectService(body, false);


        expect(result.status).toEqual(200);
    });
    it("should return data and status 200 on success", async () => {
        const mockData = [{ subject: "math" }, { subject: "english" }];
        getAllSubjectsModelById.mockResolvedValue(mockData);

        const result = await getAllSubjectsService(1);

        expect(result).toEqual({ data: mockData, status: 200 });
        expect(getAllSubjectsModelById).toHaveBeenCalledWith(1);
    });

    it("should return error message and status 500 on failure", async () => {
        const mockError = "Database error";
        getAllSubjectsModelById.mockRejectedValue(mockError);

        const result = await getAllSubjectsService(1);

        expect(result).toEqual({ data: mockError, status: 500 });
        expect(getAllSubjectsModelById).toHaveBeenCalledWith(1);
    });

    it('should delete data', async () => {

        const idsubjects = '123';

        await deleteSubjectByIdService(idsubjects);

        expect(deleteSubjectByIdModel).toHaveBeenCalledWith(idsubjects);
    });

    it('should delete data', async () => {

        const idsubjects = '123';
        deleteSubjectByIdModel.mockImplementation(() => Promise.resolve());

        const result = await deleteSubjectByIdService(idsubjects);

        expect(result).toEqual({ data: { msg: "Deletado com sucesso!" }, status: 200 });
    });

    it('should delete data', async () => {
        const idsubjects = '123';
        const errorMsg = 'Erro ao deletar o subject';
        deleteSubjectByIdModel.mockImplementation(() => Promise.reject(errorMsg));
        const result = await deleteSubjectByIdService(idsubjects);
        expect(result).toEqual({ data: { msg: "Erro ao deletar, tente novamente!" }, status: 500 });
    });

    it('should delete data', async () => {

        const idsubjects = '123';
        deleteAllByIdUserModel.mockImplementation(() => Promise.resolve());

        const result = await deleteAllByIdUserService(idsubjects);

        expect(result).toEqual({ data: { msg: "Deletado com sucesso!" }, status: 200 });
    });

    it('should delete data', async () => {
        const idsubjects = '123';
        const errorMsg = 'Erro ao deletar o subject';
        deleteAllByIdUserModel.mockImplementation(() => Promise.reject(errorMsg));
        const result = await deleteAllByIdUserService(idsubjects);
        expect(result).toEqual({ data: { msg: "Erro ao deletar, tente novamente!" }, status: 500 });
    });


});