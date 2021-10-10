let firstRegExp = /^[a-zA-Z]{1,20}$/;
let lastRegExp = /^[a-zA-Z]{1,20}$/;
let emailRegExp = /^[a-zA-Z0-9_\-\.]+@[a-zA-Z0-9_]+\.[a-zA-Z0-9_]+$/;
let passwordRegExp = /^[a-zA-Z0-9_]{8,15}$/;
let firstCheckRegExp = false;
let lastCheckRegExp = false;
let emailCheckRegExp = false;
let passwordCheckRegExp = false;
let emailCheck = false;
let localStorageEmty = false;
let arrUsers = [];
let user = {
    first: '',
    last: '',
    email: '',
    pas: ''
}

function CheckRegExp(regexp, text, index) {
    let s = '';
    switch (index) {
        case 0:
            s = 'first name';
            break;
        case 1:
            s = 'last name';
            break;
        case 2:
            s = 'email';
            break;
        case 3:
            s = 'password';
            break;
    }
    if (regexp.test(text)) {
        $('.boxError')[index].style.opacity = 0;
        $('.boxLogin__image')[index].attributes.src.textContent = './image/accept.png';
        return true;
    }
    else {
        $('.boxError')[index].style.opacity = 1;
        $('.boxError')[index].children[0].textContent = 'Please provid valid ' + s;
        $('.boxLogin__image')[index].attributes.src.textContent = './image/false.png';
        return false;
    }
}
function CheckEmail(array, email) {
    for (let i = 0; i < array.length; i++) {
        if (array[i].email.toLowerCase() == email.toLowerCase()) {
            $('.boxError')[2].style.opacity = 1;
            $('.boxError')[2].children[0].textContent = 'This email already exist';
            $('.boxLogin__image')[2].attributes.src.textContent = './image/false.png';
            $('#email')[0].style.borderColor = 'red';
            return false;
        }
    }
    $('.boxError')[2].style.opacity = 0;
    $('.boxLogin__image')[2].attributes.src.textContent = './image/accept.png';
    $('#email')[0].style.borderColor = 'green';
    return true;
}

$(document).ready(function () {
    if (localStorage.length > 0) {
        let fromJson = localStorage.getItem('arr');
        arrUsers = JSON.parse(fromJson);
        // localStorageEmty = false;
    }
    else {
        // localStorageEmty = true;
    }
    $('.boxLogin__button').on('click', function () {
        firstCheckRegExp = CheckRegExp(firstRegExp, $('#first').val(), 0);
        if (firstCheckRegExp) {
            $('#first')[0].style.borderColor = 'green';
        }
        else {
            $('#first')[0].style.borderColor = 'red';
        }

        lastCheckRegExp = CheckRegExp(lastRegExp, $('#last').val(), 1);
        if (lastCheckRegExp) {
            $('#last')[0].style.borderColor = 'green';
        }
        else {
            $('#last')[0].style.borderColor = 'red';
        }

        emailCheckRegExp = CheckRegExp(emailRegExp, $('#email').val(), 2);
        if (emailCheckRegExp) {
            $('#email')[0].style.borderColor = 'green';
        }
        else {
            $('#email')[0].style.borderColor = 'red';
        }

        passwordCheckRegExp = CheckRegExp(firstRegExp, $('#pasword').val(), 3);
        if (passwordCheckRegExp) {
            $('#pasword')[0].style.borderColor = 'green';
        }
        else {
            $('#pasword')[0].style.borderColor = 'red';
        }
        if (emailCheckRegExp) {
            emailCheck = CheckEmail(arrUsers, $('#email').val());
        }

        if (firstCheckRegExp & lastCheckRegExp & emailCheckRegExp & passwordCheckRegExp & emailCheck) {
            user.first = $('#first').val();
            user.last = $('#last').val();
            user.email = $('#email').val();
            user.pas = $('#pasword').val();
            arrUsers[arrUsers.length] = Object.assign({}, user)
            let toJson = JSON.stringify(arrUsers);
            localStorage.setItem('arr', toJson);

            firstCheckRegExp = false;
            lastCheckRegExp = false;
            emailCheckRegExp = false;
            passwordCheckRegExp = false;
            emailCheck = false;
            document.forms.boxLogin.reset();
            for (let i = 0; i != 4; i++) {
                $('.boxLogin__image')[i].attributes.src.textContent = '';
            }
            $('#first')[0].style.borderColor = '';
            $('#last')[0].style.borderColor = '';
            $('#email')[0].style.borderColor = '';
            $('#pasword')[0].style.borderColor = '';
        }
    });
    $('.boxLogin__link').on('click', function () {
        $('.signIn').addClass('activeModal');
    });
    $('.signInForm__link').on('click', function () {
        $('.signIn').removeClass('activeModal');
        firstCheckRegExp = false;
        lastCheckRegExp = false;
        emailCheckRegExp = false;
        passwordCheckRegExp = false;
        emailCheck = false;
        document.forms.boxLogin.reset();
        for (let i = 0; i != 4; i++) {
            $('.boxLogin__image')[i].attributes.src.textContent = '';
            $('.boxError')[i].style.opacity = 0;
        }
        $('#first')[0].style.borderColor = '';
        $('#last')[0].style.borderColor = '';
        $('#email')[0].style.borderColor = '';
        $('#pasword')[0].style.borderColor = '';
        $('.signInError')[0].style.opacity = 0;
        $('.boxError')[0].children[0].textContent ='';
    });
    $('.signInForm__button').on('click', function () {
        let check = true;
        if (localStorage.length > 0) {
            let fromJson = localStorage.getItem('arr');
            arrUsers = JSON.parse(fromJson);
            localStorageEmty = false;
        }
        else {
            localStorageEmty = true;
        }
        if (localStorageEmty) {
            $('.signInError')[0].style.opacity = 1;
            $('.boxError')[0].children[0].textContent ='localstorage is empty';
        }
        else{
           for (let i=0; i<arrUsers.length; i++){
               if (arrUsers[i].email.toLowerCase() == $('#emailSignIn').val().toLowerCase() & arrUsers[i].pas==$('#passwordSignIn').val()) {
                   $('.signInError')[0].style.opacity = 0;
                   $('.signInError')[0].children[0].textContent ='';
                   $('.userName')[0].textContent=arrUsers[i].first+' '+arrUsers[i].last;
                   $('.userEmail')[0].textContent=arrUsers[i].email;
                   $('.signIn').removeClass('activeModal');
                   $('.modalWindow').addClass('activeModal');
                   document.forms.signInForm.reset();
                   break;
               }
               else{
                   check=false;
               }
           }
        }
        if (!check){
            $('.signInError')[0].style.opacity = 1;
            $('.signInError')[0].children[0].textContent ='incorrect email or password';
        }
    });
    $('.userButton').on('click',function(){
        $('.modalWindow').removeClass('activeModal');   
        $('.signInError')[0].style.opacity = 0;
        $('.signInError')[0].children[0].textContent ='';
    })
})