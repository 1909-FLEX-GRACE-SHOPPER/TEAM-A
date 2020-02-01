const states = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'];

let months = [];
for (let i = 0; i < 12; i++) {
  months.push(`${i + 1}`);
}

let validYears = [];
for (let i = 2021; i < 2025; i++) {
  validYears.push(`${i}`);
};

const categoriesObj = {
  apparel: ['Gloves', 'Shoes', 'Hat', 'Pants', 'Shirt'],
  noms: ['Tuna', 'Sausages', 'Chips', 'Salad', 'Bacon', 'Cheese', 'Chicken', 'Pizza', 'Fish'],
  gadgets: ['Mouse', 'Keyboard', 'Computer'],
  home: ['Chair', 'Table', 'Towels', 'Soap'],
  leisure: ['Bike', 'Car', 'Ball'],
}

const categoriesArr = ['apparel', 'noms', 'gadgets', 'home', 'leisure']

const orderStatuses = ['pending', 'fulfilled', 'shipped', 'delivered', 'cancelled'];

module.exports = {
  states,
  months,
  validYears,
  categoriesObj,
  categoriesArr,
  orderStatuses
}