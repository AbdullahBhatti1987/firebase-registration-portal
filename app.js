import { auth, onAuthStateChanged, signOut, db, doc, getDoc, } from "./auth/main/utils.js";

const userFullName = document.getElementById('userFullName');
const userImage = document.getElementById('userImage');
const userEmail = document.getElementById('userEmail');

    onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.uid;
          console.log('user is signin')
          const userRef = doc(db, 'users', uid)
          getDoc(userRef).then((data)=>{
            userFullName.innerText = data.data().firstName + ' ' + data.data().lastName; 
            userImage.src = data.data().image;
            userEmail.innerText = data.data().email;
          }).catch((error)=>{
            alert(error)
          }) 
        } else {
          console.log('user not available')
          location.href = './auth/login/signin.html';
        }
      });

var userLogout = document.getElementById('logoutBtn');
userLogout.addEventListener('click', () => {
    signOut(auth)
    .then(() => {
        console.log('User is Logout')
        location.href = '/';
    })
    .catch((error) => {
      console.log(error)
    });
})

const profile = document.getElementById('profilePage')

profile.addEventListener('click', ()=>{
  console.log('profile page per click hua hai')
  location.href = './auth/profile/profile.html';
})

