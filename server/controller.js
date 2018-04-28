module.exports = {

    getUser: (req, res, next) => {
        req.app.get('db').get_user([req.params.id]).then( user => {
            res.status(200).send(user[0])
        })
    },

    getUserInfo: (req, res, next) => {
        if(req.user){
            const db      = req.app.get('db'),
                  userMes = req.user.curr_mes_id
            if(userMes){
                db.get_mes_by_id([userMes]).then(currMes => {
                    let userObj = {
                        dBUser: req.user,
                        currMes: currMes[0]
                    }
                    res.status(200).send(userObj)
                })
            } else{
                res.status(200).send(req.user)
            }
        } else{
            res.status(404).send({message: 'Not Logged In'})
        }
    },
    
    getMeasurements: (req, res, next) => {
        const db = req.app.get('db')
        if(req.params.id) {
            db.get_mes_by_id([req.params.id]).then( measurements => {
                res.status(200).send(measurements[0])
            })
        } else{
            res.status(404).send({message: 'Measurements do not exist'})
        }
    },
    
    getLatestMes: (req, res, next) => {
        req.app.get('db').get_latest_mes([req.params.id]).then( measurements => {
            res.status(200).send(measurements[0])
        })
    },

    searchFoods: (req, res, next) => {
        req.app.get('db').get_food_by_query([req.query.name]).then(foods => {
            res.status(200).send(foods)
        })
    },

    searchMeals: (req, res, next) => {
        req.app.get('db').get_meals_by_title([req.query.title]).then(meals => {
            res.status(200).send(meals)
        })
    },
    
    searchMenus: (req, res, next) => {
        req.app.get('db').get_menus_by_title([req.query.title]).then(menus => {
            res.status(200).send(menus)
        })
    },
    
    getFood: (req, res, next) => {
        req.app.get('db').get_food_by_id([req.params.id]).then(food => {
            res.status(200).send(food[0])
        })
    },
    
    getMealById: (req, res, next) => {
        const db = req.app.get('db')
        db.get_meal_by_id([req.params.id]).then(meal => {
            db.get_foods_by_meal_id([meal[0].meal_id]).then(foods => {
                let retObj = {
                    foods,
                    meal: meal[0]
                }
                res.status(200).send(retObj)
            })
        })
    },

    getMenuById: (req, res, next) => {
        const db = req.app.get('db')
        db.get_menu_by_id([req.params.id]).then(menu => {
            db.get_meals_by_menu_id([menu[0].menu_id]).then(meals => {
                let retObj = {
                    meals,
                    menu: menu[0]
                }
                res.status(200).send(retObj)
            })
        })
    },

    addFoodToMeal: (req, res, next) => {
        const db = req.app.get('db')
        const { meal_id, food_id, pro, carb, fat, fiber, total_p, total_c, total_f, total_fib, quantity } = req.body
        db.add_food_to_meal([meal_id, food_id, quantity, (pro*quantity + total_p), (carb*quantity + total_c), (fat*quantity + total_f), (fiber*quantity + total_fib)]).then(newMeal => {
            db.get_foods_by_meal_id([meal_id]).then(foods => {
                let retObj = {
                    foods,
                    newMeal: newMeal[0]
                }
                res.status(200).send(retObj)
            })
        })
    },
    
    addMealToMenu: (req, res, next) => {
        const db = req.app.get('db')
        const { menu_id, meal_id, p, c, f, fib } = req.body
        db.add_meal_to_menu([menu_id, meal_id, p, c, f, fib]).then(newMenu => {
            db.get_meals_by_menu_id([menu_id]).then(meals => {
                let retObj = {
                    meals,
                    newMenu: newMenu[0]
                }
                res.status(200).send(retObj)
            })
        })
    },
    
    updateFoodQuantity: (req, res, next) => {
        const db = req.app.get('db')
        const { meal_id, food_id, quantity, dif, p, c, f, fib } = req.body
        db.update_food_quantity([meal_id, food_id, quantity, (dif*p), (dif*c), (dif*f), (dif*fib)]).then(newMeal => {
            db.get_foods_by_meal_id([meal_id]).then(foods => {
                    let retObj = {
                        foods,
                        newMeal: newMeal[0]
                    }
                res.status(200).send(retObj)
            })
        })
    },
//////////// Can add an optional button on front end to ask if user want to change food in the database to affect it's use everywhere else or just create a new food with the updated data
//////////// Drill Weekend kind of thing
    editFood: (req, res, next) => {
        const db = req.app.get('db')
        const { food_id, name, p, c, f, fib, img } = req.body
        db.get_food_by_id([food_id]).then(food => {
            if(req.user.user_id == food[0].author_id){
                db.edit_food([food_id, name, p, c, f, fib, img]).then(newFood => {
                    res.status(200).send(newFood[0])
                })
            } else {
                res.status(403).send({message: 'You are not the creator of that food and therefore do not have permission to change it. Feel free to create another version of this food if you find the information to be incorrect.'})
            }
        })
    },
    
    editMenu: (req, res, next) => {
        const db = req.app.get('db')
        const { menu_id, title, img } = req.body
        db.get_menu_by_id([menu_id]).then(menu => {
            if(req.user.user_id == menu[0].author_id){
                db.edit_menu([menu_id, title, img]).then(newMenu => {
                    res.status(200).send(newMenu[0])
                })
            } else {
                res.status(403).send({message: 'You are not the creator of that menu and therefore do not have permission to change it. Feel free to create another version of this menu if you wish to make changes to it.'})
            }
        })
    },
    
    removeFoodFromMeal: (req, res, next) => {
        const db = req.app.get('db')
        const { meal_id, food_id, p, c, f, fib, quantity, meal_food_id } = req.body
        let q = quantity/1
        db.remove_food_from_meal([meal_food_id, meal_id, (q*(p/1)), (q*(c/1)), (q*(f/1)), (q*(fib/1))]).then(newMeal => {
            db.get_foods_by_meal_id([meal_id]).then(foods => {
                let retObj = {
                    foods,
                    newMeal: newMeal[0]
                }
                res.status(200).send(retObj)
            })
        })
    },
    
    removeMealFromMenu: (req, res, next) => {
        const db = req.app.get('db')
        const { menu_meals_id, menu_id, p, c, f, fib } = req.body
        db.remove_meal_from_menu([menu_meals_id, menu_id, p, c, f, fib]).then(newMenu => {
            db.get_meals_by_menu_id([menu_id]).then(meals => {
                let retObj = {
                    meals,
                    newMenu: newMenu[0]
                }
                res.status(200).send(retObj)
            })
        })
    },
    
    createExercise: (req, res, next) => {
        const { name, type, muscle, img, video } = req.body
        req.app.get('db').create_exercise([name, type, muscle, req.user.user_id, img, video]).then( exercise => {
            res.status(200).send(exercise)
        }) 
    },
    
    getExerciseById: (req, res, next) => {
        const { id } = req.params
        req.app.get('db').get_exercise_by_id([id]).then( exercise => {
            res.status(200).send(exercise[0])
        }) 
    },
    
    editExercise: (req, res, next) => {
        const db = req.app.get('db')
        const { id, name, type, muscle, video, img } = req.body
        db.get_exercise_by_id([id]).then(ex => {
            if(req.user.user_id == ex[0].author_id){
                db.edit_exercise([id, name, type, muscle, video, img]).then(newEx => {
                    res.status(200).send({message: 'Exercise successfully updated!'})
                })
            } else {
                res.status(403).send({message: 'You are not the creator of that exercise and therefore do not have permission to change it. Feel free to create another version of this exercise if you find the information to be incorrect.'})
            }
        })
    },
// createWorkout: (req, res, next) => {
    //     const { name, type, img, video_url } = req.body
    //     req.app.get('db').create_workout([name, type, req.user.user_id, img, video_url]).then( workout => {
        //         res.status(200).send(workout)
        //     }) 
        // },
        
    createFood: (req, res, next) => {
            const { name, p, c, f, fib, img } = req.body
            req.app.get('db').create_food([name, req.user.user_id, p, c, f, fib, img]).then( food => {
                    res.status(200).send(food[0])
                }) 
            },
            
    createMeal: (req, res, next) => {
            const { title, img } = req.body
            req.app.get('db').create_meal([title, req.user.user_id, img]).then( meal => {
                    res.status(200).send(meal[0])
                }) 
            },

    createMenu: (req, res, next) => {
            const { title, img } = req.body
            req.app.get('db').create_menu([title, req.user.user_id, img]).then( menu => {
                    res.status(200).send(menu[0])
                }) 
            },
                                
    newMacroCalc: (req, res, next) => {
        const { protein, carbs, fat } = req.body
        let x     = new Date(),
        tDate = `${x.getMonth()}-${x.getDate()}-${x.getFullYear()}`
        
        req.app.get('db').add_macro_calc([ protein, carbs, fat, tDate, req.user.user_id ]).then( macros => {
            res.status(200).send(macros[0])
        }) 
    },
        
    updateStats: (req, res, next) => {
        const db = req.app.get('db')
        const { p, c, f, ht, wt, bf, waist, chest, neck } = req.body
        let x     = new Date(),
            tDate = `${x.getMonth()}-${x.getDate()}-${x.getFullYear()}`
        db.add_measurements([waist, neck, chest, ht, wt, bf, tDate, req.user.user_id]).then( mes => {
            let newMez = mes[0]
            db.update_stats([p, c, f, newMez.mes_id, req.user.user_id]).then( upUser => {
                let user = upUser[0],
                    retObj = { user, newMez }
                res.status(200).send(retObj)
            })
        })
    },
    
    addMez: (req, res, next) => {
        let x     = new Date(),
        tDate = `${x.getMonth()}-${x.getDate()}-${x.getFullYear()}`
        const { waist, neck, chest, ht, wt, bf } = req.body
        req.app.get('db').add_measurements([ waist, neck, chest, ht, wt, bf, tDate, req.user.user_id ]).then( measurements => {
            res.status(200).send(measurements[0])
        })
    },
        
    sendUserObjs: (req, res, next) => {
        let retObj = {
            sessionUser: req.session.passport.user, // Serialize puts the second param for done function on this property
            dBUser: req.user // Deserialize puts the second param for done function on this property
        }
        res.status(200).send(retObj)
    }
}