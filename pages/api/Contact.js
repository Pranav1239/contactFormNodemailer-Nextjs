import nodemailer from 'nodemailer';

export default async function contact(req, res) {
    const { email , subject , message } = req.body
    const user = process.env.USER
    const transporter = nodemailer.createTransport({
        host: "smtp.forwardemail.net",
        port: 465,
        secure: true,
        auth: {
          user: process.env.NODE_ENVUSER,
          pass: process.env.NODE_ENVPASS
        }
      });
      try { 
            const mail = await transporter.sendMail({
              from: user,
              to: process.env.EMAIL, // list of receivers
              subject: `The subject is ${subject} and his mail is ${email}`, // Subject line
              text: `Reason ${message}`, // plain text body
            //   html: "<b>Hello world?</b>", html body
            });
            return res.status(200).json({ message : "Mail sended succesfully" });
      } catch (error) {
        console.error(error)
        res.status(500).json({message : "Could send ur message to the mail"});
      }
}