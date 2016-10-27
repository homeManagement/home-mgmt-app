Select user_ID,pm.Property_ID,Next_Date
From property_maintenance pm
    join property p on pm.property_ID = p.ID
    join users u on p.user_id = u.ID
Where Last_Date + day_interval * INTERVAL  '1 day' = Next_Date
    and u.timeZone = 3;
