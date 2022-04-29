const Post = require('../models/post');
const Chat = require("../models/chat");
const User = require('../models/user');

module.exports.home = async function(req, res){
    // console.log(req.cookies);
    // res.cookie('user_id', 25);

    try{
        // CHANGE :: populate the likes of each post and comment
         // populate the user of each post
         console.log(req.user);
         if(req.isAuthenticated()){
        let posts= await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path:'comments',
            populate: {
            path: 'user'
            }
        }).populate('comments')
        .populate('likes');

        let currUser;
        console.log("#######",req.user);

        currUser = await User.findById(req.user._id)
        .populate({
            path: 'friends',
            populate:{
                path: 'from'
            },
            populate:{
                path: 'to'
            }
        });

        console.log(currUser);

        let users = await User.find({});
    
        return res.render('home', {
            title: "Finsta | Home",
            posts:  posts,
            all_users: users,
            currUser: currUser

    
         });
    
        }


//let users = await User.find({});

// return res.render('home', {
//     title: "Finsta | Home",
//     posts:  posts,
//     all_users: users


//  });

return res.redirect('/users/sign-in')

    }catch(err){
     
        console.log('Error', err);
        return;
     }
    
        
   
}

module.exports.friend = async function (req,res){
    try{
        let friends=req.user.friends;
        let posts = await Post.find({user:{$in:friends}})
        .sort('-createdAt')
        .populate('user')
        .populate({
          path: 'comments',
          populate: {
              path:'user',
          },
          populate: {
              path: 'likes',
          }
        }).populate('comments')
        .populate('likes');

        let currUser;
        currUser = await User.findById(req.user._id)
        .populate('friends');

        console.log(currUser.friends);

        // if(req.user){
        //     currUser = await User.findById(req.user._id)
        //     .populate('friends');
        // }

        let users=await User.find({});
       
        return res.render('home', {
            title: "Finsta | Friends' Posts",
            posts:  posts,
            all_users: users,
            currUser: currUser
        });

    
    }catch(err){
        console.log('Error', err);
        return;
    }
}

// module.exports.actionName = function(req, res){}