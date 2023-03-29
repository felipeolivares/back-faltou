export const validateFields = (values) => {
    let hasError = false;
    const errors = {
        subjectName: "",
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

    if (!values.idusers) {
        errors.idusers = "Valor obrigatório";
        hasError = true;
    }

    if (!values.subjectName) {
        errors.subjectName = "Valor obrigatório";
        hasError = true;
    }
    if (!values.startClasses) {
        errors.startClasses = "Valor obrigatório";
        hasError = true;
    }
    if (!values.finishClasses) {
        errors.finishClasses = "Valor obrigatório";
        hasError = true;
    }
    if (!values.amountDaysClasses) {
        errors.amountDaysClasses = "Valor obrigatório";
        hasError = true;
    }
    if (values.amountDaysClasses && Number(values.amountDaysClasses) > 7) {
        errors.amountDaysClasses = "Valor máximo é de 7 dias";
        hasError = true;
    }
    if (!values.radioholiday) {
        errors.radioholiday = "Valor obrigatório";
        hasError = true;
    }
    if (!values.holiday && values.radioholiday === "Sim") {
        errors.holiday = "Valor obrigatório";
        hasError = true;
    }
    if (!values.radioPct) {
        errors.radioPct = "Valor obrigatório";
        hasError = true;
    }
    if (!values.percentage && values.radioPct === "Não") {
        errors.percentage = "Valor obrigatório";
        hasError = true;
    }
    return hasError ? errors : false;
};

