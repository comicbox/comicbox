create table book (
    id                integer primary key autoincrement,
    created_at        timestamp default current_timestamp NOT NULL,
    updated_at        timestamp default current_timestamp NOT NULL,
    series            text default "" NOT NULL,
    summary           text default "" NOT NULL,
    story_arc         text default "" NOT NULL,
    authors           text default "" NOT NULL,
    web               text default "" NOT NULL,
    genres            text default "" NOT NULL,
    alternate_series  text default "" NOT NULL,
    reading_direction text default "" NOT NULL,
    type              text default "" NOT NULL,
    file              text NOT NULL,
    title             text default "" NOT NULL,
    volume            integer,
    community_rating  real,
    chapter           real,
    date_released     timestamp,
    pages             text NOT NULL
);

create table user (
    id         integer primary key autoincrement,
    created_at timestamp default current_timestamp NOT NULL,
    updated_at timestamp default current_timestamp NOT NULL,
    name       text NOT NULL,
    username   text NOT NULL,
    password   text NOT NULL
);

create table user_book (
    user_id        integer not null,
    book_id        integer not null,
    current_page   integer not null default 0,
    last_page_read integer not null default 0,
    rating         real,
    PRIMARY KEY (user_id, book_id)
);

CREATE TRIGGER book_update
    AFTER UPDATE
    ON book
    FOR EACH ROW
BEGIN
    UPDATE book SET updated_at = CURRENT_TIMESTAMP WHERE id = old.id;
END;

CREATE TRIGGER user_update
    AFTER UPDATE
    ON user
    FOR EACH ROW
BEGIN
    UPDATE user SET updated_at = CURRENT_TIMESTAMP WHERE id = old.id;
END;

CREATE TRIGGER user_book_update
    AFTER UPDATE
    ON user_book
BEGIN
    UPDATE 
        user_book
    SET 
        last_page_read = current_page 
    WHERE  
        last_page_read < current_page;
END;

CREATE TRIGGER user_book_insert
    AFTER INSERT
    ON user_book
BEGIN
    UPDATE 
        user_book
    SET 
        last_page_read = current_page 
    WHERE  
        last_page_read < current_page;
END;
