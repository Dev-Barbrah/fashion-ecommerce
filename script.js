console.log("JAVASCRIPT IS CONNECTED!");
let cart = [];
const productImages = {

    "Kaftan Dress":
        "image/kaftan.jpg",

    "Two Piece Wide Leg Office Set":
        "image/wide leg.jpg",

    "Two Piece Sweatpants Set":
        "image/sweatpant.jpg",

    "Skater Dress":
        "image/skater.jpg",

    "Original Red Bottom Heels":
        "image/red bottom.jpg",

    "Classy Heels":
        "image/classy heels.jpg",

    "Classy Heels 1800":
        "image/heels@1800.jpg"

};


const productDescriptions = {

    "Kaftan Dress":
        "An elegant kaftan designed for effortless style and comfort. Perfect for casual outings, special occasions and relaxed days.",

    "Two Piece Wide Leg Office Set":
        "A sophisticated two-piece set designed for a polished and confident office look while keeping you comfortable throughout the day.",

    "Two Piece Sweatpants Set":
        "A stylish and comfortable two-piece set perfect for relaxed days, casual outings and effortless everyday fashion.",

    "Skater Dress":
        "A feminine and stylish skater dress designed to give you a flattering silhouette while keeping your look elegant and effortless.",

    "Original Red Bottom Heels":
        "A statement pair of heels designed to add elegance and sophistication to your outfit. Perfect for special occasions and glamorous looks.",

    "Classy Heels":
        "Elegant heels designed for women who love sophisticated and timeless fashion. Perfect for both special occasions and stylish evenings.",

    "Classy Heels 1800":
        "A stylish and versatile pair of heels that adds a polished touch to any outfit while keeping your look effortlessly chic."

};
function viewProduct(productName, productPrice) {

    const details =
        document.getElementById("product-details");

    const productNameElement =
        document.getElementById("product-name");

    const productPriceElement =
        document.getElementById("product-price");

    const productDescriptionElement =
        document.getElementById("product-description");

    const productImage =
        document.getElementById("product-detail-image");

    const sizeSelect =
        document.getElementById("product-size");

    const quantityInput =
        document.getElementById("product-quantity");
    productNameElement.textContent =
        productName;
    productPriceElement.textContent =
        productPrice;
    productImage.src =
        productImages[productName];
    productDescriptionElement.textContent =
        productDescriptions[productName];
    quantityInput.value = 1;
    const isShoe =
        productName === "Original Red Bottom Heels" ||
        productName === "Classy Heels" ||
        productName === "Classy Heels 1800";


    if (isShoe) {

        sizeSelect.innerHTML = `

            <option value="">
                Choose shoe size
            </option>

            <option value="37">37</option>
            <option value="38">38</option>
            <option value="39">39</option>
            <option value="40">40</option>
            <option value="41">41</option>
            <option value="42">42</option>

        `;

    } else {

        sizeSelect.innerHTML = `

            <option value="">
                Choose clothing size
            </option>

            <option value="S">
                Small (S)
            </option>

            <option value="M">
                Medium (M)
            </option>

            <option value="L">
                Large (L)
            </option>

            <option value="XL">
                Extra Large (XL)
            </option>

        `;

    }
    details.style.display =
        "block";
    details.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}
document
    .getElementById("increase-product")
    .addEventListener("click", function () {

        const quantityInput =
            document.getElementById("product-quantity");

        let quantity =
            Number(quantityInput.value);

        if (quantity < 10) {
            quantity++;
        }

        quantityInput.value =
            quantity;

    });


document
    .getElementById("decrease-product")
    .addEventListener("click", function () {

        const quantityInput =
            document.getElementById("product-quantity");

        let quantity =
            Number(quantityInput.value);

        if (quantity > 1) {
            quantity--;
        }

        quantityInput.value =
            quantity;

    });
document
    .getElementById("add-to-cart")
    .addEventListener("click", function () {

        const productName =
            document.getElementById("product-name").textContent;

        const productPrice =
            document.getElementById("product-price").textContent;

        const productSize =
            document.getElementById("product-size").value;

        const productQuantity =
            Number(
                document.getElementById("product-quantity").value
            );
        if (productSize === "") {

            alert("Please select a size.");

            return;
        }
        if (
            productQuantity < 1 ||
            productQuantity > 10
        ) {

            alert("Please select a quantity between 1 and 10.");

            return;
        }
        const existingProduct =
            cart.find(function (product) {

                return (
                    product.name === productName &&
                    product.size === productSize
                );

            });


        if (existingProduct) {

            existingProduct.quantity +=
                productQuantity;

        } else {

            cart.push({

                name: productName,

                price: productPrice,

                size: productSize,

                quantity: productQuantity

            });

        }


        updateCart();


        alert(
            productQuantity +
            " item" +
            (productQuantity > 1 ? "s" : "") +
            " added to your cart!"
        );

    });
function updateCart() {

    const cartCount =
        document.getElementById("cart-count");

    const cartItems =
        document.getElementById("cart-items");

    const cartTotal =
        document.getElementById("cart-total");


    let totalItems = 0;

    let totalPrice = 0;


    cartItems.innerHTML = "";
    if (cart.length === 0) {

        cartItems.innerHTML = `

            <div class="empty-cart">

                <p>
                    Your cart is empty.
                </p>

            </div>

        `;

        cartCount.textContent =
            "0";

        cartTotal.textContent =
            "Total: KSh 0";

        return;
    }
    cart.forEach(function (product, index) {

        const price =
            Number(
                product.price
                    .replace("KSh", "")
                    .replace(",", "")
                    .trim()
            );


        const itemTotal =
            price * product.quantity;


        totalItems +=
            product.quantity;


        totalPrice +=
            itemTotal;


        const item =
            document.createElement("div");


        item.className =
            "cart-item";


        item.innerHTML = `

            <h3>
                ${product.name}
            </h3>

            <p>
                Price: ${product.price}
            </p>

            <p>
                Size: ${product.size}
            </p>

            <p>
                Quantity: ${product.quantity}
            </p>

            <p>
                Item Total: KSh ${itemTotal.toLocaleString()}
            </p>

            <div class="cart-controls">

                <button
                    onclick="decreaseQuantity(${index})">
                    −
                </button>

                <span>
                    ${product.quantity}
                </span>

                <button
                    onclick="increaseQuantity(${index})">
                    +
                </button>

                <br>

                <button
                    class="remove-button"
                    onclick="removeFromCart(${index})">
                    Remove
                </button>

            </div>

        `;


        cartItems.appendChild(item);

    });
    cartCount.textContent =
        totalItems;
    cartTotal.textContent =
        "Total: KSh " +
        totalPrice.toLocaleString();

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
document
    .getElementById("checkout-button")
    .addEventListener("click", function () {

        if (cart.length === 0) {

            alert(
                "Your cart is empty. Please add a product first."
            );

            return;
        }


        document
            .getElementById("checkout")
            .scrollIntoView({
                behavior: "smooth"
            });

    });
document
    .getElementById("checkout-form")
    .addEventListener("submit", function (event) {

        event.preventDefault();
 if (cart.length === 0) {

            alert(
                "Your cart is empty. Please add a product first."
            );

            return;
        }


        const name =
            document.getElementById("customer-name").value.trim();

        const phone =
            document.getElementById("customer-phone").value.trim();

        const location =
            document.getElementById("customer-location").value.trim();

        const payment =
            document.getElementById("payment-method").value;


        let orderMessage =
            "Hello Velour Fashion! I would like to place an order.%0A%0A";


        orderMessage +=
            "CUSTOMER DETAILS%0A";

        orderMessage +=
            "Name: " +
            encodeURIComponent(name) +
            "%0A";

        orderMessage +=
            "Phone: " +
            encodeURIComponent(phone) +
            "%0A";

        orderMessage +=
            "Delivery Location: " +
            encodeURIComponent(location) +
            "%0A";

        orderMessage +=
            "Payment Method: " +
            encodeURIComponent(payment) +
            "%0A%0A";


        orderMessage +=
            "ORDER DETAILS%0A";


        let total = 0;


        cart.forEach(function (product) {

            const price =
                Number(
                    product.price
                        .replace("KSh", "")
                        .replace(",", "")
                        .trim()
                );


            const itemTotal =
                price * product.quantity;


            total +=
                itemTotal;


            orderMessage +=
                encodeURIComponent(product.name) +
                "%0A";

            orderMessage +=
                "Size: " +
                encodeURIComponent(product.size) +
                "%0A";

            orderMessage +=
                "Quantity: " +
                product.quantity +
                "%0A";

            orderMessage +=
                "Price: KSh " +
                itemTotal.toLocaleString() +
                "%0A%0A";

        });


        orderMessage +=
            "TOTAL: KSh " +
            total.toLocaleString();


        const whatsappNumber =
            "254723833630";


        const whatsappURL =
            "https://wa.me/" +
            whatsappNumber +
            "?text=" +
            orderMessage;

        window.open(
            whatsappURL,
            "_blank"
        );

        cart = [];

        updateCart();


        document
            .getElementById("checkout-form")
            .reset();

    });
updateCart();