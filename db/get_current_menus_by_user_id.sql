SELECT um.user_menu_id, m.* FROM user_menu um
JOIN menus m ON m.menu_id = um.menu_id
WHERE um.user_id = $1 AND um.current = true