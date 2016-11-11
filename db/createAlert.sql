INSERT INTO alert (property_maintenance_id,property_id,user_id,due_date,create_date,url,sendtext,sendemail)
SELECT $1,$2,$3,$4,current_date,cast(current_time as text),$5,$6;
