// Google Identity Services integration (client-side)
const SESSION_DURATION = 24 * 60 * 60 * 1000;

function base64UrlDecode(str){
  str = str.replace(/-/g, '+').replace(/_/g, '/');
  while (str.length % 4) str += '=';
  try{ return decodeURIComponent(atob(str).split('').map(function(c){ return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2); }).join('')); }catch(e){ return atob(str); }
}

function decodeJwtPayload(jwt){
  const parts = jwt.split('.');
  if(parts.length < 2) return null;
  try{ return JSON.parse(base64UrlDecode(parts[1])); }catch(e){return null}
}

function saveProfileAndRedirect(profile){
  profile.loggedAt = Date.now();
  profile.expiresAt = Date.now() + SESSION_DURATION;
  localStorage.setItem('foodies_home_user', JSON.stringify(profile));
  
  // Show success message
  const msg = document.createElement('div');
  msg.style.cssText = 'position:fixed;top:20px;left:50%;transform:translateX(-50%);background:#10b981;color:#fff;padding:12px 24px;border-radius:8px;z-index:9999;font-weight:600';
  msg.textContent = 'Successfully signed in!';
  document.body.appendChild(msg);
  setTimeout(() => msg.remove(), 2000);
  
  const next = new URLSearchParams(location.search).get('next') || 'index.html';
  location.href = next;
}

function initGoogleSignIn(){
  const cid = window.GOOGLE_CLIENT_ID || '';
  const isDemo = window.DEMO_MODE === true;
  
  // Show demo button if in demo mode or no client ID
  if(isDemo || !cid){
    console.log('Running in demo mode — Google sign-in will use demo prompt fallback.');
    
    // Show demo buttons
    const loginBtn = document.getElementById('google-login');
    const registerBtn = document.getElementById('google-register');
    if(loginBtn) loginBtn.style.display = 'inline-flex';
    if(registerBtn) registerBtn.style.display = 'inline-flex';
    
    // Hide Google Identity buttons in demo mode
    const loginContainer = document.getElementById('google-login-container');
    const registerContainer = document.getElementById('google-register-container');
    if(loginContainer) loginContainer.style.display = 'none';
    if(registerContainer) registerContainer.style.display = 'none';
    
    return false;
  }

  if(typeof google === 'undefined' || !google.accounts || !google.accounts.id){
    console.error('Google Identity script not loaded.');
    return false;
  }

  google.accounts.id.initialize({
    client_id: cid,
    callback: (resp)=>{
      const payload = decodeJwtPayload(resp.credential);
      if(!payload){ console.error('Failed to decode credential'); return; }
      const profile = { 
        email: payload.email, 
        name: payload.name || payload.email.split('@')[0], 
        provider: 'google', 
        picture: payload.picture 
      };
      saveProfileAndRedirect(profile);
    }
  });

  // Render Google Identity buttons
  const loginContainer = document.getElementById('google-login-container');
  const registerContainer = document.getElementById('google-register-container');
  if(loginContainer) google.accounts.id.renderButton(loginContainer, {theme:'outline', size:'large', width:'100%'});
  if(registerContainer) google.accounts.id.renderButton(registerContainer, {theme:'outline', size:'large', width:'100%'});

  // Hide demo buttons when real Google OAuth is configured
  const loginBtn = document.getElementById('google-login');
  const registerBtn = document.getElementById('google-register');
  if(loginBtn) loginBtn.style.display = 'none';
  if(registerBtn) registerBtn.style.display = 'none';

  return true;
}

// Expose for manual init
window.initGoogleSignIn = initGoogleSignIn;
