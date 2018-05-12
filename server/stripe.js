require('dotenv').config()
const stripe = require('stripe')(process.env.S_STRIPE_KEY)


module.exports = function(app) {
    app.post('/api/charge', function(req, res){
        const db = app.get('db')
        console.log(req.body.amount)
        stripe.charges.create({
            amount: req.body.amount,
            currency: 'usd',
            source: req.body.token.id,
            description: 'Membership Investment',
            capture: true
        }).then((charge, err) => {
            // asynchronously called
            console.log('stripe err: ', err, 'stripe charge: ', charge)
            if(charge.status === 'succeeded'){
                db.add_transaction([req.user.user_id, charge.balance_transaction]).then(userT => {
                    console.log(userT, userT[0])
                    res.status(200).send({message: "Would you like a receipt to be sent to your email/phone?"}) 
                })
            }else if(err){
                console.log(err)
                res.status(400).send(err)
            }
          })
    })
}