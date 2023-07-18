const logoutBtn = document.getElementById('logout-btn')
const loginBtn = document.getElementById('login-btn')
const registerBtn = document.getElementById('register-btn')
const profileBtn = document.getElementById('profile-btn')




console.log(logoutBtn)
if(logoutBtn){
    logoutBtn.addEventListener('click', async (evt) => {
        window.location.replace('/logout')
    })
    profileBtn.addEventListener('click', async (evt) => {
        window.location.replace('/profile')
    })

}else {
    loginBtn.addEventListener('click', async (evt) => {
        window.location.replace('/login')
    })
    registerBtn.addEventListener('click', async (evt) => {
        window.location.replace('/register')
    })

}
