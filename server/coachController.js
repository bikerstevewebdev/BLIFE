module.exports = {
    getClientInfo: (req, res, next) => {
        const db = req.app.get('db')
            , { id } = req.params
            , { coach_id } = req.user
        db.check_coach_auth([client_id, coach_id]).then(client => {
            if(client[0]){
                db.get_client_info([coach_id, id]).then(client => {
                    res.status(200).send(client)
                }) 
            } else{
                res.status(401).send({message: "You are not authorized to coach this client."})
            }
        })
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

    getClients: (req, res, next) => {
        const db = req.app.get('db')
            , { coach_id } = req.params
        db.get_current_clients([coach_id]).then(clients => {
            res.status(200).send(clients)
        })
    },

    requestCoachAccess: (req, res, next) => {
        const { coach_id } = req.user
        if(coach_id != -1){
            const db = req.app.get('db')
                , { user_id } = req.user
            db.request_coach_access([user_id]).then(user => {
                res.status(200).send(user[0])
            })
        }else{
            res.status(400).send({message: "You have already requested coach access. The administrators will get back to you as quickly as possible."})
        }
    },

    approveCoachAccess: (req, res, next) => {
        const db      = req.app.get('db')
            , { auth_id } = req.user
            , { req_id, user_id } = req.body
        db.check_admin_status([auth_id]).then(adminTruth => {
            if(adminTruth[0]){
                db.approve_coach_access([req_id, user_id]).then(coachReqs => {
                    db.get_active_coaches().then(activeCoaches => {
                        let retObj = {
                            activeCoaches,
                            coachReqs
                        }
                        res.status(200).send(retObj)
                    })
                })
            } else {
                res.status(401).send({message: "You are not authorized to perform that operation."})
            }            
        })
    },

    denyCoachAccess: (req, res, next) => {
        const db      = req.app.get('db')
            , { auth_id } = req.user
            , { req_id, user_id } = req.body
        db.check_admin_status([auth_id]).then(adminTruth => {
            if(adminTruth[0]){
                db.deny_coach_access([req_id, user_id]).then(coachReqs => {
                    res.status(200).send(coachReqs)
                })
            } else {
                res.status(401).send({message: "You are not authorized to perform that operation."})
            }            
        })
    },

    assignWorkoutToClient: (req, res, next) => {
        const db = req.app.get('db')
        , { workout_id, coach_client_id, client_id } = req.body
        , { user } = req
        db.check_coach_auth([client_id, user.coach_id]).then(client => {
            if(client[0]){
                db.add_workout_to_client([client_id, workout_id]).then(workouts => {
                    res.status(200).send(workouts)
                })     
            } else{
                res.status(401).send({message: "You are not authorized to coach this client."})
            }
        })
    },
    
    assignMenuToClient: (req, res, next) => {
        const db = req.app.get('db')
        , { menu_id, coach_client_id, client_id } = req.body
        , { user } = req
        db.check_coach_auth([coach_client_id, client_id, user.coach_id]).then(client => {
            if(client[0]){
                db.add_menu_to_client([client_id, menu_id]).then(menus => {
                    res.status(200).send(menus)
                })     
            } else{
                res.status(401).send({message: "You are not authorized to coach this client."})
            }
        })
    },

    searchForClient: (req, res, next) => {
        const db = req.app.get('db')
            , { email } = req.params
        db.search_for_client([email]).then(client => {
            if(client[0]){
                res.status(200).send(client[0])
            }else{
                res.status(500).send({message: "User Not Found"})
            }
        })
    }
}