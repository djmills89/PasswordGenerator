function init() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]')
    const form = document.querySelector('form')
    const passwordRange = document.querySelector('input[type="range"]')
    const passwordDisplay = document.querySelector('.password')
    const passwordLength = document.querySelector('.password__length')
    passwordLength.textContent = passwordRange.value


    passwordRange.addEventListener('input', (e) => {
        passwordLength.textContent = passwordRange.value
    })

    form.addEventListener('submit', (e) => {
        e.preventDefault()
        const poolArr = setPool(checkboxes)
        if (poolArr === '') {
            console.log('you must select at least one option')
            return
        }
        passwordDisplay.textContent = generatePassword(passwordRange.value, poolArr.split(""), poolArr)
    })
}


function setPool(input) {
    let pool = ''
    const includeUpperCase = Array.from(input).find(element => element.id === 'upper-case').checked
    const includeLowerCase = Array.from(input).find(element => element.id === 'lower-case').checked
    const includeNumbers = Array.from(input).find(element => element.id === 'numbers').checked
    const includeSymbols = Array.from(input).find(element => element.id === 'symbols').checked


    if (includeUpperCase) pool += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    if (includeLowerCase) pool += 'abcdefghijklmnopqrstuvwxyz'
    if (includeNumbers) pool += '0123456789'
    if (includeSymbols) pool += '!@#$%^&*()-_+={}[]|\:;"<>,.?/~`'
    return pool
}


function generatePassword(userPasswordLength, array) {
    let password = ''
    for (let i = 0; i < userPasswordLength; i++) {
        password += array[randIndex(array.length)]
    }
    return password
}


function randIndex(length) {
    const randomArray = new Uint8Array(1)
    crypto.getRandomValues(randomArray)
    return randomArray[0] % length
}







init()