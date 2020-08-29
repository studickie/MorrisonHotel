// var loginPage = {};

// loginPage.postSignin = function () {
//     var form = document.querySelector('form[name=login_form]');
    
//     http('POST', 'http://localhost:3000/auth/signin', 
//         {
//             email: form.email.value,
//             password: form.password.value
//         })
//         .then(function(response) {
//             console.log('singin success', response);
//         })
//         .catch(function(error) {
//             console.log('signin error', error);
//         })
// }

// loginPage.init = function () {
//     var btnSubmit = document.querySelector('button[name=submit]');

//     if (btnSubmit) {
//         btnSubmit.addEventListener('click', loginPage.postSignin);
//     }
// }



// function SigninForm (formElement) {
//     this._form = formElement;

//     this._emailPattern = /^([A-Za-z0-9])([A-Za-z0-9\_\-\.]){1,}@([A-Za-z0-9\_\-\.]){,1}[A-Za-z]$/;
//     this._passwordPattern = /([A-Za-z0-9\!\?\@\#\$\%\^\&\*]){8,16}/;

//     this.addButtonEvents();
// }

// SigninForm.prototype = {
//     inputIsValid: function(value, rules) {
//         return value.test(rules);
//     },
//     formIsValid: function() {
//         var hasError = false;
//         console.log(this._form.email.value, this._form.password.value)
//         if(!this.inputIsValid(this._form.email.value, this._emailPatter)) {
//             this.setHasError('email');
//             hasError = true;
//         }

//         if (!this.inputIsValid(this._form.password.value, this._passwordPattern)) {
//             this.setHasError('password');
//             hasError = true;
//         }
        
//         return !hasError;
//     },
//     setHasError: function(input) {
//         this._form[input].parentElement.classList.add('validation--error');
//     },
//     submit: function() {
//         // http('POST', 'http://localhost:3000/auth/signin', 
//         // {
//         //     email: this._form.email.value,
//         //     password: this._form.password.value
//         // });

//         console.log('submit');
//     },
//     addButtonEvents: function() {
//         var ctrl = this;

//         this._form.submit.addEventListener('click', function(e) {
//             e.preventDefault();

//             if (ctrl.formIsValid()) ctrl.submit();
//         });
//     }
// };

// window.addEventListener('load', function() {
//     var form = document.querySelector('form[name=signin]');

//     if (form) {
//         new SigninForm(form);
//     }
// });