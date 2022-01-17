const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db= require('./config/mongoose');
// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal= require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');
const sassMiddleware =  require('node-sass-middleware');

app.use(sassMiddleware({
   
    src:'./assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix:  '/css'  // Where prefix is at <link rel="stylesheets" href="prefix/style.css"/>
}));



app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));

app.use(expressLayouts);
// extract style and script from sub pages into the layouts
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);



// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(session(
    {
        name : 'Meow',
        secret : 'blahsomething',
        saveUninitialized : false,
        resave : false,
        cookie : 
        {
            maxAge : (1000*60*100)
        },
        store: MongoStore.create(
        {
            mongoUrl: 'mongodb://localhost/codeial_development',
            autoRemove : 'disabled'
        }, (err)=>
        {
            console.log(err || 'connect-mongodb setup ok');
        })
        
    }));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);


// use express router
app.use('/', require('./routes'));


app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});