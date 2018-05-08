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
      stripe           = require('stripe')(process.env.S_STRIPE_KEY),
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
app.use((req, res, next)=>{
    if(process.env.DEV_MODE){
        req.user = {
            auth_id:"google-oauth2|111122040963068924095",
            coach_id:-1,
            curr_carb:209,
            curr_fat:77,
            curr_mes_id:3,
            curr_pro:199,
            date_created:"2018-03-30T06:00:00.000Z",
            email:"bikerstevefitness@gmail.com",
            fullname:"",
            has_coach:false,
            is_admin:false,
            last_login:null,
            profile_pic:"https://images.unsplash.com/photo-1500068865647-1e1ce6b80f13?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=18c9049136182c9aba2fcd208054d3b3&auto=format&fit=crop&w=500&q=60",
            user_id:1,
            username:"BikerSteve Fitness"
        }
    }next()
})
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
            let x      = new Date()
              , msDate = x.getTime()
            db.create_user([displayName, emails[0].value, picture, id, msDate]).then( createdUser => {
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
app.get('auth/logout', (req, res)=>{
    req.logout()
    res.redirect('/')
})

app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect: 'http://localhost:3000/#/dashboard',
    failureRedirect: 'http://localhost:3000/AUTHFAIL'
}))
app.get('/auth/me', uc.sendUserObjs)

app.get('/userInfo', uc.getUserInfo)
app.get('/clientInfo', cc.getClientInfo)
app.get('/adminInfo', cc.getAdminInfo)
app.get('/userMenus', uc.getUserMenus)
app.get('/userWorkouts', uc.getUserWorkouts)
app.get('/user/currentPics', uc.getCurrentPhotos)
app.get('/user/progressPics', uc.getAllProgressPhotos)
app.get('/history/user/measurements', uc.getMezHistory)

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

app.put('/coach/request', cc.requestCoachAccess)
app.put('/coach/approve', cc.approveCoachAccess)
app.put('/coach/deny', cc.denyCoachAccess)
app.put('/food/edit', fc.editFood)
app.put('/meal/foods/quantity', fc.updateFoodQuantity)
app.put('/menu', fc.editMenu)
app.put('/exercise', fitc.editExercise)
app.put('/workout/exercise', fitc.updateWorkoutEx)
app.put('/user/menus/archive', uc.archiveMenu)
app.put('/user/workouts/archive', uc.archiveWorkout)
S3(app)

app.post('/api/charge', function(req, res){
    const db = app.get('db')
    console.log(req.body.amount)
    const charge = stripe.charges.create({
        amount: req.body.amount,
        currency: 'usd',
        source: req.body.token.id,
        description: 'Example charge'
      })
      res.sendStatus(200) // clear out cart here
})


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
app.put('/workout/removeExercise/:id', fitc.removeExFromWorkout)

app.get('/exercise/:id', fitc.getExerciseById)
app.get('/workout/:id', fitc.getWorkoutById)
app.get('/user/:id', uc.getUser)
app.get('/search/clients/:email', cc.searchForClient)
app.get('/measurements/latest/:id', uc.getLatestMes)
app.get('/measurements/:id', uc.getMeasurements)
app.get('/food/search/:id', fc.getFood)
app.get('/meal/search/:id', fc.getMealById)
app.get('/menu/search/:id', fc.getMenuById)



// Connecting to the DB prior to staring up the server so the DB is working for sure
massive(process.env.CONNECTION_STRING).then( db => {
    app.set('db', db);
    app.listen(port, () => {
        console.log(`Build your new Life on Port ${port}`)
    })
})