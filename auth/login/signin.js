import {auth, signInWithEmailAndPassword} from '../main/utils.js'

const signinForm = document.getElementById('login-form');
var loaderDiv = document.getElementById('loader')
var mainDiv = document.getElementById('mainDiv')

signinForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = e.target[0].value;
  const password = e.target[1].value;

signInWithEmailAndPassword(auth, email, password)

  .then((userCredential) => {
    loaderDiv.style.display = 'grid';
  mainDiv.style.filter = 'grayscale(1)';

    const user = userCredential.user;
    console.log('user successful login')
    location.href = '/';
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage)
  });

})


var signupButton = document.getElementById('signup-toggle');
signupButton.addEventListener('click', toggleSignup)
function toggleSignup(){
  location.href = '../signup/signup.html';
  }


