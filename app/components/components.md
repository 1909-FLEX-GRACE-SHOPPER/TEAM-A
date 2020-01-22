**ALL PAGES**

* NAV component:
- site name
- cart icon
- login button || username

* FOOTER component?

**PRODUCTS PAGE**

* FILTER component:
- Categories
- Price ranges
- keyword

* ALL PRODUCTS component:
- pagination
- sort by
- image
- title
- price
- '+' (add to cart)
- more info

**INDIVIDUAL PRODUCT PAGE**

* PRODUCT component:
- image
- title
- price
- description
- quantity selector
- add to cart (disabled if product is sold out)

**CART PAGE**

* CART component:
- cart items
- total cost
- checkout

* CARTITEM component:
- image
- title
- price
- quantity (editable)

**CHECKOUT SUCCESS PAGE**

* CHECKOUT SUCCESS component:
- display new order
- edit order
- return to homepage

**LOGIN PAGE**

* LOGIN FORM component:
- email
- password
- submit

* LOGIN ERROR component (optional)

**ACCOUNT INFO PAGE**

* ACCOUNT DETAILS component (form with filled in details that can be edited?):
- first name
- last name
- email
- password
- profile pic?
- preferences (this could be fun - the user could choose a default color scheme, display view, etc.)
- order history
- logout

**ORDER HISTORY PAGE**

* PAST ORDERS component:
- past orders, with total price & status

**PAST ORDER PAGE**

* PAST ORDER component:
- items
- total cost
- status
- option to update (remove, update quantity) if order status is "pending"

-----------

ADMIN VIEW:

**INDIVIDUAL PRODUCT PAGE**

* PRODUCT component (editable):
- name
- description
- inventory
- price

**ALL USERS PAGE**

* ALL USERS component:
- filter by type (guest, logged in, admin)
- users (first name, last name, email, isRegistered, createdAt)

**UPDATE USER PAGE**

* USER component (form with filled in details that can be edited?):
- first name
- last name
- email
- password
- profile pic?
- preferences (this could be fun - the user could choose a default color scheme, display view, etc.)
- delete user

**ALL CARTS PAGE**

* ALL CARTS component:
- id
- user id
- user name
- user email

**INDIVIDUAL CART PAGE**

* CART component:
- cart items
- total cost

**ALL ORDERS PAGE**

* ALL ORDERS component:
- id
- user id
- total
- status

**INDIVIDUAL ORDER PAGE**

* ORDER component
- order items (name, link to product, quantity - editable)
- status

**ACCOUNT INFO PAGE**

- same as for customer, but no Order History