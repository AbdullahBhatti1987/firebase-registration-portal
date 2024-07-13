import {
  auth,
  db,
  storage,
  createUserWithEmailAndPassword,
  doc,
  setDoc,
  ref,
  uploadBytes,
  getDownloadURL,
} from "../main/utils.js";


var userSignupPassword = document.getElementById("signup-password");
var userConfirmPassword = document.getElementById("confirm-password");
var signupUserButton = document.getElementById("signupUserBtn");
var userSignupForm = document.getElementById("signup-form");
var loaderDiv = document.getElementById('loader')
var mainDiv = document.getElementById('mainDiv')

userSignupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const firstName = e.target[0].value;
  const lastName = e.target[1].value;
  const age = e.target[2].value;
  const image = e.target[3].files[0];
  const email = e.target[4].value;
  const mobile = e.target[5].value;
  const password = e.target[6].value;

  const userInfo = {
    firstName,
    lastName,
    age,
    image,
    email,
    mobile,
    password,
  };
  signupUserButton.disabled = true;
  signupUserButton.innerText = "Loading...";
  loaderDiv.style.display = 'grid';
  mainDiv.style.filter = 'grayscale(1)';
  if (userSignupPassword.value === userConfirmPassword.value) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const uid = user.uid;
        console.log("User Created", uid);
        const userRef = ref(storage, `user/${uid}`);
        uploadBytes(userRef, image)
          .then(() => {
            console.log("Image Upload");
            getDownloadURL(userRef)
              .then((url) => {
                console.log("url download ho gaya");
                console.log(url);
                userInfo.image = url;
                const userDbRef = doc(db, "users", userCredential.user.uid);
                setDoc(userDbRef, userInfo)
                  .then(() => {
                    console.log("user object updated into Db");
                    signupUserButton.disabled = false;
                    signupUserButton.innerText = "Submit";
                    location.href = "/";
                  })
                  .catch(() => {
                    console.log("User object not updated into Db");
                    signupUserButton.disabled = false;
                    signupUserButton.innerText = "Submit";
                  });
              })
              .catch(() => {
                console.log("url download nahi ho raha");
              });
          })
          .catch(() => {
            console.log("Error in Uploading");
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // ..
      });
  } else {
    console.log(errorMessage);
  }

  console.log(userInfo);
});

var loginButton = document.getElementById("login-toggle");
loginButton.addEventListener("click", toggleLogin);
function toggleLogin() {
  console.log("login ka button chal raha hai");
  location.href = "../login/signin.html";
}