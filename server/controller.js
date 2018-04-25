module.exports = {
    getUser: (req, res, next) => {
        req.app.get('db').get_user([req.params.id]).then( user => {
            res.status(200).send(user)
        })
    },
    getMeasurements: (req, res, next) => {
        if(req.params.id) {
        req.app.get('db').get_measurements([req.params.id]).then( measurements => {
            res.status(200).send(measurements)
        })
    } else{
        res.status(404).send({message: 'Measurements do not exist'})
    }
    },
    createExercise: (req, res, next) => {
        const { name, type, img, video_url } = req.body
        req.app.get('db').create_exercise([name, type, req.user.auth_id, img, video_url]).then( exercise => {
            res.status(200).send(exercise)
        }) 
    },
    createWorkout: (req, res, next) => {
        const { name, type, img, video_url } = req.body
        req.app.get('db').create_workout([name, type, req.user.auth_id, img, video_url]).then( workout => {
            res.status(200).send(workout)
        }) 
    },
    createFood: (req, res, next) => {
        const { name, pro, carb, fat, fiber } = req.body
        req.app.get('db').create_food([name, req.user.auth_id, pro, carb, fat, fiber]).then( food => {
            res.status(200).send(food)
        }) 
    },
    createMeal: (req, res, next) => {
        const { title, total_p, total_c, total_f, ingredients } = req.body
        req.app.get('db').create_meal([title, req.user.auth_id, total_p, total_c, total_f, ingredients]).then( meal => {
            res.status(200).send(meal)
        }) 
    },
    createDayMenu: (req, res, next) => {
        const { name, meals } = req.body
        req.app.get('db').create_day_menu([name, meals, req.user.auth_id]).then( menu => {
            res.status(200).send(menu)
        }) 
    },
    newMacroCalc: (req, res, next) => {
        const { protein, carbs, fat } = req.body
        let x     = new Date(),
            tDate = `${x.getMonth()}-${x.getDate()}-${x.getFullYear()}`
        
        req.app.get('db').add_macro_calc([ protein, carbs, fat, tDate, req.user.auth_id ]).then( macros => {
            res.status(200).send(macros)
        }) 
    },
    updateStats: (req, res, next) => {
        const { p, c, f } = req.body
        req.app.get('db').update_stats([ p, f, c, req.user.id ]).then( user => {
            res.status(200).send(user)
        })
    },
    addMez: (req, res, next) => {
        let x     = new Date(),
            tDate = `${x.getMonth()}-${x.getDate()}-${x.getFullYear()}`
        const { waist, neck, chest, ht, wt, bf } = req.body
        req.app.get('db').add_measurements([ waist, neck, chest, ht, wt, bf, tDate, req.user.id ]).then( measurements => {
            res.status(200).send(measurements)
        })
    },

    sendUserObjs: (req, res, next) => {
        let retObj = {
            session: req.session.passport.user, // Serialize puts the second param for done function on this property
            direct: req.user // Deserialize puts the second param for done function on this property
            }
        res.status(200).send(retObj)
    }
}