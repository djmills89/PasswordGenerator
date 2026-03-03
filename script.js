function init() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"')
    const form = document.querySelector('form')
    const passwordRange = document.querySelector('input[type="range"]')
    const passwordDisplay = document.querySelector('.password')
    const passwordLength = document.querySelector('.password__length')
    passwordLength.textContent = passwordRange.value


    
    // const generatedPassword = generatePassword(passwordLength.value, poolArr.split(""), poolArr)

    passwordRange.addEventListener('input', (e) => {
        passwordLength.textContent = passwordRange.value
    })

    form.addEventListener('submit', (e) => {
        e.preventDefault()
        const poolArr = setPool(checkboxes)
        passwordDisplay.textContent = generatePassword(passwordRange.value, poolArr.split(""), poolArr)
    })
    

    // console.log(generatedPassword)
}


function setPool(input) {
    let pool = ''
    const includeUpperCase = Array.from(input).find(element => element.id === 'upper-case').checked
    const includeLowerCase = Array.from(input).find(element => element.id === 'lower-case').checked
    const includeNumbers = Array.from(input).find(element => element.id === 'numbers').checked
    const includeSymbols = Array.from(input).find(element => element.id === 'symbols').checked


    if (includeUpperCase) pool += 'ABCDEFGHIJKLMNOPQURSTUVWXYZ'
    if (includeLowerCase) pool += 'abcdefghijklmnopqurtuvwxyz'
    if (includeNumbers) pool += '0123456789'
    if (includeSymbols) pool += '!@#$%^&*()-_+={}[]|\:;"<>,.?/~`'
    return pool
}


function generatePassword(userPasswordLength, array, lengthController) {
    let password = ''
    for (let i = 0; i < userPasswordLength; i++) {
        password += array[randIndex(lengthController)]
    }
    return password
}


function randIndex(array) {
     return Math.floor(Math.random() * array.length)
}







init()