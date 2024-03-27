SELECT * FROM user;
SELECT name, email, password FROM user;

SELECT title, genre, listeners FROM song WHERE listeners < 100000 LIMIT 20;