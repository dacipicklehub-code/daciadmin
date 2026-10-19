ALTER TABLE public.bookings
  ADD COLUMN IF NOT EXISTS messenger_id text,
  ADD COLUMN IF NOT EXISTS confirmed_at timestamptz,
  ADD COLUMN IF NOT EXISTS confirmed_by text;

NOTIFY pgrst, 'reload schema';
