CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(25) NOT NULL,
    fullname TEXT NOT NULL,
    profile_pic TEXT,
    date-created DATE NOT NULL,
    curr_pro INTEGER,
    curr_carb INTEGER,
    curr_fat INTEGER,
    curr_mes_id references measurements(mes_id)
);
CREATE TABLE meals (
    meal_id SERIAL PRIMARY KEY,
    title VARCHAR(25) NOT NULL,
    author_id references users(user_id),
    total_p INTEGER NOT NULL,
    total_c INTEGER NOT NULL,
    total_f INTEGER NOT NULL,
    total_fib INTEGER,
    ingredients text
);
CREATE TABLE foods (
    food_id SERIAL PRIMARY KEY,
    name VARCHAR(25) NOT NULL,
    author_id references users(user_id),
    pro INTEGER NOT NULL,
    carb INTEGER NOT NULL,
    fat INTEGER NOT NULL,
    fiber INTEGER
);
CREATE TABLE workouts (
    workout_id SERIAL PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    author_id references users(user_id),
    exercises TEXT,
    date_created DATE
);
CREATE TABLE exercises (
    ex_id SERIAL PRIMARY KEY,
    name VARCHAR(60) NOT NULL,
    type VARCHAR(25) NOT NULL,
    author_id references users(user_id),
    img TEXT
);
CREATE TABLE measurements (
    mes_id SERIAL PRIMARY KEY,
    waist INTEGER,
    neck INTEGER,
    chest INTEGER,
    height INTEGER,
    weight INTEGER,
    bf INTEGER,
    date_taken DATE,
    member_id references users(user_id)
);
CREATE TABLE macro_calcs (
    macro_id SERIAL PRIMARY KEY,
    p INTEGER,
    c INTEGER,
    f INTEGER,
    date_calced DATE,
    member_id references users(user_id)
);
CREATE TABLE progress_pics (
    pic_id SERIAL PRIMARY KEY,
    url TEXT,
    member_id references users(user_id)    
);
CREATE TABLE day_menus (
    menu_id SERIAL PRIMARY KEY,
    meals references meals(meal_id),
    author_id references users(user_id)    
);


