SELECT waist, neck, chest, weight, bf, date_taken FROM measurements
WHERE member_id = $1;