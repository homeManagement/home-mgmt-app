UPDATE property_maintenance
SET name = CASE
              WHEN CAST($2 as varchar) is null
              THEN name
              ELSE CAST($2 as varchar)
            END
,next_date = CASE
              WHEN CAST($3 as Date) is null
              THEN next_date
              ELSE CAST($3 as Date)
            END
,last_date = CASE
              WHEN CAST($4 as Date) is null
              THEN last_date
              ELSE CAST($4 as Date)
            END
,season = CASE
              WHEN CAST($5 as varchar) is null
              THEN season
              ELSE CAST($5 as varchar)
            END
,day_interval = CASE
              WHEN CAST($5 as varchar) is null
              THEN day_interval
              ELSE CASE
                    WHEN CAST($5 as varchar) = 'Monthly'
                    THEN 30
                    WHEN CAST($5 as varchar) = 'Quarterly'
                    THEN 90
                    WHEN CAST($5 as varchar) = 'Bianually'
                    THEN 182
                    WHEN CAST($5 as varchar) = 'Annually'
                    THEN 365
                    ELSE CAST($6 as int)
                  END
            END
,outdoor = CASE
              WHEN CAST($7 as boolean) is null
              THEN outdoor
              ELSE CAST($7 as boolean)
            END
,notes = CASE
              WHEN CAST($8 as text) is null
              THEN notes
              ELSE CAST($8 as text)
            END
,inactive = CASE
              WHEN CAST($9 as boolean) is null
              THEN inactive
              ELSE CAST($9 as boolean)
            END

WHERE id = $1
RETURNING *;
