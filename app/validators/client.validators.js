const  isClientValid = (client) => {
    let valid = true;

    if (client.pesel.length !== 11) {
        console.log("pesel must have 11 numbers")
        valid = false;
    }
    if (!containsOnlyNumbers(client.pesel.toString())) {
        console.log("pesel must contains only numbers")
        console.log(client.pesel)
        valid = false;
    }
    if (!client.pesel.length) {
        console.log("pesel is undefined")
        valid = false;
    }
    if (!client.first_name) {
        console.log("first_name is undefined")
        valid = false;
    }
    if (!client.surname) {
        console.log("surname is undefined")
        valid = false;
    }
    if (!client.addresss) {
        console.log("address is undefined")
        valid = false;
    }
    if (client.can_get_loan !== 0 && client.can_get_loan !== 1) {
        valid = false;
    }
    return valid;
}

function containsOnlyNumbers(str) {
    return /^\d+$/.test(str);
}

const clientInvalidResponse = (client) => {
    const invalid = []

    if (client.pesel.length !== 11) {
        invalid.push({inputName: 'pesel-error', message: 'Pesel musi składać się z 11 cyfr'})
    }

    if (!containsOnlyNumbers(client.pesel.toString())) {
        invalid.push({inputName: 'pesel-error', message: 'Pesel musi składać się tylko z cyfr'})
    }
    if (!client.pesel.length) {
        invalid.push({inputName: 'pesel-error', message: 'Pesel jest wymagany'})
    }
    if (!client.first_name) {
        invalid.push({inputName: 'fname-error', message: 'Wymagane'})
    }
    if (!client.surname) {
        invalid.push({inputName: 'sname-error', message: 'Wymagane'})
    }
    if (!client.addresss) {
        invalid.push({inputName: 'addresss-error', message: 'Wymagane'})
    }
    if (+client.can_get_loan !== 0 && +client.can_get_loan !== 1) {
        console.log(client)
        invalid.push({inputName: 'can_get_loan-error', message: 'Wymagane'})
    }

    return invalid;
}

exports.isClientValid = isClientValid;
exports.clientInvalidResponse = clientInvalidResponse;
