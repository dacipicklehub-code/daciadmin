const { getBookingRateForDate, isWeekend } = require('../js/booking-utils');

describe('booking rate helpers', () => {
  test('uses weekday rate for Monday', () => {
    expect(getBookingRateForDate('2026-07-06')).toBe(500);
    expect(isWeekend('2026-07-06')).toBe(false);
  });

  test('uses weekend rate for Monday early morning slots', () => {
    expect(getBookingRateForDate('2026-07-06', '1AM - 2AM')).toBe(550);
    expect(getBookingRateForDate('2026-07-06', '4AM - 5AM')).toBe(550);
    expect(getBookingRateForDate('2026-07-06', '5AM - 6AM')).toBe(500);
  });

  test('uses weekend rate for Friday', () => {
    expect(getBookingRateForDate('2026-07-03')).toBe(550);
    expect(isWeekend('2026-07-03')).toBe(true);
  });

  test('uses weekend rate for Sunday', () => {
    expect(getBookingRateForDate('2026-07-05')).toBe(550);
    expect(isWeekend('2026-07-05')).toBe(true);
  });

  test('finds an active booking on the same court, date, and time', () => {
    const { findBookingConflicts } = require('../js/booking-utils');
    const candidates = [{ id: 'pending-1', booking_date: '2026-07-06', court: 'Court 1', time_slot: '6:00 PM - 7:00 PM' }];
    const bookings = [
      { id: 'paid-1', reference_code: 'PKL-PAID', status: 'paid', booking_date: '2026-07-06', court: 'court 1', time_slot: '6:00 PM - 7:00 PM' },
      { id: 'cancelled-1', status: 'cancelled', booking_date: '2026-07-06', court: 'Court 1', time_slot: '6:00 PM - 7:00 PM' },
      { id: 'other-1', status: 'paid', booking_date: '2026-07-06', court: 'Court 2', time_slot: '6:00 PM - 7:00 PM' }
    ];

    expect(findBookingConflicts(bookings, candidates).map(booking => booking.reference_code)).toEqual(['PKL-PAID']);
  });

  test('treats legacy Training Area and Court 2 names as the same court', () => {
    const { findBookingConflicts } = require('../js/booking-utils');
    const candidates = [{ id: 'pending-2', booking_date: '2026-07-06', court: 'Court 2', time_slot: '7:00 PM - 8:00 PM' }];
    const bookings = [
      { id: 'paid-2', reference_code: 'PKL-COURT-TWO', status: 'paid', booking_date: '2026-07-06', court: 'Training Area', time_slot: '7:00 PM - 8:00 PM' }
    ];

    expect(findBookingConflicts(bookings, candidates).map(booking => booking.reference_code)).toEqual(['PKL-COURT-TWO']);
  });
});
