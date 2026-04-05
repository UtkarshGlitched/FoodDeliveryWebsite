const products = [
  {id:1,title:'Margherita Pizza',price:7.99,image:'https://source.unsplash.com/600x400/?pizza,margherita',desc:'Classic cheese & tomato pizza with fresh basil',time:25,rating:4.5,cuisine:'Italian'},
  {id:2,title:'Paneer Butter Masala',price:8.5,image:'https://source.unsplash.com/600x400/?paneer,indian',desc:'Creamy tomato-based curry with soft paneer cubes',time:30,rating:4.7,cuisine:'Indian'},
  {id:3,title:'Sushi Platter',price:14.99,image:'https://source.unsplash.com/600x400/?sushi,rolls',desc:'Assorted sushi with fresh salmon and tuna',time:40,rating:4.8,cuisine:'Japanese'},
  {id:4,title:'Cheeseburger',price:6.99,image:'https://source.unsplash.com/600x400/?burger,cheeseburger',desc:'Grilled beef patty with cheese and special sauce',time:20,rating:4.4,cuisine:'American'},
  {id:5,title:'Caesar Salad',price:5.5,image:'https://source.unsplash.com/600x400/?salad,caesar',desc:'Crisp romaine with parmesan and croutons',time:15,rating:4.2,cuisine:'Healthy'},
  {id:6,title:'Pad Thai',price:9.5,image:'https://source.unsplash.com/600x400/?padthai,thai',desc:'Stir-fried rice noodles with tamarind and peanuts',time:30,rating:4.6,cuisine:'Thai'}
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
const modal = $('#product-modal');
const modalClose = $('#modal-close');
const modalImg = $('#modal-img');
const modalTitle = $('#modal-title');
const modalDesc = $('#modal-desc');
const modalPrice = $('#modal-price');
const modalAdd = $('#modal-add');

let lastOpenedProductId = null;

// Auth helpers
const authArea = $('#auth-area');
function getStoredUser(){
  try{ return JSON.parse(localStorage.getItem('foodies_home_user')); }catch(e){return null}
}

function renderAuthArea(){
  const user = getStoredUser();
  authArea.innerHTML = '';
  if(user && user.email){
    const w = document.createElement('div'); w.className='welcome'; w.textContent = `Welcome, ${user.email.split('@')[0]}`;
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

let cart = [];

function renderProducts(){
  productsEl.innerHTML = products.map(p=>`
    <article class="product">
      <div class="prod-top">
        <img src="${p.image}" alt="${p.title}">
        <div class="prod-info">
          <div class="title">${p.title}</div>
          <div class="meta">${p.cuisine} • ${p.rating} ★ • ${p.time} mins</div>
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

  // image/title open modal (click on image)
  productsEl.querySelectorAll('img').forEach(img=>{
    img.addEventListener('click',()=>{
      const id = products.find(p=>p.image===img.src)?.id || null;
      if(id) openModal(id);
    });
  });
}

function addToCart(id){
  const prod = products.find(p=>p.id===id);
  const existing = cart.find(i=>i.id===id);
  if(existing){ existing.qty++; }
  else cart.push({...prod,qty:1});
  updateCartUI();
}

function removeFromCart(id){
  cart = cart.filter(i=>i.id!==id);
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
        <button data-remove="${item.id}">Remove</button>
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
  alert('Checkout demo — order placed!');
  cart = [];
  updateCartUI();
  cartEl.classList.remove('open');
});

// Modal functions
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

// Search
searchInput.addEventListener('input',()=>{
  const q = searchInput.value.trim().toLowerCase();
  const filtered = products.filter(p=>p.title.toLowerCase().includes(q) || (p.desc||'').toLowerCase().includes(q));
  productsEl.innerHTML = filtered.map(p=>`
    <article class="product">
      <span class="badge">Top Seller</span>
      <div class="img-wrap" data-id="${p.id}">
        <img src="${p.image}" alt="${p.title}">
        <span class="img-title">${p.title}</span>
      </div>
      <h4 data-id="${p.id}" class="sr-only">${p.title}</h4>
      <div class="meta">Rating ★★★★☆</div>
      <div class="price">$${p.price.toFixed(2)}</div>
      <button data-id="${p.id}">Add to cart</button>
    </article>`).join('');

  productsEl.querySelectorAll('button[data-id]').forEach(btn=>{
    btn.addEventListener('click',()=>addToCart(Number(btn.dataset.id)));
  });
  productsEl.querySelectorAll('.img-wrap[data-id]').forEach(el=>{
    el.addEventListener('click',()=>openModal(Number(el.dataset.id)));
  });
});

renderProducts();
updateCartUI();

// render auth area on load
renderAuthArea();
