INSERT INTO "book" ("id", "series", "file", "title", "volume", "pages", "page_count")
    VALUES ("7fd9ee43-ad22-499e-81f8-feaa26844ae3", "Berserk", "/path/to/file", "The Black Swordman", 1, "[]", 10);

INSERT INTO "book" ("id", "series", "file", "title", "volume", "pages", "page_count")
    VALUES ("cb58f0e6-353d-43c1-9862-59fe43a572ce", "Berserk", "/path/to/file2", "Lost Children", 2, "[]", 2);

INSERT INTO "book" ("id", "series", "file", "title", "volume", "pages", "page_count")
    VALUES ("a64b8fe6-a849-49ba-8806-7f223c8953c8", "Hunter x Hunter", "/path/to/file3", "Greed Island", 35, "[]", 100);

INSERT INTO "book" ("id", "series", "file", "title", "chapter", "authors", "community_rating", "page_count", "pages")
    VALUES (
        "9080f5af-3358-4000-9747-ef1257e00f8c", 
        'Hunter x Hunter', 
        '/mnt/comics/Hunter x Hunter/Hunter x Hunter #376.cbz',
        'Determination', 
        376,
        '["Yoshihiro Togashi"]',
        8.691,
        24, 
        '[{"file_number":0,"type":"FrontCover","url":"/book/06d8623f-b1ae-4176-b5a1-13fcddbf9e83/page/0"},{"file_number":1,"type":"Deleted","url":"/book/06d8623f-b1ae-4176-b5a1-13fcddbf9e83/page/1"},{"file_number":2,"type":"Deleted","url":"/book/06d8623f-b1ae-4176-b5a1-13fcddbf9e83/page/2"},{"file_number":3,"type":"Story","url":"/book/06d8623f-b1ae-4176-b5a1-13fcddbf9e83/page/3"},{"file_number":4,"type":"Story","url":"/book/06d8623f-b1ae-4176-b5a1-13fcddbf9e83/page/4"},{"file_number":5,"type":"Story","url":"/book/06d8623f-b1ae-4176-b5a1-13fcddbf9e83/page/5"},{"file_number":6,"type":"Story","url":"/book/06d8623f-b1ae-4176-b5a1-13fcddbf9e83/page/6"},{"file_number":7,"type":"Story","url":"/book/06d8623f-b1ae-4176-b5a1-13fcddbf9e83/page/7"},{"file_number":8,"type":"Story","url":"/book/06d8623f-b1ae-4176-b5a1-13fcddbf9e83/page/8"},{"file_number":9,"type":"Story","url":"/book/06d8623f-b1ae-4176-b5a1-13fcddbf9e83/page/9"},{"file_number":10,"type":"Story","url":"/book/06d8623f-b1ae-4176-b5a1-13fcddbf9e83/page/10"},{"file_number":11,"type":"Story","url":"/book/06d8623f-b1ae-4176-b5a1-13fcddbf9e83/page/11"},{"file_number":12,"type":"Story","url":"/book/06d8623f-b1ae-4176-b5a1-13fcddbf9e83/page/12"},{"file_number":13,"type":"Story","url":"/book/06d8623f-b1ae-4176-b5a1-13fcddbf9e83/page/13"},{"file_number":14,"type":"Story","url":"/book/06d8623f-b1ae-4176-b5a1-13fcddbf9e83/page/14"},{"file_number":15,"type":"Story","url":"/book/06d8623f-b1ae-4176-b5a1-13fcddbf9e83/page/15"},{"file_number":16,"type":"Story","url":"/book/06d8623f-b1ae-4176-b5a1-13fcddbf9e83/page/16"},{"file_number":17,"type":"Story","url":"/book/06d8623f-b1ae-4176-b5a1-13fcddbf9e83/page/17"},{"file_number":18,"type":"Story","url":"/book/06d8623f-b1ae-4176-b5a1-13fcddbf9e83/page/18"},{"file_number":19,"type":"Story","url":"/book/06d8623f-b1ae-4176-b5a1-13fcddbf9e83/page/19"},{"file_number":20,"type":"Story","url":"/book/06d8623f-b1ae-4176-b5a1-13fcddbf9e83/page/20"},{"file_number":21,"type":"Story","url":"/book/06d8623f-b1ae-4176-b5a1-13fcddbf9e83/page/21"},{"file_number":22,"type":"Story","url":"/book/06d8623f-b1ae-4176-b5a1-13fcddbf9e83/page/22"},{"file_number":23,"type":"Story","url":"/book/06d8623f-b1ae-4176-b5a1-13fcddbf9e83/page/23"}]'
    );


INSERT INTO "user" ("id", "name", "username", "password")
    VALUES ("cdda04ea-08c3-45f6-b7cf-25fd564e509d", "Adam Bibby", "adam", "$2a$14$BQWy8npu3hZsl5uF56hI3OJsLbK6VlbEPWPBuENeZhLIbxni1kicG");

INSERT INTO "user" ("id", "name", "username", "password")
    VALUES ("cdaf42ba-4ad1-4909-93ee-37e369295f68", "Emerson", "emer", "$2a$14$BQWy8npu3hZsl5uF56hI3OJsLbK6VlbEPWPBuENeZhLIbxni1kicG");

INSERT INTO "user_book" ("user_id", "book_id", "current_page", "rating")
    VALUES ("cdda04ea-08c3-45f6-b7cf-25fd564e509d", "7fd9ee43-ad22-499e-81f8-feaa26844ae3", 10, 9.5);

INSERT INTO "user_book" ("user_id", "book_id", "current_page", "rating")
    VALUES ("cdaf42ba-4ad1-4909-93ee-37e369295f68", "cb58f0e6-353d-43c1-9862-59fe43a572ce", 10, 9.5);