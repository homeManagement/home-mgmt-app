INSERT INTO property_maintenance (property_id,day_interval,name,season,outdoor,type_id,next_date,last_date,one_time,inactive)
SELECT $1,$2,$3,$4,$5,$6,current_date + cast($2 as int) * INTERVAL '1 day',current_date,false,false
