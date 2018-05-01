const axios = require('axios')
require('dotenv').config()

module.exports = {
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
                let retArr
                if(branded){
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
                } else{
                    retArr = results.data.common.map(v => {
                        let nut = v.full_nutrients
                        return {
                            name: v.food_name,
                            p: nut.find(v => v.attr_id/1 === 203).value.toFixed(),
                            f: nut.find(v => v.attr_id/1 === 204).value.toFixed(),
                            c: nut.find(v => v.attr_id/1 === 205).value.toFixed(),
                            fib: nut.find(v => v.attr_id/1 === 291).value.toFixed(),
                            img: v.photo.thumb
                        }
                    })
                }
                res.status(200).send(retArr)
            })
    }
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