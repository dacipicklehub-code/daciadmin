const { applyInventoryDeduction } = require('../js/pos-inventory');

describe('applyInventoryDeduction', () => {
  it('deducts stock for multiple distinct products in a single checkout', () => {
    const products = [
      { id: 1, name: 'Beverages', category: 'Beverages', stock: 10 },
      { id: 2, name: 'Cookies', category: 'Beverages', stock: 4 },
      { id: 3, name: 'Gatorade', category: 'Beverages', stock: 6 },
      { id: 4, name: 'Room A', category: 'Rent', stock: 2 },
    ];

    const cart = [
      { productId: 1, qty: 2 },
      { productId: '2', qty: 1 },
      { productId: 3, qty: 3 },
      { productId: 4, qty: 1 },
    ];

    const applied = applyInventoryDeduction(products, cart);

    expect(applied).toHaveLength(3);
    expect(products[0].stock).toBe(8);
    expect(products[1].stock).toBe(3);
    expect(products[2].stock).toBe(3);
    expect(products[3].stock).toBe(2);
  });
});
