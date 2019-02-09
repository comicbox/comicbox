DROP TRIGGER if EXISTS user_book_update;

create trigger user_book_update
    after update
    on user_book
    for each row
begin
    update 
        user_book
    set 
        current_page = min(current_page, (select page_count from book where id = user_book.book_id)),
        last_page_read = min(max(last_page_read, current_page), (select page_count from book where id = user_book.book_id))
    where  
        user_book.book_id = new.book_id and
        user_book.user_id = new.user_id;
end;

DROP TRIGGER if EXISTS user_book_insert;

create trigger user_book_insert
    after insert
    on user_book
    for each row
begin
    update 
        user_book
    set 
        current_page = min(current_page, (select page_count from book where id = user_book.book_id)),
        last_page_read = min(max(last_page_read, current_page), (select page_count from book where id = user_book.book_id))
    where  
        user_book.book_id = new.book_id and
        user_book.user_id = new.user_id;
end;