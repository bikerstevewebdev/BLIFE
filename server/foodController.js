const axios = require('axios')
require('dotenv').config()

function urlEncode(str){
    return str.trim().replace(/\W+/g, "+")
}

module.exports = {    
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
            if(req.user.coach_id > 0){
                res.status(200).send(menu[0])
            } else{
                db.add_menu_to_user([req.user.user_id, menu[0].menu_id]).then(menus => {
                    res.status(200).send(menu[0])
                })
            }
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
    
// Can add an optional button on front end to ask if user want to change food in the database to affect it's use everywhere else or just create a new food with the updated data
//////////// Drill Weekend kind of thing
    editFood: (req, res, next) => {
        const db = req.app.get('db')
        const { food_id, name, p, c, f, fib, img } = req.body
        db.get_food_by_id([food_id]).then(food => {
            if(req.user.user_id == food[0].author_id){
                db.edit_food([food_id, name, p, c, f, fib, img]).then(newFood => {
                    res.status(200).send(newFood[0])
                }).catch(err=> res.status(400).send(err.message))
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
    
    searchFoods: (req, res, next) => {
        req.app.get('db').search_foods_by_name([req.query.name]).then(foods => {
            res.status(200).send(foods)
        })
    },

    searchMeals: (req, res, next) => {
        req.app.get('db').search_meals_by_title([req.query.title]).then(meals => {
            res.status(200).send(meals)
        })
    },

    searchMenus: (req, res, next) => {
        req.app.get('db').search_menus_by_title([req.query.title]).then(menus => {
            res.status(200).send(menus)
        })
    },

    searchExternalFoods: (req, res, next) => {
        const db = req.app.get('db')
            , { foodName } = req.query
            , { branded } = req.body
        axios.get(`https://trackapi.nutritionix.com/v2/search/instant?query=${foodName}&detailed=true&branded=${branded}`,
            {
                "headers":{
                    "x-app-id": `${process.env.APP_ID1}`,
                    "x-app-key": `${process.env.API_KEY1}`
                }
        }).then(results => {
                let retArr = []
                if(branded && results.data.branded.length > 0){
                    retArr = results.data.branded.map(v => {
                        return {
                            name: v.brand_name + " " + v.food_name,
                            p: v.full_nutrients[0].value.toFixed(),
                            f: v.full_nutrients[1].value.toFixed(),
                            c: v.full_nutrients[2].value.toFixed(),
                            fib: v.full_nutrients[5].value.toFixed(),
                            img: v.photo.thumb
                        }
                    })
                } else if(results.data.common.length > 0){
                    retArr = results.data.common.map(v => {
                        // if(v.full_nutrients.find(val => val.attr_id/1 === 203) && v.full_nutrients.find(val => val.attr_id/1 === 205) && v.full_nutrients.find(val => val.attr_id/1 === 204) && v.full_nutrients.find(val => val.attr_id/1 === 291)){
                            let nut = v.full_nutrients
                            return {
                                name: v.food_name,
                                p: nut.find(val => val.attr_id/1 === 203) ? nut.find(val => val.attr_id/1 === 203).value.toFixed() : 0,
                                f: nut.find(val => val.attr_id/1 === 204) ? nut.find(val => val.attr_id/1 === 204).value.toFixed() : 0,
                                c: nut.find(val => val.attr_id/1 === 205) ? nut.find(val => val.attr_id/1 === 205).value.toFixed() : 0,
                                fib: nut.find(val => val.attr_id/1 === 291) ? nut.find(val => val.attr_id/1 === 291).value.toFixed() : 0,
                                img: v.photo.thumb
                            }
                        // }else{
                            // return {
                            //     name: v.food_name,
                            //     p: 0,
                            //     f: 0,
                            //     c: 0,
                            //     fib: 0,
                            //     img: v.photo.thumb
                            // }
                        // }
                    })
                }
                res.status(200).send(retArr)
            })
    },
    
    getRecipes: (req, res, next) => {
        console.log(req.query.name)
        const { name } = req.query
        let encodedName = urlEncode(name)
        axios.get(`http://api.yummly.com/v1/api/recipes?_app_id=${process.env.APP_ID2}&_app_key=${process.env.API_KEY2}&q=${encodedName}&requirePictures=true&maxResult=10&start=10`).then(results => {
            let recipes = results.data.matches.map(v => {
                return {
                    name: v.recipeName,
                    ingredients: v.ingredients,
                    img: v.imageUrlsBySize["90"]
                }
            })
            res.status(200).send(recipes)
        })
    },
    
    addFoodToDBAndMeal: (req, res, next) => {
        const db = req.app.get('db')
            , { meal_id, name, p, c, f, fib, img } = req.body
        db.create_food([name, req.user.user_id, p, c, f, fib, img]).then(food => {
            db.add_food_to_meal_no_total([meal_id, food[0].food_id, p, c, f, fib]).then(newMeal => {
                db.get_foods_by_meal_id([meal_id]).then(foods => {
                    let retObj = {
                        foods,
                        newMeal: newMeal[0]
                    }
                    res.status(200).send(retObj)
                })
            })
        })
    },
    // axios.post('/meal/food/new', { meal_id, name, p, c, f, fib, img })

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
}


// axios({
//     method: "post",
//     url: "https://trackapi.nutritionix.com/v2/natural/nutrients", 
//     headers: {"x-app-key": `${process.env.API_KEY1}`, "x-app-id": `${process.env.API_ID1}`, "x-remote-user-id": "0"},
//     data: {"query": fname} 
// }).then(results => {
//     p = results.data.foods[0].nf_protein
//     f = results.data.foods[0].nf_total_fat
//     c = results.data.foods[0].nf_total_carbohydrate
//     res.status(200).send({ p, c, f })
// })

// axios.get(`http://api.yummly.com/v1/api/recipes?_app_id=${process.env.APP_ID2}&_app_key=${process.env.API_KEY2}&q=${encodedName}&requirePictures=true&maxResult=10&start=10`)