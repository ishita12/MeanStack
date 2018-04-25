const User = require('../models/user'); // Import User Model Schema
const Blog = require('../models/blog'); // Import Blog Model Schema
const jwt = require('jsonwebtoken'); // Compact, URL-safe means of representing claims to be transferred between two parties.
const config = require('../config/database'); // Import database configuration

module.exports = (router) => {

  /* ===============================================================
     CREATE NEW BLOG
  =============================================================== */
  router.post('/newBlog', (req, res) => {
    // Check if blog title was provided

    console.log('in new blog route   '+req.body.selectedCategory);
    if(!req.body.selectedCategory){
      console.log('1');
      res.json({ success: false, message: 'Blog category is required.' }); // Return error message

    } else {
      if (!req.body.title) {
        console.log('2');
        res.json({ success: false, message: 'Blog title is required.' }); // Return error message
      } else {
        // Check if blog body was provided
        if (!req.body.body) {
          console.log('3');
          res.json({ success: false, message: 'Blog body is required.' }); // Return error message
        } else {
          // Check if blog's creator was provided
          if (!req.body.createdBy) {
            console.log('4');
            res.json({ success: false, message: 'Blog creator is required.' }); // Return error
          } else {
            console.log('success');
            // Create the blog object for insertion into database
            const blog = new Blog({
              selectedCategory: req.body.selectedCategory,
              title: req.body.title, // Title field
              body: req.body.body, // Body field
              createdBy: req.body.createdBy // CreatedBy field
            });
            console.log('blog details are    '+blog.selectedCategory+'     '+blog.title+'      '+blog.body+'      '+blog.createdBy);
            // Save blog into database
            blog.save((err) => {
              // Check if error
              if (err) {
                console.log('5');
                // Check if error is a validation error
                if (err.errors) {
                  // Check if validation error is in the title field
                  if (err.errors.title) {
                    console.log('6');
                    res.json({ success: false, message: err.errors.title.message }); // Return error message
                  } else {
                    // Check if validation error is in the body field
                    if (err.errors.body) {
                      console.log('7');
                      res.json({ success: false, message: err.errors.body.message }); // Return error message
                    } else {
                      console.log('8');
                      res.json({ success: false, message: err }); // Return general error message
                    }
                  }
                } else {
                  console.log('9');
                  res.json({ success: false, message: err }); // Return general error message
                }
              } else {
                res.json({ success: true, message: 'Blog saved!' }); // Return success message
              }
            });
          }
        }
      }
    }

  });

  /* ===============================================================
     GET ALL BLOGS
  =============================================================== */
  router.get('/allBlogs', (req, res) => {
    // Search database for all blog posts
    Blog.find({}, (err, blogs) => {
      // Check if error was found or not
      if (err) {
        res.json({ success: false, message: 'category issue' }); // Return error message
      } else {
        // Check if blogs were found in database
        if (!blogs) {
          res.json({ success: false, message: 'No blogs found.' }); // Return error of no blogs found
        } else {
          res.json({ success: true, blogs: blogs }); // Return success and blogs array
        }
      }
    }).sort({ '_id': -1 }); // Sort blogs from newest to oldest
  });





  /* ===============================================================
     UPDATE BLOG POST
  =============================================================== */
  router.put('/updateBlog', (req, res) => {
    // Check if id was provided
    if (!req.body._id) {
      res.json({ success: false, message: 'No blog id provided' }); // Return error message
    } else {
      // Check if id exists in database
      Blog.findOne({ _id: req.body._id }, (err, blog) => {
        // Check if id is a valid ID
        if (err) {
          res.json({ success: false, message: 'Not a valid blog id' }); // Return error message
        } else {
          // Check if id was found in the database
          if (!blog) {
            res.json({ success: false, message: 'Blog id was not found.' }); // Return error message
          } else {
            // Check who user is that is requesting blog update
            User.findOne({ _id: req.decoded.userId }, (err, user) => {
              // Check if error was found
              if (err) {
                res.json({ success: false, message: err }); // Return error message
              } else {
                // Check if user was found in the database
                if (!user) {
                  res.json({ success: false, message: 'Unable to authenticate user.' }); // Return error message
                } else {
                  // Check if user logged in the the one requesting to update blog post
                  if (user.username !== blog.createdBy) {
                    res.json({ success: false, message: 'You are not authorized to edit this blog post.' }); // Return error message
                  } else {
                    blog.title = req.body.title; // Save latest blog title
                    blog.body = req.body.body; // Save latest body
                    console.log('updated fields are  '+ blog.title+ '   '+ blog.body );
                    blog.save((err) => {
                      if (err) {
                        if (err.errors) {
                          res.json({ success: false, message: 'Please ensure form is filled out properly' });
                        } else {
                          res.json({ success: false, message: err }); // Return error message
                        }
                      } else {
                        res.json({ success: true, message: 'Blog Updated!' }); // Return success message
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


  /* ===============================================================
     GET SINGLE BLOG
  =============================================================== */
  router.get('/singleBlog/:id', (req, res) => {
    // Check if id is present in parameters
    if (!req.params.id) {
      res.json({ success: false, message: 'No blog ID was provided.' }); // Return error message
    } else {
      // Check if the blog id is found in database
      Blog.findOne({ _id: req.params.id }, (err, blog) => {
        // Check if the id is a valid ID
        if (err) {
          res.json({ success: false, message: 'Not a valid blog id' }); // Return error message
        } else {
          // Check if blog was found by id
          if (!blog) {
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
                  if (user.username !== blog.createdBy) {
                    res.json({ success: false, message: 'You are not authorized to eidt this blog.' }); // Return authentication reror
                  } else {
                    res.json({ success: true, blog: blog }); // Return success
                  }
                }
              }
            });
          }
        }
      });
    }
  });


  router.delete('/deleteBlog/:id', (req, res) => {

if(!req.params.id){
  res.json({success: false, message: 'no id provided'});
} else {
  Blog.findOne({_id: req.params.id}, (err, blog) => {
  if(err){
    res.json({success: false, message: 'Invalid id'});
  } else {
    if(!blog) {
      res.json({success: false, message: 'blog was not found'});
    } else {
      User.findOne({_id: req.decoded.userId}, (err, user) => {
        if(err){
          res.json({success: false, message: err});
        } else {
          if(!user){
            res.json({success:false, message: 'unable to authenticate user'});
          } else {
            if(user.username !== blog.createdBy){
              res.json({success: false, message:'not authorize to delete'});
            } else {
              blog.remove((err) => {
                if(err) {
                  res.json({success: false, message: err});
                } else {
                  res.json({success:true, message: 'blog deleted'});
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
  router.put('/likeBlog', (req, res) => {
      // Check if id was passed provided in request body
      if (!req.body.id) {
        res.json({ success: false, message: 'No id was provided.' }); // Return error message
      } else {
        // Search the database with id
        Blog.findOne({ _id: req.body.id }, (err, blog) => {
          // Check if error was encountered
          if (err) {
            res.json({ success: false, message: 'Invalid blog id' }); // Return error message
          } else {
            // Check if id matched the id of a blog post in the database
            if (!blog) {
              res.json({ success: false, message: 'That blog was not found.' }); // Return error message
            } else {
              // Get data from user that is signed in
              User.findOne({ _id: req.decoded.userId }, (err, user) => {
                // Check if error was found
                if (err) {
                  res.json({ success: false, message: 'Something went wrong.' }); // Return error message
                } else {
                  // Check if id of user in session was found in the database
                  if (!user) {
                    res.json({ success: false, message: 'Could not authenticate user.' }); // Return error message
                  } else {
                    // Check if user who liked post is the same user that originally created the blog post
                    if (user.username === blog.createdBy) {
                      res.json({ success: false, messagse: 'Cannot like your own post.' }); // Return error message
                    } else {
                      // Check if the user who liked the post has already liked the blog post before
                      if (blog.likedBy.includes(user.username)) {
                        res.json({ success: false, message: 'You already liked this post.' }); // Return error message
                      } else {
                        // Check if user who liked post has previously disliked a post
                        if (blog.dislikedBy.includes(user.username)) {
                          blog.dislikes--; // Reduce the total number of dislikes
                          const arrayIndex = blog.dislikedBy.indexOf(user.username); // Get the index of the username in the array for removal
                          blog.dislikedBy.splice(arrayIndex, 1); // Remove user from array
                          blog.likes++; // Increment likes
                          blog.likedBy.push(user.username); // Add username to the array of likedBy array
                          // Save blog post data
                          blog.save((err) => {
                            // Check if error was found
                            if (err) {
                              res.json({ success: false, message: 'Something went wrong.' }); // Return error message
                            } else {
                              res.json({ success: true, message: 'Blog liked!' }); // Return success message
                            }
                          });
                        } else {
                          blog.likes++; // Incriment likes
                          blog.likedBy.push(user.username); // Add liker's username into array of likedBy
                          // Save blog post
                          blog.save((err) => {
                            if (err) {
                              res.json({ success: false, message: 'Something went wrong.' }); // Return error message
                            } else {
                              res.json({ success: true, message: 'Blog liked!' }); // Return success message
                            }
                          });
                        }
                      }
                    }
                  }
                }
              });
            }
          }
        });
      }
    });

/* ===============================================================
    DISLIKE BLOG POST
 =============================================================== */
 router.put('/dislikeBlog', (req, res) => {
   // Check if id was provided inside the request body
   if (!req.body.id) {
     res.json({ success: false, message: 'No id was provided.' }); // Return error message
   } else {
     // Search database for blog post using the id
     Blog.findOne({ _id: req.body.id }, (err, blog) => {
       // Check if error was found
       if (err) {
         res.json({ success: false, message: 'Invalid blog id' }); // Return error message
       } else {
         // Check if blog post with the id was found in the database
         if (!blog) {
           res.json({ success: false, message: 'That blog was not found.' }); // Return error message
         } else {
           // Get data of user who is logged in
           User.findOne({ _id: req.decoded.userId }, (err, user) => {
             // Check if error was found
             if (err) {
               res.json({ success: false, message: 'Something went wrong.' }); // Return error message
             } else {
               // Check if user was found in the database
               if (!user) {
                 res.json({ success: false, message: 'Could not authenticate user.' }); // Return error message
               } else {
                 // Check if user who disliekd post is the same person who originated the blog post
                 if (user.username === blog.createdBy) {
                   res.json({ success: false, messagse: 'Cannot dislike your own post.' }); // Return error message
                 } else {
                   // Check if user who disliked post has already disliked it before
                   if (blog.dislikedBy.includes(user.username)) {
                     res.json({ success: false, message: 'You already disliked this post.' }); // Return error message
                   } else {
                     // Check if user has previous disliked this post
                     if (blog.likedBy.includes(user.username)) {
                       blog.likes--; // Decrease likes by one
                       const arrayIndex = blog.likedBy.indexOf(user.username); // Check where username is inside of the array
                       blog.likedBy.splice(arrayIndex, 1); // Remove username from index
                       blog.dislikes++; // Increase dislikeds by one
                       blog.dislikedBy.push(user.username); // Add username to list of dislikers
                       // Save blog data
                       blog.save((err) => {
                         // Check if error was found
                         if (err) {
                           res.json({ success: false, message: 'Something went wrong.' }); // Return error message
                         } else {
                           res.json({ success: true, message: 'Blog disliked!' }); // Return success message
                         }
                       });
                     } else {
                       blog.dislikes++; // Increase likes by one
                       blog.dislikedBy.push(user.username); // Add username to list of likers
                       // Save blog data
                       blog.save((err) => {
                         // Check if error was found
                         if (err) {
                           res.json({ success: false, message: 'Something went wrong.' }); // Return error message
                         } else {
                           res.json({ success: true, message: 'Blog disliked!' }); // Return success message
                         }
                       });
                     }
                   }
                 }
               }
             }
           });
         }
       }
     });
   }
 });


//post comments

router.post('/comment', (req,res) => {

if(!req.body.comment){
  res.json({success:false, message:'no comment provided'});
} else {
  if(!req.body.id) {
    res.json({success: false, message: 'no id found'});
  } else {
    Blog.findOne({_id: req.body.id}, (err, blog) => {

   if(err){
     res.json({success: false, message: err});
   } else {
     if(!blog) {
       res.json({success:false, message: 'blog not found'});
     } else {
       User.findOne({_id: req.decoded.userId}, (err,user) => {
    if(err) {
      res.json({success:false, message: err});
    } else {
      if(!user) {
        res.json({success:false, message:'user not found'});
      } else {
        blog.comments.push({
          comment: req.body.comment,
          commentator: user.username
        });

        blog.save((err) => {
          if(err) {
            res.json({success:false, message: err});
          } else {
            res.json({success:true, message:'comment saved'});
          }
        });
      }
    }

       });
     }
   }


    });
  }
}

});




  return router;
};
