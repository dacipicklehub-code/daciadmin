WITH ranked_slots AS (
  SELECT
    id,
    row_number() OVER (
      PARTITION BY
        blocked_date,
        time_slot,
        CASE
          WHEN lower(trim(court)) IN ('training area', 'training court', 'court two', 'court2', 'court 2', '2') THEN 'Court 2'
          ELSE court
        END
      ORDER BY id
    ) AS duplicate_rank
  FROM public.blocked_time_slots
)
DELETE FROM public.blocked_time_slots AS slots
USING ranked_slots
WHERE slots.id = ranked_slots.id
  AND ranked_slots.duplicate_rank > 1;

UPDATE public.bookings
SET court = 'Court 2'
WHERE lower(trim(court)) IN ('training area', 'training court', 'court two', 'court2', 'court 2', '2');

UPDATE public.bookings
SET court_name = 'Court 2'
WHERE lower(trim(court_name)) IN ('training area', 'training court', 'court two', 'court2', 'court 2', '2')
  AND court_name <> 'Court 2';

UPDATE public.blocked_time_slots
SET court = 'Court 2'
WHERE lower(trim(court)) IN ('training area', 'training court', 'court two', 'court2', 'court 2', '2')
  AND court <> 'Court 2';

NOTIFY pgrst, 'reload schema';
