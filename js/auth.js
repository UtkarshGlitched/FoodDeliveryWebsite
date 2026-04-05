document.addEventListener('DOMContentLoaded', function() {
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

  // Login toggle functionality
  const toggleBtns = document.querySelectorAll('.login-toggle .toggle-btn');
  const phoneGroup = document.getElementById('phone-input-group');
  const emailGroup = document.getElementById('email-input-group');
  const phoneInput = document.getElementById('phone');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const passwordToggleBtn = document.getElementById('toggle-password');

  // Password show/hide toggle
  if(passwordToggleBtn && passwordInput){
    passwordToggleBtn.addEventListener('click', function(){
      if(passwordInput.type === 'password'){
        passwordInput.type = 'text';
        passwordToggleBtn.textContent = 'Hide';
      } else {
        passwordInput.type = 'password';
        passwordToggleBtn.textContent = 'Show';
      }
    });
  }

  if(toggleBtns.length > 0){
    toggleBtns.forEach(btn => {
      btn.addEventListener('click', function(){
        toggleBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        const type = this.dataset.type;
        if(type === 'phone'){
          phoneGroup.style.display = 'block';
          emailGroup.style.display = 'none';
          phoneInput.setAttribute('required', 'true');
          emailInput.removeAttribute('required');
        } else {
          phoneGroup.style.display = 'none';
          emailGroup.style.display = 'block';
          emailInput.setAttribute('required', 'true');
          phoneInput.removeAttribute('required');
        }
      });
    });
  }

  const loginForm = document.getElementById('login-form');
  if(loginForm){
    loginForm.addEventListener('submit', function(e){
      e.preventDefault();
      const phone = document.getElementById('phone').value.trim();
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value.trim();
      const errorEl = document.getElementById('error');
      errorEl.textContent = '';

      const isPhoneMode = document.querySelector('.login-toggle .toggle-btn.active').dataset.type === 'phone';

      if(isPhoneMode){
        if(!phone){ errorEl.textContent = 'Please enter your phone number.'; return; }
        if(!password){ errorEl.textContent = 'Please enter your password.'; return; }
        saveUserSession({ phone: '+91' + phone, loginType: 'phone' });
      } else {
        if(!email){ errorEl.textContent = 'Please enter your email.'; return; }
        if(!password){ errorEl.textContent = 'Please enter your password.'; return; }
        saveUserSession({ email, loginType: 'email' });
      }
      
      showSuccessMessage();
      const params = new URLSearchParams(location.search);
      const next = params.get('next') || 'index.html';
      setTimeout(() => location.href = next, 1000);
    });
  }

  // Demo Google sign-in
  const googleLogin = document.getElementById('google-login');
  if(googleLogin){
    googleLogin.addEventListener('click', function(){
      const modal = document.createElement('div');
      modal.id = 'demo-google-modal';
      modal.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.6);display:flex;align-items:center;justify-content:center;z-index:9999;backdrop-filter:blur(4px)';
      modal.innerHTML = `
        <div style="background:#fff;border-radius:16px;padding:32px;max-width:400px;width:90%;text-align:center;box-shadow:0 16px 48px rgba(0,0,0,0.2)">
          <div style="width:64px;height:64px;background:#fef3f0;border-radius:50%;margin:0 auto 16px;display:flex;align-items:center;justify-content:center">
            <svg width="32" height="32" viewBox="0 0 24 24"><path fill="#EA4335" d="M12 11.5v2.9h7.2c-.3 1.7-1.6 4-4.3 5.3l-0.1.1-3.2-.1c-3.4 0-6.2-2.8-6.2-6.3 0-3.5 2.8-6.3 6.2-6.3 2.1 0 3.6.9 4.4 1.7l1.9-1.9C17.5 3.6 14.9 2.5 12 2.5 7 2.5 3.2 6.3 3.2 11.3S7 20 12 20c3.1 0 5.4-1.1 6.9-2.7L12 11.5z"/></svg>
          </div>
          <h3 style="margin:0 0 8px;font-size:20px;font-weight:700">Demo Google Sign-In</h3>
          <p style="color:#6b7280;margin:0 0 20px;font-size:14px">Enter any email to test sign-in</p>
          <input type="email" id="demo-google-email" placeholder="you@gmail.com" style="width:100%;padding:14px;border:2px solid #e5e7eb;border-radius:10px;margin-bottom:16px;font-size:15px">
          <div style="display:flex;gap:12px">
            <button id="demo-google-cancel" style="flex:1;padding:14px;border:2px solid #e5e7eb;background:#fff;border-radius:10px;cursor:pointer;font-weight:600">Cancel</button>
            <button id="demo-google-submit" style="flex:1;padding:14px;border:none;background:linear-gradient(135deg,#ff6b01,#ff8c3a);color:#fff;border-radius:10px;cursor:pointer;font-weight:600">Sign In</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
      
      const emailInput = modal.querySelector('#demo-google-email');
      const submitBtn2 = modal.querySelector('#demo-google-submit');
      const cancelBtn = modal.querySelector('#demo-google-cancel');
      
      emailInput.focus();
      
      cancelBtn.onclick = function(){ modal.remove(); };
      submitBtn2.onclick = function(){
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
      
      modal.onclick = function(e){
        if(e.target === modal) modal.remove();
      };
    });
  }
});
