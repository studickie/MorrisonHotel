var loginPage = {};

loginPage.postSignin = function () {
    var form = document.querySelector('form[name=login_form]');

    http('POST', 'http://localhost:3000/auth/signin', 
    {
        email: form.email,
        password: form.password
    })
    .then(function(response) {
        console.log('singin success', response);
    })
    .catch(function(error) {
        console.log('signin error', error);
    })
}

loginPage.init = function () {
    var btnSubmit = document.querySelector('button[name=submit]');

    if (btnSubmit) {
        btnSubmit.addEventListener('click', loginPage.postSignin);
    }
}

window.addEventListener('load', loginPage.init);