SELECT waist, neck, chest, weight, bf, date_taken, happy_level FROM measurements
WHERE member_id = $1;