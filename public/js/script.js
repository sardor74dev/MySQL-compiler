// getting textarea and buttons data by id
const textarea = document.getElementById('textArea'),
    copyBtn = document.getElementById('toClipboard'),
    copied = document.getElementById('copiedMessage'),
    closeBtn = document.getElementById('closeButton')

// function for copying textarea value
function copying () {
    textarea.select()
    navigator.clipboard.writeText(textarea.value)
    .then(() => {
        copied.style.display = 'flex'
    })
    .catch(() => {
        alert('Unable to copy text to clipboard:', error)
    })
}

// closing message function
 function closingMessage(){
    copied.style.display = 'none'
 }

// tab switching function
function openTab(evt, tabName) {
  let i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tabName).style.display = "flex";
  evt.currentTarget.className += " active";
}

// gettting hamburger menu data by id
const menu = document.querySelector('.burger_list')
const menuItems = document.querySelectorAll('.list_item')
const hamburger = document.querySelector('.hamburger')
const navToggle = document.querySelector('.nav-toggle')

// toggle menu function
function toggleMenu(){
    if (menu.classList.contains('showMenu')){
        menu.classList.remove('showMenu')
        hamburger.style.display = 'block'
        hamburger.style.transform = 'rotate(-180deg)'
        hamburger.style.transition = "all 0.5s";
        hamburger.style.position = 'relative'
    } else {
        menu.classList.add('showMenu')
        hamburger.style.transform = 'rotate(180deg)'
        hamburger.style.transition = "all 0.5s";
        hamburger.style.position = 'fixed'
    }
}

navToggle ? navToggle.addEventListener('click', toggleMenu) : ''

menuItems.forEach(
    function (menuItem){
        menuItem.addEventListener('click', toggleMenu)
    }
)

// show password option
function showPassword (inputId, openedEye, closedEye){
  const input = document.getElementById(inputId),
    openedEyeIcon = document.getElementById(openedEye),
    closedEyeIcon = document.getElementById(closedEye)
 
  if (input.type === 'password'){
    input.type = 'text'
    closedEyeIcon.style.display = 'flex'
    openedEyeIcon.style.display = 'none'
  } else {
    input.type = 'password'
    closedEyeIcon.style.display = 'none'
    openedEyeIcon.style.display = 'flex'
  }
}

// email input validation
const emailError = document.getElementById('invalidEmail')

function emailInp (emailId){
  const email = document.getElementById(emailId)
  emailValidation(email, emailError)
}

function emailValidation(emailInput, emailError){
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  validation(emailInput, emailError, regexEmail)
}

function validation(input, message, regexInput){
  const regex = regexInput

  if(regex.test(input.value)){
    input.style.border = '1px solid green'
    message.style.display = 'none'
  } else {
    input.style.border = '1px solid crimson'
    message.style.display = 'flex'
  }
}

// password input validation
const signInPassword = document.getElementById('signInPassword')
const signUpPassword = document.getElementById('signUpPassword')
const passwordError = document.getElementById('invalidPassword')

function passwordInp(passwordId){
  const password = document.getElementById(passwordId)

  passwordValidation(password)
}

function passwordValidation(passwordInput, passwordError){
  const isNonWhiteSpace = /^\S*$/
  validation(passwordInput, passwordError, isNonWhiteSpace)
}


// checking strength of password
function checkPasswordStrength(password) {
  const meter = document.getElementById('password-strength-meter'),
    strength = calculatePasswordStrength(password),
    strengthTitle = document.getElementById('strength-title'),
    title = 'Password strength: '

  strengthTitle.innerHTML = ''
  meter.innerHTML = '';
  meter.classList.remove('weak', 'medium', 'strong');

  if (strength === 'weak') {
    meter.classList.add('weak');
    meter.innerHTML = 'Weak';
    strengthTitle.innerHTML = title
  } else if (strength === 'medium') {
    meter.classList.add('medium');
    meter.innerHTML = 'Medium';
    strengthTitle.innerHTML = title
  } else if (strength === 'strong') {
    meter.classList.add('strong');
    meter.innerHTML = 'Strong';
    strengthTitle.innerHTML = title
  }
}

// calculation
function calculatePasswordStrength(password) {
  const isContainsUppercase = /^(?=.*[A-Z]).*$/,
    isContainsLowercase = /^(?=.*[a-z]).*$/,
    isContainsNumber = /^(?=.*[0-9]).*$/,
    isContainsSymbol = /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/;

  if (isContainsUppercase.test(password) && isContainsLowercase.test(password) && isContainsNumber.test(password) && isContainsSymbol.test(password)){
    return 'strong';
  } else if (isContainsUppercase.test(password) && isContainsLowercase.test(password) && isContainsNumber.test(password)) {
    return 'medium';
  } else if(isContainsLowercase.test(password) || isContainsNumber.test(password)) {
    return 'weak';
  }
}

// getting sign in and sign-up buttons bu id
const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const container = document.getElementById("container");

// activating transitions by clicking "magic" buttons
signInButton ? signInButton.addEventListener("click", () => { container.classList.remove("right-panel-active")}) : ''
signUpButton ? signUpButton.addEventListener("click", () => { container.classList.add("right-panel-active")}) : ''

// веб программирование - это отрасль программиррования, где разрабатываются веб-сайты и веб-приложения;
// Фронт-энд, бэкенд, html, теги, атрибуты, head, body, meta, title, кодировка.  