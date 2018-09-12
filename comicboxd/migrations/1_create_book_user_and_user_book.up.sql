create table book (
    id                integer primary key autoincrement,
    created_at        timestamp default current_timestamp not null,
    updated_at        timestamp default current_timestamp not null,
    series            text default "" not null,
    summary           text default "" not null,
    story_arc         text default "" not null,
    authors           text default "" not null,
    web               text default "" not null,
    genres            text default "" not null,
    alternate_series  text default "" not null,
    reading_direction text default "" not null,
    type              text default "" not null,
    file              text not null,
    title             text default "" not null,
    volume            integer,
    community_rating  real,
    chapter           real,
    date_released     timestamp,
    pages             text not null,
    page_count        integer not null
);

create table user (
    id         integer primary key autoincrement,
    created_at timestamp default current_timestamp not null,
    updated_at timestamp default current_timestamp not null,
    name       text not null,
    username   text not null unique,
    password   text not null
);

create table user_book (
    user_id        integer not null,
    book_id        integer not null,
    current_page   integer not null default 0,
    last_page_read integer not null default 0,
    rating         real,
    primary key (user_id, book_id)
);

/* keeps the updated at columns up to date */
create trigger book_update
    after update
    on book
    for each row
begin
    update book set updated_at = current_timestamp where id = old.id;
end;

create trigger user_update
    after update
    on user
    for each row
begin
    update user set updated_at = current_timestamp where id = old.id;
end;

/* makes sure that the last page read is allways equal or grater than the current page */
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


create view book_user_book as 
select 
    book.*, 
    user.id as user_id, 
    book.id as book_id, 
    current_page, 
    last_page_read, 
    rating,
    case when page_count >= current_page then 1 else 0 end read 
from
     "book" join "user" left join "user_book" on user_id=user.id and book_id=book.id;

-- you need this so it can query when no user is logged in
INSERT INTO "user" ("id", "name", "username", "password")
    VALUES (0, "Guest", "guest", "");


create view series as
SELECT series as name, count(series) as total, sum(read) as read, user_id FROM "book_user_book" group by series, user_id;