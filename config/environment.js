const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');

const logDirectory = path.join(__dirname,'../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access.log',{
    interval: '1d',
    path: logDirectory
});


const development ={
    name: 'developement',
    asset_path:'./assets',
    session_cookie_key:'blahsomething',
    db:'codeial_development',
    smtp:{
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'socialioo.16@gmail.com',
            pass: 'ishi1607'
        }
    },
    google_client_id: '731283606924-tnbi5kg99kkhcvu5vu1ij2jjrkolso9r.apps.googleusercontent.com', 
    google_client_secret: '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', // e.g. _ASDFA%KFJWIASDFASD#FAD-
    google_call_back_url: "http://localhost:8000/users/auth/google/callback",
    jwt_secret:'codeial',
    morgan: {
        mode: 'dev',
        options: {stream: accessLogStream}
    }

}

const production={
    name: 'production',
    asset_path: process.env.FINSTA_ASSET_PATH,
    session_cookie_key:process.env.FINSTA_SESSION_COOKIE_KEY,
    db:process.env.FINSTA_DB,
    smtp:{
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.FINSTA_GMAIL_USERNAME,
            pass: process.env.FINSTA_GMAIL_PASSWORD
        }
    },
    google_client_id: process.env.FINSTA_GOOGLE_CLIENT_ID, 
    google_client_secret:process.env.FINSTA_GOOGLE_CLIENT_SECRET,
    google_call_back_url:process.env.FINSTA_GOOGLE_CALL_BACK_URL ,
    jwt_secret:process.env.FINSTA_JWT_SECRET,
    morgan: {
        mode: 'combined',
        options: {stream: accessLogStream}
    }
}

module.exports=eval(process.env.FINSTA_ENVIRONMENT) == undefined ? development : eval(process.env.FINSTA_ENVIRONMENT);