let User = require('../models/user')
let Staff = require('../models/staff')
let helper = require('../helpers/login')

const login = (req,res) => {
//  if (typeof req.body.name === 'undefined') res.send({err: 'Name must be filled'})
//  // else if (typeof req.body.password === 'undefined') res.send({err: 'Password must be filled'})
//  else {
//    let name = req.body.name
//    let password = req.body.password || ''
//    let email = req.body.email || ''
//    let token = ''

//   //  User.findOne({name: name},
//   //    (err, user) => {
//   //      if (err || user === null) {

//   //        Staff.findOne({email: email}, (err, staff)=> {
//   //          if (err) res.send({err:'Invalid Email / Password'})
//   //          else {
//   //            let staffDt = {
//   //              _id : staff._id,
//   //              email: staff.email,
//   //              username: staff.username,
//   //              role: 'staff'
//   //             }
//   //            token = helper.createToken(staffDt)
//   //            res.send({token: token})
//   //          }
//   //        })

//   //      }
//   //      // else if (!helper.checkPassword(password,user.password)) res.send({err: 'Invalid Email / Password'})
//   //      else {
//   //        let userDt = {
//   //          _id : user._id,
//   //          // email: user.email,
//   //          name: user.name,
//   //          profile_picture: user.profile_picture || '',
//   //          komsel: user.komsel
//   //         }
//   //        token = helper.createToken(userDt)
//   //        res.send({token: token})
//   //      }
//   //    }
//    )
//  }
}

const register = (req,res) => {

 if (typeof req.body.name === 'undefined') res.send({err: 'Name must be filled'})
 // else if (typeof req.body.email === 'undefined') res.send({err: 'Email must be filled'})
 // else if (typeof req.body.password === 'undefined') res.send({err: 'Password must be filled'})
 // else if (typeof req.body.phone === 'undefined') res.send({err: 'Phone must be filled'})
 // else if (typeof req.body.profile_picture === 'undefined') res.send({err: 'Profile Picture must be filled'})
 else {
   let user = new User({
     // email: req.body.email,
     // password: req.body.password,
     name: req.body.name,
     // phone: req.body.phone,
     profile_picture: req.body.profile_picture || ''

   })

   user.save((err,n_user)=> {
     if (err){
       let err_msg = []
       if (typeof err.errors != 'undefined')
         for(let key in err.errors) err_msg.push(err.errors[key].message)
       res.send ({err: err_msg.length > 0 ? err_msg.join(',') : err})
     }
     else res.send(n_user)

   })
 }
}

module.exports = {
 login,
 register
}