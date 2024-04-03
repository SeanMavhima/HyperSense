var nameError = document.getElementById("name-Error");
var phoneError = document.getElementById("phone-Error");
var emailError = document.getElementById("email-Error");
var passwordError = document.getElementById("password-Error");
var confirmError = document.getElementById("confirm-Error");
var submitError = document.getElementById("form-Error");
var formError = document.getElementById("form-Error");
var messageError = document.getElementById("register-Error");
var valuesError = document.getElementById("values-Error");


function validateName(){
    var name = document.getElementById('namefield').value;

    if (name.length == 0) {
        nameError.innerHTML = "Name is required";
        return false;

    }
    if (!name.match(/^[A-Za-z]*\s{1}[A-Za-z]*$/)) {
        //we are saying the first character must be an alphabet, there will be a space, then any character from A-z
        nameError.innerHTML = "Write full name";
        return false;
        //so this error will be thrown if the first letter is not an alphabet and there is a space of more than 1 between the two words
    }
    nameError.innerHTML = '<i class="fas fa-check-circle"></i>';
    return true;
}

function validateEmail() {
    var email = document.getElementById('emailfield').value;

    if (email.length == 0) {
        emailError.innerHTML = 'Email is required';
        return false;
    }
    if (!email.match(/^[A-Za-z\._\-[0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)){
        emailError.innerHTML = 'Email invalid';
        return false;
    }
    emailError.innerHTML =  '<i class="fas fa-check-circle"></i>';
    return true;
}

function validateEmail_v2() {
    var email = document.getElementById('emailfield').value;

    if (email.length == 0) {
        emailError.innerHTML = 'Email is required';
        return false;
    }
    if (!email.match(/^[A-Za-z\._\-[0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)){
        emailError.innerHTML = 'Email invalid';
        return false;
    }
    emailError.innerHTML = '';
    return true;
}

function validatePassword() {
    var pass= document.getElementById('passwordfield').value;
    var required = 8;
    var left = required - pass.length;

    if (left>0) {
        passwordError.innerHTML = left + ' more left';
         return false;
    }
 
    passwordError.innerHTML = '<i class="fas fa-check-circle"></i>';
    return true;

}

function validatePassword_v2() {
    var pass= document.getElementById('passwordfield').value;
    var required = 8;
    var left = required - pass.length;

    if (left>0) {
        passwordError.innerHTML = left + ' more left';
         return false;
    }
 
    passwordError.innerHTML = '';
    return true;

}


function validatePassword_v3() {
    var pass= document.getElementById('confirmfield').value;
    var required = 8;
    var left = required - pass.length;

    if (left>0) {
        confirmError.innerHTML = left + ' more left';
         return false;
    }
 
    confirmError.innerHTML = '';
    return true;

}


// <----------- formValidation -------------->


function validateForm() {
    if (!validateName()|| !validateEmail() || !validatePassword() ) {
        formError.style.display = 'block';
        formError.innerHTML = 'Please fix error to submit';
        setTimeout(function() {submitError.style.display = 'none';},3000);
        return false;
    }
}

function validateForm2() {
    if (!validateEmail() || !validatePassword() ) {
        formError.style.display = 'block';
        formError.innerHTML = 'Please fix error to submit';
        setTimeout(function() {submitError.style.display = "none";},3000);
        return false;
    }
}


function validateForm3() {
    if ( !validateEmail_v2() || !validatePassword_v2() || !validatePassword_v3()) {
        formError.style.display = 'block';
        formError.innerHTML = 'Please fix error to submit';
        setTimeout(function() {submitError.style.display = 'none';},3000);
        return false;
    }
    const pass= document.getElementById('passwordfield').value;
    const pass2= document.getElementById('confirmfield').value;

    if (pass != pass2) {
        formError.style.display = 'block';
        formError.innerHTML = 'Passwords do not match';
        setTimeout(function() {submitError.style.display = 'none';},3000);
        return false;
    }
}
