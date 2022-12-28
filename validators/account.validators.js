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

exports.isClientValid = isClientValid;
