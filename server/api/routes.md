**USER: (/api/user)**

* register guest user (POST) - occurs as soon as any user visits site (any page). Sets cookie (sessionId)
* create user account (POST)
* authenticate registered user (POST) - sets cookie (some version of userId)
* retrieve single user, or all users (GET)
* update user (PUT)
* delete user account (DELETE)

**CART/CART-ITEM: (/api/cart)**
* create new cart (POST) - use userId (new cart should be created as soon as new user enters app)
* retrieve single cart, or all carts (GET)
* add to cart (POST) - creates new CartItem, uses productId of selected product, cartId
* retrieve single CartItem, or all CartItem(s) (GET)
* edit cart item (PUT)
* delete cart item (DELETE)
* clear cart (PUT)

**PRODUCT: (/api/products)**
* add new product (POST) - this should create new price in the process
* edit product (PUT) - this will be used whenever a user adds a product to cart or updates quantity, as well as admin purposes
* retrieve individual product, or all products (GET) - add queries to sort and filter (e.g. product in category)
* delete product (DELETE) - admin only!

**PRICE: (/api/price)**
* create new price (POST)
* retrieve single price, or all prices (GET)
* update price (PUT)

**ORDER/ORDER-ITEM: (/api/orders)**
* create order (POST)
* create OrderItem (POST)
* edit order (PUT) - admin can change status; user can change quantity / cancel order (if it has not been shipped)
* retrieve single order, or all orders (GET)

suggested createOrder flow: (when user submits an order)
assuming updated cart is already on store
1. thunk makes POST request to create new Order, dispatches this order to store
2. .then => use getState to access cart and order from store; loop through its CartItems arr, for each CartItem make a POST req (sending CartItem as req.body) to create a new OrderItem (keep quantity from CartItem, add pricePaid & orderId)

Some info on chaining dispatches: https://github.com/reduxjs/redux/issues/1676

**LATER TIERS:**

**CATEGORY: (/api/categories)**
create new category (POST)
retrieve single category, or all categories (GET)
edit category (PUT) - e.g. adding product to category or changing name of category (should these be separate routes to avoid confusion? e.g. /api/categories/edit & /api/categories/updateProducts)
delete category (DELETE)