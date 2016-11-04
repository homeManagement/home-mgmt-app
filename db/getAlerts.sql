Select u.phone_number as phonenumber, u.email, a.sendtext, a.sendemail, pm.name
From alert a
join users u on a.user_id = u.ID
join property_maintenance pm on a.property_maintenance_id = pm.id
Where current_date = due_date;
