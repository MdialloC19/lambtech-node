

const isNumber = (value) => {
    const numbers = /^[0-9]+$/;
    return value.match(numbers);
}

const isEmail = (value) => {
    const email = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return value.match(email);
}

const isPhone = (value) => {
    const phone = /^[0-9]{12}$/;
    return value.match(phone);
}

const hasInjection = (value) => {
    return false;
}

export default {
    isNumber,
    isPhone,
    hasInjection,
    isEmail
}