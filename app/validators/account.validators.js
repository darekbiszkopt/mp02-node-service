const isAccountValid = (account) => {
    let valid = true;

    if (account.account_number.length !== 15) {
        console.log("account must have 15 numbers")
        valid = false;
    }

    if (!containsOnlyNumbers(account.account_number.toString())) {
        console.log("account must contains only numbers")
        valid = false;
    }

    if (!account.account_number) {
        console.log("account_number is undefined")
        valid = false;
    }

    if (!dateMatch(account.creation_date)) {
        console.log("creation_date dont match YYYY-MM-DD")
        valid = false;
    }

    if (!account.creation_date) {
        console.log("creation_date is undefined")
        valid = false;
    }

    if (!account.bonuses) {
        console.log("bonuses is undefined")
        valid = false;
    }

    return valid;
}


const accountInvalidResponse = (account) => {
    const invalid = []

    if (account.account_number.length !== 15) {
        invalid.push({inputName: 'account_number-error', message: 'Konto musi składać się z 15 cyfr'})
    }

    if (!containsOnlyNumbers(account.account_number.toString())) {
        invalid.push({inputName: 'account_number-error', message: 'Konto musi zawierac wyłącznie cyfry'})
    }

    if (!account.account_number) {
        invalid.push({inputName: 'account_number-error', message: 'Wymagane'})
    }

    if (!dateMatch(account.creation_date)) {
        invalid.push({inputName: 'creation_date-error', message: 'Data nie pasuje do formatu: YYYY-MM-DD'})
    }

    if (!account.creation_date) {
        invalid.push({inputName: 'creation_date-error', message: 'Wymagane'})
    }

    if (!account.bonuses) {
        invalid.push({inputName: 'bonuses-error', message: 'Wymagane'})
    }

    return invalid;
}

exports.isAccountValid = isAccountValid;
exports.accountInvalidResponse = accountInvalidResponse;

function dateMatch(date) {
    return date.toString().match(/^\d{4}-\d{2}-\d{2}$/);
}

function containsOnlyNumbers(str) {
    return /^\d+$/.test(str);
}
