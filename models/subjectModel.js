import { db } from "../db.js"

export const getAllSubjectsModelById = (idusers) => {
    const qSelect = "SELECT * FROM subjects WHERE idusers = ? ORDER BY idsubjects DESC";

    return new Promise((resolve, reject) => {
        db.query(qSelect, [idusers], (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};

export const insertSubject = (body, calculationResponse) => {
    const qInsert = `
      INSERT INTO subjects
        (subjectName, startClasses, finishClasses, amountDaysClasses, amountAbsence,
         radioholiday, holiday, radioPct, percentage, totalClasses, totalAbsence,
         totalAbsenceStudent, idusers)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
        body.subjectName,
        body.startClasses,
        body.finishClasses,
        body.amountDaysClasses,
        body.amountAbsence,
        body.radioholiday,
        body.holiday,
        body.radioPct,
        body.percentage,
        calculationResponse.totalClasses,
        calculationResponse.totalAbsence,
        calculationResponse.totalAbsenceStudent,
        body.idusers
    ];

    return new Promise((resolve, reject) => {
        db.query(qInsert, values, (err, _result) => {
            if (err) {
                reject(err);
            } else {
                resolve({ msg: "Cálculo feito com sucesso!" });
            }
        });
    });
}

export const updateSubject = (body, calculationResponse) => {
    const qUpdate = `
      UPDATE subjects
      SET subjectName = ?, startClasses = ?, finishClasses = ?, amountDaysClasses = ?, amountAbsence = ?, radioholiday = ?, 
      holiday = ?, radioPct = ?, percentage = ?, totalClasses = ?, totalAbsence = ?, totalAbsenceStudent = ?, idusers = ?
      WHERE idusers = ? AND idsubjects = ?
    `;

    const values = [
        body.subjectName,
        body.startClasses,
        body.finishClasses,
        body.amountDaysClasses,
        body.amountAbsence,
        body.radioholiday,
        body.holiday,
        body.radioPct,
        body.percentage,
        calculationResponse.totalClasses,
        calculationResponse.totalAbsence,
        calculationResponse.totalAbsenceStudent,
        body.idusers,
        body.idusers,
        body.idsubjects
    ];

    return new Promise((resolve, reject) => {
        db.query(qUpdate, values, (err, _result) => {
            if (err) {
                reject(err);
            }
            resolve({ msg: "Cálculo feito com sucesso!" });
        });
    });
}

export const deleteSubjectByIdModel = async (idsubjects) => {
    const qDelete = "DELETE FROM subjects WHERE idsubjects = ?";

    return new Promise((resolve, reject) => {
        db.query(qDelete, [idsubjects], (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};

export const deleteAllByIdUserModel = async (idusers) => {
    const qDelete = "DELETE FROM subjects WHERE idusers = ?";

    return new Promise((resolve, reject) => {
        db.query(qDelete, [idusers], (err, data) => {

            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};