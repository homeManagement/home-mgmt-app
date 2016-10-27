INSERT INTO alert (property_id,user_id,due_date,create_date,url)
SELECT $1,$2,$3,current_date,'NEED TO GET';
