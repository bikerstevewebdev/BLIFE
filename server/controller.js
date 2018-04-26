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
                // db
                //     db
                //         db
                //         res.send()
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
    
    getFood: (req, res, next) => {
        req.app.get('db').get_food_by_id([req.params.id]).then(food => {
            res.status(200).send(food[0])
        })
    },
    
    getMealById: (req, res, next) => {
        req.app.get('db').get_meal_by_id([req.params.id]).then(meal => {
            res.status(200).send(meal[0])
        })
    },

    addFoodToMeal: (req, res, next) => {
        const db = req.app.get('db')
        const { meal_id, food_id, pro, carb, fat, fiber, total_p, total_c, total_f, total_fib } = req.body
        db.add_food_to_meal([meal_id, food_id, (pro + total_p), (carb + total_c), (fat + total_f), (fiber + total_fib)]).then(newMeal => {
            db.get_foods_by_meal_id(newMeal[0].meal_id).then(foods => {
                let retObj = {
                    foods,
                    newMeal: newMeal[0]
                }
                res.status(200).send(retObj)
            })
        })
    },
    
// createExercise: (req, res, next) => {
//     const { name, type, img, video_url } = req.body
//     req.app.get('db').create_exercise([name, type, req.user.auth_id, img, video_url]).then( exercise => {
    //         res.status(200).send(exercise)
//     }) 
// },

// createWorkout: (req, res, next) => {
    //     const { name, type, img, video_url } = req.body
    //     req.app.get('db').create_workout([name, type, req.user.auth_id, img, video_url]).then( workout => {
        //         res.status(200).send(workout)
        //     }) 
        // },
        
createFood: (req, res, next) => {
        const { name, p, c, f, fib, img } = req.body
        req.app.get('db').create_food([name, req.user.user_id, p, c, f, fib, img]).then( food => {
                res.status(200).send(food)
            }) 
        },
        
createMeal: (req, res, next) => {
        const { title, img } = req.body
        req.app.get('db').create_meal([title, req.user.user_id, img]).then( meal => {
                res.status(200).send(meal[0])
            }) 
        },

// createDayMenu: (req, res, next) => {
    //     const { name, meals } = req.body
    //     req.app.get('db').create_day_menu([name, meals, req.user.auth_id]).then( menu => {
        //         res.status(200).send(menu)
        //     }) 
        // },
                            
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
    // db.get_latest_mes([req.user.id]).then( user => {
    //     res.status(200).send(user[0])
    // })