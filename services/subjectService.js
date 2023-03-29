import { deleteAllByIdUserModel, deleteSubjectByIdModel, getAllSubjectsModelById, insertSubject, updateSubject } from "../models/subjectModel.js";
import { validateFields } from "../utils/validateFields.js";

export const getAllSubjectsService = async (idusers) => {
    try {
        const data = await getAllSubjectsModelById(idusers);
        return { data: data, status: 200 };
    } catch (error) {
        return { data: error, status: 500 };
    }
};

const calculateAbsence = (body) => {
    let totalAbsencePct = 0.25;
    //subtração das datas
    const startDate = new Date(body.startClasses);
    const finishDate = new Date(body.finishClasses);
    const resultMilliseconds = finishDate.getTime() - startDate.getTime();
    const days = resultMilliseconds / (1000 * 60 * 60 * 24);
    let daysWeek = days / 7;

    // se não for inteiro arrendonda pra cima.
    if (!Number.isInteger(daysWeek)) {
        daysWeek = Math.ceil(daysWeek);
    }

    // encontrar total de aulas
    let totalClasses = daysWeek * body.amountDaysClasses;
    totalClasses = totalClasses + 1;
    if (body.radioholiday === "Sim") {
        totalClasses = totalClasses - body.holiday;
    }
    if (totalClasses < body.amountAbsence) {
        return false;
    }

    //verificação se a porcentagem mínima é de 75%
    if (body.radioPct === "Não") {
        const newPct = 100 - body.percentage;
        totalAbsencePct = newPct / 100;
    }

    // cálculo para ver quantos dias pode faltar
    let totalAbsence = totalClasses * totalAbsencePct
    if (!Number.isInteger(totalAbsence)) {
        totalAbsence = Math.floor(totalAbsence);;
    }

    const totalAbsenceStudent = totalAbsence - body.amountAbsence


    return { totalClasses: totalClasses, totalAbsence: totalAbsence, totalAbsenceStudent: totalAbsenceStudent }

}

export const createSubjectService = async (body, isUpdate) => {
    const validation = validateFields(body);
    if (validation) {
        return { data: { msg: validation }, status: 401 };
    } else {
        const calculationResponse = calculateAbsence(body);
        if (!calculationResponse) {
            return { data: { msg: "Informe um número de faltas menor que a quantidade de aulas." }, status: 401 };
        }
        try {
            let data;
            if (isUpdate) {
                if (!body.idsubjects) {
                    return { data: { msg: 'É necessário o id do subject.' }, status: 401 };
                }
                data = await updateSubject(body, calculationResponse)
            } else {
                data = await insertSubject(body, calculationResponse)
            }
            return { data: data, status: 200 };
        }
        catch (error) {
            return { data: { msg: 'Erro no calculado, tente novamente!' }, status: 500 };
        }
    }
};

export const deleteSubjectByIdService = async (idsubjects) => {
    try {
        await deleteSubjectByIdModel(idsubjects);
        return { data: { msg: "Deletado com sucesso!" }, status: 200 };
    } catch (error) {
        return { data: { msg: "Erro ao deletar, tente novamente!" }, status: 500 };
    }
};

export const deleteAllByIdUserService = async (idusers) => {
    try {
        await deleteAllByIdUserModel(idusers);
        return { data: { msg: "Deletado com sucesso!" }, status: 200 };
    } catch (error) {
        return { data: { msg: "Erro ao deletar, tente novamente!" }, status: 500 };
    }
};