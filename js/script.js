const products = [
  {id:1,title:'Paneer Butter Masala',price:299,image:'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400',desc:'Creamy tomato-based curry with soft paneer cubes',time:30,rating:4.7,cuisine:'Indian',restaurant:'Spice Garden'},
  {id:2,title:'Chicken Biryani',price:349,image:'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400',desc:'Aromatic basmati rice with spiced chicken',time:35,rating:4.9,cuisine:'Indian',restaurant:'Spice Garden'},
  {id:3,title:'Dal Makhani',price:249,image:'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400',desc:'Creamy black lentil curry with butter',time:25,rating:4.6,cuisine:'Indian',restaurant:'Spice Garden'},
  {id:4,title:'Butter Chicken',price:399,image:'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400',desc:'Tender chicken in creamy tomato gravy',time:30,rating:4.8,cuisine:'Indian',restaurant:'Spice Garden'},
  {id:5,title:'Samosa (3 pcs)',price:80,image:'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400',desc:'Crispy pastry with spiced potato filling',time:15,rating:4.5,cuisine:'Indian',restaurant:'Spice Garden'},
  {id:6,title:'Palak Paneer',price:279,image:'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400',desc:'Spinach curry with paneer cubes',time:25,rating:4.6,cuisine:'Indian',restaurant:'Spice Garden'},
  {id:7,title:'Chole Bhature',price:199,image:'https://images.unsplash.com/photo-1626132647523-66dbeac34534?w=400',desc:'Spiced chickpea curry with fluffy deep-fried bread',time:25,rating:4.7,cuisine:'Indian',restaurant:'Spice Garden'},
  {id:8,title:'Tandoori Chicken',price:449,image:'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400',desc:'Yogurt-marinated chicken grilled in tandoor',time:35,rating:4.9,cuisine:'Indian',restaurant:'Spice Garden'},
  {id:9,title:'Aloo Gobi',price:229,image:'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400',desc:'Potato and cauliflower curry',time:20,rating:4.4,cuisine:'Indian',restaurant:'Spice Garden'},
  {id:10,title:'Dosa',price:150,image:'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=400',desc:'Crispy rice pancake with coconut chutney',time:20,rating:4.6,cuisine:'Indian',restaurant:'Spice Garden'},
  {id:11,title:'Idli Sambar (4 pcs)',price:120,image:'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=400',desc:'Steamed rice cakes with lentil soup',time:15,rating:4.5,cuisine:'Indian',restaurant:'Spice Garden'},
  {id:12,title:'Naan (2 pcs)',price:80,image:'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400',desc:'Soft tandoor-baked flatbread',time:10,rating:4.7,cuisine:'Indian',restaurant:'Spice Garden'}
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

let lastOpenedProductId = null;
let cart = [];
let currentCategory = 'all';
let currentSearch = '';

const cuisines = ['all',...new Set(products.map(p=>p.cuisine))];

function init(){
  loadCart();
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
  const user = getStoredUser();
  authArea.innerHTML = '';
  if(user && user.email){
    const name = user.fullname || user.name || user.email.split('@')[0];
    const w = document.createElement('div'); w.className='welcome'; w.textContent = `Welcome, ${name}`;
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

function renderProducts(){
  let filtered = products;
  
  if(currentCategory !== 'all'){
    filtered = filtered.filter(p=>p.cuisine === currentCategory);
  }
  
  if(currentSearch){
    const q = currentSearch.toLowerCase();
    filtered = filtered.filter(p=>p.title.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q) || p.cuisine.toLowerCase().includes(q));
  }
  
  productsEl.innerHTML = filtered.map(p=>`
    <article class="product">
      <div class="product-img" data-id="${p.id}">
        <img src="${p.image}" alt="${p.title}">
        <span class="product-badge">${p.cuisine}</span>
      </div>
      <div class="product-info">
        <div class="title">${p.title}</div>
        <div class="meta">${p.rating} ★ • ${p.time} mins</div>
        <div class="restaurant">${p.restaurant}</div>
        <div class="product-row">
          <div class="price">₹${p.price}</div>
          <button class="add-btn" data-id="${p.id}">Add</button>
        </div>
      </div>
    </article>`).join('');

  productsEl.querySelectorAll('.add-btn[data-id]').forEach(btn=>{
    btn.addEventListener('click',()=>addToCart(Number(btn.dataset.id)));
  });

  productsEl.querySelectorAll('.product-img[data-id]').forEach(el=>{
    el.addEventListener('click',()=>openModal(Number(el.dataset.id)));
  });
}

function renderCategoryFilter(){
  if(!categoryFilter) return;
  categoryFilter.innerHTML = cuisines.map(c=>`
    <option value="${c}">${c === 'all' ? 'All Categories' : c}</option>
  `).join('');
  
  categoryFilter.addEventListener('change',()=>{
    currentCategory = categoryFilter.value;
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
      <button class="cart-item-remove" data-remove="${item.id}">Remove</button>`;
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
  if(!user || !user.email){
    alert('Please sign in to place an order');
    location.href = 'login.html?next=index.html';
    return;
  }
  
  const address = prompt('Enter delivery address:');
  if(!address || address.trim() === ''){
    alert('Delivery address is required');
    return;
  }
  
  const order = {
    id: 'ORD' + Date.now(),
    items: [...cart],
    total: cart.reduce((s,i)=>s+i.price*i.qty,0),
    address: address.trim(),
    userEmail: user.email,
    date: new Date().toISOString(),
    status: 'Preparing'
  };
  
  const orders = JSON.parse(localStorage.getItem('foodies_home_orders') || '[]');
  orders.unshift(order);
  localStorage.setItem('foodies_home_orders', JSON.stringify(orders));
  
  alert(`Order placed! Order ID: ${order.id}\nTotal: ₹${order.total}\nDelivery to: ${address}`);
  cart = [];
  saveCart();
  updateCartUI();
  cartEl.classList.remove('open');
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
