import { validateFields } from '../validateFields';

describe('validateFields', () => {
    it('should return an empty object when no errors are found', () => {
        const values = {
            subjectName: 'Math',
            startClasses: '08:00',
            finishClasses: '12:00',
            amountDaysClasses: '5',
            amountAbsence: '1',
            radioholiday: 'Não',
            holiday: '',
            radioPct: 'Sim',
            percentage: '50',
            idusers: '1',
        };
        expect(validateFields(values)).toEqual(false);
    });

    it('should return an object with error message when percentage is required but not provided', () => {
        const values = {
            subjectName: '',
            startClasses: 'teste',
            finishClasses: 'teste',
            amountDaysClasses: '3',
            amountAbsence: '0',
            radioholiday: 'Não',
            holiday: '1',
            radioPct: 'Não',
            percentage: '1',
            idusers: '1',
        };
        const expectedErrors = {
            subjectName: "Valor obrigatório",
            startClasses: "",
            finishClasses: "",
            amountDaysClasses: "",
            amountAbsence: "",
            radioholiday: "",
            holiday: "",
            radioPct: "",
            percentage: "",
            idusers: "",
        };
        expect(validateFields(values)).toEqual(expectedErrors);
    });
    it('should return an object', () => {
        const values = {
            subjectName: 'a',
            startClasses: '',
            finishClasses: 'teste',
            amountDaysClasses: '3',
            amountAbsence: '0',
            radioholiday: 'Não',
            holiday: '1',
            radioPct: 'Não',
            percentage: '1',
            idusers: '1',
        };
        const expectedErrors = {
            subjectName: "",
            startClasses: "Valor obrigatório",
            finishClasses: "",
            amountDaysClasses: "",
            amountAbsence: "",
            radioholiday: "",
            holiday: "",
            radioPct: "",
            percentage: "",
            idusers: "",
        };
        expect(validateFields(values)).toEqual(expectedErrors);
    });
    it('should return an object', () => {
        const values = {
            subjectName: 'a',
            startClasses: 'a',
            finishClasses: '1',
            amountDaysClasses: '',
            amountAbsence: '0',
            radioholiday: 'Não',
            holiday: '1',
            radioPct: 'Não',
            percentage: '1',
            idusers: '1',
        };
        const expectedErrors = {
            subjectName: "",
            startClasses: "",
            finishClasses: "",
            amountDaysClasses: "Valor obrigatório",
            amountAbsence: "",
            radioholiday: "",
            holiday: "",
            radioPct: "",
            percentage: "",
            idusers: "",
        };
        expect(validateFields(values)).toEqual(expectedErrors);
    });
    it('should return an object', () => {
        const values = {
            subjectName: 'a',
            startClasses: 'a',
            finishClasses: '',
            amountDaysClasses: '3',
            amountAbsence: '0',
            radioholiday: 'Não',
            holiday: '1',
            radioPct: 'Não',
            percentage: '1',
            idusers: '1',
        };
        const expectedErrors = {
            subjectName: "",
            startClasses: "",
            finishClasses: "Valor obrigatório",
            amountDaysClasses: "",
            amountAbsence: "",
            radioholiday: "",
            holiday: "",
            radioPct: "",
            percentage: "",
            idusers: "",
        };
        expect(validateFields(values)).toEqual(expectedErrors);
    });
    it('should return an object', () => {
        const values = {
            subjectName: 'a',
            startClasses: 'a',
            finishClasses: '1',
            amountDaysClasses: '1',
            amountAbsence: '1',
            radioholiday: '',
            holiday: '1',
            radioPct: 'Não',
            percentage: '1',
            idusers: '1',
        };
        const expectedErrors = {
            subjectName: "",
            startClasses: "",
            finishClasses: "",
            amountDaysClasses: "",
            amountAbsence: "",
            radioholiday: "Valor obrigatório",
            holiday: "",
            radioPct: "",
            percentage: "",
            idusers: "",
        };
        expect(validateFields(values)).toEqual(expectedErrors);
    });
    it('should return an object', () => {
        const values = {
            subjectName: 'a',
            startClasses: 'a',
            finishClasses: '1',
            amountDaysClasses: '1',
            amountAbsence: '1',
            radioholiday: 'Não',
            holiday: '1',
            radioPct: '',
            percentage: '1',
            idusers: '1',
        };
        const expectedErrors = {
            subjectName: "",
            startClasses: "",
            finishClasses: "",
            amountDaysClasses: "",
            amountAbsence: "",
            radioholiday: "",
            holiday: "",
            radioPct: "Valor obrigatório",
            percentage: "",
            idusers: "",
        };
        expect(validateFields(values)).toEqual(expectedErrors);
    });
    it('should return an object', () => {
        const values = {
            subjectName: 'a',
            startClasses: 'a',
            finishClasses: '1',
            amountDaysClasses: '1',
            amountAbsence: '1',
            radioholiday: 'Não',
            holiday: '1',
            radioPct: 'Sim',
            percentage: '1',
            idusers: '',
        };
        const expectedErrors = {
            subjectName: "",
            startClasses: "",
            finishClasses: "",
            amountDaysClasses: "",
            amountAbsence: "",
            radioholiday: "",
            holiday: "",
            radioPct: "",
            percentage: "",
            idusers: "Valor obrigatório",
        };
        expect(validateFields(values)).toEqual(expectedErrors);
    });
    it('should return an object', () => {
        const values = {
            subjectName: 'a',
            startClasses: 'a',
            finishClasses: '1',
            amountDaysClasses: '12',
            amountAbsence: '1',
            radioholiday: 'Não',
            holiday: '1',
            radioPct: 'Sim',
            percentage: '1',
            idusers: '1',
        };
        const expectedErrors = {
            subjectName: "",
            startClasses: "",
            finishClasses: "",
            amountDaysClasses: "Valor máximo é de 7 dias",
            amountAbsence: "",
            radioholiday: "",
            holiday: "",
            radioPct: "",
            percentage: "",
            idusers: "",
        };
        expect(validateFields(values)).toEqual(expectedErrors);
    });
    it('should return an object', () => {
        const values = {
            subjectName: 'a',
            startClasses: 'a',
            finishClasses: '1',
            amountDaysClasses: '12',
            amountAbsence: '1',
            radioholiday: 'Sim',
            holiday: '',
            radioPct: 'Sim',
            percentage: '1',
            idusers: '1',
        };
        const expectedErrors = {
            subjectName: "",
            startClasses: "",
            finishClasses: "",
            amountDaysClasses: "Valor máximo é de 7 dias",
            amountAbsence: "",
            radioholiday: "",
            holiday: "Valor obrigatório",
            radioPct: "",
            percentage: "",
            idusers: "",
        };
        expect(validateFields(values)).toEqual(expectedErrors);
    });
    it('should return an object', () => {
        const values = {
            subjectName: 'a',
            startClasses: 'a',
            finishClasses: '1',
            amountDaysClasses: '12',
            amountAbsence: '1',
            radioholiday: 'Sim',
            holiday: '',
            radioPct: 'Não',
            percentage: '',
            idusers: '1',
        };
        const expectedErrors = {
            subjectName: "",
            startClasses: "",
            finishClasses: "",
            amountDaysClasses: "Valor máximo é de 7 dias",
            amountAbsence: "",
            radioholiday: "",
            holiday: "Valor obrigatório",
            radioPct: "",
            percentage: "Valor obrigatório",
            idusers: "",
        };
        expect(validateFields(values)).toEqual(expectedErrors);
    });
});