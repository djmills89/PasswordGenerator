function init() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]')
    const form = document.querySelector('form')
    const passwordRange = document.querySelector('input[type="range"]')
    const passwordDisplay = document.querySelector('.password')
    const passwordLength = document.querySelector('.password__length')
    const copyIcon = document.querySelector('.password__copy')
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
        const newPassword = generatePassword(passwordRange.value, poolArr)
        const passwordStrength = calculatePasswordStrength(newPassword)
        renderStrength(passwordStrength)
        passwordDisplay.textContent = newPassword
    })

    copyIcon.addEventListener('click', async () => {
        try {
            const text = passwordDisplay.textContent

            await navigator.clipboard.writeText(text)
            console.log('text copied successfully!')
        } catch (err) {
            console.error('failed to copy: ', err)
        }
    })
}


function setPool(input) {
    let pool = ''
    const inputArr = Array.from(input)
    const includeUpperCase = inputArr.find(element => element.id === 'upper-case').checked
    const includeLowerCase = inputArr.find(element => element.id === 'lower-case').checked
    const includeNumbers = inputArr.find(element => element.id === 'numbers').checked
    const includeSymbols = inputArr.find(element => element.id === 'symbols').checked


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


function calculatePasswordStrength(pool) {
    const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{12,})")
    const mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})")
    const weakRegex = new RegExp('(?=.{8,})')
    //numbers represent levels of password strength, used to determine # of divs to fill
    if (strongRegex.test(pool)) return 4
    if (mediumRegex.test(pool)) return 3
    if (weakRegex.test(pool)) return 2
    return 1
}


function renderStrength(strength) {
    const bars = document.querySelectorAll('.strength__levels')

    bars.forEach(bar => bar.classList.remove(`strength-1`, `strength-2`, `strength-3`, `strength-4`))

    for (let i = 0; i < strength; i++) {
        bars[i].classList.add(`strength-${strength}`)
    }

}

init()