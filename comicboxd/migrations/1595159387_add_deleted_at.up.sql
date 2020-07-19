ALTER TABLE book ADD deleted_at TIMESTAMP;

DROP VIEW IF EXISTS book_user_book;
create view book_user_book as
select
	book.id,
	book.created_at,
	book.updated_at,
	book.deleted_at,
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

    user.id as user_id,
    book.id as book_id,
    current_page, 
    last_page_read, 
    rating,
    case when page_count <= current_page + 1 then 1 else 0 end as read,
	book.series || '-' || substr('0000000000'||case when book.volume is null then '9999999999' else book.volume end, -10, 10) ||'-'|| substr('0000000000'||case when book.chapter is null then '' else cast(book.chapter*1000 as int) end, -10, 10) || '-' || book.title as sort,
    case when "user_book"."change" is null or "book"."change" > "user_book"."change" then "book"."change" else "user_book"."change" end as "change"
from
     "book" join "user" left join "user_book" on user_id=user.id and book_id=book.id;