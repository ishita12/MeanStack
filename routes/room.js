const User = require('../models/user'); // Import User Model Schema
const Job = require('../models/job'); // Import Blog Model Schema
const jwt = require('jsonwebtoken'); // Compact, URL-safe means of representing claims to be transferred between two parties.
const config = require('../config/database'); // Import database configuration
const Application =  require('../models/application');
const Priority =  require('../models/priority');
const ViewJob =  require('../models/viewJob');
const Room = require('../models/roomSave');
const Reservation =  require('../models/reservation');

module.exports = (router) => {




// save a new room post


router.post('/newPost', (req, res) => {

console.log('inside newPost route     '+req.body.rtype);


 if(!req.body.rtype){
   res.json({ success: false, message: 'Room type is required' }); // Return error message

 } else {

   if(!req.body.floor){
     res.json({ success: false, message: 'Floor type is required.' }); // Return error message

   } else {

     if(!req.body.room){
       res.json({ success: false, message: 'Room Number is required.' }); // Return error message

     } else {

       if(!req.body.mydate){
         res.json({ success: false, message: 'Date is required.' }); // Return error message

       }  else {

         if(!req.body.time){
           res.json({ success: false, message: 'Time is required.' }); // Return error message

         }   else {

                    const d = req.body.mydate;
                    console.log('date is    '+d);
                    const dd= new Date(d);
                      console.log('date is    '+dd);
                    const ddd = dd.toDateString();
                      console.log('date is    '+ddd);
           console.log('lets test the date   '+ddd);
                    const post = new Room({

                      rtype: req.body.rtype, // Title field
                      floor: req.body.floor, // Body field
                      date: ddd, // CreatedBy field
                      room: req.body.room,
                      time: req.body.time
                    });

                    Room.findOne(post, function(err, success) {

                      if (err) {
                      console.log(err);
                       res.send(err);
                     } else {

                  console.log('post already not present');
                  console.log('success value is  '+success);
                  if(success===null){

                    post.save((err) => {
                      if (err) {

                        console.log(err);
                            res.send(err);

                      } else {
                        res.json({ success: true, message: 'post saved!' }); // Return success message
                      }


                    });

                  }
                    else {
                       res.send("post already present");
                    }




                     }

                    });



                  }

       }



     }


   }

 }

});




//save reservation if there is not reservation




router.post('/saveData', (req, res) => {




  console.log('inside saveData route     '+req.body.roomType);


     if(!req.body.username){
       res.json({ success: false, message: 'Job creator is required.' }); // Return error message

     } else {

       if(!req.body.roomType){
         res.json({ success: false, message: 'Job title is required.' }); // Return error message

       } else {

         if(!req.body.room){
           res.json({ success: false, message: 'Job company is required.' }); // Return error message

         } else {

           if(!req.body.time){
             res.json({ success: false, message: 'Job description is required.' }); // Return error message

           }  else {

             const d = req.body.date;
                     console.log('date is    '+d);
                     const dd= new Date(d);
                       console.log('date is    '+dd);
                     const ddd = dd.toDateString();
                       console.log('date is    '+ddd);
            console.log('lets test the date   '+ddd);
                     const reservation = new Reservation({
                       username:req.body.username,
                       roomType: req.body.roomType, // Title field
                       floor: req.body.floor, // Body field
                       date: ddd, // CreatedBy field
                       room: req.body.room,
                       time: req.body.time,

                     });

               reservation.save((err) => {
                 if (err) {

                if(err.errors){

                  if (err.errors.roomType) {
                    res.json({ success: false, message: err.errors.roomType.message }); // Return error message
                  } else {
                    if (err.errors.room) {
                      res.json({ success: false, message: err.errors.room.message }); // Return error message
                    } else {
                      if (err.errors.time) {
                        res.json({ success: false, message: err.errors.time.message }); // Return error message
                      } else {
                        res.json({ success: false, message: err }); // Return general error message
                      }
                    }
                  }



                } else {
                  res.json({ success: false, message: err }); // Return general error message
                }


                 } else {
                   res.json({ success: true, message: 'reservation saved!' }); // Return success message
                 }


               });

           }
         }


       }

     }



});




//



router.post('/saveData1', (req, res) => {




  console.log('inside saveData1 route     '+req.body.roomType);


     if(!req.body.username){
       res.json({ success: false, message: 'Job creator is required.' }); // Return error message

     } else {

       if(!req.body.roomType){
         res.json({ success: false, message: 'Job title is required.' }); // Return error message

       } else {

         if(!req.body.room){
           res.json({ success: false, message: 'Job company is required.' }); // Return error message

         } else {

           if(!req.body.time){
             res.json({ success: false, message: 'Job description is required.' }); // Return error message

           }  else {

             const d = req.body.date;
                     console.log('date is    '+d);
                     const dd= new Date(d);
                       console.log('date is    '+dd);
                     const ddd = dd.toDateString();
                       console.log('date is    '+ddd);
            console.log('lets test the date   '+ddd);
                     const reservation = new Reservation({
                       username:req.body.username,
                       roomType: req.body.roomType, // Title field
                       floor: req.body.floor, // Body field
                       date: ddd, // CreatedBy field
                       room: req.body.room,
                       time: req.body.time,

                     });

               reservation.save((err) => {
                 if (err) {

                if(err.errors){

                  if (err.errors.roomType) {
                    res.json({ success: false, message: err.errors.roomType.message }); // Return error message
                  } else {
                    if (err.errors.room) {
                      res.json({ success: false, message: err.errors.room.message }); // Return error message
                    } else {
                      if (err.errors.time) {
                        res.json({ success: false, message: err.errors.time.message }); // Return error message
                      } else {
                        res.json({ success: false, message: err }); // Return general error message
                      }
                    }
                  }



                } else {
                  res.json({ success: false, message: err }); // Return general error message
                }


                 } else {
                   res.json({ success: true, message: 'reservation saved!' }); // Return success message
                 }


               });

           }
         }


       }

     }



});
























/*

if(err.errors){

  if (err.errors.rtype) {
    res.json({ success: false, message: err.errors.rtype.message }); // Return error message
  } else {
    if (err.errors.floor) {
      res.json({ success: false, message: err.errors.floor.message }); // Return error message
    } else {
      if (err.errors.room) {
        res.json({ success: false, message: err.errors.room.message }); // Return error message
      } else {

        if (err.errors.date) {
          res.json({ success: false, message: err.errors.date.message }); // Return error message
        } else {

          if (err.errors.time) {
            res.json({ success: false, message: err.errors.time.message }); // Return error message
          } else {
               res.json({ success: false, message: err }); // Return general error message
          }
        }
      }
    }
  }



}

*/


//   GET ROOMS   FOR EACH ROOMTYPE AND FLOOR TYPE




router.get('/getRooms/:roomType/:floor/:selectedDate', (req, res) => {


console.log('room type is   '+req.params.roomType);

console.log('floor type is   '+req.params.floor);

//{$and: [{_id:{$in: array2}},{deadline: dateNow}]}

Room.distinct('room',{$and: [{rtype:req.params.roomType},{floor: req.params.floor},{date: req.params.selectedDate}]},(err, result) => {

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
  console.log(' the final rooms   ');
            res.json({ success: true, result: result }); // Return success
          //}
        }
      }
    });

  }

});


});




// get available rooms







router.get('/getAvailableRooms/:roomsTaken/:selectedDate/:roomType/:floor', (req, res) => {



const roomsTakenArray  = req.params.roomsTaken.split(',');

//const timesTakenArray = req.params.timesTaken.split(',');

console.log('selected date is '+req.params.selectedDate);
console.log('selected roomtype is '+req.params.roomType);
console.log('selected floor is '+req.params.floor);





for(var i in roomsTakenArray){



  console.log('room taken is   '+roomsTakenArray[i]);
}

/*
for(var i in timesTakenArray){


  console.log('time taken is   '+timesTakenArray[i]);
}
*/




//{$and: [{_id:{$in: array2}},{deadline: dateNow}]}

Room.find({$and: [{rtype:req.params.roomType},{floor: req.params.floor},{date: req.params.selectedDate},{room: req.params.roomsTaken}]}).select('time').exec((err, result) => {


console.log('roommmmm isss     '+req.params.room);
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
  console.log(' success with the available rooms ');
            res.json({ success: true, result: result }); // Return success
          //}
        }
      }
    });

  }

});


});







router.get('/getTimeSlots/:roomType/:floor/:date/:room', (req, res) => {


console.log('room type is   '+req.params.roomType);

console.log('floor type is   '+req.params.floor);

//{$and: [{_id:{$in: array2}},{deadline: dateNow}]}

Room.distinct('time',{$and: [{rtype:req.params.roomType},{floor: req.params.floor},{date: req.params.date},{room: req.params.room}]},(err, result) => {

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
  console.log(' the final rooms   ');
            res.json({ success: true, result: result }); // Return success
          //}
        }
      }
    });

  }

});


});


// get distinct booked rooms




router.get('/getDistinctBookedRooms/:roomType/:floor/:date', (req, res) => {


console.log('room type is   '+req.params.roomType);

console.log('floor type is   '+req.params.floor);

//{$and: [{_id:{$in: array2}},{deadline: dateNow}]}

// 'room',{$and: [{rtype:req.params.roomType},{floor: req.params.floor},{date: req.params.selectedDate}]},(err, result)
//

Reservation.distinct('room',{$and: [{roomType:req.params.roomType},{floor: req.params.floor}, {date:req.params.date}]},(err, distinctBookedRooms) => {

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
  console.log(' the final rooms   ');
            res.json({ success: true, distinctBookedRooms: distinctBookedRooms }); // Return success
          //}
        }
      }
    });

  }

});


});



/////





router.get('/getBookedTimesForDistinctRooms/:roomType/:floor/:date/:dra', (req, res) => {

const bookedTimesArray=[];

console.log('room type is   '+req.params.roomType);

console.log('floor type is   '+req.params.floor);
console.log('room number is   '+req.params.dra);


//{$and: [{_id:{$in: array2}},{deadline: dateNow}]}

Reservation.find({$and: [{roomType:req.params.roomType},{floor: req.params.floor}, {date:req.params.date},{room:req.params.dra}]}).select('time').exec((err, bookedTimesArray) => {

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
  console.log(' this times have been booked for distinct rooms   ');
            res.json({ success: true, bookedTimesArray: bookedTimesArray }); // Return success
          //}
        }
      }
    });

  }

});


});

////////////////

















router.get('/getAvailableTimesForEachBookedRoom/:roomType/:floor/:date/:room/:times', (req, res) => {

const bookedTimesArray=[];

console.log('room type is   '+req.params.roomType);

console.log('floor type is   '+req.params.floor);
console.log('room number is   '+req.params.room);
console.log('times is   '+req.params.times);

const arrayTimes= req.params.times.split(',');
//{$and: [{_id:{$in: array2}},{deadline: dateNow}]}

Room.find({$and: [{rtype:req.params.roomType},{floor: req.params.floor}, {date:req.params.date},{room:req.params.room},{time: {$nin: arrayTimes}}]}).select('time').exec((err, availableTimesArray) => {

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
  console.log(' this times are available to book      ');
            res.json({ success: true, availableTimesArray: availableTimesArray }); // Return success
          //}
        }
      }
    });

  }

});


});


//////




router.get('/getTimesForNotBookedRooms/:roomType/:floor/:date/:aroom/', (req, res) => {

const bookedTimesArray=[];

console.log('room type is   '+req.params.roomType);

console.log('floor type is   '+req.params.floor);
console.log('room number is   '+req.params.aroom);


//const arrayTimes= req.params.times.split(',');
//{$and: [{_id:{$in: array2}},{deadline: dateNow}]}

Room.find({$and: [{rtype:req.params.roomType},{floor: req.params.floor}, {date:req.params.date},{room:req.params.aroom}]}).select('time').exec((err, aroomtime) => {

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
  console.log(' this times are available to book      ');
            res.json({ success: true, aroomtime: aroomtime }); // Return success
          //}
        }
      }
    });

  }

});


});



// get Booked Rooms



router.get('/getBookedRooms/:roomType/:floor/:date', (req, res) => {


console.log('room type is   '+req.params.roomType);

console.log('floor type is   '+req.params.floor);

//{$and: [{_id:{$in: array2}},{deadline: dateNow}]}

Reservation.find({$and: [{roomType:req.params.roomType},{floor: req.params.floor}, {date:req.params.date}]}).select('room time').exec((err, bookedRooms) => {

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
  console.log(' the final rooms   ');
            res.json({ success: true, bookedRooms: bookedRooms }); // Return success
          //}
        }
      }
    });

  }

});


});


//////





router.get('/getBookedTimesForRooms/:roomType/:floor/:date/:roomsTaken', (req, res) => {


console.log('room type is   '+req.params.roomType);

console.log('floor type is   '+req.params.floor);

console.log('rooms booked are      '+req.params.roomsTaken);

//{$and: [{_id:{$in: array2}},{deadline: dateNow}]}

Reservation.find({$and: [{roomType:req.params.roomType},{floor: req.params.floor}, {date:req.params.date},{room:req.params.roomsTaken}]}).select('time').exec((err, bookedRooms) => {

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
  console.log(' the final rooms   ');
            res.json({ success: true, bookedRooms: bookedRooms }); // Return success
          //}
        }
      }
    });

  }

});


});





// check if rooms have been posted for a date






router.get('/checkIfRoomsAreAvailableOrNot/:roomType/:floor/:date', (req, res) => {


console.log('room type  taken is   '+req.params.roomType);

console.log('floor taken is   '+req.params.floor);


console.log('floor taken is   '+req.params.date);

//{$and: [{_id:{$in: array2}},{deadline: dateNow}]}


Room.find({$and: [{rtype:req.params.roomType},{floor: req.params.floor}, {date:req.params.date}]}).select('room').exec((err, ifRooms) => {

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
  console.log('allRooms  wowwiiieee its a success   ');
            res.json({ success: true, ifRooms: ifRooms }); // Return success
          //}
        }
      }
    });

  }

});


});











// get all the rooms






router.get('/getAllRooms/:roomType/:floor/:date/', (req, res) => {


console.log('room type  taken is   '+req.params.roomType);

console.log('floor taken is   '+req.params.floor);

const roomsTaken =  req.params.myRoomsTaken.split(',');


//{$and: [{_id:{$in: array2}},{deadline: dateNow}]}


Room.find({$and: [{rtype:req.params.roomType},{floor: req.params.floor}, {date:req.params.date}, {room: {$nin: roomsTaken}}]}).select('room').exec((err, allRooms) => {

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
  console.log('allRooms  wowwiiieee its a success   ');
            res.json({ success: true, allRooms: allRooms }); // Return success
          //}
        }
      }
    });

  }

});


});



//get not booked rooms




router.get('/getNotTakenRooms/:roomType/:floor/:date/:myRoomsTaken', (req, res) => {


console.log('room type  taken is   '+req.params.roomType);

console.log('floor taken is   '+req.params.floor);

const roomsTaken =  req.params.myRoomsTaken.split(',');


//{$and: [{_id:{$in: array2}},{deadline: dateNow}]}


Room.distinct('room',{$and: [{rtype:req.params.roomType},{floor: req.params.floor}, {date:req.params.date}, {room: {$nin: roomsTaken}}]},(err, notTakenRooms) => {

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
  console.log('getNotTakenRooms  wowwiiieee its a success   ');
            res.json({ success: true, notTakenRooms: notTakenRooms }); // Return success
          //}
        }
      }
    });

  }

});


});




//get not booked timess





router.get('/getNotBookedTimes/:roomType/:floor/:date/:room/:times', (req, res) => {


console.log('room type  taken is   '+req.params.roomType);

console.log('floor taken is   '+req.params.floor);

console.log('rooms taken are      '+req.params.room);

console.log('times taken are      '+req.params.times);

//{$and: [{_id:{$in: array2}},{deadline: dateNow}]}

const timeArray=  req.params.times.split(',');
for(var i in timeArray){
  console.log('time which have already been booked are    '+timeArray[i]);
}

Room.find({$and: [{rtype:req.params.roomType},{floor: req.params.floor}, {date:req.params.date},{room:req.params.room},{time:{$nin: timeArray}}]}).select('time').exec((err, notBookedTimes) => {

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
  console.log(' wowwiiieee its a success   ');
            res.json({ success: true, notBookedTimes: notBookedTimes }); // Return success
          //}
        }
      }
    });

  }

});


});


/////   findMyFutureReservations




router.get('/findMyReservations/:username', (req, res) => {


   const dd=new Date(Date.now());
const ddd = dd.toDateString();
const date1=new Date(ddd);


console.log('room type is   '+req.params.username);


//{$and: [{_id:{$in: array2}},{deadline: dateNow}]}

Reservation.find({$and: [{username: req.params.username}]},(err, myReservations) => {

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
  console.log(' the final rooms   ');
            res.json({ success: true, myReservations: myReservations }); // Return success
          //}
        }
      }
    });

  }

});


});



///////



router.get('/getReservations1/:username/:dates1', (req, res) => {


   const dd=new Date(Date.now());
const ddd = dd.toDateString();
const date1=new Date(ddd);

const datesUsed = req.params.dates1.split(',');
console.log('dadadada    '+req.params.dates1);

console.log('room type is   '+req.params.username);



//{$and: [{_id:{$in: array2}},{deadline: dateNow}]}

Reservation.find({$and: [{username: req.params.username}, {date: {$in: datesUsed }}]},(err, madeReservations1) => {

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
  console.log(' madeReservations success   ');
            res.json({ success: true, madeReservations1: madeReservations1 }); // Return success
          //}
        }
      }
    });

  }

});


});





router.get('/getReservations2/:username/:dates2', (req, res) => {


   const dd=new Date(Date.now());
const ddd = dd.toDateString();
const date1=new Date(ddd);

const datesUsed = req.params.dates2.split(',');
console.log('dadadada    '+req.params.dates2);

console.log('room type is   '+req.params.username);



//{$and: [{_id:{$in: array2}},{deadline: dateNow}]}

Reservation.find({$and: [{username: req.params.username}, {date: {$in: datesUsed }}]},(err, madeReservations2) => {

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
  console.log(' madeReservations success   ');
            res.json({ success: true, madeReservations2: madeReservations2 }); // Return success
          //}
        }
      }
    });

  }

});


});


// delete reservation






    router.delete('/deleteReservation/:id', (req, res) => {

  console.log('deleteReservation     '+req.params.id);
  if(!req.params.id){
    res.json({success: false, message: 'no id provided'});
  } else {
    Reservation.findOne({_id: req.params.id}, (err, reservation) => {
    if(err){
      res.json({success: false, message: 'Invalid id'});
    } else {
      if(!reservation) {
        res.json({success: false, message: 'job was not found'});
      } else {
        User.findOne({_id: req.decoded.userId}, (err, user) => {
          if(err){
            res.json({success: false, message: err});
          } else {
            if(!user){
              res.json({success:false, message: 'unable to authenticate user'});
            } else {
              if(user.username !== reservation.username){
                res.json({success: false, message:'not authorize to delete'});
              } else {
                reservation.remove((err) => {
                  if(err) {
                    res.json({success: false, message: err});
                  } else {
                    res.json({success:true, message: 'reservation deleted'});
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
