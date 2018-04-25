const User = require('../models/user'); // Import User Model Schema
const Chat = require('../models/chat'); // Import Blog Model Schema
const jwt = require('jsonwebtoken'); // Compact, URL-safe means of representing claims to be transferred between two parties.
const config = require('../config/database'); // Import database configuration


module.exports = (router) => {




  router.post('/newChat', (req, res) => {
    // Check if blog title was provided

      if (!req.body.profileUsername) {
        res.json({ success: false, message: 'Profile username is required.' }); // Return error message
      } else {
        // Check if blog body was provided
        if (!req.body.message) {
          res.json({ success: false, message: 'mesage body is required.' }); // Return error message
        } else {
          // Check if blog's creator was provided
          if (!req.body.loggedInUser) {
            res.json({ success: false, message: 'message creator is required.' }); // Return error
          } else {
            // Create the blog object for insertion into database
            console.log('logged in user is '+req.body.loggedInUser);
            const user= req.body.loggedInUser;
            const chat = new Chat({
              profileUsername: req.body.profileUsername,
              message: req.body.message, // Title field
              loggedInUser: req.body.loggedInUser,
              sentBy: req.body.sentBy
            });
            console.log('in router loggedInUser   '+req.body.loggedInUser+'   '+chat.message);
            // Save blog into database
            chat.save((err) => {
              // Check if error
              if (err) {
                // Check if error is a validation error
                if (err.errors) {
                  // Check if validation error is in the title field
                  if (err.errors.profileUsername) {
                    res.json({ success: false, message: err.errors.profileUsername.message }); // Return error message
                  } else {
                    // Check if validation error is in the body field
                    if (err.errors.loggedInUser) {
                      res.json({ success: false, message: err.errors.loggedInUser.message }); // Return error message
                    } else {
                      res.json({ success: false, message: err }); // Return general error message
                    }
                  }
                } else {
                  res.json({ success: false, message: err }); // Return general error message
                }
              } else {
                res.json({ success: true, message: 'chat saved!' }); // Return success message
              }
            });
          }
        }
      }


  });








  router.get('/getMyChatUsers/:username', (req, res) => {
    // Search database for all blog posts
    console.log('user is   '+req.params.username);
    Chat.distinct('loggedInUser',{$and: [{profileUsername: req.params.username}] }, (err, users) => {
      // Check if error was found or not
      if (err) {
        res.json({ success: false, message: 'category issue' }); // Return error message
      } else {
        // Check if blogs were found in database
        if (!users) {
          res.json({ success: false, message: 'No blogs found.' }); // Return error of no blogs found
        } else {
          res.json({ success: true, users: users }); // Return success and blogs array
        }
      }
    }); // Sort blogs from newest to oldest
  });







    router.get('/getMyChatHistory/:user/:takeUser', (req, res) => {
      // Search database for all blog posts
      console.log('user is   '+req.params.user);
        console.log('takeUser is   '+req.params.takeUser);
      Chat.find({$and: [{sentBy: {$in: [req.params.user, req.params.takeUser]}},{profileUsername: {$in: [req.params.user, req.params.takeUser]}}]}, (err, chats) => {
        // Check if error was found or not
        if (err) {
          res.json({ success: false, message: 'category issue' }); // Return error message
        } else {
          // Check if blogs were found in database
          if (!chats) {
            res.json({ success: false, message: 'No chats found.' }); // Return error of no blogs found
          } else {
            res.json({ success: true, chats: chats }); // Return success and blogs array
          }
        }
      }).sort({ '_id': -1 }); // Sort blogs from newest to oldest
    });











    router.get('/getSingleMessage/:id', (req, res) => {
      // Check if id is present in parameters
      console.log('id   '+req.params.id);
      if (!req.params.id) {
        res.json({ success: false, message: 'No blog ID was provided.' }); // Return error message
      } else {
        // Check if the blog id is found in database
        Chat.findOne({ _id: req.params.id }, (err, message) => {
          // Check if the id is a valid ID
          if (err) {
            res.json({ success: false, message: 'Not a valid blog id' }); // Return error message
          } else {
            // Check if blog was found by id
            if (!message) {
              res.json({ success: false, message: 'Blog not found.' }); // Return error message
            } else {
              // Find the current user that is logged in
              User.findOne({ _id: req.decoded.userId }, (err, user) => {
                // Check if error was found
                if (err) {
                  res.json({ success: false, message: err }); // Return error
                } else {
                  // Check if username was found in database
                  if (!user) {
                    res.json({ success: false, message: 'Unable to authenticate user' }); // Return error message
                  } else {
                    // Check if the user who requested single blog is the one who created it
                    if (user.username !== message.sentBy) {
                      res.json({ success: false, message: 'You are not authorized to eidt this blog.' }); // Return authentication reror
                    } else {
                      res.json({ success: true, message: message }); // Return success
                    }
                  }
                }
              });
            }
          }
        });
      }
    });







      router.delete('/deleteMessage/:id', (req, res) => {

    if(!req.params.id){
      res.json({success: false, message: 'no id provided'});
    } else {
      Chat.findOne({_id: req.params.id}, (err, message) => {
      if(err){
        res.json({success: false, message: 'Invalid id'});
      } else {
        if(!message) {
          res.json({success: false, message: 'blog was not found'});
        } else {
          User.findOne({_id: req.decoded.userId}, (err, user) => {
            if(err){
              res.json({success: false, message: err});
            } else {
              if(!user){
                res.json({success:false, message: 'unable to authenticate user'});
              } else {
                if(user.username !== message.sentBy){
                  res.json({success: false, message:'not authorize to delete'});
                } else {
                  message.remove((err) => {
                    if(err) {
                      res.json({success: false, message: err});
                    } else {
                      res.json({success:true, message: 'message deleted'});
                    }
                  });
                }
              }
            }

          });
        }
      }


      });
    }


      });





  return router;
};
