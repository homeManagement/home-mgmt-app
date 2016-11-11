Select pm.ID as property_maintenance_id,user_ID,pm.Property_ID,Next_Date,ps.receive_text,ps.receive_email
From property_maintenance pm
    join property p on pm.property_ID = p.ID
    join property_settings ps on ps.property_ID = p.ID
Where current_date = Next_Date
And inactive = false
And NOT EXISTS (Select 1 from alert a where a.property_maintenance_id=pm.id);
