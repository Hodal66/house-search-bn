const nodemailer  = require("nodemailer");
require("dotenv").config();
const sendEmailProgrammatically = async (
  sendToEmail,
  NameOfTheReceiver,
  Subject,
  Content
) => {
  const notifyingMessage = `Dear ${NameOfTheReceiver}, <br><br> ${Content} <br><br>Thank you!`;
  // const notifyingMessage = `Dear ${NameOfTheReceiver}, <br><br>You are <u> ASSIGNED to driving </u> a car with plate number:<strong> ${plate_number}.  </strong> <br><br>Thank you!`;
  let transporter = nodemailer.createTransport({
    service: "hotmail",
    // the custom user account created at the outlook to act as a sender to any accounts else, either gmail or other.
    //  for testing the functionality of  nodemailer
    auth: {
      user: "sylvainniyonkuru2@outlook.com",
      pass: "Istart2@@4",
    },
  });

  let mailOptions = {
    from: "sylvainniyonkuru2@outlook.com",
    to: sendToEmail,
    // to: "sylvainniyonkuru6@gmail.com",
    subject: Subject,
    // subject: "Sending Email using Node.js",
    html: notifyingMessage,
    // text: "That was easy!",
  };
  console.log("nodemailer hitted!");
  const info = await transporter.sendMail(mailOptions);
  console.log("Good, It sent!!\nStatus Message: \n" + info.response);
};

const twilio = require('twilio');
const accountSid = process.env.SMS_ACCOUNT_ID;
const authToken = process.env.SMS_AUTH_TOKEN;
const phoneNumber = process.env.SMS_PHONE_NUMBER;
const client = new twilio(accountSid, authToken);

const sendSMSProgramatically = (phoneNumberToSendSMS) => {
client.messages.create({
    body: 'Hello from Twilio!',
    to: phoneNumberToSendSMS, // Your phone number
    from: phoneNumber // Your Twilio number
})
.then((message) => {
    console.log("The message sent successfully")
    console.log(message.sid)})
.catch((error) => {
    console.log("an error occured while sending an sms")
    console.error(error)});
}





module.exports = sendEmailProgrammatically;
module.exports = sendSMSProgramatically;


