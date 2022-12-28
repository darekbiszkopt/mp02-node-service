const  isAccountValid = (account) => {
    let valid = true;
    if (!account.name) {
        console.log("name is undefined")
        valid = false;
    }
    if (!account.address) {
        console.log("address is undefined")
        valid = false;
    }

    return valid;
}

exports.isAccountValid = isAccountValid;
