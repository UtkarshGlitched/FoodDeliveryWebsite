const SESSION_DURATION = 24 * 60 * 60 * 1000;

function saveUserSession(user){
  user.createdAt = Date.now();
  user.expiresAt = Date.now() + SESSION_DURATION;
  localStorage.setItem('foodies_home_user', JSON.stringify(user));
}

function validateEmail(e){ return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e); }
function validatePhone(p){ return /^\+?[0-9\-\s()]{7,20}$/.test(p); }

const strengthBar = document.getElementById('strength-bar');
const passwordInput = document.getElementById('password');
const toggleBtn = document.getElementById('toggle-password');
const backBtn = document.getElementById('back-to-login');

function calcStrength(pw){
  let score = 0;
  if(pw.length >= 6) score += 1;
  if(/[A-Z]/.test(pw)) score += 1;
  if(/[0-9]/.test(pw)) score += 1;
  if(/[^A-Za-z0-9]/.test(pw)) score += 1;
  return Math.min(4, score);
}

passwordInput && passwordInput.addEventListener('input', ()=>{
  const s = calcStrength(passwordInput.value);
  const percent = (s/4)*100;
  if(strengthBar) strengthBar.style.width = percent + '%';
});

toggleBtn && toggleBtn.addEventListener('click', ()=>{
  if(passwordInput.type === 'password'){ passwordInput.type = 'text'; toggleBtn.textContent = 'Hide'; }
  else { passwordInput.type = 'password'; toggleBtn.textContent = 'Show'; }
});

backBtn && backBtn.addEventListener('click', ()=> location.href='login.html');

document.getElementById('register-form').addEventListener('submit', function(e){
  e.preventDefault();
  const fullname = document.getElementById('fullname').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const confirm = document.getElementById('confirm').value;
  const agree = document.getElementById('agree').checked;
  const errorEl = document.getElementById('error');
  errorEl.textContent = '';

  if(!fullname){ errorEl.textContent = 'Please enter your full name.'; return; }
  if(!phone || !validatePhone(phone)){ errorEl.textContent = 'Please enter a valid phone number.'; return; }
  if(!email || !validateEmail(email)){ errorEl.textContent = 'Please enter a valid email address.'; return; }
  if(password.length < 6){ errorEl.textContent = 'Password must be at least 6 characters.'; return; }
  if(password !== confirm){ errorEl.textContent = 'Passwords do not match.'; return; }
  if(!agree){ errorEl.textContent = 'You must agree to the Terms & Privacy.'; return; }

  saveUserSession({ fullname, phone, email });

  const params = new URLSearchParams(location.search);
  const next = params.get('next') || 'index.html';
  location.href = next;
});

const googleRegister = document.getElementById('google-register');
if(googleRegister){
  googleRegister.addEventListener('click', ()=>{
    const email = prompt('Enter Google email for demo register');
    if(!email) return;
    const profile = { email, fullname: email.split('@')[0], provider: 'google' };
    saveUserSession(profile);
    const next = new URLSearchParams(location.search).get('next') || 'index.html';
    location.href = next;
  });
}
