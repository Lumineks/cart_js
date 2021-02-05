(function () {
  const products = [{
      id: 1,
      title: 'Wooden radio',
      price: 29.00,
      imageSrc: `images/weekly-products-1.png`,
    },
    {
      id: 2,
      title: 'Wooden chair',
      price: 24.00,
      imageSrc: `images/weekly-products-2.png`,
    },
    {
      id: 3,
      title: 'White chair',
      price: 52.00,
      imageSrc: `images/weekly-products-3.png`,
    },
    {
      id: 4,
      title: 'Retro table',
      price: 125.00,
      imageSrc: `images/weekly-products-4.png`,
    },
    {
      id: 5,
      title: 'Wooden radio',
      price: 29.00,
      imageSrc: `images/weekly-products-5.png`,
    },
    {
      id: 6,
      title: 'Wooden chair',
      price: 24.00,
      imageSrc: `images/weekly-products-6.png`,
    },
    {
      id: 7,
      title: 'White chair',
      price: 52.00,
      imageSrc: `images/weekly-products-7.png`,
    },
    {
      id: 8,
      title: 'Retro table',
      price: 125.00,
      imageSrc: `images/weekly-products-8.png`,
    },
  ];

  const productsList = document.querySelectorAll('.weekly-products__item .product-card');
  const titleList = document.querySelectorAll('.product-card__link');
  const imagesList = document.querySelectorAll('.product-card__image');
  const priceList = document.querySelectorAll('.product-card__price');

  const cart = document.querySelector('.header__cart');
  const cartBtn = document.querySelector('.header__btn.icon--cart')
  const closeBtn = document.querySelector('.cart-close')

  cartBtn.addEventListener('click', toggleCart);
  closeBtn.addEventListener('click', toggleCart);

  function toggleCart() {
    cart.classList.toggle('hidden');
  }

  productsList.forEach((product, i) => {
    product.dataset.id = products[i].id;
    titleList[i].innerText = products[i].title;
    priceList[i].innerText = `$${products[i].price}.00`;
    imagesList[i].setAttribute('src', products[i].imageSrc);
  });

  const addToCartBtns = document.querySelectorAll('.product-card__action.icon--cart');
  const headerCartItems = document.querySelector('.cart-list');
  let cartItems = [];
  const emptyMsg = document.querySelector('.cart-empty');
  const checkout = document.querySelector('.cart-bottom');
  const totalMsg = document.querySelector('.cart-total');
  let isEmpty = false;
  let totalPrice = 0;

  addToCartBtns.forEach((btn) => {
    btn.addEventListener('click', function (event) {
      const productId = event.target.parentNode.parentNode.dataset.id;
      const currentItem = products[productId - 1];
      cartItems.push(currentItem);

      let qnty = 0;
      for (const obj of cartItems) {
        if (currentItem.id === obj.id)
          qnty++;
      }

      const cartItem = document.createElement('div');
      cartItem.classList.add('cart-item');
      cartItem.dataset.id = currentItem.id;

      if (isEmpty)
        isEmpty = false;
      if (!emptyMsg.classList.contains('hidden'))
        emptyMsg.classList.add('hidden');
      if (!checkout.classList.contains('visible'))
        checkout.classList.add('visible');

      if (qnty === 1) {
        cartItem.innerHTML = `
          <a class="cart-image-wrapper" href="#">
              <img class="cart-image" src="${currentItem.imageSrc}" alt="">
          </a>
          <div class="cart-title"><a href="#">${currentItem.title}</a></div>
          <div class="cart-price">${currentItem.price}$</div>
          <div class="cart-qnty">qnty: ${qnty}</div>
          <button class="cart-remove">Remove item</button>`
        cartItem.querySelector('.cart-remove').addEventListener('click', removeItem);
        headerCartItems.appendChild(cartItem);
      } else {
        const currentItems = document.querySelectorAll('.header__cart .cart-item');
        currentItems.forEach((el) => {
          if (el.dataset.id == currentItem.id) {
            el.querySelector('.cart-qnty').innerText = `qnty: ${qnty}`;
            el.querySelector('.cart-price').innerText = `${currentItem.price * qnty}$`;
          }
        });
      }

      totalPrice += currentItem.price;
      cartBtn.querySelector('span').innerText = cartItems.length;
      totalMsg.innerText = `Total: ${totalPrice}$`
      console.log(cartItems);
    });

  });

  function removeItem(event) {
    const id = parseInt(event.target.parentNode.dataset.id);
    const indexInArray = cartItems.findIndex((el) => el.id == id);

    let qnty = 0;
    for (const obj of cartItems) {
      if (id === obj.id)
        qnty++;
    }

    totalPrice -= cartItems[indexInArray].price;
    totalMsg.innerText = `Total: ${totalPrice}$`

    document.querySelectorAll('.cart-item').forEach((item) => {
      if (item.dataset.id == id && qnty === 1)
        item.remove();
      else if (item.dataset.id == id && qnty > 1) {
        qnty--;
        item.querySelector('.cart-qnty').innerText = `qnty: ${qnty}`;
        item.querySelector('.cart-price').innerText = `${cartItems[indexInArray].price * qnty}$`;
      }
    })

    cartItems.splice(indexInArray, 1);
cartBtn.querySelector('span').innerText = cartItems.length;
    if (cartItems.length === 0) {
      emptyMsg.classList.remove('hidden');
      checkout.classList.remove('visible');
      isEmpty = true;
    }
  }
})();

(function () {
  const headerArrow = document.querySelector('.header__arrow');
  const userNav = document.querySelector('.header__box');
  const burger = document.querySelector('.header__burger');
  const menu = document.querySelector('.header__list');

  headerArrow.addEventListener('click', function () {
    toggleUserNav();
    if (burger.classList.contains('active'))
      toggleMenu();
  });

  burger.addEventListener('click', function () {
    toggleMenu();
    if (headerArrow.classList.contains('active'))
      toggleUserNav();
  });

  function toggleMenu() {
    burger.classList.toggle('active');
    menu.classList.toggle('active');
  }

  function toggleUserNav() {
    headerArrow.classList.toggle('active');
    userNav.classList.toggle('active');
  }

})();
