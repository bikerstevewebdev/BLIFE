UPDATE users SET has_paid = true, btransid = $2
WHERE user_id = $1
returning *;