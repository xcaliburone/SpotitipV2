-- search user

-- search artist

-- search song

-- search album

-- search playlist

-- search user follow artist

-- search user playlist create

-- search user playlist follow

-- search user song liked

-- search song playlist contains

-- search song album contains

-- search song artist sing

-- search album artist has

SELECT * FROM user;
SELECT name, email, password FROM user;

SELECT title, genre, listeners FROM song WHERE listeners < 100000 LIMIT 20;


select * from user join user_artist_follow