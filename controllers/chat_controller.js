/*const chat = require('../models/chat');

module.exports.chat = async function(req,res){
    let chats = await chat.find({});
    const room = req.params.room;


    res.render('_chat-box.ejs',{
        title:`Finsta ${req.params.room} Room`,
        messages:chats,
        room:req.params.room
    });
}

module.exports.destroy=async function(req,res){
    console.log(req.params.id);
    let message=await chat.findById(req.params.id);
    if(message!=undefined)
    {
        message.remove();
        if (req.xhr){
            return res.status(200).json({
                data: {
                    message_id: req.params.id
                },
                message: "Message deleted"
            });
        }
    }
}*/