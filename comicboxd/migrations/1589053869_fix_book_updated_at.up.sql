ALTER TABLE user_book ADD updated_at TIMESTAMP;

DROP VIEW IF EXISTS book_user_book;
create view book_user_book as 
select
	book.id,
    user.id as user_id, 
    book.id as book_id, 
	book.created_at, 
    case when user_book.updated_at is null || book.updated_at > user_book.updated_at then book.updated_at else user_book.updated_at end as updated_at,
	book.series,
	book.summary,
	book.story_arc,
	book.authors,
	book.web,
	book.genres,
	book.alternate_series,
	book.reading_direction,
	book.type,
	book.file,
	book.title,
	book.volume,
	book.community_rating,
	book.chapter,
	book.date_released,
	book.pages,
	book.page_count,
    current_page, 
    last_page_read, 
    rating,
    case when page_count <= current_page + 1 then 1 else 0 end read,
	book.series || '-' || substr('0000000000'||case when book.volume is null then '9999999999' else book.volume end, -10, 10) ||'-'|| substr('0000000000'||case when book.chapter is null then '' else cast(book.chapter*1000 as int) end, -10, 10) || '-' || book.title as sort 
from
    "book" join "user" left join "user_book" on user_id=user.id and book_id=book.id;