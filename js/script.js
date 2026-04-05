const products = [
  {id:1,title:'Margherita Pizza',price:7.99,image:'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=400',desc:'Classic cheese & tomato pizza with fresh basil',time:25,rating:4.5,cuisine:'Italian',restaurant:'Pizza Palace'},
  {id:2,title:'Paneer Butter Masala',price:8.5,image:'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400',desc:'Creamy tomato-based curry with soft paneer cubes',time:30,rating:4.7,cuisine:'Indian',restaurant:'Spice Garden'},
  {id:3,title:'Sushi Platter',price:14.99,image:'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400',desc:'Assorted sushi with fresh salmon and tuna',time:40,rating:4.8,cuisine:'Japanese',restaurant:'Tokyo Sushi'},
  {id:4,title:'Cheeseburger',price:6.99,image:'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',desc:'Grilled beef patty with cheese and special sauce',time:20,rating:4.4,cuisine:'American',restaurant:'Burger Barn'},
  {id:5,title:'Caesar Salad',price:5.5,image:'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=400',desc:'Crisp romaine with parmesan and croutons',time:15,rating:4.2,cuisine:'Healthy',restaurant:'Green Bowl'},
  {id:6,title:'Pad Thai',price:9.5,image:'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=400',desc:'Stir-fried rice noodles with tamarind and peanuts',time:30,rating:4.6,cuisine:'Thai',restaurant:'Thai Delight'},
  {id:7,title:'Chicken Biryani',price:10.99,image:'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400',desc:'Aromatic basmati rice with spiced chicken',time:35,rating:4.9,cuisine:'Indian',restaurant:'Spice Garden'},
  {id:8,title:'Tacos',price:7.99,image:'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400',desc:'Crispy tortillas with seasoned beef and toppings',time:20,rating:4.5,cuisine:'Mexican',restaurant:'Taco Town'}
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
      <div class="prod-top">
        <img src="${p.image}" alt="${p.title}" data-id="${p.id}">
        <div class="prod-info">
          <div class="title">${p.title}</div>
          <div class="meta">${p.cuisine} • ${p.rating} ★ • ${p.time} mins</div>
          <div class="restaurant">${p.restaurant}</div>
          <div class="row">
            <div class="price">$${p.price.toFixed(2)}</div>
            <button class="add-btn" data-id="${p.id}">Add</button>
          </div>
        </div>
      </div>
    </article>`).join('');

  productsEl.querySelectorAll('.add-btn[data-id]').forEach(btn=>{
    btn.addEventListener('click',()=>addToCart(Number(btn.dataset.id)));
  });

  productsEl.querySelectorAll('img[data-id]').forEach(img=>{
    img.addEventListener('click',()=>openModal(Number(img.dataset.id)));
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
      <img src="${item.image}" alt="${item.title}" style="width:64px;height:48px;object-fit:cover;border-radius:6px">
      <div style="flex:1;padding-left:8px">
        <div style="font-weight:700">${item.title}</div>
        <div style="font-size:13px;color:#666">$${item.price.toFixed(2)} × ${item.qty}</div>
      </div>
      <div>
        <button data-remove="${item.id}" style="padding:4px 8px;font-size:12px">Remove</button>
      </div>`;
    cartItemsEl.appendChild(li);
  });
  cartCount.textContent = cart.reduce((s,i)=>s+i.qty,0);
  cartTotalEl.textContent = total.toFixed(2);

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
  
  alert(`Order placed! Order ID: ${order.id}\nTotal: $${order.total.toFixed(2)}\nDelivery to: ${address}`);
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
  modalPrice.textContent = p.price.toFixed(2);
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
