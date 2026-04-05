// Google Identity Services integration (client-side)
// Requires: js/config.js must set window.GOOGLE_CLIENT_ID

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
  const next = new URLSearchParams(location.search).get('next') || 'index.html';
  location.href = next;
}

function initGoogleSignIn(){
  const cid = window.GOOGLE_CLIENT_ID || '';
  if(!cid){
    console.log('GOOGLE_CLIENT_ID not set — Google sign-in will use demo prompt fallback.');
    return false;
  }

  if(typeof google === 'undefined' || !google.accounts || !google.accounts.id){
    console.error('Google Identity script not loaded. Ensure https://accounts.google.com/gsi/client is included.');
    return false;
  }

  google.accounts.id.initialize({
    client_id: cid,
    callback: (resp)=>{
      const payload = decodeJwtPayload(resp.credential);
      if(!payload){ console.error('Failed to decode credential'); return; }
      const profile = { email: payload.email, name: payload.name || payload.email.split('@')[0], provider:'google', picture: payload.picture };
      saveProfileAndRedirect(profile);
    }
  });

  // render buttons when containers exist
  const loginContainer = document.getElementById('google-login-container');
  const registerContainer = document.getElementById('google-register-container');
  if(loginContainer) google.accounts.id.renderButton(loginContainer, {theme:'outline', size:'large', width:'100%'});
  if(registerContainer) google.accounts.id.renderButton(registerContainer, {theme:'outline', size:'large', width:'100%'});

  // optionally show prompt (one-tap) — disabled for now
  return true;
}

// Expose for manual init
window.initGoogleSignIn = initGoogleSignIn;
