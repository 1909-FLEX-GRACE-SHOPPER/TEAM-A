**USER: (/api/user)**
* register guest user (POST - '/guest') - occurs as soon as any user visits site (any page). Sets cookie (sessionId)
* create user account (POST - '/')
* retrieve single user, or all users (GET - '/:userId?')
* update user (PUT - '/:userId')
* delete user account (DELETE - '/:userId')

**AUTH: (/api/auth)**
* check login (GET - /whoami)
* authenticate registered user (POST - '/') - sets cookie (some version of userId)

**CART: (/api/cart)**
* create new cart (POST - '/') - use userId (new cart should be created as soon as new user enters app)
* retrieve single cart, or all carts (GET - '/:cartId?')
* clear cart (PUT - '/:cartId')

**CART-ITEM: (/api/cartItem)**
* add to cart (POST - '/') - creates new CartItem, uses productId of selected product, cartId
* retrieve single CartItem, or all CartItem(s) (GET - '/:cartItemId?')
* edit cart item (PUT - '/:cartItemId')
* delete cart item (DELETE - '/:cartItemId')

**PRODUCT: (/api/products)**
* add new product (POST - '/')
* edit product (PUT - '/:productId')
* retrieve individual product, or all products (GET - '/:productId?') - add queries to sort and filter (e.g. product in category)
* delete product (DELETE - '/:productId') - admin only!

**ORDER: (/api/orders)**
* create order (POST - '/')
* edit order (PUT - '/:orderId') - admin can change status; user can cancel order (if it has not been shipped)
* retrieve single order, or all orders (GET - '/api/orders/:orderId?')

suggested createOrder flow: (when user submits an order)
assuming updated cart is already on store
1. thunk makes POST request to create new Order, dispatches this order to store
2. .then => use getState to access cart and order from store; loop through its CartItems arr, for each CartItem make a POST req (sending CartItem as req.body) to create a new OrderItem (keep quantity from CartItem, add pricePaid & orderId)

Some info on chaining dispatches: https://github.com/reduxjs/redux/issues/1676

**ORDER-ITEM: (/api/orderItem)**
* create OrderItem (POST - '/')
* edit OrderItem (PUT - '/orderItemId') - user can update quantity

**LATER TIERS:**

**CATEGORY: (/api/categories)**
create new category (POST)
retrieve single category, or all categories (GET)
edit category (PUT) - e.g. adding product to category or changing name of category (should these be separate routes to avoid confusion? e.g. /api/categories/edit & /api/categories/updateProducts)
delete category (DELETE)