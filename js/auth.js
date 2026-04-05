const SESSION_DURATION = 24 * 60 * 60 * 1000;

function saveUserSession(user){
  user.loggedAt = Date.now();
  user.expiresAt = Date.now() + SESSION_DURATION;
  localStorage.setItem('foodies_home_user', JSON.stringify(user));
}

function showSuccessMessage(){
  const msg = document.createElement('div');
  msg.style.cssText = 'position:fixed;top:20px;left:50%;transform:translateX(-50%);background:#10b981;color:#fff;padding:14px 28px;border-radius:8px;z-index:9999;font-weight:600;box-shadow:0 4px 12px rgba(0,0,0,0.15)';
  msg.textContent = '✓ Successfully signed in! Redirecting...';
  document.body.appendChild(msg);
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
    saveUserSession({email, name});
  } else {
    saveUserSession({email});
  }
  
  showSuccessMessage();
  const next = params.get('next') || 'index.html';
  setTimeout(() => location.href = next, 1000);
  });
}

// Demo Google sign-in - shows a nicer modal
const googleLogin = document.getElementById('google-login');
if(googleLogin){
  googleLogin.addEventListener('click', ()=>{
    // Create demo modal
    const modal = document.createElement('div');
    modal.id = 'demo-google-modal';
    modal.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.6);display:flex;align-items:center;justify-content:center;z-index:9999';
    modal.innerHTML = `
      <div style="background:#fff;border-radius:16px;padding:32px;max-width:400px;width:90%;text-align:center">
        <div style="width:64px;height:64px;background:#f3f4f6;border-radius:50%;margin:0 auto 16px;display:flex;align-items:center;justify-content:center">
          <svg width="32" height="32" viewBox="0 0 24 24"><path fill="#EA4335" d="M12 11.5v2.9h7.2c-.3 1.7-1.6 4-4.3 5.3l-0.1.1-3.2-.1c-3.4 0-6.2-2.8-6.2-6.3 0-3.5 2.8-6.3 6.2-6.3 2.1 0 3.6.9 4.4 1.7l1.9-1.9C17.5 3.6 14.9 2.5 12 2.5 7 2.5 3.2 6.3 3.2 11.3S7 20 12 20c3.1 0 5.4-1.1 6.9-2.7L12 11.5z"/></svg>
        </div>
        <h3 style="margin:0 0 8px;font-size:20px">Demo Google Sign-In</h3>
        <p style="color:#6b7280;margin:0 0 20px;font-size:14px">Enter any email to test sign-in</p>
        <input type="email" id="demo-google-email" placeholder="you@gmail.com" style="width:100%;padding:14px;border:2px solid #e5e7eb;border-radius:10px;margin-bottom:16px;font-size:15px">
        <div style="display:flex;gap:12px">
          <button id="demo-google-cancel" style="flex:1;padding:14px;border:2px solid #e5e7eb;background:#fff;border-radius:10px;cursor:pointer;font-weight:600">Cancel</button>
          <button id="demo-google-submit" style="flex:1;padding:14px;border:none;background:#ff6b01;color:#fff;border-radius:10px;cursor:pointer;font-weight:600">Sign In</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
    
    const emailInput = modal.querySelector('#demo-google-email');
    const submitBtn2 = modal.querySelector('#demo-google-submit');
    const cancelBtn = modal.querySelector('#demo-google-cancel');
    
    emailInput.focus();
    
    cancelBtn.onclick = () => modal.remove();
    submitBtn2.onclick = () => {
      const email = emailInput.value.trim();
      if(!email || !email.includes('@')){
        emailInput.style.borderColor = '#ef4444';
        return;
      }
      modal.remove();
      const profile = { email, name: email.split('@')[0], provider: 'google' };
      saveUserSession(profile);
      showSuccessMessage();
      const next = new URLSearchParams(location.search).get('next') || 'index.html';
      setTimeout(() => location.href = next, 1000);
    };
    
    modal.onclick = (e) => {
      if(e.target === modal) modal.remove();
    };
  });
}
