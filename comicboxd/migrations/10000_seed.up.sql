INSERT INTO "book" ("series", "file", "title", "volume", "pages")
    VALUES ("Berserk", "/path/to/file", "The Black Swordman", 1, "[]");

INSERT INTO "book" ("series", "file", "title", "volume", "pages")
    VALUES ("Berserk", "/path/to/file2", "Lost Children", 2, "[]");

INSERT INTO "user" ("name", "username", "password")
    VALUES ("Adam Bibby", "adam", "$2a$14$BQWy8npu3hZsl5uF56hI3OJsLbK6VlbEPWPBuENeZhLIbxni1kicG");

INSERT INTO "user_book" ("user_id", "book_id", "current_page", "rating")
    VALUES (1, 1, 10, 9.5);