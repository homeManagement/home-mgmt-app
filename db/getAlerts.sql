Select u.phone_number as phonenumber, u.email
From alert a
join users u on a.user_id = u.ID
Where current_date = due_date;
