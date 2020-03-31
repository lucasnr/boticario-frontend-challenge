fetch(
	"https://raw.githubusercontent.com/felipe-ssilva/challenge/master/front-end/assets/products.json"
)
	.then(response => response.json())
	.then(data => data.forEach(item => createNewProduct(item)));

const cart = document.querySelector(".header__cart__value");
const productList = document.querySelector("#product-list");
const formatter = new Intl.NumberFormat("pt-BR", {
	style: "currency",
	currency: "BRL"
});

function createNewProduct(item) {
	const product = document.createElement("article");
	product.classList.add("product");

	const image = document.createElement("img");
	image.classList.add("product__image");
	image.alt = item.name;
	image.src = item.images[0].imageUrl;
	product.appendChild(image);

	const name = document.createElement("h3");
	name.classList.add("product__name");
	name.innerText = item.name;
	product.appendChild(name);

	const value = document.createElement("h4");
	value.classList.add("product__value");
	value.innerText = formatter.format(item.Value);
	product.appendChild(value);

	product.onclick = function() {
		addToCart(item.Value);
	};

	productList.appendChild(product);
}

function addToCart(value) {
	const currentValueText = cart.innerText;
	const currentValue = Number(
		currentValueText
			.slice(3)
			.replace(".", "")
			.replace(",", ".")
	);
	const newValue = currentValue + value;
	cart.innerText = formatter.format(newValue);
}
