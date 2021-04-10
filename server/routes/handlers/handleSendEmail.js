require("dotenv").config();
var nodemailer = require("nodemailer");
const { USEREMAIL, PASS } = process.env;
const { UserGM } = require("../../models/user");

var transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 25,
  auth: {
    user: USEREMAIL,
    pass: PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const firstMail = async (req, res) => {
  let { first_name, last_name, email, message } = req.body;
  const output = `
    <p>New compte is created for you please flow this steps to change your password</p>
    <h3>Link</h3>
    <a>"http:localHost:3000/fistLogin"</a>

    <h3>info</h3>
    <ul>  
      <li>FirstName: ${first_name}</li>
      <li>lastName: ${last_name}</li>
      <li>Email: ${email}</li>
    </ul>
    <h3>Steps</h3>
    <p>Please flow the steps to change your password</p>
  `;

  // setup email data with unicode symbols
  let mailOptions = {
    from: "lamereaboire@outlook.com", // sender address
    to: `${email}`, // list of receivers
    subject: "Node Contact Request", // Subject line
    text: "Email from la mère A boire", // plain text body
    html: output, // html body
  };

  transport.verify(function (error, success) {
    if (error) {
      throw error;
    } else {
      console.log("Server is ready to take our messages");
    }
  });

  //   send mail with defined transport object

  transport.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(404).json({
        status: 404,
        message: error.message,
      });
    }
    // console.log("Message sent: %s", info.messageId);
    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    if (info.messageId)
      return res.status(201).json({
        status: 201,
        message: `email was send to client with the given ${req.body.email} address`,
      });
  });
};

const getNewGDaughterMail = async (req, res) => {
  let { first_name, last_name, email, assignTo } = req.body;

  console.log(assignTo.assignGM, "req");

  const userInfo = await UserGM.findById(assignTo.assignGM).select("-password");

  if (!userInfo)
    return res.status(404).json({
      status: 404,
      message: "The user with the given Id is not found!",
    });

  const output = `
    <p>New compte is created for you please flow this steps to change your password</p>
    <h3>Link</h3>
    <a>"http:localHost:3000/user/me"</a>

    <h3>info</h3>
    <ul>  
      <li>FirstName: ${userInfo.first_name}</li>
      <li>lastName: ${userInfo.last_name}</li>
      <li>Email: ${userInfo.email}</li>
    </ul>
    <h3>New Gdaughter is assigned to you by the admin</h3>
    <p>${first_name} ${last_name}</p>
    <h3>Please Go to the web site to accept/decline the demand</h3>

    <p>Thanks for your comprehesion and have a good day</p>
  `;

  // setup email data with unicode symbols
  let mailOptions = {
    from: "lamereaboire@outlook.com", // sender address
    to: `${userInfo.email}`, // list of receivers
    subject: "New GDaughter request", // Subject line
    text: "Email from la mère A boire", // plain text body
    html: output, // html body
  };

  transport.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });

  //   send mail with defined transport object

  transport.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(404).json({
        status: 404,
        message: error.message,
      });
    }
    // console.log("Message sent: %s", info.messageId);
    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    if (info.messageId)
      return res.status(201).json({
        status: 201,
        message: `email was send to client with the given ${userInfo.email} address`,
      });
  });
};

module.exports = {
  firstMail,
  getNewGDaughterMail,
};
