UPDATE alert
SET due_date = current_date + 5 * INTERVAL '1 day'
WHERE id = $1
