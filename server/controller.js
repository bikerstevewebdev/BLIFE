module.exports = {
    
    // getUser: (req, res, next) => {
    //     req.app.get('db').get_user([req.params.id]).then( user => {
    //         console.log('Getting user')
    //         res.status(200).send(user[0])
    //     })
    // },
    getUser: (req, res, next) => {
            res.status(200).send(req.user)
    },
    
    getUserMenus: (req, res, next) => {
        const db = req.app.get('db')
        db.get_current_menus_by_user_id([req.user.user_id]).then(menus => {
            res.status(200).send(menus)
        })
    },
    
    getUserWorkouts: (req, res, next) => {
        const db = req.app.get('db')
        db.get_current_workouts_by_user_id([req.user.user_id]).then(workouts => {
            res.status(200).send(workouts)
        })
    },
    
    getUserInfo: (req, res, next) => {
        if(req.user){
            const db      = req.app.get('db'),
                  userMes = req.user.curr_mes_id
            if(userMes){
                console.log('Preparing user object')
                db.get_mes_by_id([userMes]).then(currMes => {
                    let userObj = {
                        dBUser: req.user,
                        currMes: currMes[0]
                    }
                    console.log('Sending user object')        
                    res.status(200).send(userObj)
                })
            } else{
                res.status(200).send(req.user)
            }
        } else{
            res.status(404).send({message: 'Not Logged In'})
        }
    },

    getAdminInfo: (req, res, next) => {
        const db      = req.app.get('db')
            , { auth_id } = req.user
        db.check_admin_status([auth_id]).then(adminTruth => {
            if(adminTruth[0]){
                db.get_pending_coach_requests().then(coachReqs => {
                    db.get_acive_coaches().then(activeCoaches => {
                        let retObj = {
                            activeCoaches,
                            coachReqs
                        }
                        res.status(200).send(retObj)
                    })
                })
            } else {
                res.status(401).send({message: "You are not authorized to access that information."})
            }
        })
    },
    
    requestCoachAccess: (req, res, next) => {
        if(req.user.coach_id != -1){
            const db = req.app.get('db')
                , { user_id } = req.user
            db.request_coach_access([user_id]).then(user => {
                res.status(200).send(user[0])
            })
        }
    },
    
    
    updateUsername: (req, res, next) => {
        const db = req.app.get('db')
        , { username } = req.body
        db.update_username([req.user.user_id, username]).then( user => {
            res.status(200).send(user[0])
        })
    },
    
    updateFullname: (req, res, next) => {
        const db = req.app.get('db')
        , { fullname } = req.body
        db.update_fullname([req.user.user_id, fullname]).then( user => {
            res.status(200).send(user[0])
        })
    },
    
    updateProfilePic: (req, res, next) => {
        const db = req.app.get('db')
        , { profile_pic } = req.body
        db.update_profile_pic([req.user.user_id, profile_pic]).then( user => {
            res.status(200).send(user[0])
        })
    },
    ///////////////////MES/STATS METHODS////////////////
    addMez: (req, res, next) => {
        let x     = new Date(),
        tDate = `${x.getMonth()}-${x.getDate()}-${x.getFullYear()}`
        const { waist, neck, chest, ht, wt, bf } = req.body,
        db                                 = req.app.get('db')
        db.add_measurements([ waist, neck, chest, ht, wt, bf, tDate, req.user.user_id ]).then( measurements => {
            db.update_mes_id([req.user.user_id, measurements[0].mes_id]).then(user => {
                let retObj = {
                    newMez: measurements[0],
                    user: user[0]
                }
                res.status(200).send(retObj)
            })
        })
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
////////////////////MACRO METHODS////////////////////////
    newMacroCalc: (req, res, next) => {
        const { protein, carbs, fat } = req.body
        let x     = new Date(),
        tDate = `${x.getMonth()}-${x.getDate()}-${x.getFullYear()}`
        
        req.app.get('db').add_macro_calc([ protein, carbs, fat, tDate, req.user.user_id ]).then( macros => {
            res.status(200).send(macros[0])
        }) 
    },
//////////////////////FOOD METHODS//////////////////////
    createFood: (req, res, next) => {
            const { name, p, c, f, fib, img } = req.body
            req.app.get('db').create_food([name, req.user.user_id, p, c, f, fib, img]).then( food => {
                    res.status(200).send(food[0])
                }) 
    },

    getFood: (req, res, next) => {
        req.app.get('db').get_food_by_id([req.params.id]).then(food => {
            res.status(200).send(food[0])
        })
    },
            
    searchFoods: (req, res, next) => {
        req.app.get('db').search_foods_by_name([req.query.name]).then(foods => {
            res.status(200).send(foods)
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



        
    createMeal: (req, res, next) => {
            const { title, img } = req.body
            req.app.get('db').create_meal([title, req.user.user_id, img]).then( meal => {
                    res.status(200).send(meal[0])
                }) 
    },



    searchMeals: (req, res, next) => {
        req.app.get('db').search_meals_by_title([req.query.title]).then(meals => {
            res.status(200).send(meals)
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

    createMenu: (req, res, next) => {
        const { title, img } = req.body
        req.app.get('db').create_menu([title, req.user.user_id, img]).then( menu => {
                res.status(200).send(menu[0])
            }) 
        },
    

    searchMenus: (req, res, next) => {
        req.app.get('db').search_menus_by_title([req.query.title]).then(menus => {
            res.status(200).send(menus)
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
    
    //////////////////////////////////////////////////////
    /////////////////////Fitness//////////////////////////
    //////////////////////////////////////////////////////
    
    
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
    
    searchExercises: (req, res, next) => {
        console.log('query name: ', req.query.name)
        req.app.get('db').search_exercises_by_name([req.query.name]).then(exercises => {
            res.status(200).send(exercises)
        }) 
    },
    
    createWorkout: (req, res, next) => {
        const { title, type, img } = req.body
        req.app.get('db').create_workout([title, req.user.user_id, type, img]).then(workout => {
            res.status(200).send(workout[0])
        }) 
    },
    
    getWorkoutById: (req, res, next) => {
        const { id } = req.params,
              db     = req.app.get('db')
        db.get_workout_by_id([id]).then( workout => {
            db.get_workout_exercises([id]).then(exercises => {
                let retObj = {
                    exercises,
                    workout: workout[0]
                }
                res.status(200).send(retObj)
            })
        }) 
    },

    searchWorkouts: (req, res, next) => {
        console.log('query: ',req.query.title)
        req.app.get('db').search_workouts_by_title([req.query.title]).then(workouts => {
            res.status(200).send(workouts)
        }) 
    },
    
    addExerciseToWorkout: (req, res, next) => {
        const db = req.app.get('db')
        const { workout_id, ex_id, ex_order } = req.body
        db.add_ex_to_workout([workout_id, ex_id, ex_order]).then(exercises => {
            res.status(200).send(exercises)
        })
    },
        
    updateWorkoutEx: (req, res, next) => {
        const db = req.app.get('db')
        const { workout_ex_id, workout_id, reps, sets, restTime, weight, order, notes } = req.body
        db.edit_workout_ex([workout_ex_id, workout_id, reps, sets, restTime, weight, order, notes]).then(exercises => {
            res.status(200).send(exercises)
        })
    },
        
        
    removeExFromWorkout: (req, res, next) => {
        const db = req.app.get('db')
        const { id } = req.params
        const { workout_id } = req.body
        db.remove_ex_from_workout([id, workout_id]).then(exs => {
            exs.forEach(v => {
                let newOrder = v.order - 1 > 0 ? v.order - 1 : 1
                db.update_workout_ex_order([v.workout_ex_id, newOrder])
                // MIGHT NEED TO ADD NEXT/ASYNC CODE TO HANDLE THIS DATA
            })
            db.get_workout_exercises([workout_id]).then(exercises => {
                res.status(200).send(exercises)
            })
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