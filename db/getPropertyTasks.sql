SELECT p.ID as propertymaintenanceid,
p.property_Id as propertyid,
p.name as name,
p.type_id as typeid,
p.day_interval as dayinterval,
p.next_date as nextdate,
p.last_date as lastdate,
p.season as season,
p.outdoor as outdoor,
p.notes as notes,
--p.one_time as oneTime,
--p.inactive as inactive,
a.ID as alertid,
a.due_date as duedate,
a.create_date as createdate
FROM property_maintenance p LEFT JOIN alert a on p.id = a.property_maintenance_id
WHERE p.property_id = $1;
