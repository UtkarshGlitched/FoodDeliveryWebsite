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

  const msg = document.createElement('div');
  msg.style.cssText = 'position:fixed;top:20px;left:50%;transform:translateX(-50%);background:#10b981;color:#fff;padding:14px 28px;border-radius:8px;z-index:9999;font-weight:600;box-shadow:0 4px 12px rgba(0,0,0,0.15)';
  msg.textContent = '✓ Account created successfully! Redirecting...';
  document.body.appendChild(msg);
  
  const params = new URLSearchParams(location.search);
  const next = params.get('next') || 'index.html';
  setTimeout(() => location.href = next, 1500);
});

// Demo Google sign-up with nice modal
const googleRegister = document.getElementById('google-register');
if(googleRegister){
  googleRegister.addEventListener('click', ()=>{
    const modal = document.createElement('div');
    modal.id = 'demo-google-modal';
    modal.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.6);display:flex;align-items:center;justify-content:center;z-index:9999';
    modal.innerHTML = `
      <div style="background:#fff;border-radius:16px;padding:32px;max-width:400px;width:90%;text-align:center">
        <div style="width:64px;height:64px;background:#f3f4f6;border-radius:50%;margin:0 auto 16px;display:flex;align-items:center;justify-content:center">
          <svg width="32" height="32" viewBox="0 0 24 24"><path fill="#EA4335" d="M12 11.5v2.9h7.2c-.3 1.7-1.6 4-4.3 5.3l-0.1.1-3.2-.1c-3.4 0-6.2-2.8-6.2-6.3 0-3.5 2.8-6.3 6.2-6.3 2.1 0 3.6.9 4.4 1.7l1.9-1.9C17.5 3.6 14.9 2.5 12 2.5 7 2.5 3.2 6.3 3.2 11.3S7 20 12 20c3.1 0 5.4-1.1 6.9-2.7L12 11.5z"/></svg>
        </div>
        <h3 style="margin:0 0 8px;font-size:20px">Create Account with Google</h3>
        <p style="color:#6b7280;margin:0 0 20px;font-size:14px">Enter your email to create account</p>
        <input type="text" id="demo-google-name" placeholder="Full Name" style="width:100%;padding:14px;border:2px solid #e5e7eb;border-radius:10px;margin-bottom:12px;font-size:15px">
        <input type="email" id="demo-google-email" placeholder="you@gmail.com" style="width:100%;padding:14px;border:2px solid #e5e7eb;border-radius:10px;margin-bottom:16px;font-size:15px">
        <div style="display:flex;gap:12px">
          <button id="demo-google-cancel" style="flex:1;padding:14px;border:2px solid #e5e7eb;background:#fff;border-radius:10px;cursor:pointer;font-weight:600">Cancel</button>
          <button id="demo-google-submit" style="flex:1;padding:14px;border:none;background:#ff6b01;color:#fff;border-radius:10px;cursor:pointer;font-weight:600">Create Account</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
    
    const nameInput = modal.querySelector('#demo-google-name');
    const emailInput = modal.querySelector('#demo-google-email');
    const submitBtn = modal.querySelector('#demo-google-submit');
    const cancelBtn = modal.querySelector('#demo-google-cancel');
    
    nameInput.focus();
    
    cancelBtn.onclick = () => modal.remove();
    submitBtn.onclick = () => {
      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      if(!name){ nameInput.style.borderColor = '#ef4444'; return; }
      if(!email || !email.includes('@')){ emailInput.style.borderColor = '#ef4444'; return; }
      modal.remove();
      const profile = { email, fullname: name, provider: 'google' };
      saveUserSession(profile);
      
      const msg = document.createElement('div');
      msg.style.cssText = 'position:fixed;top:20px;left:50%;transform:translateX(-50%);background:#10b981;color:#fff;padding:14px 28px;border-radius:8px;z-index:9999;font-weight:600;box-shadow:0 4px 12px rgba(0,0,0,0.15)';
      msg.textContent = '✓ Account created! Redirecting...';
      document.body.appendChild(msg);
      
      const next = new URLSearchParams(location.search).get('next') || 'index.html';
      setTimeout(() => location.href = next, 1500);
    };
    
    modal.onclick = (e) => {
      if(e.target === modal) modal.remove();
    };
  });
}
