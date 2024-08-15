const nodemailer  = require("nodemailer");
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

module.exports = sendEmailProgrammatically;
