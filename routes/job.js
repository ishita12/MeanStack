const User = require('../models/user'); // Import User Model Schema
const Job = require('../models/job'); // Import Blog Model Schema
const jwt = require('jsonwebtoken'); // Compact, URL-safe means of representing claims to be transferred between two parties.
const config = require('../config/database'); // Import database configuration
const Application =  require('../models/application');
const Priority =  require('../models/priority');
const ViewJob =  require('../models/viewJob');


module.exports = (router) => {


  /* ===============================================================
     CREATE NEW BLOG
  =============================================================== */
  router.post('/newJob', (req, res) => {

console.log('inside newJob route     '+req.body.deadline);


   if(!req.body.createdBy){
     res.json({ success: false, message: 'Job creator is required.' }); // Return error message

   } else {

     if(!req.body.title){
       res.json({ success: false, message: 'Job title is required.' }); // Return error message

     } else {

       if(!req.body.company){
         res.json({ success: false, message: 'Job company is required.' }); // Return error message

       } else {

         if(!req.body.description){
           res.json({ success: false, message: 'Job description is required.' }); // Return error message

         }  else {

           const d = req.body.deadline;
           const dd= new Date(d);
           const ddd = dd.toDateString();
console.log('lets test the date   '+ddd);
           const job = new Job({

             title: req.body.title, // Title field
             company: req.body.company, // Body field
             description: req.body.description, // CreatedBy field
             deadline: ddd,
             createdBy: req.body.createdBy
           });

             job.save((err) => {
               if (err) {

              if(err.errors){

                if (err.errors.title) {
                  res.json({ success: false, message: err.errors.title.message }); // Return error message
                } else {
                  if (err.errors.company) {
                    res.json({ success: false, message: err.errors.company.message }); // Return error message
                  } else {
                    if (err.errors.description) {
                      res.json({ success: false, message: err.errors.description.message }); // Return error message
                    } else {
                      res.json({ success: false, message: err }); // Return general error message
                    }
                  }
                }



              } else {
                res.json({ success: false, message: err }); // Return general error message
              }


               } else {
                 res.json({ success: true, message: 'job saved!' }); // Return success message
               }


             });

         }
       }


     }

   }

  });



// save viewed job




router.post('/saveViewJob', (req,res) => {

  const viewJob = new ViewJob({

    username: req.body.username, // CreatedBy field
    jobID: req.body.jobID
  });
  // Save blog into database


console.log('user  details are     '+viewJob.username+'          '+viewJob.jobID);

  viewJob.save((err) => {
    // Check if error
    if (err) {
      // Check if error is a validation error
      if (err.errors) {
        // Check if validation error is in the title field
        if (err.errors.username) {
          console.log('user error ');
          res.json({ success: false, message: err.errors.username.message }); // Return error message
        } else {
          // Check if validation error is in the body field
          if (err.errors.jobID) {
                console.log('company error');
            res.json({ success: false, message: err.errors.jobID.message }); // Return error message
          } else {
                console.log('random error');
            res.json({ success: false, message: err }); // Return general error message
          }
        }
      } else {
            console.log('no error');
        res.json({ success: false, message: err }); // Return general error message
      }
    } else {
          console.log('view job saved   ');
      res.json({ success: true, viewJob: viewJob }); // Return success message
    }
  });


});













// add priority




router.post('/addPriority', (req,res) => {

  const priority = new Priority({

    position: req.body.position, // Title field
    companyName: req.body.companyName, // Body field
    username: req.body.username, // CreatedBy field
    jobID: req.body.jobID
  });
  // Save blog into database


console.log('priority details are     '+priority.position);

  priority.save((err) => {
    // Check if error
    if (err) {
      // Check if error is a validation error
      if (err.errors) {
        // Check if validation error is in the title field
        if (err.errors.position) {
          console.log('position error ');
          res.json({ success: false, message: err.errors.position.message }); // Return error message
        } else {
          // Check if validation error is in the body field
          if (err.errors.companyName) {
                console.log('company error');
            res.json({ success: false, message: err.errors.companyName.message }); // Return error message
          } else {
                console.log('random error');
            res.json({ success: false, message: err }); // Return general error message
          }
        }
      } else {
            console.log('no error');
        res.json({ success: false, message: err }); // Return general error message
      }
    } else {
          console.log('job5');
      res.json({ success: true, priority: priority }); // Return success message
    }
  });


});


//remove priority


router.delete('/removePriority/:id/:username', (req,res) => {

console.log('priority removal route');
  const priority = new Priority({

    position: req.body.position, // Title field
    companyName: req.body.companyName, // Body field
    username: req.body.username, // CreatedBy field
    jobID: req.body.jobID
  });

console.log('priority deletion id is     '+req.params.id)
  console.log('priority to be removed details are in the route    !!!!!'+priority.position+ '     '+priority.companyName+'        '+priority.username+'       '+priority.jobID);



  Priority.findOne({jobID: req.params.id}, (err, priority) => {
  if(err){
    console.log('removal  1');
    res.json({success: false, message: 'Invalid id'});
  } else {
    if(!priority) {
          console.log('removal  2');
      res.json({success: false, message: 'job was not found'});
    } else {
      User.findOne({_id: req.decoded.userId}, (err, user) => {
        if(err){
              console.log('removal  3');
          res.json({success: false, message: err});
        } else {
          if(!user){
                console.log('removal  4');
            res.json({success:false, message: 'unable to authenticate user'});
          } else {
            if(user.username !== req.params.username){
                  console.log('removal  5');

              res.json({success: false, message:'not authorize to delete'});
            } else {
              priority.remove((err) => {
                if(err) {
                      console.log('removal  6');
                  res.json({success: false, message: err});
                } else {
                      console.log('removal  7');
                  res.json({success:true, message: 'priority deleted'});
                }
              });
            }
          }
        }

      });
    }
  }


  });



});


//viewed jobs



  router.get('/getViews/:username', (req, res) => {
console.log('inside getViews route    ');

    // Check if id is present in parameters
    if (!req.params.username) {

      res.json({ success: false, message: 'No user  was found.' }); // Return error message
    } else {
      // Check if the blog id is found in database
      ViewJob.find({ username: req.params.username }, (err, views) => {
      //  console.log('jjjj!!!!!!!!!!      '+ job[0].createdBy);
        // Check if the id is a valid ID
console.log('Ishita username   '+req.params.username);
        if (err) {

          res.json({ success: false, message: 'Not a valid job id' }); // Return error message
        } else {
          // Check if blog was found by id
          if (!views) {

            res.json({ success: false, message: 'views not found.' }); // Return error message
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
                    console.log('views found   ');
                    res.json({ success: true, views: views }); // Return success
                  //}
                }
              }
            });
          }
        }
      });
    }

  });









//get all priorities for a user





  router.get('/getPriority/:username', (req, res) => {
console.log('inside priority route    ');

    // Check if id is present in parameters
    if (!req.params.username) {

      res.json({ success: false, message: 'No user  was found.' }); // Return error message
    } else {
      // Check if the blog id is found in database
      Priority.find({ username: req.params.username }, (err, priority) => {
      //  console.log('jjjj!!!!!!!!!!      '+ job[0].createdBy);
        // Check if the id is a valid ID
console.log('Ishita username   '+req.params.username);
        if (err) {

          res.json({ success: false, message: 'Not a valid job id' }); // Return error message
        } else {
          // Check if blog was found by id
          if (!priority) {

            res.json({ success: false, message: 'priority not found.' }); // Return error message
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
                    console.log('priority found   ');
                    res.json({ success: true, priority: priority }); // Return success
                  //}
                }
              }
            });
          }
        }
      });
    }

  });


// get viewed jobs



  router.get('/getSavedJobs/:username', (req, res) => {
console.log('inside getSavedJobs route    ');
console.log(' inside get saved jobs route username is    '+req.params.username);
    // Check if id is present in parameters
    if (!req.params.username) {

      res.json({ success: false, message: 'No user  was found.' }); // Return error message
    } else {
      // Check if the blog id is found in database
      ViewJob.find({ username: req.params.username }).select('jobID').exec((err, myViewJobs) => {
      //  console.log('jjjj!!!!!!!!!!      '+ job[0].createdBy);
        // Check if the id is a valid ID
      console.log('Ishita username   '+req.params.username);
        if (err) {

          res.json({ success: false, message: 'Not a valid job id' }); // Return error message
        } else {
          // Check if blog was found by id
          if (!myViewJobs) {

            res.json({ success: false, message: 'myViewJobs not found.' }); // Return error message
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
                    console.log('view jobs found yayyyy  ');
                    res.json({ success: true, myViewJobs: myViewJobs }); // Return success
                  //}
                }
              }
            });
          }
        }
      });
    }

  });


//get jobs that have deadline today



  router.get('/getTodayDeadlineJobs', (req, res) => {


    const date = new Date(Date.now());
    const dateNow= date.toDateString();
    console.log('date value is   '+dateNow);



      // Check if the blog id is found in database
      Job.find({ deadline: dateNow },(err, todayDeadlineJobs) => {
      //  console.log('jjjj!!!!!!!!!!      '+ job[0].createdBy);
        // Check if the id is a valid ID

        if (err) {

          res.json({ success: false, message: 'Not a valid job id' }); // Return error message
        } else {
          // Check if blog was found by id
          if (!todayDeadlineJobs) {

            res.json({ success: false, message: 'jobs not found.' }); // Return error message
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


console.log('whats up its a success');
                    res.json({ success: true, todayDeadlineJobs: todayDeadlineJobs }); // Return success
                  //}
                }
              }
            });
          }
        }
      });


  });



// deadline within 10 days




  router.get('/getDeadlineJobsWithin10Days', (req, res) => {


    const date = new Date(Date.now());
    const dateNow= date.toDateString();
    console.log('today the date is   line 514   '+dateNow);



      // Check if the blog id is found in database
      Job.find({},(err, getDeadlineJobsWithin10Days) => {
      //  console.log('jjjj!!!!!!!!!!      '+ job[0].createdBy);
        // Check if the id is a valid ID

        if (err) {

          res.json({ success: false, message: 'Not a valid job id' }); // Return error message
        } else {
          // Check if blog was found by id
          if (!getDeadlineJobsWithin10Days) {

            res.json({ success: false, message: 'jobs not found.' }); // Return error message
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


console.log('whats up its a success           getDeadlineJobsWithin10Days');
                    res.json({ success: true, getDeadlineJobsWithin10Days: getDeadlineJobsWithin10Days }); // Return success
                  //}
                }
              }
            });
          }
        }
      });


  });












  router.get('/allJobByUser/:username', (req, res) => {


    // Check if id is present in parameters
    if (!req.params.username) {

      res.json({ success: false, message: 'No user  was found.' }); // Return error message
    } else {
      // Check if the blog id is found in database
      Job.find({ createdBy: req.params.username }, (err, job) => {
      //  console.log('jjjj!!!!!!!!!!      '+ job[0].createdBy);
        // Check if the id is a valid ID
console.log('username!!!!!!!!!!!name   '+req.params.username);
        if (err) {

          res.json({ success: false, message: 'Not a valid job id' }); // Return error message
        } else {
          // Check if blog was found by id
          if (!job) {

            res.json({ success: false, message: 'jobs not found.' }); // Return error message
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

                    res.json({ success: true, job: job }); // Return success
                  //}
                }
              }
            });
          }
        }
      });
    }

  });

//get priority jobs by job ids



router.get('/getJobs/:jobArray', (req, res) => {


const jobPArray = req.params.jobArray.split(",");

for(var i in jobPArray){
  console.log('jobs that have been marked as priority but were also applied !!!!!!!!!!!!!'+ jobPArray[i]);
}


Priority.find({jobID: {$nin: jobPArray}}, (err, jobs) => {

  if (err) {
    console.log('inside errr    and the error is     '+err);

    res.json({ success: false, message: err }); // Return error
  } else {
console.log('inside else    ');
    // Find the current user that is logged in
    User.findOne({ _id: req.decoded.userId }, (err, user) => {
      // Check if error was found
      if (err) {
console.log('inside errrrrrrrrrrrrrrrrrrr    ');
        res.json({ success: false, message: err }); // Return error
      } else {
        // Check if username was found in database
        if (!user) {


   console.log('user not found    ');
          res.json({ success: false, message: 'Unable to authenticate user' }); // Return error message
        } else {
  console.log('jobs that have been marked as priority but were not applied    ');
            res.json({ success: true, jobs: jobs }); // Return success
          //}
        }
      }
    });

  }

});




});





// search by id





router.get('/searchById/:aJobs', (req, res) => {

//console.log('inside route    '+ req.params.finalJobs[1]);
const aJobsArray = req.params.aJobs.split(",");

for(var i in aJobsArray){
  console.log('my final jobs are        !!!!!!!!!!!!!'+ aJobsArray[i]);
}


Job.find({_id: {$in: aJobsArray}}, (err, myFinalJobs) => {

  if (err) {
    console.log('inside errr    and the error is     '+err);

    res.json({ success: false, message: err }); // Return error
  } else {
console.log('inside else    ');
    // Find the current user that is logged in
    User.findOne({ _id: req.decoded.userId }, (err, user) => {
      // Check if error was found
      if (err) {
console.log('inside errrrrrrrrrrrrrrrrrrr    ');
        res.json({ success: false, message: err }); // Return error
      } else {
        // Check if username was found in database
        if (!user) {


   console.log('user not found    ');
          res.json({ success: false, message: 'Unable to authenticate user' }); // Return error message
        } else {
  console.log('my final jobs   ');
            res.json({ success: true, myFinalJobs: myFinalJobs }); // Return success
          //}
        }
      }
    });

  }

});


});















router.get('/searchById10/:aJobs', (req, res) => {

//console.log('inside route    '+ req.params.finalJobs[1]);
const aJobsArray = req.params.aJobs.split(",");

for(var i in aJobsArray){
  console.log('my final jobs are        !!!!!!!!!!!!!'+ aJobsArray[i]);
}


Job.find({_id: {$in: aJobsArray}}, (err, myFinalJobs) => {

  if (err) {
    console.log('inside errr    and the error is     '+err);

    res.json({ success: false, message: err }); // Return error
  } else {
console.log('inside else    ');
    // Find the current user that is logged in
    User.findOne({ _id: req.decoded.userId }, (err, user) => {
      // Check if error was found
      if (err) {
console.log('inside errrrrrrrrrrrrrrrrrrr    ');
        res.json({ success: false, message: err }); // Return error
      } else {
        // Check if username was found in database
        if (!user) {


   console.log('user not found    ');
          res.json({ success: false, message: 'Unable to authenticate user' }); // Return error message
        } else {
  console.log('searchById10  route   ');
            res.json({ success: true, myFinalJobs: myFinalJobs }); // Return success
          //}
        }
      }
    });

  }

});


});



router.get('/searchByIdNew/:ids', (req, res) => {

//console.log('inside route    '+ req.params.finalJobs[1]);
const jobFinal = req.params.ids.split(",");

for(var i in jobFinal){
  console.log('my final jobs are        !!!!!!!!!!!!!'+ jobFinal[i]);
}


Job.find({_id: {$in: jobFinal}}, (err, finalJobs) => {

  if (err) {
    console.log('inside errr    and the error is     '+err);

    res.json({ success: false, message: err }); // Return error
  } else {
console.log('inside else    ');
    // Find the current user that is logged in
    User.findOne({ _id: req.decoded.userId }, (err, user) => {
      // Check if error was found
      if (err) {
console.log('inside errrrrrrrrrrrrrrrrrrr    ');
        res.json({ success: false, message: err }); // Return error
      } else {
        // Check if username was found in database
        if (!user) {


   console.log('user not found    ');
          res.json({ success: false, message: 'Unable to authenticate user' }); // Return error message
        } else {
  console.log('searchByIdNew  route   ');
            res.json({ success: true, finalJobs: finalJobs }); // Return success
          //}
        }
      }
    });

  }

});


});




router.get('/searchJobsWithID/:ids', (req, res) => {

//console.log('inside route    '+ req.params.finalJobs[1]);
const idsArray = req.params.ids.split(",");
console.log('inside searchJobsWithID route');

for(var i in idsArray){
  console.log('Jobs whose deadlinen is available are        !!!!!!!!!!!!!'+ idsArray[i]);
}


Job.find({_id: {$in: idsArray}}, (err, jobPosts) => {

  if (err) {
    console.log('inside errr    and the error is     '+err);

    res.json({ success: false, message: err }); // Return error
  } else {
console.log('inside else    ');
    // Find the current user that is logged in
    User.findOne({ _id: req.decoded.userId }, (err, user) => {
      // Check if error was found
      if (err) {
console.log('inside errrrrrrrrrrrrrrrrrrr    ');
        res.json({ success: false, message: err }); // Return error
      } else {
        // Check if username was found in database
        if (!user) {


   console.log('user not found    ');
          res.json({ success: false, message: 'Unable to authenticate user' }); // Return error message
        } else {
  console.log('searchJobsWithID jobs   success');
            res.json({ success: true, jobPosts: jobPosts }); // Return success
          //}
        }
      }
    });

  }

});


});















//get final jobssss




router.get('/finalJobs/:finalJobs', (req, res) => {

//console.log('inside route    '+ req.params.finalJobs[1]);
const priorityNotApplied = req.params.finalJobs.split(",");

for(var i in priorityNotApplied){
  console.log('final jobs that are priority and can be applied are    !!!!!!!!!!!!!'+ priorityNotApplied[i]);
}


Job.find({_id: {$in: priorityNotApplied}}, (err, finalJobs) => {

  if (err) {
    console.log('inside errr    and the error is     '+err);

    res.json({ success: false, message: err }); // Return error
  } else {
console.log('inside else    ');
    // Find the current user that is logged in
    User.findOne({ _id: req.decoded.userId }, (err, user) => {
      // Check if error was found
      if (err) {
console.log('inside errrrrrrrrrrrrrrrrrrr    ');
        res.json({ success: false, message: err }); // Return error
      } else {
        // Check if username was found in database
        if (!user) {


   console.log('user not found    ');
          res.json({ success: false, message: 'Unable to authenticate user' }); // Return error message
        } else {
  console.log('job post found    ');
            res.json({ success: true, finalJobs: finalJobs }); // Return success
          //}
        }
      }
    });

  }

});


});









//actualJobs


router.get('/actualJobs/:appliedJobs', (req, res) => {

console.log('inside route    '+ req.params.appliedJobs[1]);
const jobArray = req.params.appliedJobs.split(",");

for(var i in jobArray){
  console.log('job array is !!!!!!!!!!!!!'+ jobArray[i]);
}


Job.find({_id: {$nin: jobArray}}, (err, post) => {

  if (err) {
    console.log('inside errr    and the error is     '+err);

    res.json({ success: false, message: err }); // Return error
  } else {
console.log('inside else    ');
    // Find the current user that is logged in
    User.findOne({ _id: req.decoded.userId }, (err, user) => {
      // Check if error was found
      if (err) {
console.log('inside errrrrrrrrrrrrrrrrrrr    ');
        res.json({ success: false, message: err }); // Return error
      } else {
        // Check if username was found in database
        if (!user) {


   console.log('user not found    ');
          res.json({ success: false, message: 'Unable to authenticate user' }); // Return error message
        } else {
  console.log('job post found    ');
            res.json({ success: true, post: post }); // Return success
          //}
        }
      }
    });

  }

});






});

// get priority jobs which are not applied




router.get('/pArray/:pArray', (req, res) => {


const priorityJOBS = req.params.pArray.split(",");
for(var j in priorityJOBS){
  console.log('inside route  pjobs  '+ priorityJOBS[j]);
}

for(var i in priorityJOBS){
  console.log('pjobs array is !!!!!!!!!!!!!'+ priorityJOBS[i]);
}


Application.find({jobID: {$in: priorityJOBS}}, (err, priorityAndAppliedJobs) => {

  if (err) {
    console.log('inside errr    and the error is     '+err);

    res.json({ success: false, message: err }); // Return error
  } else {
console.log('inside else    ');
    // Find the current user that is logged in
    User.findOne({ _id: req.decoded.userId }, (err, user) => {
      // Check if error was found
      if (err) {
console.log('inside errrrrrrrrrrrrrrrrrrr    ');
        res.json({ success: false, message: err }); // Return error
      } else {
        // Check if username was found in database
        if (!user) {


   console.log('user not found    ');
          res.json({ success: false, message: 'Unable to authenticate user' }); // Return error message
        } else {
  console.log('job post found    ');
            res.json({ success: true, priorityAndAppliedJobs: priorityAndAppliedJobs }); // Return success
          //}
        }
      }
    });

  }

});

});


//   get jobs that are not applied


router.get('/notAppliedJobs/:jobs1', (req, res) => {


const array1 = req.params.jobs1.split(",");
for(var j in array1){
  console.log('inside route  pjobs  '+ array1[j]);
}


Job.find({_id: {$nin: array1}}, (err, availJobs) => {

  if (err) {
    console.log('inside errr    and the error is     '+err);

    res.json({ success: false, message: err }); // Return error
  } else {
console.log('inside else    ');
    // Find the current user that is logged in
    User.findOne({ _id: req.decoded.userId }, (err, user) => {
      // Check if error was found
      if (err) {
console.log('inside errrrrrrrrrrrrrrrrrrr    ');
        res.json({ success: false, message: err }); // Return error
      } else {
        // Check if username was found in database
        if (!user) {


   console.log('user not found    ');
          res.json({ success: false, message: 'Unable to authenticate user' }); // Return error message
        } else {
  console.log('job post found    ');
            res.json({ success: true, availJobs: availJobs }); // Return success
          //}
        }
      }
    });

  }

});

});



// not applied jobs 10



router.get('/notAppliedJobs10/:jobs10', (req, res) => {

console.log('notAppliedJobs10 route ');
const array1 = req.params.jobs10.split(",");
for(var j in array1){
  console.log('inside route  pjobs  '+ array1[j]);
}


Job.find({_id: {$nin: array1}}, (err, availJobs10) => {

  if (err) {
    console.log('inside errr    and the error is     '+err);

    res.json({ success: false, message: err }); // Return error
  } else {
console.log('inside else    ');
    // Find the current user that is logged in
    User.findOne({ _id: req.decoded.userId }, (err, user) => {
      // Check if error was found
      if (err) {
console.log('inside errrrrrrrrrrrrrrrrrrr    ');
        res.json({ success: false, message: err }); // Return error
      } else {
        // Check if username was found in database
        if (!user) {


   console.log('user not found    ');
          res.json({ success: false, message: 'Unable to authenticate user' }); // Return error message
        } else {
  console.log('job post found    ');
            res.json({ success: true, availJobs10: availJobs10 }); // Return success
          //}
        }
      }
    });

  }

});

});













//deadlineAvailJobs



router.get('/deadlineAvailJobs/:availJobs', (req, res) => {

/*
{ $and: [ { price: { $ne: 1.99 } }, { price: { $exists: true } } ] }

*/
const array2 = req.params.availJobs.split(",");
for(var j in array2){
  console.log('inside route  deadlineAvailJobs  '+ array2[j]);
}
const date = new Date(Date.now());
const dateNow= date.toDateString();
console.log('date value is   '+dateNow);

Job.find( {$and: [{_id:{$in: array2}},{deadline: dateNow}]}, (err, jobsYouCanApply) => {

  if (err) {
    console.log('inside 1     '+err);

    res.json({ success: false, message: err }); // Return error
  } else {
console.log('inside  2   ');
    // Find the current user that is logged in
    User.findOne({ _id: req.decoded.userId }, (err, user) => {
      // Check if error was found
      if (err) {
console.log('inside 3  ');
        res.json({ success: false, message: err }); // Return error
      } else {
        // Check if username was found in database
        if (!user) {


   console.log('user not found 4    ');
          res.json({ success: false, message: 'Unable to authenticate user' }); // Return error message
        } else {
  console.log(' inside deadlineAvailJobs route success !!!!!! ');
            res.json({ success: true, jobsYouCanApply: jobsYouCanApply }); // Return success
          //}
        }
      }
    });

  }

});

});




//


router.get('/deadlineAvailJobs10/:availJobs10', (req, res) => {

console.log('deadlineAvailJobs10 route     ');
const array2 = req.params.availJobs10.split(",");
for(var j in array2){
  console.log('inside route  deadlineAvailJobs10  '+ array2[j]);
}
const date = new Date(Date.now());
const dateNow= date.toDateString();
const date1 = new Date(dateNow);
const dateNow1= date1;



////birthday.setDate(birthday.getDate()+10);


console.log('now date is  '+dateNow1);
const date2 = date1.setDate(date1.getDate()+10);
console.log('date after 10 days is   '+date1);

Job.find( {$and: [{_id:{$in: array2}}]}, (err, jobsYouCanApply10) => {

  if (err) {
    console.log('inside 1     '+err);

    res.json({ success: false, message: err }); // Return error
  } else {
console.log('inside  2   ');
    // Find the current user that is logged in
    User.findOne({ _id: req.decoded.userId }, (err, user) => {
      // Check if error was found
      if (err) {
console.log('inside 3  ');
        res.json({ success: false, message: err }); // Return error
      } else {
        // Check if username was found in database
        if (!user) {


   console.log('user not found 4    ');
          res.json({ success: false, message: 'Unable to authenticate user' }); // Return error message
        } else {
  console.log(' inside deadlineAvailJobs10  route success !!!!!! ');
            res.json({ success: true, jobsYouCanApply10: jobsYouCanApply10 }); // Return success
          //}
        }
      }
    });

  }

});

});










///jobs/
router.get('/appliedJobs/:username', (req, res) => {
  // Check if id is present in parameters

  console.log('ok so the user   is            '+req.params.username);
  if (!req.params.username) {
    console.log('0');
    res.json({ success: false, message: 'No username was provided.' }); // Return error message
  } else {
    // Check if the blog id is found in database

    //{"jobID":1, "_id":0})
    Application.find({ appliedBy: req.params.username },{'jobID':1, '_id':0},function(err, jobs) {
      // Check if the id is a valid ID
      if (err) {
        console.log('1');
        res.json({ success: false, message: 'Not a valid job id' }); // Return error message
      } else {
        // Check if blog was found by id
        if (!jobs) {
          console.log('2');
          res.json({ success: false, message: 'Job not found.' }); // Return error message
        } else {
          // Find the current user that is logged in
          User.findOne({ _id: req.decoded.userId }, (err, user) => {
            // Check if error was found
            if (err) {
              console.log('3');
              res.json({ success: false, message: err }); // Return error
            } else {
              // Check if username was found in database
              if (!user) {
                console.log('4');
                res.json({ success: false, message: 'Unable to authenticate user' }); // Return error message
              } else {
                // Check if the user who requested single blog is the one who created it
                  console.log('ding dong');
                  res.json({ success: true, jobs: jobs }); // Return success

              }
            }
          });
        }
      }
    });
  }
});




//


router.get('/appliedJobs10/:username', (req, res) => {
  // Check if id is present in parameters

  console.log('ok so the user   is            '+req.params.username);
  if (!req.params.username) {
    console.log('0');
    res.json({ success: false, message: 'No username was provided.' }); // Return error message
  } else {
    // Check if the blog id is found in database

    //{"jobID":1, "_id":0})
    Application.find({ appliedBy: req.params.username },{'jobID':1, '_id':0},function(err, jobs10) {
      // Check if the id is a valid ID
      if (err) {
        console.log('1');
        res.json({ success: false, message: 'Not a valid job id' }); // Return error message
      } else {
        // Check if blog was found by id
        if (!jobs10) {
          console.log('2');
          res.json({ success: false, message: 'Job not found.' }); // Return error message
        } else {
          // Find the current user that is logged in
          User.findOne({ _id: req.decoded.userId }, (err, user) => {
            // Check if error was found
            if (err) {
              console.log('3');
              res.json({ success: false, message: err }); // Return error
            } else {
              // Check if username was found in database
              if (!user) {
                console.log('4');
                res.json({ success: false, message: 'Unable to authenticate user' }); // Return error message
              } else {
                // Check if the user who requested single blog is the one who created it
                  console.log('ding dong');
                  res.json({ success: true, jobs10: jobs10 }); // Return success

              }
            }
          });
        }
      }
    });
  }
});


















// get jobs applied by a user

/* ===============================================================
   GET SINGLE Job
=============================================================== */
router.get('/myJobs/:username', (req, res) => {
  // Check if id is present in parameters

  console.log('type is     '+Object.valueOf(req.params));


  console.log('url is            '+req.params);
  if (!req.params.username) {
    console.log('0');
    res.json({ success: false, message: 'No username was provided.' }); // Return error message
  } else {
    // Check if the blog id is found in database
    Application.find({ appliedBy: req.params.username }, (err, application) => {
      // Check if the id is a valid ID
      if (err) {
        console.log('1');
        res.json({ success: false, message: 'Not a valid job id' }); // Return error message
      } else {
        // Check if blog was found by id
        if (!application) {
          console.log('2');
          res.json({ success: false, message: 'Job not found.' }); // Return error message
        } else {
          // Find the current user that is logged in
          User.findOne({ _id: req.decoded.userId }, (err, user) => {
            // Check if error was found
            if (err) {
              console.log('3');
              res.json({ success: false, message: err }); // Return error
            } else {
              // Check if username was found in database
              if (!user) {
                console.log('4');
                res.json({ success: false, message: 'Unable to authenticate user' }); // Return error message
              } else {
                // Check if the user who requested single blog is the one who created it
                  console.log('6');
                  res.json({ success: true, application: application }); // Return success

              }
            }
          });
        }
      }
    });
  }
});













//get all the jobService




router.get('/allJobs', (req, res) => {

  Job.find({}, (err, jobs) => {
    // Check if error was found or not
    if (err) {
      res.json({ success: false, message: err }); // Return error message
    } else {
      // Check if blogs were found in database
      if (!jobs) {
        res.json({ success: false, message: 'No jobs found.' }); // Return error of no blogs found
      } else {
        res.json({ success: true, jobs: jobs }); // Return success and blogs array
      }
    }
  }).sort({ '_id': -1 });



});


//get viewed  jobs

router.get('/viewedJobs/:viewedJobs', (req, res) => {

  const jobIndex = req.params.viewedJobs.split(",");

  for(var i in jobIndex){
    console.log('jobs that have been marked as priority but were also applied !!!!!!!!!!!!!'+ jobIndex[i]);
  }




  Job.find({_id: {$in: jobIndex}}, (err, jobs) => {
    // Check if error was found or not
    if (err) {
      res.json({ success: false, message: err }); // Return error message
    } else {
      // Check if blogs were found in database
      if (!jobs) {
        res.json({ success: false, message: 'No jobs found.' }); // Return error of no blogs found
      } else {
        res.json({ success: true, jobs: jobs }); // Return success and blogs array
      }
    }
  }).sort({ '_id': -1 });



});



//delete job



  router.delete('/deleteJob/:id', (req, res) => {

console.log('id isssssss        '+req.params.id);
if(!req.params.id){
  res.json({success: false, message: 'no id provided'});
} else {
  Job.findOne({_id: req.params.id}, (err, job) => {
  if(err){
    res.json({success: false, message: 'Invalid id'});
  } else {
    if(!job) {
      res.json({success: false, message: 'job was not found'});
    } else {
      User.findOne({_id: req.decoded.userId}, (err, user) => {
        if(err){
          res.json({success: false, message: err});
        } else {
          if(!user){
            res.json({success:false, message: 'unable to authenticate user'});
          } else {
            if(user.username !== job.createdBy){
              res.json({success: false, message:'not authorize to delete'});
            } else {
              job.remove((err) => {
                if(err) {
                  res.json({success: false, message: err});
                } else {
                  res.json({success:true, message: 'job deleted'});
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
















    router.delete('/deleteApplication/:id', (req, res) => {

  console.log('id isssssss        '+req.params.id);
  if(!req.params.id){
    res.json({success: false, message: 'no id provided'});
  } else {
    Application.findOne({_id: req.params.id}, (err, application) => {
    if(err){
      res.json({success: false, message: 'Invalid id'});
    } else {
      if(!application) {
        res.json({success: false, message: 'job was not found'});
      } else {
        User.findOne({_id: req.decoded.userId}, (err, user) => {
          if(err){
            res.json({success: false, message: err});
          } else {
            if(!user){
              res.json({success:false, message: 'unable to authenticate user'});
            } else {
              if(user.username !== application.appliedBy){
                res.json({success: false, message:'not authorize to delete'});
              } else {
                application.remove((err) => {
                  if(err) {
                    res.json({success: false, message: err});
                  } else {
                    res.json({success:true, message: 'application deleted'});
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
       GET SINGLE Job
    =============================================================== */
    router.get('/singleJob/:id', (req, res) => {
      // Check if id is present in parameters
      if (!req.params.id) {
        console.log('0');
        res.json({ success: false, message: 'No job ID was provided.' }); // Return error message
      } else {
        // Check if the blog id is found in database
        Job.findOne({ _id: req.params.id }, (err, job) => {
          // Check if the id is a valid ID
          if (err) {
            console.log('1');
            res.json({ success: false, message: 'Not a valid job id' }); // Return error message
          } else {
            // Check if blog was found by id
            if (!job) {
              console.log('2');
              res.json({ success: false, message: 'Job not found.' }); // Return error message
            } else {
              // Find the current user that is logged in
              User.findOne({ _id: req.decoded.userId }, (err, user) => {
                // Check if error was found
                if (err) {
                  console.log('3');
                  res.json({ success: false, message: err }); // Return error
                } else {
                  // Check if username was found in database
                  if (!user) {
                    console.log('4');
                    res.json({ success: false, message: 'Unable to authenticate user' }); // Return error message
                  } else {
                    // Check if the user who requested single blog is the one who created it
                      console.log('6');
                      res.json({ success: true, job: job }); // Return success

                  }
                }
              });
            }
          }
        });
      }
    });



//save applied jobs


router.post('/newApply', (req,res) => {

  const application = new Application({

    position: req.body.position, // Title field
    companyName: req.body.companyName, // Body field
    appliedBy: req.body.appliedBy, // CreatedBy field
    jobID: req.body.jobID
  });
  // Save blog into database
  application.save((err) => {
    // Check if error
    if (err) {
      // Check if error is a validation error
      if (err.errors) {
        // Check if validation error is in the title field
        if (err.errors.title) {
          console.log('job1');
          res.json({ success: false, message: err.errors.title.message }); // Return error message
        } else {
          // Check if validation error is in the body field
          if (err.errors.companyName) {
                console.log('job2');
            res.json({ success: false, message: err.errors.companyName.message }); // Return error message
          } else {
                console.log('job3');
            res.json({ success: false, message: err }); // Return general error message
          }
        }
      } else {
            console.log('job4');
        res.json({ success: false, message: err }); // Return general error message
      }
    } else {
          console.log('job5');
      res.json({ success: true, message: 'application saved!' }); // Return success message
    }
  });


});



  return router;
};
