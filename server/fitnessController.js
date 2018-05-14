module.exports = {
    searchExercises: (req, res, next) => {
        console.log('query name: ', req.query.name)
        req.app.get('db').search_exercises_by_name([req.query.name]).then(exercises => {
            res.status(200).send(exercises)
        }).catch(err => {
            console.log(err)
        }) 
    },

    searchWorkouts: (req, res, next) => {
        console.log('query: ',req.query.title)
        req.app.get('db').search_workouts_by_title([req.query.title]).then(workouts => {
            res.status(200).send(workouts)
        }).catch(err => {
            console.log(err)
        }) 
    },

    editExercise: (req, res, next) => {
        const db = req.app.get('db')
        const { id, name, type, muscle, video, img } = req.body
        console.log(req.body)
        db.get_exercise_by_id([id]).then(ex => {
            if(req.user.user_id == ex[0].author_id){
                db.edit_exercise([id, name, type, muscle, video, img]).then(newEx => {
                    res.status(200).send({message: 'Exercise successfully updated!'})
                })
            } else {
                res.status(403).send({message: 'You are not the creator of that exercise and therefore do not have permission to change it. Feel free to create another version of this exercise if you find the information to be incorrect.'})
            }
        }).catch(err => {
            console.log(err)
        })
    },

    updateWorkoutEx: (req, res, next) => {
        const db = req.app.get('db')
        const { workout_ex_id, workout_id, reps, sets, restTime, weight, ex_order, notes, oldOrder } = req.body
        console.log(req.body)
        db.edit_workout_ex([workout_ex_id, workout_id, reps, sets, restTime, weight, ex_order, notes]).then(exercises => {
            if(ex_order != oldOrder){
                exercises.forEach(v => {
                    if(v.ex_order == ex_order && v.workout_ex_id != workout_ex_id){
                        db.update_workout_ex_order([v.workout_ex_id, oldOrder]).then(newEx => {
                            db.get_workout_exercises([workout_id]).then(newExercises => {
                                let orderedEx = []
                                for(let i = 1; i < newExercises.length + 1; i++){
                                    orderedEx.push(newExercises.find(v => v.ex_order === i))
                                }
                                res.status(200).send(orderedEx)
                            }).catch(err => {
                                console.log(err)
                            })
                        }).catch(err => {
                            console.log(err)
                        })
                    }
                    // MIGHT NEED TO ADD NEXT/ASYNC CODE TO HANDLE THIS DATA
                })
            }else{
                let orderedEx = []
                for(let i = 1; i < exercises.length + 1; i++){
                    orderedEx.push(exercises.find(v => v.ex_order === i))
                }
                res.status(200).send(orderedEx)
            }
        }).catch(err => {
            console.log(err)
        })
    },

    createExercise: (req, res, next) => {
        const { name, type, muscle, img, video } = req.body
        req.app.get('db').create_exercise([name, type, muscle, req.user.user_id, img, video]).then( exercise => {
            res.status(200).send(exercise)
        }).catch(err => {
            console.log(err)
        }) 
    },

    createWorkout: (req, res, next) => {
        const { title, type, img } = req.body
        req.app.get('db').create_workout([title, req.user.user_id, type, img]).then(workout => {
                if(req.user.coach_id > 0){
                    res.status(200).send(workout[0])
                } else{
                    db.add_workout_to_user([req.user.user_id, workout[0].workout_id]).then(workouts => {
                        res.status(200).send(workout[0])
                    }).catch(err => {
                        console.log(err)
                    })
                }
        }).catch(err => {
            console.log(err)
        }) 
    },

    addExerciseToWorkout: (req, res, next) => {
        const db = req.app.get('db')
        const { workout_id, ex_id, ex_order } = req.body
        db.add_ex_to_workout([workout_id, ex_id, ex_order]).then(exercises => {
            res.status(200).send(exercises)
        }).catch(err => {
            console.log(err)
        })
    },

    removeExFromWorkout: (req, res, next) => {
        const db = req.app.get('db')
        const { id } = req.params
        const { workout_id } = req.body
        db.remove_ex_from_workout([id, workout_id]).then(exs => {
            exs.forEach(v => {
                let newOrder = v.ex_order - 1 > 0 ? v.ex_order - 1 : 1
                db.update_workout_ex_order([v.workout_ex_id, newOrder])
                // MIGHT NEED TO ADD NEXT/ASYNC CODE TO HANDLE THIS DATA
            })
            db.get_workout_exercises([workout_id]).then(exercises => {
                res.status(200).send(exercises)
            }).catch(err => {
                console.log(err)
            })
        }).catch(err => {
            console.log(err)
        })
    },

    getExerciseById: (req, res, next) => {
        const { id } = req.params
        req.app.get('db').get_exercise_by_id([id]).then( exercise => {
            res.status(200).send(exercise[0])
        }).catch(err => {
            console.log(err)
        })
    },

    getWorkoutById: (req, res, next) => {
        const { id } = req.params
        console.log('fc.getWorkoutById id:', id)
        const db = req.app.get('db')
        db.get_workout_by_id([id]).then( workout => {
            db.get_workout_exercises([id]).then(exs => {
                let orderedEx = []
                for(let i = 1; i < exs.length + 1; i++){
                    orderedEx.push(exs.find(v => v.ex_order === i))
                }
                let retObj = {
                    exercises: orderedEx,
                    workout: workout[0]
                }
                res.status(200).send(retObj)
            }).catch(err => {
                console.log(err)
            })
        }).catch(err => {
            console.log(err)
        })
    },
}