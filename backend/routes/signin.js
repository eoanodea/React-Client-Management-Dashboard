const User = require('../models/User')
const UserSession = require('../models/UserSession')
var express = require("express");
var router = express.Router();


    /*
        Sign up
    */
   router.post('/signup', (req, res, next) => {
    const { body } = req;
     const { 
         firstName,
         lastName,
         password
     } = body;
     let {
         email
     } = body;

     if (!firstName) {
         return res.send({
             success: false,
             message: 'Error: First name cannot be blank'
         });
     }
     if (!lastName) {
         return res.send({
             success: false,
             message: 'Error: Last name cannot be blank'
         });
     }
     if (!email) {
         return res.send({
             success: false,
             message: 'Error: Email cannot be blank'
         });
     }
     if (!password) {
         return res.send({
             success: false,
             message: 'Error: Password cannot be blank'
         });
     }

     email = email.toLowerCase();

     console.log('yo');
     /*
         Steps:
         1. Verify email doesn't exist
         2. Save
     */
    User.find({
     email: email
    }, (err, previousUsers) => {
         if(err) {
             return res.send({
                 success: false,
                 message: 'Error: Server error'
             });
         } else if (previousUsers.length > 0) {
             return res.send({
                 success: false,
                 message: 'Error: Server error'
             });
         } 

         //Save the new user
         const newUser = new User();

         newUser.email = email;
         newUser.firstName = firstName;
         newUser.lastName = lastName;
         newUser.password = newUser.generateHash(password);
         newUser.save((err, user) => {
             if (err) {
                 return res.send({
                     success: false,
                     message: 'Error: Server error'
                 });
             }
             return res.send({
                 success: true,
                 message: 'Signed up'
             });
         });
     });
 });
 //Sign in
 router.post('/signin', (req, res, next) => {
     const { body } = req;
      const { 
          firstName,
          lastName,
          password
      } = body;
      let {
          email
      } = body;
      
      if (!email) {
         return res.send({
             success: false,
             message: 'Error: Email cannot be blank'
         });
     }
     if (!password) {
         return res.send({
             success: false,
             message: 'Error: Password cannot be blank'
         });
     }
     
     email = email.toLowerCase();

     User.find({
         email: email
     }, (err, users) => {
         if(err) {
             console.log('Error 2', err);
             return res.send({
                 success: false,
                 message: 'Error: server error'
             });
         }
         if (users.length !=1) {
             return res.send({
                 success: false,
                 message: 'Error: Invalid'
             });
         }
         const user = users[0];
         if (!user.validPassword(password)) {
             return res.send({
                 success: false,
                 message: 'Error: '
             });
         }

         //Otherwise correct user
         const userSession = new UserSession();
         userSession.userId = user._id;
         userSession.save((err, doc) => {
             if(err) {
                 console.log(err);
                 return res.send ({
                     success: false,
                     message: 'Error: server'
                 });
             }
             return res.send({
                 success: true,
                 message: 'Valid sign in',
                 token: doc._id
             });
         });
     });   
 }); 
 //Verify
 router.get('/verify', (req, res, next) => {
     //Get the token
     const { query } = req;
     const { token } = query;
     // ?token=test

     //Verify is one of a kind and is not deleted
 
     UserSession.find({
         _id: token,
         isDeleted: false
     }, (err, sessions) => {
         if(err) {
             console.log(err);
             return res.send({
                 success: false,
                 message: 'Error: Server error'
             });
         }

         if (sessions.length !=1) {
             return res.send({
                 success: false,
                 message: 'Error: Invalid token'
             });
         } else {
             return res.send({
                 success: true,
                 message: 'Good'
             });
         }
     });
 }); 
 //Logout
 router.get('/logout', (req, res, next) => {
     //Get the token
     const { query } = req;
     const { token } = query;
     // ?token=test

     //Verify is one of a kind and is not deleted
 
     UserSession.findOneAndUpdate({
         _id: token,
         isDeleted: false
     }, {
         $set: {
             isDeleted: true
         }
     }, null, (err, sessions) => {
         if(err) {
             console.log(err);
             return res.send({
                 success: false,
                 message: 'Error: Server error'
             });
         }
         return res.send({
             success: true,
             message: 'Good'
         });
         
     });
 });



module.exports = router;
