INSERT INTO "book" ("series", "file", "title", "volume", "pages", "page_count")
    VALUES ("Berserk", "/path/to/file", "The Black Swordman", 1, "[]", 10);

INSERT INTO "book" ("series", "file", "title", "volume", "pages", "page_count")
    VALUES ("Berserk", "/path/to/file2", "Lost Children", 2, "[]", 2);

INSERT INTO "book" ("series", "file", "title", "volume", "pages", "page_count")
    VALUES ("Hunter x Hunter", "/path/to/file3", "Greed Island", 35, "[]", 100);

INSERT INTO "user" ("name", "username", "password")
    VALUES ("Adam Bibby", "adam", "$2a$14$BQWy8npu3hZsl5uF56hI3OJsLbK6VlbEPWPBuENeZhLIbxni1kicG");

INSERT INTO "user" ("name", "username", "password")
    VALUES ("Emerson", "emer", "$2a$14$BQWy8npu3hZsl5uF56hI3OJsLbK6VlbEPWPBuENeZhLIbxni1kicG");

INSERT INTO "user_book" ("user_id", "book_id", "current_page", "rating")
    VALUES (1, 1, 10, 9.5);

INSERT INTO "user_book" ("user_id", "book_id", "current_page", "rating")
    VALUES (2, 1, 10, 9.5);