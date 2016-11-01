UPDATE property_maintenance
SET last_date = current_date
, next_date = current_date + cast(day_interval as int) * INTERVAL '1 day'
WHERE id = $1
