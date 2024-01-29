// npm install nodemailer
const nodeMailer = require("nodemailer");

const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'shahzaib5330884@gmail.com',
        pass: 'your pass key'
    }
});

let image = 'image path here'

const mailTo = {
    from: 'shahzaib5330884@gmail.com',
    to: 'shahzaib5330884@gmail.com',
    subject: 'Check it',
    text: 'Sended via node js',
    attachments : [
        {
            path : image
        }
    ]
};

transporter.sendMail(mailTo, function (error, info) {
    if (error) {
        console.log(error);
    } else {
        console.log("Email Sent to: " + info.response);
    }
});