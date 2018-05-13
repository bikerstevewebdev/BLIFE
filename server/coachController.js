module.exports = {
    getCCInfo: (req, res, next) => {
        console.log(req.body)
        const db = req.app.get('db')
            , { user_id } = req.user
        db.get_client_id([user_id]).then(cId => {
            db.get_cc_info([cId[0].client_coach_id]).then(coach => {
                    res.status(200).send(coach[0])
            }).catch(err => {
                console.log(err)
            }) 
        }).catch(err => {
            console.log(err)
        })
    },

    getCurrClientInfo: (req, res, next) => {
        console.log(req.body)
        const db = req.app.get('db')
            , { id } = req.params
        db.get_curr_client_info([id]).then(client => {
            res.status(200).send(client[0])
        }).catch(err => {
            console.log(err)
        })
    },

    getCoachReqInfo: (req, res, next) => {
        console.log(req.body)
        const db = req.app.get('db')
            , { user_id } = req.user
        db.get_coach_req_info([user_id]).then(info => {
            res.status(200).send(info[0])
        }).catch(err => {
            console.log(err)
        })
    },

    acceptCoachRequest: (req, res, next) => {
        console.log(req.body)
        const db = req.app.get('db')
            , { user_id } = req.user
            , { id } = req.body
        db.accept_request_to_coach([id, user_id]).then(name => {
            res.status(200).send({message: `Congratulations! Coach ${name[0].fullname} will be in touch shortly.`})
        }).catch(err => {
            console.log(err)
        })
    },

    getClientInfo: (req, res, next) => {
        console.log(req.body)
        const db = req.app.get('db')
            , { client_coach_id, has_mes } = req.body
            , { coach_id } = req.user
            console.log("client_coach_id, ", client_coach_id, "coach_id, ", coach_id)
        db.check_coach_auth([client_coach_id/1, coach_id]).then(client => {
            console.log("inside getclientinfo db call client: ", client)
            if(client[0]){
                if(has_mes){
                    db.get_client_info_with_mes([client_coach_id/1]).then(info => {
                        console.log(info)
                        db.get_assigned_current_menus([client[0].user_id]).then(menus => {
                            db.get_assigned_current_workouts([client[0].user_id]).then(workouts => {
                                let retObj = {
                                    client: info[0], 
                                    workouts, 
                                    menus
                                }
                                res.status(200).send(retObj)
                            }).catch(err => {
                                console.log(err)
                            })
                        }).catch(err => {
                            console.log(err)
                        })
                }).catch(err => {
                    console.log(err)
                })
            }else{
                    db.get_client_info_no_mes([client_coach_id/1]).then(info => {
                        console.log(info)
                        db.get_assigned_current_menus([client[0].user_id]).then(menus => {
                            db.get_assigned_current_workouts([client[0].user_id]).then(workouts => {
                                let retObj = {
                                    client: info[0], 
                                    workouts, 
                                    menus
                                }
                                res.status(200).send(retObj)
                            }).catch(err => {
                                console.log(err)
                            })
                        }).catch(err => {
                            console.log(err)
                        })
                    }).catch(err => {
                        console.log(err)
                    })

                }
            } else{
                res.status(401).send({message: "You are not authorized to coach this client."})
            }
        }).catch(err => {
            console.log(err)
        })
    },

    getAdminInfo: (req, res, next) => {
        console.log(req.body)
        const db      = req.app.get('db')
            , { auth_id } = req.user
        db.check_admin_status([auth_id]).then(adminTruth => {
            if(adminTruth[0]){
                db.get_pending_coach_requests().then(coachReqs => {
                    db.get_active_coaches().then(activeCoaches => {
                        let retObj = {
                            activeCoaches,
                            coachReqs
                        }
                        res.status(200).send(retObj)
                    }).catch(err => {
                        console.log(err)
                    })
                }).catch(err => {
                    console.log(err)
                })
            } else {
                res.status(401).send({message: "You are not authorized to access that information."})
            }
        }).catch(err => {
            console.log(err)
        })
    },

    getClients: (req, res, next) => {
        console.log(req.body)
        const db = req.app.get('db')
            , { coach_id } = req.user
        db.get_current_clients([coach_id]).then(clients => {
            res.status(200).send(clients)
        }).catch(err => {
            console.log(err)
        })
    },

    requestCoachAccess: (req, res, next) => {
        console.log(req.body)
        const { coach_id } = req.user
        if(coach_id != -1){
            const db = req.app.get('db')
                , { user_id } = req.user
            db.request_coach_access([user_id]).then(user => {
                res.status(200).send(user[0])
            }).catch(err => {
                console.log(err)
            })
        }else{
            res.status(400).send({message: "You have already requested coach access. The administrators will get back to you as quickly as possible."})
        }
    },

    renounceCoachAccess: (req, res, next) => {
        console.log(req.body)
        const { user_id } = req.user
        const db = req.app.get('db')
            db.renounce_coach_access([user_id]).then(user => {
                res.status(200).send(user[0])
            }).catch(err => {
                console.log(err)
            })
    },

    approveCoachAccess: (req, res, next) => {
        console.log(req.body)
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
                    }).catch(err => {
                        console.log(err)
                    })
                })
            } else {
                res.status(401).send({message: "You are not authorized to perform that operation."})
            }            
        }).catch(err => {
            console.log(err)
        })
    },

    denyCoachAccess: (req, res, next) => {
        console.log(req.body)
        const db      = req.app.get('db')
            , { auth_id } = req.user
            , { req_id, user_id } = req.body
        db.check_admin_status([auth_id]).then(adminTruth => {
            if(adminTruth[0]){
                db.deny_coach_access([req_id, user_id]).then(coachReqs => {
                    res.status(200).send(coachReqs)
                }).catch(err => {
                    console.log(err)
                })
            } else {
                res.status(401).send({message: "You are not authorized to perform that operation."})
            }            
        }).catch(err => {
            console.log(err)
        })
    },

    revokeCoachAccess: (req, res, next) => {
        console.log(req.body)
        const db      = req.app.get('db')
            , { auth_id } = req.user
            , { coach_id, coach_name } = req.body
        db.check_admin_status([auth_id]).then(adminTruth => {
            if(adminTruth[0]){
                db.revoke_coach_access([coach_id]).then(activeCoaches => {
                    res.status(200).send({activeCoaches, message: `Coach ${coach_name} no longer has coach access.`})
                }).catch(err => {
                    console.log(err)
                })
            } else {
                res.status(401).send({message: "You are not authorized to perform that operation."})
            }            
        }).catch(err => {
            console.log(err)
        })
    },

    requestACoach: (req, res, next) => {
        console.log(req.body)
        const db      = req.app.get('db')
        , { user_id } = req.user
        db.check_for_coach_request([user_id]).then(results => {
            if(results.length > 0){
                res.status(400).send({message: "You have already requested a coach, please allow time to match you with the proper coach."})
            }else{
                db.request_a_coach([user_id]).then(coachReqs => {
                    res.status(200).send({message: "Your wish is my command."})
                }).catch(err => {
                    console.log(err)
                })
            }
        }).catch(err => {
            console.log(err)
        })
    },

    assignWorkoutToClient: (req, res, next) => {
        console.log(req.body)
        const db = req.app.get('db')
        , { workout_id, client_coach_id } = req.body
        , { user } = req
        db.check_coach_auth([client_coach_id, user.coach_id]).then(client => {
            if(client[0]){
                db.add_workout_to_client([client[0].user_id, workout_id]).then(workouts => {
                    res.status(200).send(workouts)
                }).catch(err => {
                    console.log(err)
                })     
            } else{
                res.status(401).send({message: "You are not authorized to coach this client."})
            }
        }).catch(err => {
            console.log(err)
        })
    },
    removeWorkoutFromClient: (req, res, next) => {
        console.log(req.body)
        const db = req.app.get('db')
        , { user_workout_id, client_coach_id } = req.body
        , { user } = req
        db.check_coach_auth([client_coach_id, user.coach_id]).then(client => {
            if(client[0]){
                db.remove_client_workout([client[0].user_id, user_workout_id]).then(workouts => {
                    res.status(200).send(workouts)
                }).catch(err => {
                    console.log(err)
                })     
            } else{
                res.status(401).send({message: "You are not authorized to coach this client."})
            }
        }).catch(err => {
            console.log(err)
        })
    },
    
    removeMenuFromClient: (req, res, next) => {
        console.log(req.body)
        const db = req.app.get('db')
        , { user_menu_id, client_coach_id } = req.body
        , { user } = req
        db.check_coach_auth([client_coach_id, user.coach_id]).then(client => {
            if(client[0]){
                db.remove_client_menu([client[0].user_id, user_menu_id]).then(menus => {
                    res.status(200).send(menus)
                }).catch(err => {
                    console.log(err)
                })     
            } else{
                res.status(401).send({message: "You are not authorized to coach this client."})
            }
        }).catch(err => {
            console.log(err)
        })
    },


    assignMenuToClient: (req, res, next) => {
        console.log(req.body)
        const db = req.app.get('db')
        , { menu_id, client_coach_id } = req.body
        , { user } = req
        db.check_coach_auth([client_coach_id, user.coach_id]).then(client => {
            if(client[0]){
                db.add_menu_to_client([client[0].user_id, menu_id]).then(menus => {
                    res.status(200).send(menus)
                }).catch(err => {
                    console.log(err)
                })     
            } else{
                res.status(401).send({message: "You are not authorized to coach this client."})
            }
        }).catch(err => {
            console.log(err)
        })
    },

    searchForClient: (req, res, next) => {
        console.log(req.body)
        const db = req.app.get('db')
            , { email } = req.params
        db.search_for_client_by_email([email]).then(client => {
            if(client[0]){
                db.request_client([client[0].user_id, req.user.coach_id]).then(nothing => {
                    res.status(200).send({message: `${client[0].fullname} has been sent a request.`})
                }).catch(err => {
                    console.log(err)
                })
            }else{
                res.status(500).send({message: "User Not Found"})
            }
        }).catch(err => {
            console.log(err)
        })
    }
}