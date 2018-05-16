require('dotenv').config()

const express          = require('express'),
      Auth0Strategy    = require('passport-auth0'),
      cors             = require('cors') ,
      passport         = require('passport'),
      session          = require('express-session'),
      massive          = require('massive'),
      { CONNECTION_STRING, SESSION_SECRET, SERVER_PORT, DOMAIN, CLIENT_ID, CLIENT_SECRET, CALLBACK_URL } = process.env,
      uc               = require('./userController'),
      fc               = require('./foodController'),
      cc               = require('./coachController'),
      fitc             = require('./fitnessController'),
      stripeRoute      = require('./stripe'),
      port             = SERVER_PORT, // || 3000
      S3               = require('./awsS3'),
      msgAPI           = require('./messaging'),
      socket           = require('socket.io'),
      axios            = require('axios')


      
      

const app = express()



// app.use(express.static(__dirname + '/../build'))
app.use(express.json({limit: '10mb'}))
app.use(cors())
// Setting up express-session
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  }));

  // Initializing Passport
  app.use(passport.initialize());
  // Handing express-session over to passport
  app.use(passport.session());
  // Setting up the ability to run the static-build files
  app.use(express.static(__dirname + '/../build'));

passport.use( new Auth0Strategy({
    domain: DOMAIN,
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: CALLBACK_URL,
    scope: 'openid email profile'
}, (accessToken, refreshToken, extraParams, profile, done) => {
    const { id, nickname, picture, emails } = profile

    console.log('profile', profile);
    const db = app.get('db') 
    db.get_user([id]).then( users => {        
        if ( users[0] ){
            let loginDate = new Date().getTime()
            db.add_new_login_date([id, loginDate]).then(result => {
                return done(null, users[0])
            })
        } 
        else { //when someone is logginG in for the first time.             
            let x      = new Date()
              , msDate = x.getTime()
            db.create_user([nickname, emails[0].value, picture, id, msDate]).then( createdUser => {
                return done(null, createdUser[0])
        } ) }
    } ).catch(err => {
        console.log('error with auth login:', err)
    })
    console.log('listening?')
    // done(null, profile)
}) )

// When done, adds user to req.session.user
passport.serializeUser((user, done) => {
    console.log(`serial user maybe profile `, user)
    done(null, user)
})


// When done, adds second parameter to req.user
passport.deserializeUser((user, done) => {
    app.get('db').find_session_user([user.auth_id]).then( dbUser => {
        console.log(`Deserial User should be DB User: ${dbUser.id}, in case its an array: ${dbUser[0]}`)
        return done(null, dbUser[0]);
    })
})


const io = socket(app.listen(port, () => {
    console.log(`Build your new Life on Port ${port}`)
}))

massive(process.env.CONNECTION_STRING).then( db => {
    app.set('db', db);
    console.log("MASSive is up and running")
})


io.on('connect', function (client) {
    // all client sockets have a unique id
    client.emit('contact', { id: client.id })
    // console.log('user connected. Client ID: ', client.id)
    const db = app.get('db')

    client.on('join room', data => {
        console.log('join room hit', data)
        const { id, isClient, roomname } = data
        client.join(roomname)
        if(isClient){
            // console.log('isclient is true', data)
            db.get_client_messages([id]).then(clientMessages => {
                io.to(roomname).emit('room joined', {messages: clientMessages, room: roomname, success: true})    
            })
        }else{
            // console.log('isclient is false', data)
            db.get_coach_messages([id]).then(coachMessages => {
                io.to(roomname).emit('room joined', {messages: coachMessages, room: roomname, success: true})    
            })
        }
    })
    client.on('send message', function (data) {
        const db = app.get('db')
        const { client_id, isClient, message, time, coach_id, room, id, sender } = data
        if(isClient){
            db.add_client_message([client_id, coach_id, time, message, sender, room, id]).then(messages => {
                io.to(room).emit('message received', { messages })
            })
        }else{
            db.add_coach_message([client_id, coach_id, time, message, sender, room, id]).then(messages => {
                io.to(room).emit('message received', { messages })
            })
        }
    })
    // client.on('disconnect', function () {
    //     console.log('user disconnected')
    // })

})

app.use((req, res, next) => {
    console.log(req.url)
    console.log("req.body", req.body)
    next()
})

app.get('/auth', passport.authenticate('auth0'))
app.get('/auth/logout', (req, res)=>{
    req.logout()
    res.redirect('/')
})

app.get('/motivational/quote', (req, res) => {
    axios.get(`https://api.unsplash.com/photos/random?query=adventure&client_id=${process.env.API_KEY3}&count=1&w=300&h=250`).then(pic => {
        axios.get('https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json').then(response => {
            // console.log('res', response, 'and response.data',  response.data)
                let imgOne    = pic.data[0].urls.custom,
                    imgPro = pic.data[0].user.name
                res.status(200).send({ imgURL: imgOne, imgUser: imgPro, qText: response.data.quoteText, qAuthor: response.data.quoteAuthor })
            }).catch(err => {
                console.log(err)
            })
        })
})

app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect: process.env.SUCCESS_REDIRECT,
    failureRedirect: process.env.FAILURE_REDIRECT
}))
app.get('/auth/me', uc.sendUserObjs)

app.get('/userInfo', uc.getUserInfo)
app.get('/currClientInfo/:id', cc.getCurrClientInfo)
app.get('/ccInfo', cc.getCCInfo)
app.post('/clientInfo', cc.getClientInfo)
app.get('/adminInfo', cc.getAdminInfo)
app.get('/adminInfo', cc.getAdminInfo)
app.get('/userMenus', uc.getUserMenus)
app.get('/userWorkouts', uc.getUserWorkouts)
app.get('/user/currentPics', uc.getCurrentPhotos)
app.get('/user/progressPics', uc.getAllProgressPhotos)
app.get('/history/user/measurements', uc.getMezHistory)

app.get(`/client/coach/requestInfo`, cc.getCoachReqInfo)
app.get('/client/assigned/menus', uc.getAssignedMenus)
app.get('/client/assigned/workouts', uc.getAssignedWorkouts)
app.get('/coach/clients', cc.getClients)

app.get('/recipes', fc.getRecipes)
app.get('/food/search', fc.searchFoods)
app.get('/meal/search', fc.searchMeals)
app.get('/menu/search', fc.searchMenus)


app.get('/exercise/search', fitc.searchExercises)
app.get(`/workout/search`, fitc.searchWorkouts)

app.put('/user/stats', uc.updateStats)
app.put('/user/username', uc.updateUsername)
app.put('/user/fullname', uc.updateFullname)
app.put('/user/profilePic', uc.updateProfilePic)
app.put('/user/progressPic/decurrentize', uc.makePicNotCurrent)

app.put('/client/coach/approveRequest', cc.acceptCoachRequest)
app.put('/coach/noRequest', cc.renounceCoachAccess)
app.put('/coach/request', cc.requestCoachAccess)
app.put('/admin/coach/approve', cc.approveCoachAccess)
app.put('/admin/coach/deny', cc.denyCoachAccess)
app.put('/admin/coach/revoke', cc.revokeCoachAccess)
app.put('/food/edit', fc.editFood)
app.put('/meal/foods/quantity', fc.updateFoodQuantity)
app.put('/menu', fc.editMenu)
app.put('/exercise', fitc.editExercise)
app.put('/workout/exercise', fitc.updateWorkoutEx)
app.put('/user/menus/archive', uc.archiveMenu)
app.put('/user/workouts/archive', uc.archiveWorkout)

S3(app)

stripeRoute(app)

msgAPI(app)

app.post('/user/mez', uc.addMez)
app.post('/macroCalc', uc.newMacroCalc)
app.post('/userMenus', uc.addMenuToUser)
app.post('/userWorkouts', uc.addWorkoutToUser)
app.post('/client/menus', cc.assignMenuToClient)
app.post('/client/workouts', cc.assignWorkoutToClient)
app.post('/client/coach/request', cc.requestACoach)

app.post('/food/external/search', fc.searchExternalFoods)
app.post('/food', fc.createFood)
app.post('/meal/food', fc.addFoodToMeal)
app.post('/meal', fc.createMeal)
app.post('/menu', fc.createMenu)
app.post('/menu/meal', fc.addMealToMenu)
app.post('/meal/newFood', fc.addFoodToDBAndMeal)

app.post('/exercise', fitc.createExercise)
app.post('/workout', fitc.createWorkout)
app.post('/workout/exercise', fitc.addExerciseToWorkout)


app.put('/meal/removeFood', fc.removeFoodFromMeal)
app.put('/menu/removeMeal', fc.removeMealFromMenu)

app.post('/client/menus/remove', cc.removeMenuFromClient)
app.post('/client/workouts/remove', cc.removeWorkoutFromClient)
app.delete('/workout/removeExercise/:id', fitc.removeExFromWorkout)

app.get('/exercise/:id', fitc.getExerciseById)
app.get('/workout/:id', fitc.getWorkoutById)
app.get('/user/:id', uc.getUser)
app.get('/search/clients/:email', cc.searchForClient)
app.get('/measurements/latest/:id', uc.getLatestMes)
app.get('/measurements/:id', uc.getMeasurements)
app.get('/food/search/:id', fc.getFood)
app.get('/meal/search/:id', fc.getMealById)
app.get('/menu/search/:id', fc.getMenuById)