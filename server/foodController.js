const axios = require('axios')
require('dotenv').config()

module.exports = {
    searchExternalFoods: (req, res, next) => {
        const db = req.app.get('db')
            , { foodName } = req.query
        axios.get("https://trackapi.nutritionix.com/v2/search/instant?query=" + foodName,
            {"headers": {
                "x-app-key": `${process.env.API_KEY1}`,
                "x-app-id": `${process.env.API_ID1}`
            }}).then(results => {
                res.status(200).send({ resImg: results.data.common[0].photo.thumb, ...selection })
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