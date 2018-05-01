const AWS = require('aws-sdk')

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESSKEY,
    secretAccessKey: process.env.AWS_SECRETKEY,
    region: process.env.AWS_REGION
})

const S3 = new AWS.S3()


function uploadPhoto(req, res) {
    let { photo, type } = req.body,
        buf = new Buffer(photo.file.replace(/^data:image\/\w+;base64,/, ""), 'base64'),
        params = {
            Bucket: process.env.AWS_S3_BUCKET,
            Body: buf,
            Key: photo.filename,
            ContentType: photo.filetype,
            ACL: 'public-read'
        }

    console.log(buf)

    S3.upload(params, (err, data) => {
        console.log(err, data)
        if (err) {
          res.status(500).send(err)
        } else {
          const db = req.app.get("db")
          db.add_photo([data.Location, req.user.user_id, 'progress']).then(photos => {            
                  res.status(200).send(photos)
          })
        }
    })
}
module.exports = function (app) {
    app.post('/user/uploadPhoto', uploadPhoto)
}