const nodemailer=require('../config/nodemailer');

exports.forgot_password=(link,mail)=>{
    let htmlString=nodemailer.renderTemplate({link},'./reset_password/reset.ejs')
    nodemailer.transporter.sendMail({
        from:'socialioo.16@gmail.com',
        to:mail,
        subject:'Reset Password',
        html:htmlString
        
    },function(err){
        if(err){
            console.log("Email not sent");
            return;
        }
        else{
            console.log("Mail Sent")
        }
    })
}