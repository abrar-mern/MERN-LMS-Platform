const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: 465,
      secure: true, // true = port 465
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false, // (optional fix for some systems)
      },
    });
    const info = await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: `${email}`,
      subject: `${title}`,
      html: `${body}`,
    });
    console.log("Mail sent successfully", info);
    return info;
  } catch (err) {
    console.log(err);
    throw new Error("Mail sending failed");
  } 
};

module.exports = mailSender;
