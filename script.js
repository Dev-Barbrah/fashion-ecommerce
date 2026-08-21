console.log("JAVASCRIPT IS CONNECTED!");

let cart = [];

function viewProduct(productName, productPrice) {

    const details = document.getElementById("product-details");

    document.getElementById("product-name").textContent = productName;

    document.getElementById("product-price").textContent = productPrice;
    const sizeSelect = document.getElementById("product-size");

if (
    productName === "Original Red Bottom Heels" ||
    productName === "Classy Heels" ||
    productName === "Classy Heels@1800"
) {
    sizeSelect.innerHTML = `
        <option value="">Choose shoe size</option>
        <option value="37">37</option>
        <option value="38">38</option>
        <option value="39">39</option>
        <option value="40">40</option>
        <option value="41">41</option>
        <option value="42">42</option>
    `;
} else {
    sizeSelect.innerHTML = `
        <option value="">Choose clothing size</option>
        <option value="S">Small (S)</option>
        <option value="M">Medium (M)</option>
        <option value="L">Large (L)</option>
        <option value="XL">Extra Large (XL)</option>
    `;
}

    const productImages = {
        "Kaftan Dress": "image/kaftan.jpg",
        "Two Piece Wide Leg Office Set": "image/wide leg.jpg",
        "Two Piece Sweatpants Set": "image/sweatpant.jpg",
        "Skater Dress": "image/skater.jpg",
        "Original Red Bottom Heels": "image/red bottom.jpg",
        "Classy Heels": "image/classy heels.jpg",
        "Classy Heels@1800": "image/heels@1800.jpg"
    };

    document.getElementById("product-detail-image").src =
        productImages[productName];

    document.getElementById("product-description").textContent =
        "A beautiful and stylish " + productName +
        " that is perfect for any occasion. Made with high-quality materials, " +
        "this piece is designed to make you look and feel your best.";

    details.style.display = "block";

    details.scrollIntoView({
        behavior: "smooth"
    });
};
    document.getElementById("product-description").textContent =
        "A beautiful and stylish " + productName +
        " that is perfect for any occasion. Made with high-quality materials, " +
        "this piece is designed to make you look and feel your best.";

    details.style.display = "block";

    details.scrollIntoView({
        behavior: "smooth"
    });

document.getElementById("add-to-cart").addEventListener("click", function () {

    const productName = document.getElementById("product-name").textContent;
    const productPrice = document.getElementById("product-price").textContent;
const productSize = document.getElementById("product-size").value;

if (productSize === "") {
    alert("Please select a size.");
    return;
}
    const existingProduct = cart.find(function(product) {
        return product.name === productName;
    });

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({
            name: productName,
            price: productPrice,
            size: productSize,
            quantity: 1
        });
    }

    updateCart();
});

function updateCart() {

    const cartCount = document.getElementById("cart-count");
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    let totalItems = 0;
    let totalPrice = 0;

    cartItems.innerHTML = "";

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty.</p>";
        cartCount.textContent = "0";
        cartTotal.textContent = "Total: KSh 0";
        return;
    }

    cart.forEach(function(product, index) {

        const price = Number(
            product.price.replace("KSh", "").replace(",", "").trim()
        );

        totalItems += product.quantity;
        totalPrice += price * product.quantity;

        const item = document.createElement("div");

        item.innerHTML = `
            <h3>${product.name}</h3>
            <p>${product.price}</p>

            <button onclick="decreaseQuantity(${index})">−</button>

            <span>${product.quantity}</span>

            <button onclick="increaseQuantity(${index})">+</button>

            <br><br>

            <button onclick="removeFromCart(${index})">
                Remove
            </button>

            <hr>
        `;

        cartItems.appendChild(item);
    });

    cartCount.textContent = totalItems;
    cartTotal.textContent =
        "Total: KSh " + totalPrice.toLocaleString();
}

function increaseQuantity(index) {
    cart[index].quantity++;
    updateCart();
}

function decreaseQuantity(index) {

    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    } else {
        cart.splice(index, 1);
    }

    updateCart();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}
document.getElementById("checkout-form").addEventListener("submit", function(event) {

    event.preventDefault();

    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    const name = document.getElementById("customer-name").value;
    const phone = document.getElementById("customer-phone").value;
    const location = document.getElementById("customer-location").value;
    const payment = document.getElementById("payment-method").value;

    let orderMessage = "Hello Velour Fashion! I would like to place an order.%0A%0A";

    orderMessage += "Customer: " + name + "%0A";
    orderMessage += "Phone: " + phone + "%0A";
    orderMessage += "Delivery Location: " + location + "%0A";
    orderMessage += "Payment Method: " + payment + "%0A%0A";

    orderMessage += "ORDER:%0A";

    let total = 0;

    cart.forEach(function(product) {

        const price = Number(
            product.price.replace("KSh", "").replace(",", "").trim()
        );

        const itemTotal = price * product.quantity;
        total += itemTotal;

        orderMessage +=
            product.name +
            " x " +
            product.quantity +
            " - KSh " +
            itemTotal.toLocaleString() +
            "%0A";
    });

    orderMessage += "%0ATotal: KSh " + total.toLocaleString();

    const whatsappNumber = "254723833630";

    const whatsappURL =
        "https://wa.me/" +
        whatsappNumber +
        "?text=" +
        orderMessage;

    window.open(whatsappURL, "_blank");

    cart = [];

    updateCart();

    document.getElementById("checkout-form").reset();
});