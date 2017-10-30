const nodemailer = require('nodemailer');
// const https = require('https');
var smtpTransport = require('nodemailer-smtp-transport')

require('dotenv').config
const transporter = nodemailer.createTransport(smtpTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
}));

const sendEmail = (idKomsel) => {
  var job = {
    from:`TORCH <torch@gmail.com>`,
    to: `poppymighty@gmail.com`,
    subject: `Request to join`,
    text: 'Done',
    html: `<br><br><button onclick="accept()" class=btn btn-primary>Accept</button><button class=btn btn-danger>Reject</button>`
  }

  transporter.sendMail(job, (error, info) => {
    if (error) {
      console.log(error)

    }
    else{
      console.log(`sukses`)
    }
  })

    let mailOptions = {
        from: '"TORCH" <noreply@torch.com>', // sender address
        to: `poppymighty@gmail.com`,//`${user.email}`, // list of receivers
        subject: `Request to join`,
        text: `Hi, There is a request to join your komsel, click here to approve`,
        html: `Hi, There is a request to join your komsel, <a href="http://localhost:3000/komsel/join/${idKomsel}"></a>` // html body
    };
    transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
      console.log('Message %s sent: %s', info.messageId, info.response);
    });
}

// const sendSMS = (user,message) => {
//   if (typeof user.phone !== 'undefined') {
//     // console.log('-------------------------2');
//     // console.log(user)
//     let data = JSON.stringify({
//       api_key: process.env.NEXMO_KEY,
//       api_secret: process.env.NEXMO_SECRET,
//       to: '085813372797',
//       from: 'torch',
//       text: (message.subject).toUpperCase()+'\n'+message.body
//     });
//     let options = {
//      host: 'rest.nexmo.com',
//      path: '/sms/json',
//      port: 443,
//      method: 'POST',
//      headers: {
//        'Content-Type': 'application/json',
//        'Content-Length': Buffer.byteLength(data)
//      }
//     };
//     let req = https.request(options);
//     req.write(data);
//     req.end();
//     let responseData = '';
//     req.on('response', (res) => {
//       res.on('data', (chunk) => { responseData += chunk;});
//       res.on('end', () => { console.log(JSON.parse(responseData)); });
//     });
//   }
//
// }



module.exports = {
  sendEmail
}