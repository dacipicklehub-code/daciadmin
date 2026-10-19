const { buildCategorySalesBreakdown, getSalesForMonth, getVisibleSalesForHistory, isSaleVoided } = require('../js/sales-summary');

describe('buildCategorySalesBreakdown', () => {
  it('filters sales to the current month and excludes voided or invalid dates', () => {
    const currentMonth = new Date(2026, 9, 11);
    const sales = [
      { id: 1, time: new Date(2026, 9, 1), items: [] },
      { id: 2, time: new Date(2026, 8, 30, 23, 59), items: [] },
      { id: 3, time: new Date(2026, 9, 10), voided: true, items: [] },
      { id: 4, time: 'invalid', items: [] },
    ];

    expect(getSalesForMonth(sales, currentMonth).map(sale => sale.id)).toEqual([1]);
  });

  it('filters sales by a selected report month', () => {
    const sales = [
      { id: 1, time: new Date(2026, 9, 1) },
      { id: 2, time: new Date(2026, 8, 30, 23, 59) },
      { id: 3, time: new Date(2025, 9, 1) },
    ];

    expect(getSalesForMonth(sales, '2026-10').map(sale => sale.id)).toEqual([1]);
  });

  it('filters out voided sales from the active sales history list', () => {
    const sales = [
      { id: 1, voided: false, items: [] },
      { id: 2, voided: true, items: [] },
      { id: 3, voided: false, items: [] },
    ];

    expect(getVisibleSalesForHistory(sales).map(sale => sale.id)).toEqual([1, 3]);
  });

  it('groups sold products under each category and totals quantities', () => {
    const sales = [
      {
        items: [
          { productId: 1, qty: 2, price: 10 },
          { productId: 2, qty: 1, price: 20 },
        ],
      },
      {
        items: [
          { productId: 1, qty: 3, price: 10 },
        ],
      },
    ];

    const products = [
      { id: 1, name: 'Iced Tea', category: 'Beverages', price: 10 },
      { id: 2, name: 'Chips', category: 'Snacks', price: 20 },
      { id: 3, name: 'Room A', category: 'Rent', price: 100 },
    ];

    const result = buildCategorySalesBreakdown(sales, products, ['Beverages', 'Snacks', 'Rent']);

    expect(result.Beverages.items).toEqual([
      { id: 1, name: 'Iced Tea', qty: 5, revenue: 50 },
    ]);
    expect(result.Beverages.totalQty).toBe(5);
    expect(result.Snacks.items).toEqual([
      { id: 2, name: 'Chips', qty: 1, revenue: 20 },
    ]);
    expect(result.Rent.items).toEqual([]);
    expect(result.Rent.totalQty).toBe(0);
  });

  it('treats sales with a voided flag as hidden from active history', () => {
    const sales = [
      { id: 1, voided: false, items: [] },
      { id: 2, voided: true, items: [] },
      { id: 3, items: [] },
    ];

    expect(isSaleVoided(sales[1])).toBe(true);
    expect(isSaleVoided(sales[2])).toBe(false);
    expect(getVisibleSalesForHistory(sales).map(sale => sale.id)).toEqual([1, 3]);
  });
});
