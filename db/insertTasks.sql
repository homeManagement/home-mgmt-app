INSERT INTO property_maintenance (property_id,day_interval,name,season,outdoor,type_id,next_date,last_date,one_time,inactive)
SELECT $1 --property_id
,$2 --day_interval
,$3 --name
,Cast($4 as varchar)--season
,$5 --outdoor
,$6 --type_id
,CASE
  WHEN Cast($4 as varchar) = Cast('Spring' as varchar)
  THEN CASE
          WHEN Cast(date_part('year', current_date) || '-03-15' as Date) <= current_date
          THEN Cast(date_part('year', current_date)+1 || '-03-15' as Date)
          ELSE Cast(date_part('year', current_date) || '-03-15' as Date)
        END
  WHEN Cast($4 as varchar) = Cast('Summer' as varchar)
  THEN CASE
          WHEN Cast(date_part('year', current_date) || '-06-15' as Date) <= current_date
          THEN Cast(date_part('year', current_date)+1 || '-06-15' as Date)
          ELSE Cast(date_part('year', current_date) || '-06-15' as Date)
        END
  WHEN Cast($4 as varchar) = Cast('Fall' as varchar)
  THEN CASE
          WHEN Cast(date_part('year', current_date) || '-09-15' as Date) <= current_date
          THEN Cast(date_part('year', current_date)+1 || '-09-15' as Date)
          ELSE Cast(date_part('year', current_date) || '-09-15' as Date)
        END
  WHEN Cast($4 as varchar) = Cast('Winter' as varchar)
  THEN CASE
          WHEN Cast(date_part('year', current_date) || '-12-15' as Date) <= current_date
          THEN Cast(date_part('year', current_date)+1 || '-12-15' as Date)
          ELSE Cast(date_part('year', current_date) || '-12-15' as Date)
        END
  ELSE current_date + cast($2 as int) * INTERVAL '1 day'
END
,current_date --last_date
,false --one_time
,false --inactive
