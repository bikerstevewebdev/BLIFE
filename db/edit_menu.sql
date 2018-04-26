UPDATE menus SET title = $2, img = $3
WHERE menu_id = $1
returning *