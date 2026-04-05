const SESSION_DURATION = 24 * 60 * 60 * 1000;

function saveUserSession(user){
  user.loggedAt = Date.now();
  user.expiresAt = Date.now() + SESSION_DURATION;
  localStorage.setItem('foodies_home_user', JSON.stringify(user));
}

const params = new URLSearchParams(location.search);
const action = params.get('action');
const nameInput = document.getElementById('name');
const nameLabel = document.getElementById('name-label');
const modeTitle = document.getElementById('mode-title');
const submitBtn = document.getElementById('submit-btn');
const altText = document.getElementById('alt-text');

function setModeRegister(on){
  if(on){
    nameInput.style.display = '';
    nameLabel.style.display = '';
    modeTitle.innerHTML = '<h2>Create account</h2>';
    submitBtn.textContent = 'Create account';
    altText.innerHTML = 'Already have an account? <a href="login.html">Sign in</a>';
  } else {
    nameInput.style.display = 'none';
    nameLabel.style.display = 'none';
    modeTitle.innerHTML = '<h2>Sign in</h2>';
    submitBtn.textContent = 'Sign in';
    altText.innerHTML = 'New here? <a href="register.html">Create an account</a>';
  }
}

function safeSetMode(){
  if(!modeTitle || !submitBtn || !nameInput || !nameLabel || !altText) return;
  setModeRegister(action === 'register');
}

safeSetMode();

const loginForm = document.getElementById('login-form');
if(loginForm){
  loginForm.addEventListener('submit', function(e){
  e.preventDefault();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const errorEl = document.getElementById('error');
  errorEl.textContent = '';

  if(!email){ errorEl.textContent = 'Please enter your email.'; return; }
  if(!password){ errorEl.textContent = 'Please enter your password.'; return; }

  if(action === 'register'){
    const name = (nameInput && nameInput.value.trim()) || '';
    if(!name){ errorEl.textContent = 'Please enter your full name.'; return; }
    saveUserSession({email,name});
  } else {
    saveUserSession({email});
  }
  const next = params.get('next') || 'index.html';
  location.href = next;
  });
}

const googleLogin = document.getElementById('google-login');
if(googleLogin){
  googleLogin.addEventListener('click', ()=>{
    const email = prompt('Enter Google email for demo sign-in');
    if(!email) return;
    const profile = { email, name: email.split('@')[0], provider: 'google' };
    saveUserSession(profile);
    const next = new URLSearchParams(location.search).get('next') || 'index.html';
    location.href = next;
  });
}
