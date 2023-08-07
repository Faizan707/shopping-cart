// Keep track of added items in the cart
const cartItems = [];

async function fetchData() {
  try {
    const API = "https://fakestoreapi.com/products";
    const response = await fetch(API);
    const data = await response.json();

    const imageContainer = document.createElement("div");
    imageContainer.className = "image-container";

    data.forEach(product => {
      const productCard = document.createElement("div");
      productCard.className = "product-card";

      const img = document.createElement("img");
      img.src = product.image;
      img.alt = product.title;
      img.className = "product-img";

      const addToCartButton = document.createElement("button");
      addToCartButton.textContent = "Add to Cart";
      addToCartButton.className = "btn btn-primary add-to-cart";
      addToCartButton.setAttribute("data-id", product.id);
      addToCartButton.addEventListener("click", () => addToCart(product));

      productCard.appendChild(img);
      productCard.appendChild(addToCartButton);

      imageContainer.appendChild(productCard);
    });

    document.body.appendChild(imageContainer);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function addToCart(product) {
  cartItems.push(product);
  updateCartSummary();
}

function removeFromCart(productId) {
  const index = cartItems.findIndex(item => item.id === productId);
  if (index !== -1) {
    cartItems.splice(index, 1);
    updateCartSummary();
  }
}

function updateCartSummary() {
  const cartSummary = document.getElementById("cart-summary");
  cartSummary.innerHTML = '';

  if (cartItems.length === 0) {
    cartSummary.textContent = "Your cart is empty.";
    return;
  }

  const cartList = document.createElement("ul");
  cartItems.forEach(item => {
    const listItem = document.createElement("li");

    const productImage = document.createElement("img");
    productImage.src = item.image;
    productImage.alt = item.title;
    productImage.className = "cart-product-img";

    const productTitle = document.createElement("span");
    productTitle.textContent = item.title;

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.className = "btn btn-danger btn-sm remove-item";
    removeButton.setAttribute("data-id", item.id);
    removeButton.addEventListener("click", () => removeFromCart(item.id));

    listItem.appendChild(productImage);
    listItem.appendChild(productTitle);
    listItem.appendChild(removeButton);

    cartList.appendChild(listItem);
  });

  cartSummary.appendChild(cartList);
}

fetchData(); // Call the async function to initiate the API request
