
DROP TRIGGER if EXISTS user_book_update;

create trigger user_book_update
    after update
    on user_book
    for each row
begin
    update 
        user_book
    set 
        last_page_read = current_page 
    where  
        book_id = old.book_id and
        user_id = old.user_id and
        last_page_read < current_page;
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
        last_page_read = current_page 
    where  
        book_id = new.book_id and
        user_id = new.user_id and
        last_page_read < current_page;
end;