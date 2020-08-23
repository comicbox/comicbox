CREATE VIEW series as
select 
    s.*, 
    user_series.list,
    user_series.tags,
    case when "user_series"."change" is not null then "user_series"."change" else 0 end as "change"
from 
    (
        SELECT 
            series as name, 
            count(series) as total, 
            sum(read) as read, 
            user_id
        FROM 
            "book_user_book" group by series, user_id
    ) as s left join user_series on name=series and user_series.user_id=s.user_id;
