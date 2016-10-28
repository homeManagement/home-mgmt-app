Select pm.ID as property_maintenance_id,user_ID,pm.Property_ID,Next_Date
From property_maintenance pm
    join property p on pm.property_ID = p.ID
Where current_date = Next_Date
