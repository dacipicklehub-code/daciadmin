# Quick Start - Booking Confirmation

## Fix Missing Dashboard Tables

If the dashboard reports 404 errors for `blocked_time_slots` or `admin_logs`, create these tables in the Supabase project configured in `js/supabase-config.js`:

1. Open the Supabase SQL Editor for that project.
2. Run the contents of `supabase/blocked_time_slots.sql`.
3. Run the contents of `supabase/admin_logs.sql`.
4. Reload the dashboard after both scripts complete.

These tables are used by the booking calendar and activity log. Running the SQL only in the local project files does not apply it to Supabase.

To rename legacy `Training Area` records to `Court 2`, run `supabase/rename_training_area_to_court_2.sql` in the same Supabase SQL Editor.

## Fix Booking Confirmation Column Errors

If the dashboard reports that `confirmed_at` or another confirmation column is missing from `bookings`:

1. Open the Supabase SQL Editor for the project configured in `js/supabase-config.js`.
2. Run `supabase/booking_confirmation_columns.sql`.
3. Reload the dashboard and try confirming the booking again.

## 3 Things You Must Do Now

### 1. Update Supabase Database (5 minutes)
Run `supabase/booking_confirmation_columns.sql` in the Supabase SQL Editor to add the required columns to `bookings`.

### 2. Redeploy to Vercel (2 minutes)

**Via Git:**
```bash
git add api/confirm-booking.js api/messenger-webhook.js
git commit -m "Add booking confirmation"
git push
```

**Or:** Vercel dashboard → Deployments → Click latest → Redeploy

### 3. Test It (5 minutes)

**Customer side:**
1. Send booking reference to bot: `PKL-ABCD123EFGH`
2. Bot responds with status

**Admin side:**
1. Open dashboard
2. Click "Confirm" on a booking
3. See success notification

**Check results:**
1. Customer received Messenger message
2. Database shows booking is "confirmed"

---

## The System Flow

```
Customer messages bot
    ↓
Messenger ID captured & stored
    ↓
Admin clicks "Confirm" in dashboard
    ↓
Automatic Messenger message sent
    with all booking details
```

## Files Changed

- ✅ `/api/confirm-booking.js` - NEW
- ✅ `/api/messenger-webhook.js` - UPDATED  
- ✅ `/js/admin-dashboard.js` - UPDATED

## Documentation

- **DEPLOYMENT_GUIDE.md** - How to deploy changes
- **BOOKING_SETUP.md** - Complete technical guide
- **BOOKING_CONFIRMATION_SETUP.md** - Detailed reference

---

## Common Issues

| Problem | Solution |
|---------|----------|
| 500 error on webhook | Redeploy to Vercel |
| Messenger notification not sent | Customer must message bot first |
| Database error | Add the 3 required columns |
| Reference not recognized | Use format like PKL-ABCD123EFGH |

---

**Questions?** Check BOOKING_SETUP.md for detailed documentation.
