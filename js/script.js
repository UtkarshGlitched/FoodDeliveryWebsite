const products = [
  {id:1,title:'Paneer Butter Masala',price:299,image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvKrXdpaIQqJeOv3vrAbiqubImjGiQGrevkw&s',desc:'Rich and creamy tomato-based curry with soft paneer cubes, finished with butter and fresh cream.',time:30,rating:4.7,cuisine:'Curry',restaurant:'Spice Garden',category:'Curry'},
  {id:2,title:'Chicken Biryani',price:349,image:'https://www.cubesnjuliennes.com/wp-content/uploads/2020/07/Chicken-Biryani-Recipe.jpg',desc:'Aromatic basmati rice layered with spiced chicken, saffron, and traditional herbs.',time:35,rating:4.9,cuisine:'Biryani',restaurant:'Spice Garden',category:'Biryani'},
  {id:3,title:'Dal Makhani',price:249,image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAM_sU4h_Iz_foXrcRwo2H0NBHIgFdCv_KbA&s',desc:'Creamy black lentil curry slow-cooked with butter and cream.',time:25,rating:4.6,cuisine:'Curry',restaurant:'Spice Garden',category:'Curry'},
  {id:4,title:'Butter Chicken',price:399,image:'https://www.indianhealthyrecipes.com/wp-content/uploads/2022/07/chicken-butter-masala-recipe.jpg',desc:'Tender chicken pieces in creamy tomato gravy with aromatic spices.',time:30,rating:4.8,cuisine:'Curry',restaurant:'Spice Garden',category:'Curry'},
  {id:5,title:'Samosa (3 pcs)',price:80,image:'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=400&q=80',desc:'Crispy golden pastry filled with spiced potato and peas.',time:15,rating:4.5,cuisine:'Snacks',restaurant:'Spice Garden',category:'Snacks'},
  {id:6,title:'Palak Paneer',price:279,image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqKG8ez9lc708sXaUjfbIo5tdpSygcl7PO9w&s',desc:'Fresh spinach puree with paneer cubes tempered with garlic.',time:25,rating:4.6,cuisine:'Curry',restaurant:'Spice Garden',category:'Curry'},
  {id:7,title:'Chole Bhature',price:199,image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgt52tWZsxZa_DzUbbb0XKcEPVEcgw-fLHGw&s',desc:'Spicy chickpea curry served with fluffy deep-fried bread.',time:25,rating:4.7,cuisine:'Curry',restaurant:'Spice Garden',category:'Curry'},
  {id:8,title:'Tandoori Chicken',price:449,image:'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=400&q=80',desc:'Yogurt-marinated chicken grilled in traditional tandoor.',time:35,rating:4.9,cuisine:'Tandoor',restaurant:'Spice Garden',category:'Tandoor'},
  {id:9,title:'Aloo Gobi',price:229,image:'https://mygoodfoodworld.com/wp-content/uploads/2023/10/aloo-gobi-dry_main.jpg',desc:'Dry curry with potato and cauliflower, spiced with garam masala.',time:20,rating:4.4,cuisine:'Curry',restaurant:'Spice Garden',category:'Curry'},
  {id:10,title:'Masala Dosa',price:150,image:'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=400&q=80',desc:'Crispy rice pancake filled with spiced potato filling.',time:20,rating:4.6,cuisine:'South Indian',restaurant:'Spice Garden',category:'South Indian'},
  {id:11,title:'Idli Sambar (4 pcs)',price:120,image:'https://static.toiimg.com/thumb/resizemode-4,width-1280,height-720,msid-113810989/113810989.jpg',desc:'Soft steamed rice cakes served with lentil soup.',time:15,rating:4.5,cuisine:'South Indian',restaurant:'Spice Garden',category:'South Indian'},
  {id:12,title:'Garlic Naan (2 pcs)',price:80,image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHKizdm8DXHpVYpPo_gMs1ykfa-2sOwcVnDw&s',desc:'Soft tandoor-baked flatbread topped with garlic and butter.',time:10,rating:4.7,cuisine:'Bread',restaurant:'Spice Garden',category:'Bread'},
  {id:13,title:'Chicken Tikka',price:379,image:'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=400&q=80',desc:'Tender chicken pieces marinated in yogurt, grilled in tandoor.',time:30,rating:4.8,cuisine:'Tandoor',restaurant:'Spice Garden',category:'Tandoor'},
  {id:14,title:'Veg Biryani',price:279,image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlg7JYWWJNnY-MJVGm02itthRtcc105HPt4Q&s',desc:'Fragrant basmati rice with mixed vegetables and saffron.',time:30,rating:4.5,cuisine:'Biryani',restaurant:'Spice Garden',category:'Biryani'},
  {id:15,title:'Pav Bhaji',price:149,image:'https://www.cubesnjuliennes.com/wp-content/uploads/2020/07/Instant-Pot-Mumbai-Pav-Bhaji-Recipe.jpg',desc:'Spiced mashed vegetables served with soft bread rolls.',time:20,rating:4.6,cuisine:'Snacks',restaurant:'Spice Garden',category:'Snacks'},
  {id:16,title:'Uttapam',price:130,image:'https://pipingpotcurry.com/wp-content/uploads/2026/01/Uttapam-Onion-Tomato-PipingPotCurry.jpg',desc:'Thick rice pancake topped with vegetables.',time:20,rating:4.5,cuisine:'South Indian',restaurant:'Spice Garden',category:'South Indian'}
];

const $ = sel => document.querySelector(sel);
const productsEl = $('#products');
const cartBtn = $('#cart-btn');
const cartEl = $('#cart');
const closeCart = $('#close-cart');
const cartItemsEl = $('#cart-items');
const cartCount = $('#cart-count');
const cartTotalEl = $('#cart-total');
const searchInput = $('#search-input');
const categoryFilter = $('#category-filter');
const modal = $('#product-modal');
const modalClose = $('#modal-close');
const modalImg = $('#modal-img');
const modalTitle = $('#modal-title');
const modalDesc = $('#modal-desc');
const modalPrice = $('#modal-price');
const modalAdd = $('#modal-add');
const toast = $('#toast');

let lastOpenedProductId = null;
let cart = [];
let currentCategory = 'all';
let currentSearch = '';

const categories = ['all','Biryani','Curry','Tandoor','Snacks','Bread','South Indian'];

function init(){
  loadCart();
  renderCategoryChips();
  renderCategoryFilter();
  renderProducts();
  updateCartUI();
  renderAuthArea();
}

function getStoredUser(){
  try{ 
    const user = JSON.parse(localStorage.getItem('foodies_home_user'));
    if(user && user.expiresAt && Date.now() > user.expiresAt){
      localStorage.removeItem('foodies_home_user');
      return null;
    }
    return user;
  }catch(e){return null}
}

function renderAuthArea(){
  const authArea = $('#auth-area');
  if(!authArea) return;
  const user = getStoredUser();
  authArea.innerHTML = '';
  if(user && (user.email || user.phone)){
    const name = user.fullname || user.name || user.email?.split('@')[0] || user.phone || 'User';
    const w = document.createElement('div'); w.className='welcome'; w.textContent = `👋 ${name}`;
    const signout = document.createElement('button'); signout.className='signout'; signout.textContent='Sign out';
    signout.addEventListener('click',()=>{
      localStorage.removeItem('foodies_home_user');
      renderAuthArea();
    });
    authArea.appendChild(w); authArea.appendChild(signout);
  } else {
    const signin = document.createElement('button'); signin.className='auth-btn'; signin.textContent='Sign in';
    signin.addEventListener('click',()=>{
      const next = encodeURIComponent(location.pathname.split('/').pop() || 'index.html');
      location.href = `login.html?next=${next}`;
    });
    const register = document.createElement('button'); register.className='auth-btn'; register.textContent='Register';
    register.addEventListener('click',()=>{
      const next = encodeURIComponent(location.pathname.split('/').pop() || 'index.html');
      location.href = `register.html?next=${next}`;
    });
    authArea.appendChild(signin); authArea.appendChild(register);
  }
}

function loadCart(){
  try{
    const saved = localStorage.getItem('foodies_home_cart');
    if(saved) cart = JSON.parse(saved);
  }catch(e){cart = []}
}

function saveCart(){
  localStorage.setItem('foodies_home_cart', JSON.stringify(cart));
}

function showToast(message){
  if(toast){
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
  }
}

function renderCategoryChips(){
  const chipsContainer = document.querySelector('.categories-bar');
  if(!chipsContainer) return;
  
  chipsContainer.innerHTML = categories.map(cat => `
    <div class="category-chip ${cat === 'all' ? 'active' : ''}" data-category="${cat}">
      <span class="icon">${getCategoryIcon(cat)}</span> ${cat === 'all' ? 'All' : cat}
    </div>
  `).join('');
  
  chipsContainer.querySelectorAll('.category-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      chipsContainer.querySelectorAll('.category-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      currentCategory = chip.dataset.category;
      renderProducts();
    });
  });
}

function getCategoryIcon(cat){
  const icons = {
    'all':'🍽️','Biryani':'🍚','Curry':'🍛','Tandoor':'🔥','Snacks':'🥟','Bread':'🫓','South Indian':'🥞'
  };
  return icons[cat] || '🍽️';
}

function renderProducts(){
  let filtered = products;
  
  if(currentCategory !== 'all'){
    filtered = filtered.filter(p => p.category === currentCategory);
  }
  
  if(currentSearch){
    const q = currentSearch.toLowerCase();
    filtered = filtered.filter(p=>p.title.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q) || p.cuisine.toLowerCase().includes(q));
  }
  
  productsEl.innerHTML = filtered.map(p=>`
    <article class="product">
      <div class="product-img" data-id="${p.id}">
        <img src="${p.image}" alt="${p.title}">
        <span class="product-badge">${p.category}</span>
      </div>
      <div class="product-info">
        <div class="title">${p.title}</div>
        <div class="meta">
          <span>⭐ ${p.rating}</span>
          <span>⏱️ ${p.time} mins</span>
        </div>
        <div class="restaurant">${p.restaurant}</div>
        <div class="product-row">
          <div class="price">₹${p.price}</div>
          <button class="add-btn" data-id="${p.id}">Add</button>
        </div>
      </div>
    </article>`).join('');

  productsEl.querySelectorAll('.add-btn[data-id]').forEach(btn=>{
    btn.addEventListener('click',(e) => {
      e.stopPropagation();
      addToCart(Number(btn.dataset.id));
    });
  });

  productsEl.querySelectorAll('.product-img[data-id]').forEach(el=>{
    el.addEventListener('click',()=>openModal(Number(el.dataset.id)));
  });
}

function renderCategoryFilter(){
  if(!categoryFilter) return;
  categoryFilter.innerHTML = categories.map(c=>`
    <option value="${c}">${c === 'all' ? 'All Categories' : c}</option>
  `).join('');
  
  categoryFilter.addEventListener('change',()=>{
    currentCategory = categoryFilter.value;
    
    // Sync with chips
    const chips = document.querySelectorAll('.category-chip');
    chips.forEach(c => c.classList.remove('active'));
    const activeChip = document.querySelector(`.category-chip[data-category="${currentCategory}"]`);
    if(activeChip) activeChip.classList.add('active');
    
    renderProducts();
  });
}

function addToCart(id){
  const prod = products.find(p=>p.id===id);
  const existing = cart.find(i=>i.id===id);
  if(existing){ existing.qty++; }
  else cart.push({...prod,qty:1});
  saveCart();
  updateCartUI();
  showToast(`✓ ${prod.title} added to cart!`);
}

function removeFromCart(id){
  cart = cart.filter(i=>i.id!==id);
  saveCart();
  updateCartUI();
}

function updateCartUI(){
  cartItemsEl.innerHTML = '';
  let total = 0;
  cart.forEach(item=>{
    total += item.price * item.qty;
    const li = document.createElement('li');
    li.className = 'cart-item';
    li.innerHTML = `
      <img src="${item.image}" alt="${item.title}">
      <div class="cart-item-info">
        <div class="item-title">${item.title}</div>
        <div class="item-price">₹${item.price} × ${item.qty}</div>
      </div>
      <button class="cart-item-remove" data-remove="${item.id}">🗑️</button>`;
    cartItemsEl.appendChild(li);
  });
  cartCount.textContent = cart.reduce((s,i)=>s+i.qty,0);
  cartTotalEl.textContent = total;

  cartItemsEl.querySelectorAll('button[data-remove]').forEach(b=>{
    b.addEventListener('click',()=>removeFromCart(Number(b.dataset.remove)));
  });
}

cartBtn.addEventListener('click',()=>cartEl.classList.add('open'));
closeCart.addEventListener('click',()=>cartEl.classList.remove('open'));

document.getElementById('checkout').addEventListener('click',()=>{
  if(cart.length===0){ alert('Cart is empty'); return; }
  
  const user = getStoredUser();
  if(!user || (!user.email && !user.phone)){
    alert('Please sign in to place an order');
    location.href = 'login.html?next=index.html';
    return;
  }
  
  // Create checkout modal
  const checkoutModal = document.createElement('div');
  checkoutModal.id = 'checkout-modal';
  checkoutModal.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.6);display:flex;align-items:center;justify-content:center;z-index:9999;backdrop-filter:blur(4px)';
  
  const savedAddresses = JSON.parse(localStorage.getItem('foodies_home_addresses') || '[]');
  const total = cart.reduce((s,i)=>s+i.price*i.qty,0);
  
  checkoutModal.innerHTML = `
    <div style="background:#fff;border-radius:20px;padding:32px;max-width:450px;width:90%;box-shadow:0 20px 60px rgba(0,0,0,0.3)">
      <h2 style="margin:0 0 8px;font-size:24px;font-weight:800;background:linear-gradient(135deg,#ff6b01,#ff8c3a);-webkit-background-clip:text;-webkit-text-fill-color:transparent">🛒 Checkout</h2>
      <p style="color:#6b7280;margin:0 0 20px;font-size:14px">Enter your delivery details</p>
      
      <div style="margin-bottom:20px">
        <label style="display:block;font-size:14px;font-weight:600;margin-bottom:8px">📍 Delivery Address</label>
        <textarea id="checkout-address" rows="3" placeholder="Enter your full delivery address..." style="width:100%;padding:14px;border:2px solid #e5e7eb;border-radius:12px;font-size:14px;resize:none;box-sizing:border-box"></textarea>
      </div>
      
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:20px">
        <div>
          <label style="display:block;font-size:14px;font-weight:600;margin-bottom:8px">📱 Mobile Number</label>
          <input id="checkout-phone" type="tel" placeholder="9876543210" style="width:100%;padding:14px;border:2px solid #e5e7eb;border-radius:12px;font-size:14px;box-sizing:border-box">
        </div>
        <div>
          <label style="display:block;font-size:14px;font-weight:600;margin-bottom:8px">📧 Email (optional)</label>
          <input id="checkout-email" type="email" placeholder="you@example.com" style="width:100%;padding:14px;border:2px solid #e5e7eb;border-radius:12px;font-size:14px;box-sizing:border-box">
        </div>
      </div>
      
      ${savedAddresses.length > 0 ? `
      <div style="margin-bottom:20px">
        <label style="display:block;font-size:14px;font-weight:600;margin-bottom:8px">💾 Saved Addresses</label>
        <div id="saved-addresses" style="display:flex;flex-direction:column;gap:8px">
          ${savedAddresses.map((addr, idx) => `
            <div class="saved-address" data-idx="${idx}" style="padding:12px;border:2px solid #e5e7eb;border-radius:10px;cursor:pointer;transition:all 0.2s">
              <div style="font-weight:600;font-size:14px">${addr.address.substring(0, 40)}...</div>
              <div style="color:#6b7280;font-size:12px">${addr.phone}</div>
            </div>
          `).join('')}
        </div>
      </div>
      ` : ''}
      
      <div style="background:#fef3f0;padding:16px;border-radius:12px;margin-bottom:20px">
        <div style="display:flex;justify-content:space-between;margin-bottom:8px">
          <span style="color:#6b7280">Items (${cart.reduce((s,i)=>s+i.qty,0)})</span>
          <span style="font-weight:600">₹${total}</span>
        </div>
        <div style="display:flex;justify-content:space-between;margin-bottom:8px">
          <span style="color:#6b7280">Delivery Fee</span>
          <span style="font-weight:600;color:#10b981">FREE</span>
        </div>
        <div style="display:flex;justify-content:space-between;border-top:2px solid #fed7aa;padding-top:8px">
          <span style="font-weight:700;font-size:16px">Total</span>
          <span style="font-weight:800;font-size:20px;background:linear-gradient(135deg,#ff6b01,#ff8c3a);-webkit-background-clip:text;-webkit-text-fill-color:transparent">₹${total}</span>
        </div>
      </div>
      
      <div style="display:flex;gap:12px">
        <button id="checkout-cancel" style="flex:1;padding:14px;border:2px solid #e5e7eb;background:#fff;border-radius:12px;cursor:pointer;font-weight:600;font-size:15px">Cancel</button>
        <button id="checkout-confirm" style="flex:1;padding:14px;border:none;background:linear-gradient(135deg,#ff6b01,#ff8c3a);color:#fff;border-radius:12px;cursor:pointer;font-weight:700;font-size:15px">Place Order</button>
      </div>
    </div>
  `;
  
  document.body.appendChild(checkoutModal);
  
  const cancelBtn = checkoutModal.querySelector('#checkout-cancel');
  const confirmBtn = checkoutModal.querySelector('#checkout-confirm');
  const addressInput = checkoutModal.querySelector('#checkout-address');
  const phoneInput = checkoutModal.querySelector('#checkout-phone');
  const emailInput = checkoutModal.querySelector('#checkout-email');
  
  // Pre-fill if user info exists
  if(user.phone) phoneInput.value = user.phone.replace('+91','');
  if(user.email) emailInput.value = user.email;
  
  // Saved addresses click handler
  checkoutModal.querySelectorAll('.saved-address').forEach(el => {
    el.addEventListener('click', () => {
      const idx = el.dataset.idx;
      const addr = savedAddresses[idx];
      addressInput.value = addr.address;
      phoneInput.value = addr.phone.replace('+91','');
      if(addr.email) emailInput.value = addr.email;
    });
  });
  
  cancelBtn.onclick = () => checkoutModal.remove();
  confirmBtn.onclick = () => {
    const address = addressInput.value.trim();
    const phone = phoneInput.value.trim();
    const email = emailInput.value.trim();
    
    if(!address){ addressInput.style.borderColor = '#ef4444'; return; }
    if(!phone){ phoneInput.style.borderColor = '#ef4444'; return; }
    
    // Save address for future
    const newAddress = { address, phone: '+91' + phone, email };
    const existingAddrs = JSON.parse(localStorage.getItem('foodies_home_addresses') || '[]');
    const isDuplicate = existingAddrs.some(a => a.address === address);
    if(!isDuplicate){
      existingAddrs.unshift(newAddress);
      if(existingAddrs.length > 5) existingAddrs.pop(); // Keep max 5
      localStorage.setItem('foodies_home_addresses', JSON.stringify(existingAddrs));
    }
    
    const order = {
      id: 'ORD' + Date.now(),
      items: [...cart],
      total: total,
      address: address,
      phone: '+91' + phone,
      email: email,
      userEmail: user.email || user.phone,
      date: new Date().toISOString(),
      status: 'Preparing'
    };
    
    const orders = JSON.parse(localStorage.getItem('foodies_home_orders') || '[]');
    orders.unshift(order);
    localStorage.setItem('foodies_home_orders', JSON.stringify(orders));
    
    checkoutModal.remove();
    cartEl.classList.remove('open');
    cart = [];
    saveCart();
    updateCartUI();
    
    // Show success
    const successModal = document.createElement('div');
    successModal.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.6);display:flex;align-items:center;justify-content:center;z-index:99999';
    successModal.innerHTML = `
      <div style="background:#fff;border-radius:20px;padding:48px;text-align:center;max-width:400px">
        <div style="width:80px;height:80px;background:#dcfce7;border-radius:50%;margin:0 auto 20px;display:flex;align-items:center;justify-content:center">
          <span style="font-size:40px">✅</span>
        </div>
        <h2 style="margin:0 0 12px;font-size:24px;font-weight:800;color:#1a1a1a">Order Placed!</h2>
        <p style="color:#6b7280;margin:0 0 8px">Order ID: <strong>${order.id}</strong></p>
        <p style="color:#6b7280;margin:0 0 20px">Total: <strong>₹${total}</strong></p>
        <p style="color:#6b7280;margin:0;font-size:14px">📍 Delivery: ${address}</p>
        <button onclick="this.closest('[style*=\'position:fixed\']').remove()" style="margin-top:24px;padding:14px 32px;background:linear-gradient(135deg,#ff6b01,#ff8c3a);color:#fff;border:none;border-radius:12px;font-weight:700;cursor:pointer">Awesome! 👍</button>
      </div>
    `;
    document.body.appendChild(successModal);
  };
  
  checkoutModal.onclick = (e) => {
    if(e.target === checkoutModal) checkoutModal.remove();
  };
});

function openModal(id){
  const p = products.find(x=>x.id===id);
  if(!p) return;
  lastOpenedProductId = id;
  modalImg.src = p.image;
  modalImg.alt = p.title;
  modalTitle.textContent = p.title;
  modalDesc.textContent = p.desc || '';
  document.getElementById('modal-rating').textContent = p.rating;
  document.getElementById('modal-time').textContent = p.time;
  document.getElementById('modal-time2').textContent = p.time;
  modalPrice.textContent = p.price;
  modal.setAttribute('aria-hidden','false');
}

function closeModal(){
  modal.setAttribute('aria-hidden','true');
  lastOpenedProductId = null;
}

modalClose.addEventListener('click',closeModal);
modal.addEventListener('click',e=>{ if(e.target===modal) closeModal(); });
document.addEventListener('keydown',e=>{ if(e.key==='Escape') closeModal(); });

modalAdd.addEventListener('click',()=>{
  if(lastOpenedProductId) addToCart(lastOpenedProductId);
  closeModal();
});

searchInput.addEventListener('input',()=>{
  currentSearch = searchInput.value.trim();
  renderProducts();
});

init();
