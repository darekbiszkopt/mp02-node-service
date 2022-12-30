const isBankValid = (bank) => {
    let valid = true;
    if (!bank.name) {
        console.log("name is undefined")
        valid = false;
    }
    if (!bank.address) {
        console.log("address is undefined")
        valid = false;
    }
    return valid;
}

const bankInvalidResponse = (bank) => {
    const invalid = []

    if (!bank.name) {
        invalid.push({inputName: 'name-error', message: 'Nazwa jest wymagana'})
    }
    if (!bank.address) {
        invalid.push({inputName: 'address-error', message: 'Adres jest wymagany'})
    }

    return invalid;
}

exports.isBankValid = isBankValid;
exports.bankInvalidResponse = bankInvalidResponse;
