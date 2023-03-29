import { db } from "../db.js"

export const getUsersModel = () => {
    const q = "SELECT * FROM users";

    return new Promise((resolve, reject) => {
        db.query(q, (err, data) => {
            if (err) {
                reject(err);
            }
            resolve({ data: data, err: false });
        });

    });
}

export const getUserModel = (email) => {
    const qSelect = "SELECT * FROM users WHERE email = ?";

    return new Promise((resolve, reject) => {
        db.query(qSelect, [email], (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve({ data: data, err: false });
            }
        });
    });
};

export const insertUserModel = (email, hash) => {
    const qInsert = "INSERT INTO users (email, password) VALUES (?, ?)"

    return new Promise((resolve, reject) => {
        db.query(qInsert, [email, hash], (err, _result) => {
            if (err) {
                reject(err)
            }
            resolve({ data: "Cadastrado com sucesso!", err: false });
        })
    });
}