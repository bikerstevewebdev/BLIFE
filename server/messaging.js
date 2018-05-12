require('dotenv').config()
const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL, //.env file
        pass: process.env.EMAIL_PASSWORD //.env file
    }
})


const accountSid = 'AC7ce00ece1950e08e9fcb04ec1b275c55' //comes from twilio
const authToken = process.env.TWILIO_AUTH_TOKEN //in .env comes from twilio
const twilio = require('twilio')
const client = new twilio(accountSid, authToken)

const sendMessage = (req, res) => {
    const { emailInput, pnum, sendingEmail, sendingTxt, stripeNum } = req.body
    console.log('msg endpoint hit: ', emailInput, pnum, sendingEmail, sendingTxt, stripeNum)

    let messageBody = `Hey there ${req.user.fullname}, thanks for allowing us to join you on your journey to a better life. Your transaction id is ${req.user.btransid}. Please keep this somewhere safe and where you can access it later. -BLIFE Team`
    let successMsg = 'Check your device for a message and contact support if you do not receive it in 24 hours. Thanks!'
    const mailOptions = {
        from: process.env.EMAIL,
        to: emailInput,
        subject: 'Welcome To Balanced LIFE',
        text: messageBody
    }
    if(!sendingTxt && sendingEmail){
        transport.sendMail(mailOptions).then(emailRes => {
             res.status(200).send({emailRes, message: successMsg, success: true})
        }).catch(err => {
            res.status(400).send(err)
        })
    }else if(!sendingEmail && sendingTxt){
        client.messages.create({
            body: messageBody,
            from: process.env.TWILIO_PHONE_NUMBER, //in .env comes from twilio
            to: req.body.pnum
        }).then(text => {
            if (text.sid) {
                res.status(200).send({message: successMsg, success: true})
            }
        }).catch(err => {
                res.status(400).send(err)
        })
    }else if(sendingEmail && sendingTxt){
        client.messages.create({
                body: messageBody,
                from: process.env.TWILIO_PHONE_NUMBER, //in .env comes from twilio
                to: req.body.pnum
            }).then(text => {
                transport.sendMail(mailOptions).then(emailRes => {
                    if (text.sid) {
                        res.status(200).send({message: successMsg, success: true, emailRes})
                    }else{
                        res.status(200).send({message: successMsg, emailRes, success: true})
                    }
               }).catch(err => {
                   res.status(400).send(err)
               })
            }).catch(err => {
                res.status(400).send(err)
            })
    }


    }

module.exports = function(app) {
    app.post('/receipt', sendMessage)
}