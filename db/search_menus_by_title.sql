-- WHERE title LIKE ('%'||$1||'%')
SELECT * FROM menus
WHERE title ~* $1