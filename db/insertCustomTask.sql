INSERT INTO property_maintenance(property_id,name,type_id,day_interval,season,notes,outdoor,next_date,last_date,one_time,inactive)
SELECT Cast($1 as int) --property_id
,$2 --name
,(select type_id from property where ID = $1) --property_id
,$3 --day_interval
,$4 --season
,$5 --notes
,$6 --outdoor
,CASE
  WHEN Cast($3 as int) < current_date - Cast($7 as date) and current_date - Cast($7 as date) > 0
  THEN Cast($7 as date) + (((current_date - Cast($7 as date))/Cast($3 as int)) * Cast($3 as int)) + Cast($3 as int) * INTERVAL '1 day'
  WHEN current_date - Cast($7 as date) < 0
  THEN Cast($7 as date) + Cast($3 as int) * INTERVAL '1 day'
  ELSE Cast($7 as date) + Cast($3 as int) * INTERVAL '1 day'
END
,Cast($7 as date) --last_date
,false
,false
RETURNING *;
