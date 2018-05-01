require('dotenv').config()

const express          = require('express'),
      Auth0Strategy = require('passport-auth0'),
      cors             = require('cors') ,
      passport         = require('passport'),
      session          = require('express-session'),
      massive          = require('massive'),
      { CONNECTION_STRING, SESSION_SECRET, SERVER_PORT, DOMAIN, CLIENT_ID, CLIENT_SECRET, CALLBACK_URL } = process.env,
      c                = require('./controller'),
      port             = SERVER_PORT, // || 3000
      S3 = require('./awsS3.js')


      
      

const app = express()

app.use(express.json())
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
//   app.use(express.static(__dirname + '/../build'));

passport.use( new Auth0Strategy({
    domain: DOMAIN,
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: CALLBACK_URL,
    scope: 'openid email profile'
}, (accessToken, refreshToken, extraParams, profile, done) => {
    const { id, displayName, picture, emails } = profile
    const db = app.get('db') 
    db.get_user([id]).then( users => {        
        if ( users[0] ){
            return done(null, users[0])
        } 
        else { //when someone is logginG in for the first time.             
            let x = new Date(),
                tDate = `${x.getMonth()}-${x.getDate()}-${x.getFullYear()}`
            db.create_user([displayName, emails[0].value, picture, id, tDate]).then( createdUser => {
                return done(null, createdUser)
        } ) }
    } ).catch(err => {
        console.log(err)
    })
    console.log('listening?')
    done(null, profile)
}) )

// When done, adds user to req.session.user
passport.serializeUser((user, done) => {
    console.log(`serial user maybe profile ${user}`)
    done(null, user)
})


// When done, adds second parameter to req.user
passport.deserializeUser((user, done) => {
    app.get('db').find_session_user([user.id]).then( dbUser => {
        console.log(`Deserial User should be DB User: ${dbUser.id}, in case its an array: ${dbUser[0]}`)
        return done(null, dbUser[0]);
    })
})


app.get('/auth', passport.authenticate('auth0'))

app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect: 'http://localhost:3000/#/dashboard',
    failureRedirect: 'http://localhost:3000/AUTHFAIL'
}))
app.get('/auth/me', c.sendUserObjs)

app.get('/userInfo', c.getUserInfo)
app.get('/clientInfo', c.getClientInfo)
app.get('/adminInfo', c.getAdminInfo)
app.get('/userMenus', c.getUserMenus)
app.get('/userWorkouts', c.getUserWorkouts)
app.get('/user/progressPics', c.getAllProgressPhotos)
app.get('/user/currentPics', c.getCurrentPhotos)

app.get('/client/assigned/menus', c.getAssignedMenus)
app.get('/client/assigned/workouts', c.getAssignedWorkouts)
app.get('/coach/clients', c.getClients)


app.get('/food/search', c.searchFoods)

app.get('/meal/search', c.searchMeals)
app.get('/menu/search', c.searchMenus)


app.get('/exercise/search', c.searchExercises)
app.get(`/workout/search`, c.searchWorkouts)

app.put('/user/stats', c.updateStats)
app.put('/user/username', c.updateUsername)
app.put('/user/fullname', c.updateFullname)
app.put('/user/profilePic', c.updateProfilePic)
app.put('/user/progressPic/decurrentize', c.makePicNotCurrent)

app.put('/coach/request', c.requestCoachAccess)
app.put('/coach/approve', c.approveCoachAccess)
app.put('/coach/deny', c.denyCoachAccess)
app.put('/food/edit', c.editFood)
app.put('/meal/foods/quantity', c.updateFoodQuantity)
app.put('/menu', c.editMenu)
app.put('/exercise', c.editExercise)
app.put('/workout/exercise', c.updateWorkoutEx)

S3(app)

app.post('/user/mez', c.addMez)
app.post('/macroCalc', c.newMacroCalc)
app.post('/userMenus', c.addMenuToUser)
app.post('/userWorkouts', c.addWorkoutToUser)
app.post('/client/menus', c.assignMenuToClient)
app.post('/client/workouts', c.assignWorkoutToClient)

app.post('/food', c.createFood)
app.post('/meal/food', c.addFoodToMeal)
app.post('/meal', c.createMeal)
app.post('/menu', c.createMenu)
app.post('/menu/meal', c.addMealToMenu)

app.post('/exercise', c.createExercise)
app.post('/workout', c.createWorkout)
app.post('/workout/exercise', c.addExerciseToWorkout)


app.put('/meal/removeFood', c.removeFoodFromMeal)
app.put('/menu/removeMeal', c.removeMealFromMenu)
app.put('/workout/removeExercise/:id', c.removeExFromWorkout)

app.get('/exercise/:id', c.getExerciseById)
app.get('/workout/:id', c.getWorkoutById)
app.get('/user/:id', c.getUser)
app.get('/search/clients/:email', c.searchForClient)
app.get('/measurements/latest/:id', c.getLatestMes)
app.get('/measurements/:id', c.getMeasurements)
app.get('/food/search/:id', c.getFood)
app.get('/meal/search/:id', c.getMealById)
app.get('/menu/search/:id', c.getMenuById)



// Connecting to the DB prior to staring up the server so the DB is working for sure
massive(process.env.CONNECTION_STRING).then( db => {
    app.set('db', db);
    app.listen(port, () => {
        console.log(`Build your new Life on Port ${port}`)
    })
  })