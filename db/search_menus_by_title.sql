SELECT * FROM menus
WHERE title LIKE ('%'||$1||'%')