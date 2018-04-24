require('dotenv').config()

const express          = require('express'),
      Auth0Strategy = require('passport-auth0'),
      cors             = require('cors') ,
      passport         = require('passport'),
      session          = require('express-session'),
      massive          = require('massive'),
      { CONNECTION_STRING, SESSION_SECRET, SERVER_PORT, DOMAIN, CLIENT_ID, CLIENT_SECRET, CALLBACK_URL } = process.env,
      c                = require('./controller'),
      port             = SERVER_PORT // || 3000

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
    scope: 'openid profile'
}, (accessToken, refreshToken, extraParams, profile, done) => {
    const { id, displayName, picture } = profile
    // const db = app.get('db') 
    // db.get_user([id]).then( users => {        
        // if ( users[0] ){
            // return done(null, users[0])
        // } 
        // else { //when someone is logginG in for the first time.             
            // db.create_user([displayName, picture, id]).then( createdUser => {
            // return done(null,{ id: createdUser.id } )
        // } ) }
    // } ).catch(err => {
    //     console.log(err)
    // })
    done(null, profile)
    console.log('listening?')
}) )

// When done, adds user to req.session.user
passport.serializeUser((user, done) => {
    console.log(`serial user ${user}`)
    done(null, user)
})


// When done, adds second parameter to req.user
passport.deserializeUser((user, done) => {
    // app.get('db').find_session_user([user.id])
    // .then( user => {
        console.log(`Deserial User: ${user}`)
    return done(null, user[0]);
    // })
})


app.get('/auth', passport.authenticate('auth0'))

app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect: 'http://localhost:3000/#/dashboard',
    failureRedirect: 'http://localhost:3000/AUTHFAIL'
}))





  

// Connecting to the DB prior to staring up the server so the DB is working for sure
massive(process.env.CONNECTION_STRING).then( db => {
    app.set('db', db);
    app.listen(port, () => {
        console.log(`Build your new Life on Port ${port}`)
      })
  })