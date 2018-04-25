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
        
// createFood: (req, res, next) => {
    //     const { name, pro, carb, fat, fiber } = req.body
    //     req.app.get('db').create_food([name, req.user.auth_id, pro, carb, fat, fiber]).then( food => {
        //         res.status(200).send(food)
        //     }) 
        // },
        
// createMeal: (req, res, next) => {
    //     const { title, total_p, total_c, total_f, ingredients } = req.body
    //     req.app.get('db').create_meal([title, req.user.auth_id, total_p, total_c, total_f, ingredients]).then( meal => {
        //         res.status(200).send(meal)
        //     }) 
        // },

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