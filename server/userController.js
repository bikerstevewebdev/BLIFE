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
    
    getAssignedWorkouts: (req, res, next) => {
        const db = req.app.get('db')
        db.get_assigned_current_workouts([req.user.user_id]).then(workouts => {
            res.status(200).send(workouts)
        })
    },
    
    getAssignedMenus: (req, res, next) => {
        const db = req.app.get('db')
        db.get_assigned_current_menus([req.user.user_id]).then(menus => {
            res.status(200).send(menus)
        })
    },
    
    addWorkoutToUser: (req, res, next) => {
        const db = req.app.get('db')
        , { workout_id } = req.body        
        db.add_workout_to_user([req.user.user_id, workout_id]).then(workouts => {
            res.status(200).send(workouts)
        })
    },
    
    addMenuToUser: (req, res, next) => {
        const db = req.app.get('db')
            , { menu_id } = req.body
        db.add_menu_to_user([req.user.user_id, menu_id]).then(menus => {
            res.status(200).send(menus)
        })
    },
    
    archiveMenu: (req, res, next) => {
        const db = req.app.get('db')
            , { user_menu_id } = req.body
        db.archive_menu([req.user.user_id, user_menu_id]).then(menus => {
            res.status(200).send(menus)
        })
    },
    
    archiveWorkout: (req, res, next) => {
        const db = req.app.get('db')
            , { user_workout_id } = req.body
        db.archive_workout([req.user.user_id, user_workout_id]).then(workouts => {
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
                    db.get_current_photos([req.user.user_id]).then(pics => {
                        let userObj = {
                            dBUser: req.user,
                            currMes: currMes[0],
                            pics
                        }
                        console.log('Sending user object')        
                        res.status(200).send(userObj)
                    })
                })
            } else{
                res.status(200).send(req.user)
            }
        } else{
            res.status(404).send({message: 'Not Logged In'})
        }
    },
    
    updateUsername: (req, res, next) => {
        const db = req.app.get('db')
        , { username } = req.body
        db.check_existing_username([username]).then(users => {
            if(users[0]){
                res.status(400).send({message: "Username already exists. Please try another."})
            }else{
                db.update_username([req.user.user_id, username]).then( user => {
                    res.status(200).send(user[0])
                })
            }
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

    makePicNotCurrent: (req, res, next) => {
        const db = req.app.get('db')
        , { photo_id } = req.body
        db.change_photo_current([req.user.user_id, photo_id]).then( photos => {
            res.status(200).send(photos)
        })
    },

    getCurrentPhotos: (req, res, next) => {
        const db = req.app.get('db')
        db.get_current_photos([req.user.user_id]).then( photos => {
            res.status(200).send(photos)
        })
    },

    getAllProgressPhotos: (req, res, next) => {
        const db = req.app.get('db')
        db.get_all_progress_photos([req.user.user_id]).then( photos => {
            res.status(200).send(photos)
        })
    },
    
    ///////////////////MES/STATS METHODS////////////////
    addMez: (req, res, next) => {
        const { waist, neck, chest, ht, wt, bf, date, happyLevel } = req.body
            , db                                       = req.app.get('db')
        let msDate = new Date(date).getTime()
        db.add_measurements([ waist, neck, chest, ht, wt, bf, msDate, req.user.user_id, happyLevel ]).then( measurements => {
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

    getMezHistory: (req, res, next) => {
        const db = req.app.get('db')
        db.get_user_mes_history([req.user.user_id]).then( measurements => {
            let weights = [], bfs = [], necks = [], waists = [], chests = [], dates = [], happyLevels = []
            measurements.forEach(v => {
                weights.push(v.weight)
                bfs.push(v.bf)
                necks.push(v.neck)
                waists.push(v.waist)
                chests.push(v.chest)
                dates.push(v.date_taken)
                happyLevels.push(v.happy_level)
            })
            let mesObj = {weights, bfs, necks, waists, chests, dates, happyLevels}
            res.status(200).send(mesObj)
        })
    },

    getLatestMes: (req, res, next) => {
        req.app.get('db').get_latest_mes([req.params.id]).then( measurements => {
            res.status(200).send(measurements[0])
        })
    },

    updateStats: (req, res, next) => {
        const db = req.app.get('db')
        const { p, c, f, ht, wt, bf, waist, chest, neck, happy_level } = req.body
        let x     = new Date(),
            msDate = x.getTime()
        db.add_measurements([waist, neck, chest, ht, wt, bf, msDate, req.user.user_id, happy_level]).then( mes => {
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
        let x  = new Date(),
        msDate = x.getTime()
        
        req.app.get('db').add_macro_calc([ protein, carbs, fat, msDate, req.user.user_id ]).then( macros => {
            res.status(200).send(macros[0])
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