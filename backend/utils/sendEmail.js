import nodemailer from 'nodemailer';

const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.mailtrap.io',
      service: process.env.EMAIL_SERVICE || 'gmail',
      port: process.env.PORT || 8000,
      secure: true,
      auth: {
        user: process.env.EMAIL_ADDRESS || 'email',
        pass: process.env.EMAIL_PASS || 'pass',
      },
    });
    return await transporter.sendMail({
      from: process.env.EMAIL_ADDRESS,
      to: email,
      subject: subject,
      text: text,
    });
  } catch (error) {
    console.log('error sending email', error);
  }
};

export default sendEmail;
